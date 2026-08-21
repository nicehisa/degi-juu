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
- **外部データ取得**: Google Sheets CSV / Supabase REST APIへの任意接続
- **デプロイ**: Vercel

## ローカルでの起動方法

```bash
# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで `http://localhost:3002` を開いてください。

## データ更新方法

自治体データは `src/data/municipalities.ts` で管理しています。

新しい自治体を追加する場合は、`municipalities` 配列に `Municipality` 型のオブジェクトを追加してください。
`imageUrl` に新しいドメインを使う場合は、`next.config.ts` の `images.remotePatterns` にホスト名を追加しないと、そのカードを含むページが実行時にエラーになります。

```typescript
{
  id: "unique-id",              // 一意のID
  slug: "unique-slug",          // URLスラッグ（英数字・ハイフン）
  region: "東北",                // regions.ts の name と一致させる
  prefecture: "○○県",
  municipality: "○○市",
  programName: "制度名",
  type: "デジタル住民票NFT",      // MunicipalityType のいずれか
  summary: "制度の概要",
  price: "○○円",
  priceNumber: 1000,            // 任意。価格の数値（並び替え・価格帯絞り込み用）
  status: "販売中",              // 販売中 / 受付中 / 終了 / 要確認
  target: "対象者",
  benefits: ["特典1", "特典2"],
  benefitCategories: ["tourism", "community"], // benefitCategories.ts の id
  benefitConditions: "特典の利用条件",
  applicationMethod: "公式ページよりご確認ください。",
  officialUrl: "https://...",
  relatedUrl: "https://...",    // 任意
  imageUrl: "https://...",      // 任意。外部ホストは next.config.ts の remotePatterns への追加が必要
  lastChecked: "2026-08-21",
  notes: "注意事項",
  isOfficialInfo: false,
  isFeatured: false,            // 任意。トップの「注目の制度」に出す場合 true
  createdAt: "2026-08-21",
  updatedAt: "2026-08-21",
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

## フォーム送信・広告PR管理

問い合わせ、自治体からの掲載依頼、広告・PR相談は `/api/inquiries` からResendへ送信します。

- 管理画面: `/admin`
- 掲載依頼フォーム: `/listing-request`
- 広告・PR掲載相談: `/advertise`
- お問い合わせ・修正依頼: `/contact`
- 掲載基準・編集方針: `/editorial-policy`
- 広告・PR表記ポリシー: `/advertising-policy`
- 更新履歴: `/updates`
- よくある質問: `/faq`
- 記事・コラム: `/articles`
- ニュース: `/news`
- おすすめ診断: `/diagnosis`
- 都道府県マップ: `/map`
- 比較しやすい制度一覧: `/ranking`
- メールマガジン登録: `/newsletter`
- LINE連携: `/line`
- 地域別SEOページ: `/regions/[slug]`
- 都道府県別SEOページ: `/prefectures/[prefecture]`
- 特典別SEOページ: `/benefits/[slug]`
- 自治体データAPI: `/api/municipalities`

## 環境変数

### 本番公開前に必須（4つ）

以下が未設定のまま公開すると、管理画面が閉じられない・問い合わせが届かない・OGPやsitemapのURLが不正になります。

| 環境変数 | 内容 | 未設定時の挙動 |
| --- | --- | --- |
| `ADMIN_PASSWORD` | `/admin` のBasic認証パスワード | 本番では `/admin` が **503** を返し、管理画面を開けません |
| `RESEND_API_KEY` | ResendのAPIキー | メールが送信されず、内容はサーバーログにのみ退避されます |
| `CONTACT_TO_EMAIL` | 問い合わせ受信先メールアドレス | 同上 |
| `NEXT_PUBLIC_SITE_URL` | 本番サイトURL（例 `https://degi-juu.example.jp`、末尾スラッシュなし） | Vercelの自動URL、なければ `https://degi-juu.vercel.app` にフォールバック |

### 任意

| 環境変数 | 内容 |
| --- | --- |
| `ADMIN_USER` | 管理画面Basic認証のユーザー名。未設定時は `admin` |
| `CONTACT_FROM_EMAIL` | 送信元メールアドレス。未設定時は `デジじゅう <onboarding@resend.dev>`。**独自ドメインをResendで認証して設定することを推奨** |
| `CONTACT_AUTO_REPLY` | `false` にすると送信者への自動返信を停止 |
| `GEMINI_API_KEY` | 新規制度の自動検知（GitHub Actions側で使用） |
| `GOOGLE_SHEETS_CSV_URL` | 自治体データをGoogle Sheetsの公開CSVから取得する場合に設定 |
| `SUPABASE_URL` | 自治体データをSupabase REST APIから取得する場合に設定 |
| `SUPABASE_ANON_KEY` | Supabase REST APIのanon key |
| `NEXT_PUBLIC_LINE_OFFICIAL_URL` | LINE公式アカウントの友だち追加URL |

### 送信失敗時の挙動（問い合わせの取りこぼし防止）

`RESEND_API_KEY` / `CONTACT_TO_EMAIL` が未設定の場合、またはResendへの送信が失敗した場合でも、
APIは500を返さず、送信内容を **1行JSON** でサーバーログに退避します。

```
degi-juu:inquiry-fallback {"tag":"degi-juu:inquiry-fallback","reason":"resend-not-configured","kind":"contact","receivedAt":"...","payload":{...}}
```

- 復旧手順: Vercel の Runtime Logs で `degi-juu:inquiry-fallback` を検索し、`payload` から内容を取り出す
- 利用者側には「受け付けたが自動送信が完了していない可能性がある」旨と、直接連絡先を表示する
- 運用上は、このタグに対するログドレイン／アラートを設定しておくことを推奨

### 公開前チェックリスト

- [ ] `ADMIN_PASSWORD` を設定し、`/admin` が未認証で401になることを確認
- [ ] `RESEND_API_KEY` / `CONTACT_TO_EMAIL` を設定し、実際に問い合わせが届くことを確認
- [ ] `NEXT_PUBLIC_SITE_URL` を本番ドメインに設定し、`/robots.txt` と `/sitemap.xml` のURLを確認
- [ ] `CONTACT_FROM_EMAIL` を独自ドメイン（SPF/DKIM設定済み）に変更
- [ ] `degi-juu:inquiry-fallback` のログ監視／通知を設定
- [ ] Search Console にサイトマップを登録

外部データ連携を設定していない場合は、従来通り `src/data/municipalities.ts` の静的データを使用します。接続状況は `/admin`、取得結果は `/api/municipalities` で確認できます。

Supabaseで自治体データを管理する場合は、`supabase/schema.sql` をSQL Editorで実行して `municipalities` テーブルを作成してください。

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

- [x] Google Sheetsからのデータ取得
- [x] Supabaseによるデータベース化
- [x] 管理画面の構築
- [x] 自治体からの掲載依頼フォームの送信機能実装
- [x] お問い合わせフォームの送信機能実装（Resend等）
- [x] 広告・PR掲載機能
- [x] SEO記事・コラムセクション
- [x] おすすめ診断機能
- [x] 地図検索（都道府県マップ）
- [x] 都道府県別ページ
- [x] ランキングページ
- [x] ニュース記事
- [x] メールマガジン
- [x] LINE公式アカウント連携
- [x] OGP画像の動的生成
