import { load } from "cheerio";

async function fetchYouDao(word: string) {
  const html = await fetch(`https://www.youdao.com/result?word=lj%3A${word}&lang=en`).then((r) =>
    r.text(),
  );
  const $ = load(html);

  const sentences = $(".trans-container ul > li")
    .map(function () {
      const en = $(this).find(".sen-eng").text().trim();
      const ch = $(this).find(".sen-ch").text().trim();

      return { en, ch };
    })
    .get();

  return sentences;
}

export async function GET(req: Request) {
  const name = new URL(req.url).searchParams.get("name");

  if (name) {
    const sentences = await fetchYouDao(name);

    return new Response(JSON.stringify(sentences));
  }

  return new Response(null);
}
