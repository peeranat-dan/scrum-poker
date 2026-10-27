// TODO: Add test for copyToClipboard
export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    // oxlint-disable-next-line no-console
    console.error('Failed to copy to clipboard', error);
  }
}
