import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      header: {
        theme: "Theme",
        light: "Light",
        dark: "Dark",
        system: "System",
        cart: "Open cart",
      },
      login: {
        titleLogin: "Log in",
        titleRegister: "Register",
        email: "Email",
        password: "Password",
        submit: "Submit",
        register: "Register",
        toggleToLogin: "Already have an account? Log in",
        toggleToRegister: "Don't have an account? Register",
        loggedIn: "You are logged in",
        logout: "Logout",
      },
      menu: {
        title: "Browse our menu",
        descriptionPrefix: "Use our menu to place an order online, or",
        phone: "phone",
        descriptionSuffix: "our club to place a pickup order. Fast and fresh food.",
        seeMore: "See more",
        addToCart: "Add to cart",
        authRequired: "You must be logged in to add items to the cart.",
        categories: {
          dessert: "Dessert",
          dinner: "Dinner",
          breakfast: "Breakfast",
        },
        loading: "Loading...",
        error: "Error loading menu:",
      },
      cart: {
        back: "Back",
        title: "Finish your order",
        empty: "Your cart is empty.",
        total: "Total Amount",
        street: "Zone",
        house: "Table",
        clear: "Clear Cart",
        order: "Order",
      },
      common: {
        usd: "USD",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
