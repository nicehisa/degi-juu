import { test } from "node:test";
import assert from "node:assert/strict";
import { checkProgram, japanDate } from "../lib/check-program.mjs";

const program = { officialUrl: "https://example.com/program" };
const page = text => async () => new Response(`<html><main>デジタル住民票 ${text}</main></html>`, { headers: { "content-type": "text/html" } });
test("successful checks record Japanese date and compare content without advancing editorial confirmation", async () => {
  const first = await checkProgram(program, undefined, page("受付中"));
  assert.equal(first.result, "ok");
  assert.equal(first.checkedDate, japanDate());
  assert.equal(first.changed, false);
  const next = await checkProgram(program, first, page("募集終了"));
  assert.equal(next.changed, true);
  assert.equal(next.baselineFingerprint, first.fingerprint);
});
test("failed checks preserve last successful check date", async () => {
  const old = { checkedDate: "2026-08-31", lastSucceededAt: "2026-08-31T00:00:00Z" };
  const result = await checkProgram(program, old, async () => new Response("", { status: 404 }));
  assert.equal(result.checkedDate, old.checkedDate);
  assert.equal(result.result, "failed");
});
test("unrelated pages and anti-bot pages do not count as successful research", async () => {
  for (const text of ["Welcome", "Just a moment captcha"] ) {
    const result = await checkProgram(program, undefined, async () => new Response(text, { headers: { "content-type": "text/html" } }));
    assert.equal(result.result, "failed");
    assert.equal(result.checkedDate, undefined);
  }
});
test("Japanese midnight uses JST rather than UTC", () => {
  assert.equal(japanDate(new Date("2026-11-10T15:01:00Z")), "2026-11-11");
});
