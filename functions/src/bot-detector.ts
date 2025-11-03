/**
 * Detects if a user agent string belongs to a social media bot/crawler
 * @param userAgent - The user agent string from the HTTP request
 * @returns true if the user agent is a known social media bot
 */
export function isBot(userAgent: string): boolean {
  const bots = [
    'facebookexternalhit', // Facebook
    'Facebot', // Facebook
    'Twitterbot', // Twitter/X
    'LinkedInBot', // LinkedIn
    'Slackbot', // Slack
    'Discordbot', // Discord
    'WhatsApp', // WhatsApp
    'TelegramBot', // Telegram
    'Slackbot-LinkExpanding', // Slack link preview
    'SkypeUriPreview', // Skype
    'vkShare', // VK
    'Pinterest', // Pinterest
    'redditbot', // Reddit
  ];

  const lowerUserAgent = userAgent.toLowerCase();
  return bots.some((bot) => lowerUserAgent.includes(bot.toLowerCase()));
}
