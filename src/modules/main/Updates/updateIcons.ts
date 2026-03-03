import type { UpdateTypeApi } from './UpdatesTypes';

/** Notice icon (Notice.svg) – for NOTICE updates */
const NOTICE_SVG = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_notice)">
<circle cx="7.99992" cy="8.00004" r="6.66667" stroke="#F6F8FE"/>
<path d="M8 4.66663V8.66663" stroke="#F6F8FE" stroke-linecap="round"/>
<circle cx="7.99992" cy="10.6667" r="0.666667" fill="#F6F8FE"/>
</g>
<defs>
<clipPath id="clip0_notice">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>`;

/** Regulatory icon (Regulatory.svg) – for REGULATORY & CIRCULAR updates */
const REGULATORY_SVG = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_regulatory)">
<path d="M14.6666 7.00004V8.00004C14.6666 11.1427 14.6666 12.7141 13.6903 13.6904C12.714 14.6667 11.1426 14.6667 7.99992 14.6667C4.85722 14.6667 3.28587 14.6667 2.30956 13.6904C1.33325 12.7141 1.33325 11.1427 1.33325 8.00004C1.33325 4.85734 1.33325 3.286 2.30956 2.30968C3.28587 1.33337 4.85722 1.33337 7.99992 1.33337H8.99992" stroke="#F6F8FE" stroke-linecap="round"/>
<circle cx="12.6667" cy="3.33337" r="2" stroke="#F6F8FE"/>
<path d="M4.66675 9.33337H10.6667" stroke="#F6F8FE" stroke-linecap="round"/>
<path d="M4.66675 11.6666H8.66675" stroke="#F6F8FE" stroke-linecap="round"/>
</g>
<defs>
<clipPath id="clip0_regulatory">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>`;

/** Reminder icon (Reminder.svg) – for REMINDER updates */
const REMINDER_SVG = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.33325 7.99996C1.33325 5.4858 1.33325 4.22872 2.1143 3.44767C2.89535 2.66663 4.15243 2.66663 6.66658 2.66663H9.33325C11.8474 2.66663 13.1045 2.66663 13.8855 3.44767C14.6666 4.22872 14.6666 5.4858 14.6666 7.99996V9.33329C14.6666 11.8475 14.6666 13.1045 13.8855 13.8856C13.1045 14.6666 11.8474 14.6666 9.33325 14.6666H6.66658C4.15243 14.6666 2.89535 14.6666 2.1143 13.8856C1.33325 13.1045 1.33325 11.8475 1.33325 9.33329V7.99996Z" stroke="#F6F8FE"/>
<path d="M4.66675 2.66663V1.66663" stroke="#F6F8FE" stroke-linecap="round"/>
<path d="M11.3333 2.66663V1.66663" stroke="#F6F8FE" stroke-linecap="round"/>
<circle cx="11" cy="11" r="1" stroke="#F6F8FE"/>
<path d="M1.66675 6H14.3334" stroke="#F6F8FE" stroke-linecap="round"/>
</svg>`;

/**
 * Returns SVG XML string for the update type icon.
 * NOTICE → Notice icon; REGULATORY & CIRCULAR → Regulatory icon; REMINDER → Reminder icon.
 */
export function getUpdateIconXml(updateType: UpdateTypeApi): string {
  const type = (updateType || '').toUpperCase();
  if (type === 'NOTICE') return NOTICE_SVG;
  if (type === 'REGULATORY' || type === 'CIRCULAR') return REGULATORY_SVG;
  if (type === 'REMINDER') return REMINDER_SVG;
  return REGULATORY_SVG; // fallback
}
