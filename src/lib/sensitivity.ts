/**
 * Client-side sensitivity classifier for Save Content.
 *
 * Inspects the user-entered Title, Link and Note fields and returns a tier
 * plus a human-readable category. Runs entirely on-device — nothing is
 * logged, persisted on the saved record, or transmitted.
 *
 * Tiers:
 *  - "standard"  → no extra UI; save proceeds as usual.
 *  - "caution"   → show an inline informational pill; save still proceeds.
 *  - "sensitive" → intercept submit with a confirmation modal (never blocks).
 *
 * The taxonomy below is intentionally conservative and editable here, in
 * one place, without touching the modal. Categories use plain language
 * ("banking details", "medical records") — never internal codes.
 */

export type SensitivityTier = 'standard' | 'caution' | 'sensitive';

export interface SensitivityResult {
  tier: SensitivityTier;
  /** User-recognizable category, e.g. "health", "banking details". */
  category: string;
}

export interface SensitivityInput {
  title?: string;
  link?: string;
  note?: string;
}

interface Rule {
  category: string;
  /** Plain keyword fragments (case-insensitive, substring match). */
  keywords?: string[];
  /** Regex patterns evaluated against the combined text. */
  patterns?: RegExp[];
}

/* ---------- SENSITIVE: strongest signals; always intercepts. ---------- */
const SENSITIVE_RULES: Rule[] = [
  {
    category: 'banking details',
    keywords: [
      'iban', 'swift', 'bic', 'routing number', 'account number',
      'sort code', 'credit card', 'debit card', 'card number',
      'cvv', 'cvc', 'card pin',
    ],
    // 13–19 digit sequences (card-like), with optional spaces or dashes.
    patterns: [/\b(?:\d[ -]*?){13,19}\b/],
  },
  {
    category: 'login credentials',
    keywords: [
      'password:', 'passwd', 'pwd:', 'api key', 'secret key',
      'access token', 'private key', 'seed phrase', 'recovery phrase',
      'mnemonic', '2fa code', 'one-time code', 'otp:',
    ],
    patterns: [/-----BEGIN [A-Z ]+PRIVATE KEY-----/],
  },
  {
    category: 'medical records',
    keywords: [
      'diagnosis', 'prescription', 'medical record', 'lab result',
      'blood test', 'mri scan', 'biopsy', 'patient id',
      'medical history', 'hiv status',
    ],
  },
  {
    category: 'government ID',
    keywords: [
      'passport number', 'social security', 'ssn', 'national id',
      'driver license', "driver's license", 'tax id', 'tin number',
      'id card number',
    ],
    // US SSN pattern: 3-2-4 digits.
    patterns: [/\b\d{3}-\d{2}-\d{4}\b/],
  },
];

/* ---------- CAUTION: softer signals; informational pill only. ---------- */
const CAUTION_RULES: Rule[] = [
  {
    category: 'health',
    keywords: [
      'therapy', 'therapist', 'mental health', 'anxiety', 'depression',
      'medication', 'medicine', 'doctor', 'clinic', 'hospital',
      'pregnancy', 'fertility', 'period tracker', 'symptom', 'illness',
      'workout plan', 'diet plan',
    ],
  },
  {
    category: 'financial',
    keywords: [
      'salary', 'income', 'budget', 'invoice', 'tax return',
      'loan', 'mortgage', 'rent receipt', 'paycheck', 'payslip',
      'bank statement', 'crypto wallet', 'wallet address',
    ],
  },
  {
    category: 'precise location',
    keywords: [
      'home address', 'my address', 'apartment number', 'apt #',
      'zip code', 'postcode', 'coordinates', 'gps coords',
    ],
    // Lat,Lng pair (rough heuristic).
    patterns: [/-?\d{1,2}\.\d{3,},\s*-?\d{1,3}\.\d{3,}/],
  },
  {
    category: 'personal',
    keywords: [
      'diary', 'journal entry', 'private note', 'confidential',
      'relationship', 'breakup', 'family secret', 'date of birth',
      'birthday gift idea',
    ],
  },
];

function matches(rule: Rule, text: string): boolean {
  if (rule.keywords?.some(k => text.includes(k.toLowerCase()))) return true;
  if (rule.patterns?.some(p => p.test(text))) return true;
  return false;
}

export function classifySensitivity(input: SensitivityInput): SensitivityResult {
  const text = [input.title, input.link, input.note]
    .filter(Boolean)
    .join(' \n ')
    .toLowerCase();

  if (!text.trim()) return { tier: 'standard', category: '' };

  for (const rule of SENSITIVE_RULES) {
    if (matches(rule, text)) return { tier: 'sensitive', category: rule.category };
  }
  for (const rule of CAUTION_RULES) {
    if (matches(rule, text)) return { tier: 'caution', category: rule.category };
  }
  return { tier: 'standard', category: '' };
}
