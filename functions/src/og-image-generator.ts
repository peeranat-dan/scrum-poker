import { createCanvas } from 'canvas';
import * as admin from 'firebase-admin';

interface Session {
  id: string;
  name: string;
  votingSystem: string;
}

/**
 * Generates an OG image for a session and uploads it to Firebase Storage
 * @param session - The session data
 * @returns The public URL of the generated image
 */
export async function generateAndUploadOgImage(
  session: Session,
): Promise<string> {
  // Create canvas (1200x630 is the recommended OG image size)
  const width = 1200;
  const height = 630;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background gradient (dark theme matching the app)
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#1a1a1a');
  gradient.addColorStop(1, '#2d2d2d');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Add subtle pattern/texture
  ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = Math.random() * 3;
    ctx.fillRect(x, y, size, size);
  }

  // Draw E-mate logo (text-based)
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 72px monospace';
  ctx.textAlign = 'left';
  const logoText = 'E-mate';
  ctx.fillText(logoText, 60, 120);

  // Add primary color accent under logo
  ctx.fillStyle = '#10b981'; // Primary green color
  ctx.fillRect(60, 140, 180, 4);

  // Session name (main content)
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 64px sans-serif';
  ctx.textAlign = 'left';

  // Word wrap for long session names
  const maxWidth = width - 120;
  const words = session.name.split(' ');
  let line = '';
  let y = 300;
  const lineHeight = 80;

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && i > 0) {
      ctx.fillText(line, 60, y);
      line = words[i] + ' ';
      y += lineHeight;
      // Limit to 2 lines
      if (y > 380) break;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, 60, y);

  // Subtitle
  ctx.fillStyle = '#9ca3af';
  ctx.font = '32px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('Planning Poker Session', 60, y + 60);

  // Footer with voting system
  ctx.fillStyle = '#6b7280';
  ctx.font = '28px monospace';
  ctx.textAlign = 'left';
  ctx.fillText(
    `Voting System: ${session.votingSystem.toUpperCase()}`,
    60,
    height - 60,
  );

  // Convert canvas to buffer
  const buffer = canvas.toBuffer('image/png');

  // Upload to Firebase Storage
  const bucket = admin.storage().bucket();
  const fileName = `og-images/${session.id}.png`;
  const file = bucket.file(fileName);

  await file.save(buffer, {
    metadata: {
      contentType: 'image/png',
      cacheControl: 'public, max-age=31536000', // Cache for 1 year
    },
  });

  // Make the file public
  await file.makePublic();

  // Return public URL
  return `https://storage.googleapis.com/${bucket.name}/${fileName}`;
}

/**
 * Gets the OG image URL for a session (if it exists)
 * @param sessionId - The session ID
 * @returns The public URL of the image, or null if it doesn't exist
 */
export async function getOgImageUrl(
  sessionId: string,
): Promise<string | null> {
  const bucket = admin.storage().bucket();
  const fileName = `og-images/${sessionId}.png`;
  const file = bucket.file(fileName);

  const [exists] = await file.exists();
  if (!exists) {
    return null;
  }

  return `https://storage.googleapis.com/${bucket.name}/${fileName}`;
}

/**
 * Deletes the OG image for a session
 * @param sessionId - The session ID
 */
export async function deleteOgImage(sessionId: string): Promise<void> {
  const bucket = admin.storage().bucket();
  const fileName = `og-images/${sessionId}.png`;
  const file = bucket.file(fileName);

  const [exists] = await file.exists();
  if (exists) {
    await file.delete();
  }
}
