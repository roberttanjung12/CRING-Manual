const varVaTypes = [
  { value: 'va-closed-payment', text: 'VA Closed Payment', for: { banks: ['', 'BANK BNI', 'BANK DKI', 'BANK BTN'] } },
  { value: 'va-open-payment', text: 'VA Open Payment', for: { banks: ['', 'BANK BNI', 'BANK DKI'] } },
  { value: 'va-partial-payment', text: 'VA Partial Payment', for: { banks: ['', 'BANK BNI', 'BANK DKI', 'BANK BTN'] } },
  { value: 'va-minimum-payment', text: 'VA Minimum Payment', for: { banks: ['', 'BANK BNI', 'BANK DKI'] } },
  { value: 'va-open-minimum', text: 'VA Open Minimum', for: { banks: ['', 'BANK BNI', 'BANK DKI'] } },
  { value: 'va-open-maximum', text: 'VA Open Maximum', for: { banks: ['', 'BANK BNI', 'BANK DKI'] } }
];

export default varVaTypes;
