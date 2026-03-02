/**
 * Mock data for Queries feature - matches screenshots. Replace with API later.
 */

export const FILTER_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'gst', label: 'GST' },
  { id: 'income_tax', label: 'Income Tax' },
  { id: 'pmla', label: 'PMLA' },
  { id: 'hallmark_bis', label: 'Hallmark/BIS' },
] as const;

export type FilterCategoryId = (typeof FILTER_CATEGORIES)[number]['id'];

export interface QuestionItem {
  id: string;
  title: string;
  categoryId: FilterCategoryId;
}

export interface QuestionAnswerPair {
  question: string;
  answer: string;
}

/** Topic cards on first screen (match SS list). */
export const QUESTIONS_LIST: QuestionItem[] = [
  { id: 'gst_retail', title: 'GST on Retail Sales of jewellery', categoryId: 'gst' },
  { id: 'gst_manufacturing', title: 'GST on Manufacturing and Job Work of jewellery', categoryId: 'gst' },
  { id: 'old_gold', title: 'Old Gold Purchase and Second-Hand jewellery', categoryId: 'gst' },
  { id: 'salesman_tours', title: 'Salesman Tours and Travel Expenses', categoryId: 'income_tax' },
  { id: 'business_deductions', title: 'Business Deductions and Expenses', categoryId: 'income_tax' },
  { id: 'pmla_compliance', title: 'PMLA compliance for jewellery dealers', categoryId: 'pmla' },
  { id: 'hallmark_bis_topic', title: 'Hallmarking and BIS certification requirements', categoryId: 'hallmark_bis' },
];

/** FAQ accordion per topic (detail screen). Key = topic id from QUESTIONS_LIST. */
export const QUESTION_DETAILS: Record<string, QuestionAnswerPair[]> = {
  gst_retail: [
    {
      question: 'What is the GST rate applicable on gold jewellery?',
      answer:
        'Gold jewellery attracts 3% GST under the scheme. The rate applies to the value of jewellery supplied. HSN code 7113 applies for gold and articles thereof.',
    },
    {
      question: 'What is the GST rate on diamond jewellery?',
      answer:
        'Diamond jewellery is taxed at 3% GST on the total value of the finished jewellery, similar to gold jewellery. This includes both the value of the diamonds and any making charges if shown as single transaction. (i.e Gold Jewellery studded with Diamond)\n\n' +
        '• However, if cut and polished diamonds (Loose diamond) are supplied separately for job work, a different rate of 1.5% applies.\n\n' +
        '• In Case of Rough/sawn diamonds (Loose diamond), GST rate is 0.25%\n\n' +
        '• 5% GST on the making/labour charges (For B2B) (if shown separately). 18% GST on the making/labour charges (For B2C) (if shown separately)',
    },
    {
      question: 'What is the GST rate on silver and platinum jewellery?',
      answer:
        'Silver and platinum jewellery are generally taxed at 3% GST, similar to gold. Precious metals and articles thereof fall under the same slab. Check HSN 7113 for exact classification.',
    },
    {
      question: 'How should GST be calculated when selling mixed jewellery?',
      answer:
        'When selling mixed jewellery (e.g. gold with diamonds), if the transaction is a single supply, 3% GST applies on the total value. If making charges are shown separately, they may attract 5% (B2B) or 18% (B2C) as applicable. Maintain proper invoicing and HSN codes.',
    },
  ],
  gst_manufacturing: [
    {
      question: 'What is the GST rate on job work for jewellery?',
      answer:
        'Job work on jewellery may attract 5% or 18% on job charges depending on the nature of work. Input tax credit is available to the principal. Documentation as per job work provisions is required.',
    },
    {
      question: 'How is manufacturing of jewellery taxed under GST?',
      answer:
        'Manufacturing of jewellery is typically covered under job work or supply of goods. Gold/silver/platinum jewellery supplied after manufacturing attracts 3% GST. Making charges if billed separately may be at a different rate.',
    },
  ],
  old_gold: [
    {
      question: 'How is old gold purchase taxed?',
      answer:
        'Purchase of old gold from customers for resale or melting may be under margin scheme or reverse charge as per notification. Second-hand jewellery sold after repair/refurbishment attracts 3% on the taxable value.',
    },
  ],
  salesman_tours: [
    {
      question: 'Are salesman tours and travel expenses deductible?',
      answer:
        'Travel expenses for business purposes are deductible under Income Tax. Keep bills and a clear business purpose. Per diem or actual expense method as per your accounting policy.',
    },
  ],
  business_deductions: [
    {
      question: 'What business deductions and expenses are allowed?',
      answer:
        'All ordinary and necessary business expenses are deductible. This includes advertising, insurance, legal fees, and office expenses. Exclusions apply for personal use and capital items.',
    },
  ],
  pmla_compliance: [
    {
      question: 'What are PMLA compliance requirements for jewellery dealers?',
      answer:
        'Jewellery dealers may qualify as designated persons under PMLA. KYC of customers, record-keeping of transactions, and reporting of suspicious transactions to FIU-IND are required as per guidelines.',
    },
  ],
  hallmark_bis_topic: [
    {
      question: 'What are Hallmarking and BIS certification requirements?',
      answer:
        'Gold jewellery must be hallmarked as per BIS standards when sold. Silver jewellery hallmarking is also mandated in phases. Only BIS-recognized Assaying & Hallmarking Centres can hallmark.',
    },
  ],
};
