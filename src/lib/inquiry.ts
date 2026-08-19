export type InquiryKind = "contact" | "listing" | "advertising";

export type InquiryPayload = {
  kind: InquiryKind;
  name: string;
  email: string;
  organization?: string;
  role?: string;
  municipality?: string;
  prefecture?: string;
  programName?: string;
  targetUrl?: string;
  budget?: string;
  preferredStart?: string;
  message: string;
  agreed: boolean;
  website?: string;
};

export const inquiryKindLabels: Record<InquiryKind, string> = {
  contact: "お問い合わせ・修正依頼",
  listing: "自治体からの掲載依頼",
  advertising: "広告・PR掲載相談",
};

export function validateInquiryPayload(payload: Partial<InquiryPayload>) {
  const errors: string[] = [];

  if (payload.website) {
    errors.push("不正な送信の可能性があります。");
  }

  if (!payload.kind || !inquiryKindLabels[payload.kind]) {
    errors.push("お問い合わせ種別を選択してください。");
  }

  if (!payload.name || payload.name.trim().length < 2) {
    errors.push("お名前を入力してください。");
  }

  if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    errors.push("メールアドレスを正しく入力してください。");
  }

  if (!payload.message || payload.message.trim().length < 10) {
    errors.push("内容は10文字以上で入力してください。");
  }

  if (!payload.agreed) {
    errors.push("プライバシーポリシーへの同意が必要です。");
  }

  if (payload.kind === "listing") {
    if (!payload.organization) errors.push("自治体名または団体名を入力してください。");
    if (!payload.programName) errors.push("制度名を入力してください。");
    if (!payload.targetUrl) errors.push("公式ページURLを入力してください。");
  }

  if (payload.kind === "advertising") {
    if (!payload.organization) errors.push("会社名・団体名を入力してください。");
  }

  return errors;
}

export function formatInquiryEmail(payload: InquiryPayload) {
  const lines = [
    `種別: ${inquiryKindLabels[payload.kind]}`,
    `お名前: ${payload.name}`,
    `メール: ${payload.email}`,
    `団体名: ${payload.organization || "未入力"}`,
    `役職・担当: ${payload.role || "未入力"}`,
    `都道府県: ${payload.prefecture || "未入力"}`,
    `自治体名: ${payload.municipality || "未入力"}`,
    `制度名: ${payload.programName || "未入力"}`,
    `対象URL: ${payload.targetUrl || "未入力"}`,
    `広告予算: ${payload.budget || "未入力"}`,
    `掲載希望時期: ${payload.preferredStart || "未入力"}`,
    "",
    "内容:",
    payload.message,
  ];

  return lines.join("\n");
}
