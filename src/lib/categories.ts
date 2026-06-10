/**
 * Canonical category taxonomy for Keepr.
 *
 * Revised per Chapter 4 findings: 'Food Spots' + 'Locations' merged into
 * 'Places'; 'Outdoor' -> 'Fitness & Workouts'; 'Home' -> 'Home & Living';
 * 'Recipes' added. Users may also define their own custom categories, which
 * persist and become selectable — so SavedContent.category is a free string,
 * with these as the built-in defaults.
 */
export const CATEGORIES = [
  'Places',
  'Recipes',
  'Fitness & Workouts',
  'Fashion',
  'Useful Apps',
  'Tutorials',
  'Music',
  'Home & Living',
] as const;

export type KnownCategory = (typeof CATEGORIES)[number];

/** Tailwind chip colors per known category (fallback for custom = neutral). */
export const CATEGORY_COLORS: Record<string, string> = {
  'Places': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'Recipes': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  'Fitness & Workouts': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
  'Fashion': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  'Useful Apps': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  'Tutorials': 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200',
  'Music': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  'Home & Living': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
};

export const getCategoryColor = (category: string): string =>
  CATEGORY_COLORS[category] ?? 'bg-muted text-muted-foreground';