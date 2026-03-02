/**
 * Mock data for Updates screen. Replace with API later.
 */

export type UpdateIconType = 'calendar' | 'document' | 'notice' | 'alert';

export interface UpdateItem {
  id: string;
  title: string;
  description: string;
  descriptionFull?: string;
  learnMoreUrl?: string;
  iconType: UpdateIconType;
  date?: string;
}

export const UPDATES_MOCK: UpdateItem[] = [
  {
    id: '1',
    title: 'Membership Renewal',
    description:
      'Your Association Membership for FY 2025-26 will expire on 31 March 2026. Renew before the due date to continue availing member benefits and compliance support.',
    descriptionFull:
      'Your Association Membership for FY 2025-26 will expire on 31 March 2026. Renew before the due date to continue availing member benefits, access to Queries, Updates, and compliance support. Contact your branch for renewal assistance.',
    iconType: 'calendar',
    learnMoreUrl: 'https://jewellerpro.in/membership/',
    date: '31 Mar 2026',
  },
  {
    id: '2',
    title: 'GST Update',
    description:
      'As per latest notification, GST compliance guidelines have been updated for jewellery billing. Members are advised to review billing procedures immediately.',
    descriptionFull:
      'As per latest notification, GST compliance guidelines have been updated for jewellery billing. Members are advised to review billing procedures immediately. Key changes include HSN codes and invoice format. Refer to the circular for detailed guidelines.',
    iconType: 'document',
    learnMoreUrl: 'https://jewellerpro.in/updates/gst',
  },
  {
    id: '3',
    title: 'Important Notice - Year Ending',
    description:
      'The financial year ends on 31 March. Ensure stock verification, GST returns, and books of account are up to date. Submit required documents to your branch before the deadline.',
    descriptionFull:
      'The financial year ends on 31 March. Ensure stock verification, GST returns, and books of account are up to date. Submit required documents to your branch before the deadline. Late submissions may attract penalties.',
    iconType: 'notice',
  },
  {
    id: '4',
    title: 'PMLA Compliance Alert',
    description:
      'Cash transactions above prescribed limits require proper documentation and reporting. Ensure KYC and transaction records are maintained as per PMLA guidelines.',
    descriptionFull:
      'Cash transactions above prescribed limits require proper documentation and reporting. Ensure KYC and transaction records are maintained as per PMLA guidelines. Designated persons must report suspicious transactions to FIU-IND.',
    iconType: 'alert',
    learnMoreUrl: 'https://jewellerpro.in/updates/pmla',
  },
];
