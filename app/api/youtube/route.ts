// app/api/youtube/route.ts
// Revalidare la 1 oră (poți crește/scădea după preferință)
export const revalidate = 3600;

export async function GET() {
  const channelId = "UCvH_nLLK5EnZCoc51IdlFGA"; // canalul tău
  const res = await fetch(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
    { next: { revalidate } }
  );

  if (!res.ok) {
    return new Response(JSON.stringify({ ids: [] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }

  const xml = await res.text();
  // Extragem <yt:videoId>…</yt:videoId> din XML (fără librării)
  const ids =
    Array.from(xml.matchAll(/<yt:videoId>(.*?)<\/yt:videoId>/g))
      .map((m) => m[1])
      .slice(0, 3);

  return new Response(JSON.stringify({ ids }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}
