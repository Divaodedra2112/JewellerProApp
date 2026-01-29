import { Task } from './CaseCardTypes';

/**
 * Formats a list of strings as "a, b, c (+N)" when it exceeds `max`.
 */
export const formatList = (items: Array<string | null | undefined>, max: number = 3): string => {
  const cleaned = items.map(s => s?.trim()).filter(Boolean) as string[];
  if (cleaned.length <= max) {
    return cleaned.join(', ');
  }
  return `${cleaned.slice(0, max).join(', ')} (+${cleaned.length - max})`;
};

/**
 * Formats an ISO date string into "DD Mon, YYYY" (e.g. "13 Oct, 2025").
 */
export const formatCreatedAt = (dateString?: string): string => {
  if (!dateString) {
    return '';
  }
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) {
    return '';
  }
  // "13 Oct, 2025"
  const parts = d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  return parts.replace(/(\b[A-Za-z]{3})\s/, '$1, ');
};

/**
 * Formats a YYYY-MM-DD date string into "DD Mon, YYYY" (e.g. "13 Oct, 2025").
 * Used for CalendarComponent's `formatDisplayDate`.
 */
export const formatYmdToPretty = (yyyyMmDd: string): string => {
  if (!yyyyMmDd) {
    return '';
  }
  const d = new Date(yyyyMmDd);
  if (Number.isNaN(d.getTime())) {
    return '';
  }
  const parts = d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  return parts.replace(/(\b[A-Za-z]{3})\s/, '$1, ');
};

/**
 * Extracts and normalizes CaseCard detail fields from the task payload.
 */
export const getCaseCardDetails = (data: Task) => {
  const raw = data?.data as any;

  const productNames: string[] = Array.isArray(raw?.products)
    ? raw.products.map((p: any) => p?.productName).filter(Boolean)
    : raw?.product?.productName
    ? [raw.product.productName]
    : [];

  const categoryNames: string[] = Array.isArray(raw?.categories)
    ? raw.categories.map((c: any) => c?.name).filter(Boolean)
    : raw?.category?.name
    ? [raw.category.name]
    : raw?.product?.category?.name
    ? [raw.product.category.name]
    : [];

  const gradeNames: string[] = Array.isArray(raw?.grades)
    ? raw.grades.map((g: any) => g?.name).filter(Boolean)
    : raw?.grade?.name
    ? [raw.grade.name]
    : [];

  const linkedCount = Array.isArray(data?.linkTo) ? data.linkTo.length : 0;

  return { productNames, categoryNames, gradeNames, linkedCount };
};
