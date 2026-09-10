const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
function load(file) {
  const output = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const exports = {};
  vm.runInNewContext(output, { exports, URL, require: () => ({}) });
  return exports;
}
const { validateInquiryPayload: inquiry } = load('src/lib/inquiry.ts');
const { validateNewsletterPayload: newsletter } = load('src/lib/newsletter.ts');
const valid = { kind: 'contact', name: '山田太郎', email: 'test@example.com', message: '掲載内容についてのお問い合わせです。', agreed: true };
assert.equal(inquiry(valid).length, 0);
assert.equal(inquiry({ ...valid, kind: 'listing', organization: '団体', programName: '制度', targetUrl: 'https://example.com' }).length, 0);
for (const bad of [null, [], 42, 'text', { ...valid, name: 123 }, { ...valid, message: {} }, { ...valid, email: ['test@example.com'] }, { ...valid, agreed: 'false' }, { ...valid, agreed: false }, { ...valid, kind: 'constructor' }, { ...valid, kind: '__proto__' }, { ...valid, message: 'x'.repeat(5001) }, { ...valid, targetUrl: 'javascript:alert(1)' }]) {
  assert.ok(inquiry(bad).length > 0, JSON.stringify(bad));
}
const signup = { email: 'test@example.com', consent: true, interest: 'benefits' };
assert.equal(newsletter(signup).length, 0);
for (const bad of [null, [], false, { ...signup, email: ['test@example.com'] }, { ...signup, consent: 'false' }, { ...signup, interest: 0 }, { ...signup, interest: 'unknown' }]) {
  assert.ok(newsletter(bad).length > 0, JSON.stringify(bad));
}
console.log('入力検証: 正常系3件・異常系20件 成功');
