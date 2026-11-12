import { lookup } from "node:dns/promises";
import { request } from "node:https";
import { BlockList, isIP } from "node:net";
import { gunzipSync, inflateSync, brotliDecompressSync } from "node:zlib";
import { load } from "cheerio";

const privateAddresses = new BlockList();
for (const [network, prefix] of [["0.0.0.0", 8], ["10.0.0.0", 8], ["100.64.0.0", 10], ["127.0.0.0", 8], ["169.254.0.0", 16], ["172.16.0.0", 12], ["192.0.0.0", 24], ["192.0.2.0", 24], ["192.168.0.0", 16], ["198.18.0.0", 15], ["198.51.100.0", 24], ["203.0.113.0", 24], ["224.0.0.0", 4], ["240.0.0.0", 4]]) privateAddresses.addSubnet(network, prefix, "ipv4");
for (const [network, prefix] of [["2001:db8::", 32], ["2001::", 32], ["2002::", 16]]) privateAddresses.addSubnet(network, prefix, "ipv6");
const globalV6 = new BlockList();
globalV6.addSubnet("2000::", 3, "ipv6");
export function isPublicAddress(address) {
  const family = isIP(address);
  return family === 4 ? !privateAddresses.check(address, "ipv4") : family === 6 && globalV6.check(address, "ipv6") && !privateAddresses.check(address, "ipv6");
}
export function validateResearchUrl(value) {
  const url = new URL(value);
  if (url.protocol !== "https:" || url.username || url.password || (url.port && url.port !== "443") || isIP(url.hostname.replace(/^\[|\]$/g, "")) || url.hostname === "localhost" || /\.(localhost|local|internal)$/i.test(url.hostname)) throw new Error("公開HTTPSドメインのURL（認証情報・独自ポートなし）が必要です");
  return url;
}

async function requestOnce(url, { timeoutMs, maxBytes }) {
  const controller = new AbortController();
  const { setTimeout: delay } = await import("node:timers/promises");
  const addresses = await Promise.race([
    lookup(url.hostname, { all: true }),
    delay(timeoutMs, undefined, { signal: controller.signal }).then(() => { throw new Error("DNS lookup timeout"); }),
  ]).finally(() => controller.abort());
  if (!addresses.length || addresses.some(({ address }) => !isPublicAddress(address))) throw new Error("内部・予約済みIPへの接続は禁止されています");
  // Pin the validated DNS result so a second lookup cannot redirect into a private network.
  const address = addresses.find(address => address.family === 4) || addresses[0];
  return new Promise((resolve, reject) => {
    const req = request(url, {
      signal: AbortSignal.timeout(timeoutMs),
      lookup: (_host, options, callback) => options.all ? callback(null, [address]) : callback(null, address.address, address.family),
      headers: { "User-Agent": "Digijuu-DataResearch/1.0 (+https://digijuu.jp/contact)", "Accept-Encoding": "identity", Accept: "text/html,application/rss+xml,application/xml,application/pdf;q=0.8,*/*;q=0.5" },
    }, response => {
      const metadata = { status: response.statusCode, headers: response.headers };
      if (response.statusCode !== 200) { response.destroy(); resolve({ ...metadata, bytes: Buffer.alloc(0) }); return; }
      const chunks = [];
      let size = 0;
      response.on("data", chunk => {
        size += chunk.length;
        if (size > maxBytes) { response.destroy(new Error("応答容量が上限を超えています")); return; }
        chunks.push(chunk);
      });
      response.on("error", reject);
      response.on("end", () => {
        try {
          let bytes = Buffer.concat(chunks);
          const encoding = response.headers["content-encoding"];
          if (encoding === "gzip") bytes = gunzipSync(bytes, { maxOutputLength: maxBytes });
          else if (encoding === "deflate") bytes = inflateSync(bytes, { maxOutputLength: maxBytes });
          else if (encoding === "br") bytes = brotliDecompressSync(bytes, { maxOutputLength: maxBytes });
          resolve({ ...metadata, bytes });
        } catch (error) { reject(error); }
      });
    });
    req.on("error", reject);
    req.end();
  });
}

export async function fetchResearchPage(value, options = {}, transport = requestOnce) {
  const settings = { timeoutMs: 15000, maxBytes: 4 * 1024 * 1024, ...options };
  const redirects = [];
  let url = validateResearchUrl(value);
  for (let hop = 0; hop <= 5; hop++) {
    const response = await transport(url, settings);
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      if (!response.headers.location) throw new Error("リダイレクト先がありません");
      redirects.push({ url: url.href, status: response.status });
      url = validateResearchUrl(new URL(response.headers.location, url).href);
      continue;
    }
    const contentType = String(response.headers["content-type"] || "");
    const head = response.bytes.subarray(0, 4096).toString("ascii");
    const charset = /charset\s*=\s*["']?(shift[_-]?jis|sjis)/i.test(`${contentType} ${head}`) ? "shift_jis" : /charset\s*=\s*["']?euc-jp/i.test(`${contentType} ${head}`) ? "euc-jp" : "utf-8";
    return { url: url.href, status: response.status, contentType, redirects, text: /pdf/i.test(contentType) ? "" : new TextDecoder(charset).decode(response.bytes) };
  }
  throw new Error("リダイレクト回数が上限を超えました");
}

export const normalizeText = value => String(value || "").normalize("NFKC").replace(/\s+/g, " ").trim();
export function parseResearchHtml(html) {
  const $ = load(html);
  $("script,style,noscript,template").remove();
  const title = normalizeText($("title").text());
  const heading = normalizeText($("h1").first().text());
  const identityText = normalizeText($("body").text());
  $("nav,header,footer,aside").remove();
  const main = $("main,article,#main,#contents,.contents").first();
  const content = main.length ? main : $("body");
  const text = normalizeText(content.text());
  const description = normalizeText($("meta[name='description']").attr("content") || $("meta[property='og:description']").attr("content"));
  const paragraph = normalizeText(content.find("p").filter((_, p) => normalizeText($(p).text()).length > 30).first().text());
  const summary = (description && !/^.{0,25}公式(?:ウェブサイト|ホームページ|サイト)$/.test(description) ? description : paragraph || text).slice(0, 300);
  const missing = /(?:^404\b|not found|ページ.{0,12}(?:見つかりません|存在しません)|お探しのページ|アクセスが拒否|Access Denied|Just a moment|captcha)/i.test(`${title} ${heading}`) || (text.length < 500 && /ページが見つかりません|お探しのページ|Access Denied|Just a moment|captcha/i.test(text));
  return { title, heading, text, identityText, summary, missing };
}
