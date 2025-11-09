// app/api/youtube/route.ts
export const revalidate = 3600; // cache 1 oră

export async function GET() {
  const channelId = "UCvH_nLLK5EnZCoc51IdlFGA"; // canalul tău CYBER-GS

  try {
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

    // Împărțim feed-ul în <entry> ... </entry>
    const entries = xml.split("<entry>").slice(1).map((part) => part.split("</entry>")[0]);

    const videos = entries
      .map((entry) => {
        const idMatch = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
        const titleMatch = entry.match(/<title>([^<]+)<\/title>/i);

        // Durata poate apărea în 2 forme:
        //   <yt:duration seconds="...">
        //   <media:content duration="..."> 
        const dur1 = entry.match(/yt:duration[^>]*seconds="(\d+)"/i);
        const dur2 = entry.match(/media:content[^>]*duration="(\d+)"/i);

        const seconds =
          dur1?.[1] ? parseInt(dur1[1], 10) :
          dur2?.[1] ? parseInt(dur2[1], 10) :
          undefined;

        const id = idMatch?.[1] || null;
        const title = titleMatch?.[1] || "";

        return { id, seconds, title };
      })
      .filter((v) => v.id) // sigurăm că avem id
      // Filtru Shorts:
      // 1) dacă avem durata, cerem >= 60s
      // 2) fallback: excludem titluri care conțin "shorts"
      .filter((v) => {
        if (typeof v.seconds === "number") {
          return v.seconds >= 60;
        }
        return !/#?shorts/i.test(v.title);
      })
      .slice(0, 3)
      .map((v) => v.id as string);

    return new Response(JSON.stringify({ ids: videos }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ids: [] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }
}
