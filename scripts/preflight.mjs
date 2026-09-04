const requiredEnv = [
  {
    key: "ADMIN_PASSWORD",
    fix: "VercelのEnvironment Variablesに、12文字以上の推測されにくい管理画面パスワードを設定してください。",
  },
  {
    key: "RESEND_API_KEY",
    fix: "Resendで発行したAPIキーをVercelのEnvironment Variablesに設定してください。",
  },
  {
    key: "CONTACT_TO_EMAIL",
    fix: "問い合わせを受け取るメールアドレスをVercelのEnvironment Variablesに設定してください。",
  },
  {
    key: "NEXT_PUBLIC_SITE_URL",
    fix: "本番サイトURLを https://example.com の形式で、末尾スラッシュなしで設定してください。",
  },
];

const errors = [];
const warnings = [];

for (const item of requiredEnv) {
  if (!process.env[item.key]) {
    errors.push({ key: item.key, message: "未設定です。", fix: item.fix });
  }
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
if (siteUrl) {
  if (!siteUrl.startsWith("https://")) {
    errors.push({
      key: "NEXT_PUBLIC_SITE_URL",
      message: "https:// で始まっていません。",
      fix: "例: https://degi-juu.example.jp の形式で設定してください。",
    });
  }

  if (siteUrl.endsWith("/")) {
    errors.push({
      key: "NEXT_PUBLIC_SITE_URL",
      message: "末尾にスラッシュがあります。",
      fix: "末尾の / を削除してください。例: https://degi-juu.example.jp",
    });
  }

  if (siteUrl.includes("localhost")) {
    errors.push({
      key: "NEXT_PUBLIC_SITE_URL",
      message: "localhost が含まれています。",
      fix: "本番ドメインのURLを設定してください。",
    });
  }
}

const fromEmail = process.env.CONTACT_FROM_EMAIL;
if (!fromEmail || fromEmail.includes("onboarding@resend.dev")) {
  warnings.push({
    key: "CONTACT_FROM_EMAIL",
    message: "送信元が未設定、またはResendの検証用アドレスです。",
    fix: "Resendで独自ドメインを認証し、例: デジじゅう <info@example.jp> を設定してください。",
  });
}

const adminPassword = process.env.ADMIN_PASSWORD;
if (adminPassword && adminPassword.length < 12) {
  warnings.push({
    key: "ADMIN_PASSWORD",
    message: "12文字未満です。",
    fix: "12文字以上の推測されにくい値へ変更してください。",
  });
}

if (errors.length > 0) {
  console.error("❌ 公開前チェック: 必須設定に問題があります");
  for (const error of errors) {
    console.error(`- ${error.key}: ${error.message} ${error.fix}`);
  }

  if (warnings.length > 0) {
    console.warn("\n⚠ 警告");
    for (const warning of warnings) {
      console.warn(`- ${warning.key}: ${warning.message} ${warning.fix}`);
    }
  }

  process.exit(1);
}

if (warnings.length > 0) {
  console.warn("⚠ 公開前チェック: 警告があります");
  for (const warning of warnings) {
    console.warn(`- ${warning.key}: ${warning.message} ${warning.fix}`);
  }
}

console.log("✅ 公開前チェック: 問題なし");
