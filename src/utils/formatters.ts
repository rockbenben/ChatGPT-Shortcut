export const getWeight = (item: { count?: number; weight?: number }) => {
  const value = item.count ?? item.weight ?? 0;
  return value;
};

/**
 * 卡片角标复制数（"95K"）——locale 固定 en-US 是取舍不是遗漏，别"顺手修好"：
 * 它在定宽 mono 槽位里，跟界面语言走会炸版式（de 780000 → "780.000" 长度翻倍，
 * ar/ru 会把字母混进数字槽）。正文的字符/token 计数不受此限，按页面 locale 走。
 */
const compactFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  compactDisplay: "short",
});

export const formatCompactNumber = (count: number) => {
  return compactFormatter.format(count);
};

/**
 * 相对时间（"23 天前"）。用原生 Intl 而非 dayjs：语言全在浏览器里，不必异步加载语言包、
 * 不必改全局 locale，复数形态也更准（阿语双数、俄语按数取词形）。月按 30 天、年按 365 天。
 */
const RELATIVE_UNITS: Array<[Intl.RelativeTimeFormatUnit, number]> = [
  ["year", 31536000],
  ["month", 2592000],
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
];

// Intl 实例构造不便宜，按 locale 缓存
const relativeFormatters = new Map<string, Intl.RelativeTimeFormat>();

export const formatRelativeTime = (isoDate: string, locale: string): string => {
  const timestamp = Date.parse(isoDate);
  if (Number.isNaN(timestamp)) return "";

  const diffSeconds = (timestamp - Date.now()) / 1000;
  const magnitude = Math.abs(diffSeconds);
  const [unit, unitSeconds] = RELATIVE_UNITS.find(([, seconds]) => magnitude >= seconds) ?? RELATIVE_UNITS[RELATIVE_UNITS.length - 1];

  let formatter = relativeFormatters.get(locale);
  if (!formatter) {
    try {
      formatter = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
    } catch {
      formatter = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
    }
    relativeFormatters.set(locale, formatter);
  }

  return formatter.format(Math.round(diffSeconds / unitSeconds), unit);
};
