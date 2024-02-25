export function getYtIdFromUrl(url: string) {
  const match = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (match && match[1].length === 11) {
    return match[1];
  }
  const match2 = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
  if (match2 && match2[1].length === 11) {
    return match2[1];
  }
  const match3 = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
  if (match3 && match3[1].length === 11) {
    return match3[1];
  }

  const match4 = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
  if (match4 && match4[1].length === 11) {
    return match4[1];
  }

  try {
    const urlObj = new URL(url);
    const searchParams = urlObj.searchParams;
    const v = searchParams.get("v");
    if (v && v.length === 11) {
      console.log("length", v.length);
      return v;
    }
  } catch (e) {
    // ignore
  }
  return null;
}
