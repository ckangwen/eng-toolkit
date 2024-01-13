import { fetchWordMeaning } from "@/utils/fetchWordMeaning";

export async function GET(req: Request) {
  const name = new URL(req.url).searchParams.get("name");
  if (!name) {
    throw new Error("name is required");
  }

  const res = await fetchWordMeaning(name);

  return new Response(JSON.stringify(res));
}
