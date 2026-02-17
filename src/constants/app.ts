export const PHONE_NUMBER = "+3706535678";

export const MENU_CATEGORIES = [
  { id: "dessert", value: "Dessert", i18nKey: "menu.categories.dessert" },
  { id: "dinner", value: "Dinner", i18nKey: "menu.categories.dinner" },
  { id: "breakfast", value: "Breakfast", i18nKey: "menu.categories.breakfast" },
] as const;

export type MenuCategoryValue = (typeof MENU_CATEGORIES)[number]["value"];

export const MENU_VISIBLE_INITIAL = 6;
export const MENU_VISIBLE_STEP = 6;
export const MENU_DEFAULT_CATEGORY: MenuCategoryValue = "Dinner";

export const QUANTITY_MIN = 1;
