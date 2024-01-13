import { tmt } from "tencentcloud-sdk-nodejs";

const TmtClient = tmt.v20180321.Client;

const client = new TmtClient({
  credential: {
    secretId: process.env.TENCENTCLOUD_SECRET_ID!,
    secretKey: process.env.TENCENTCLOUD_SECRET_KEY!,
  },
  region: "ap-shanghai",
});
export async function POST(req: Request) {
  const body = await req.json();
  if (!body.text) {
    throw new Error("text is required");
  }

  const res = await client.TextTranslate({
    SourceText: body.text,
    Source: "en",
    Target: "zh",
    ProjectId: 0,
  });

  return new Response(
    JSON.stringify({
      text: res.TargetText,
    }),
  );
}
