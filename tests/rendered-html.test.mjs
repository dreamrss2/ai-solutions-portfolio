import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the English-first AI solutions portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Ren Sishuo \| AI Solutions Engineer<\/title>/i);
  assert.match(html, /I turn ambiguous AI ideas into deployable systems/);
  assert.match(html, /ZR AI Gateway/);
  assert.match(html, /Banking AI &amp; Data Intelligence/);
  assert.match(html, /TileVision Studio/);
  assert.match(html, /RenoPilot/);
  assert.match(html, /YingQiao Flow/);
  assert.match(html, /application\/ld\+json/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("renders every public case-study route", async () => {
  const expected = new Map([
    ["zr-ai-gateway", "One account, many model providers"],
    ["bank-ai-data-intelligence", "Testing knowledge was scattered"],
    ["tilevision-studio", "A beautiful image is not enough"],
    ["renopilot", "The quote is only as good as the context"],
    ["yingqiao-flow", "Fast content production still needs evidence"],
  ]);

  for (const [slug, copy] of expected) {
    const response = await render(`/projects/${slug}`);
    assert.equal(response.status, 200, slug);
    const html = await response.text();
    assert.match(html, new RegExp(copy, "i"), slug);
    assert.match(html, /Inspect the actual product surface/);
    assert.match(html, /How the system moves from input to evidence/);
  }
});

test("keeps project data bilingual, unique and backed by zoomable media", async () => {
  const [data, client, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/portfolio-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/portfolio-client.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  const slugs = [...data.matchAll(/slug: "([a-z0-9-]+)"/g)].map((match) => match[1]);
  assert.equal(slugs.length, 5);
  assert.equal(new Set(slugs).size, slugs.length);
  assert.match(data, /银行 AI 应用与数据智能分析/);
  assert.match(data, /New API 上游/);
  assert.match(data, /Sub2API 上游/);
  assert.match(client, /showModal\(\)/);
  assert.match(client, /Math\.min\(3/);
  assert.match(client, /localStorage\.setItem/);
  assert.match(client, /aria-expanded/);
  assert.match(layout, /metadataBase: new URL\("https:\/\/portfolio\.renss\.top"\)/);
  assert.match(layout, /\/og\.png/);
  assert.match(packageJson, /"name": "ren-sishuo-portfolio"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
});
