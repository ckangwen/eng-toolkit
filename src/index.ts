import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { tmt } from "tencentcloud-sdk-nodejs";
import { fetchWordMeaning } from "./utils/fetchWordMeaning";

const TmtClient = tmt.v20180321.Client;

const client = new TmtClient({
  credential: {
    secretId: process.env.TENCENTCLOUD_SECRET_ID!,
    secretKey: process.env.TENCENTCLOUD_SECRET_KEY!,
  },
  region: "ap-shanghai",
});

const app = new Hono();
app.use("*", cors());

app.get("/api/word", async (c) => {
  const name = c.req.query("name");
  if (!name) {
    throw new Error("name is required");
  }

  const res = await fetchWordMeaning(name);
  return c.json(res);
});

app.post("/api/translate", async (c) => {
  const body = await c.req.json<{ text: string }>();
  if (!body.text) {
    throw new Error("text is required");
  }

  const res = await client.TextTranslate({
    SourceText: body.text,
    Source: "en",
    Target: "zh",
    ProjectId: 0,
  });

  return c.json({
    text: res.TargetText,
  });
});

const PORT = 3002;
serve({
  fetch: app.fetch,
  port: PORT,
});

console.log(`Server is running on port ${PORT}`);
