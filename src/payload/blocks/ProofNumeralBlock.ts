import type { Block } from 'payload'

export const ProofNumeralBlock: Block = {
  slug: 'proofNumeral',
  labels: { singular: 'Proof Numeral', plural: 'Proof Numerals' },
  fields: [
    { name: 'numeral', type: 'text', required: true, admin: { description: 'Big number like "180+" or "-70%" or "PKR 480k"' } },
    { name: 'subLine', type: 'textarea', required: true, admin: { description: 'Italic Fraunces sub-line that explains the number.' } },
  ],
}
