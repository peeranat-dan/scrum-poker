import { https, firestore } from 'firebase-functions/v2';
import * as admin from 'firebase-admin';
import { isBot } from './bot-detector.js';
import {
  generateAndUploadOgImage,
  getOgImageUrl,
  deleteOgImage,
} from './og-image-generator.js';

// Initialize Firebase Admin
admin.initializeApp();

/**
 * HTTP function that serves custom OG meta tags for social media bots
 * Regular users are redirected to the SPA
 */
export const ogPreview = https.onRequest(async (req, res) => {
  const userAgent = req.headers['user-agent'] || '';

  // Extract gameId from path (format: /game/xyz123)
  const pathParts = req.path.split('/').filter(Boolean);
  const gameId = pathParts[pathParts.length - 1];

  if (!gameId) {
    res.redirect(301, '/');
    return;
  }

  // If not a bot, redirect to the SPA
  if (!isBot(userAgent)) {
    res.redirect(301, '/');
    return;
  }

  try {
    // Fetch session data from Firestore
    const sessionDoc = await admin
      .firestore()
      .collection('sessions')
      .doc(gameId)
      .get();

    if (!sessionDoc.exists) {
      res.status(404).send('Session not found');
      return;
    }

    const session = sessionDoc.data();
    if (!session) {
      res.status(404).send('Session data not found');
      return;
    }

    // Get or generate OG image
    let ogImageUrl = await getOgImageUrl(gameId);
    if (!ogImageUrl) {
      ogImageUrl = await generateAndUploadOgImage({
        id: gameId,
        name: session.name,
        votingSystem: session.votingSystem,
      });
    }

    const baseUrl = 'https://planning-poker.ninprd.com';
    const pageUrl = `${baseUrl}/game/${gameId}`;

    // Serve custom HTML with session-specific meta tags
    const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Primary Meta Tags -->
    <title>${session.name} - E-mate Planning Poker</title>
    <meta name="title" content="${session.name} - E-mate Planning Poker" />
    <meta name="description" content="Join ${session.name} planning poker session using ${session.votingSystem} voting system. Collaborate with your team in real-time." />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:title" content="${session.name} - E-mate Planning Poker" />
    <meta property="og:description" content="Join ${session.name} planning poker session using ${session.votingSystem} voting system. Collaborate with your team in real-time." />
    <meta property="og:image" content="${ogImageUrl}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="twitter:domain" content="planning-poker.ninprd.com" />
    <meta property="twitter:url" content="${pageUrl}" />
    <meta name="twitter:title" content="${session.name} - E-mate Planning Poker" />
    <meta name="twitter:description" content="Join ${session.name} planning poker session using ${session.votingSystem} voting system. Collaborate with your team in real-time." />
    <meta name="twitter:image" content="${ogImageUrl}" />

    <!-- Redirect bots to the actual page after scraping -->
    <meta http-equiv="refresh" content="0;url=${pageUrl}" />
  </head>
  <body>
    <h1>${session.name}</h1>
    <p>Redirecting to E-mate Planning Poker session...</p>
    <script>window.location.href = '${pageUrl}';</script>
  </body>
</html>
    `;

    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.send(html);
  } catch (error) {
    console.error('Error generating OG preview:', error);
    res.status(500).send('Error generating preview');
  }
});

/**
 * Firestore trigger to generate OG image when a session is created
 */
export const onSessionCreated = firestore.onDocumentCreated(
  'sessions/{sessionId}',
  async (event) => {
    const sessionId = event.params.sessionId;
    const session = event.data?.data();

    if (!session) {
      console.error('Session data not found');
      return;
    }

    try {
      await generateAndUploadOgImage({
        id: sessionId,
        name: session.name,
        votingSystem: session.votingSystem,
      });

      console.info(`OG image generated for session: ${sessionId}`);
    } catch (error) {
      console.error(
        `Error generating OG image for session ${sessionId}:`,
        error,
      );
    }
  },
);

/**
 * Firestore trigger to update OG image when session name changes
 */
export const onSessionUpdated = firestore.onDocumentUpdated(
  'sessions/{sessionId}',
  async (event) => {
    const sessionId = event.params.sessionId;
    const before = event.data?.before.data();
    const after = event.data?.after.data();

    if (!before || !after) {
      console.error('Session data not found');
      return;
    }

    // Only regenerate if name or voting system changed
    if (
      before.name !== after.name ||
      before.votingSystem !== after.votingSystem
    ) {
      try {
        await generateAndUploadOgImage({
          id: sessionId,
          name: after.name,
          votingSystem: after.votingSystem,
        });

        console.info(`OG image updated for session: ${sessionId}`);
      } catch (error) {
        console.error(
          `Error updating OG image for session ${sessionId}:`,
          error,
        );
      }
    }
  },
);

/**
 * Firestore trigger to delete OG image when a session is deleted
 */
export const onSessionDeleted = firestore.onDocumentDeleted(
  'sessions/{sessionId}',
  async (event) => {
    const sessionId = event.params.sessionId;

    try {
      await deleteOgImage(sessionId);
      console.info(`OG image deleted for session: ${sessionId}`);
    } catch (error) {
      console.error(
        `Error deleting OG image for session ${sessionId}:`,
        error,
      );
    }
  },
);
