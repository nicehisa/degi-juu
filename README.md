# デジじゅう

全国のデジタル住民制度（デジタル住民票・デジタル住民NFT・デジタル住民証・地域ファン向け会員証）を比較・紹介する情報サイトです。

## サイト概要

- **サイト名**: デジじゅう（でじじゅう）
- **目的**: 全国の自治体が実施するデジタル住民制度を一覧で探せる比較・まとめサイト
- **注意**: 本サイトは自治体公式サイトではありません。法律上の住民票・住民登録とは異なる制度を紹介しています。

## 技術構成

- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **データ管理**: TypeScript（`src/data/municipalities.ts`）
- **デプロイ**: Vercel

## ローカルでの起動方法

```bash
# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで `http://localhost:3000` を開いてください。

## データ更新方法

自治体データは `src/data/municipalities.ts` で管理しています。

新しい自治体を追加する場合は、`municipalities` 配列に `Municipality` 型のオブジェクトを追加してください。

```typescript
{
  id: "unique-id",           // 一意のID
  slug: "unique-slug",       // URLスラッグ（英数字・ハイフン）
  prefecture: "○○県",
  municipality: "○○市",
  programName: "制度名",
  type: "デジタル住民票NFT", // 種別
  summary: "制度の概要",
  price: "○○円",
  priceNumber: 1000,         // 価格の数値（並び替え用）
  status: "販売中",
  target: "対象者",
  benefits: ["特典1", "特典2"],
  benefitConditions: "特典の利用条件",
  officialUrl: "https://...",
  lastChecked: "2026-06-01",
  notes: "注意事項",
  isOfficialInfo: false,
}
```

## 新規制度の自動検知

1日1回、GitHub Actionsで新しいデジタル住民制度の候補を検知できます。
現在は Google の `Gemini API + Google検索グラウンディング` を優先して使います。`Custom Search JSON API` は新規利用が制限されているため、既存利用権限がある場合のみ `SEARCH_PROVIDER=google` で使います。

- 実行ワークフロー: `.github/workflows/detect-new-programs.yml`
- 検知スクリプト: `scripts/detect-new-programs.mjs`
- 掲載用ドラフト生成: `scripts/create-municipality-draft.mjs`
- 候補データ: `src/data/detectedMunicipalities.json`
- 管理者確認ページ: `/admin/detected`

検知結果は公開データへ自動反映せず、未確認候補として保存します。公開前に、自治体公式ページ・制度名・販売状況・価格・特典・法務リスクを確認し、問題ない候補だけ `src/data/municipalities.ts` に移してください。

GitHub Actionsで使う場合は、Repository Secretsに以下を設定してください。

| Secret名 | 内容 |
| --- | --- |
| `GEMINI_API_KEY` | Gemini APIキー。Google検索グラウンディングで使用 |
| `GOOGLE_SEARCH_API_KEY` | 予備。Gemini APIキーをここに入れている場合も利用可能 |
| `GOOGLE_SEARCH_ENGINE_ID` | 予備。Custom Search JSON APIを使う場合のみ使用 |

ローカルで手動実行する場合:

```bash
npm run detect:programs
```

候補から掲載用の `Municipality` オブジェクト下書きを作る場合:

```bash
npm run draft:program -- --id <candidate-id>
```

## Vercelへの公開方法

```bash
# Vercel CLIのインストール（未インストールの場合）
npm i -g vercel

# デプロイ
vercel
```

または、GitHubリポジトリをVercelに連携することで自動デプロイが可能です。

## 注意事項

- 本サイトは自治体公式サイトではありません
- 掲載情報は確認日時点の内容です
- デジタル住民票等は法律上の住民票ではありません
- ふるさと納税とは異なり、原則として税控除の対象ではありません
- 最新情報は各自治体の公式ページをご確認ください

## 今後の拡張案

- [ ] Google Sheetsからのデータ取得
- [ ] Supabaseによるデータベース化
- [ ] 管理画面の構築
- [ ] 自治体からの掲載依頼フォームの送信機能実装
- [ ] お問い合わせフォームの送信機能実装（Resend等）
- [ ] 広告・PR掲載機能
- [ ] SEO記事・コラムセクション
- [ ] おすすめ診断機能
- [ ] 地図検索（都道府県マップ）
- [ ] 都道府県別ページ
- [ ] ランキングページ
- [ ] ニュース記事
- [ ] メールマガジン
- [ ] LINE公式アカウント連携
- [ ] OGP画像の動的生成
