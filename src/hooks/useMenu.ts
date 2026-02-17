import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { RootState } from "../store/store";
import { useAuth } from "../components/AuthProvider";
import {
  MENU_CATEGORIES,
  MENU_DEFAULT_CATEGORY,
  MENU_VISIBLE_INITIAL,
  MENU_VISIBLE_STEP,
  QUANTITY_MIN,
  type MenuCategoryValue,
} from "../constants/app";

interface MenuItem {
  id: string;
  name: string;
  desc: string;
  price: number;
  img: string;
  category: string;
}

export const useMenu = () => {
  const [visible, setVisible] = useState<number>(MENU_VISIBLE_INITIAL);
  const [activeCategory, setActiveCategory] =
    useState<MenuCategoryValue>(MENU_DEFAULT_CATEGORY);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState<number>(QUANTITY_MIN);
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state: RootState) => state.menu);
  const { isAuthenticated } = useAuth();

  const filteredItems = useMemo(
    () => items.filter((item) => item.category === activeCategory),
    [items, activeCategory]
  );

  const handleSeeMore = () => {
    setVisible((prevVisible) => prevVisible + MENU_VISIBLE_STEP);
  };

  const handleCategoryClick = (category: MenuCategoryValue) => {
    setActiveCategory(category);
    setVisible(MENU_VISIBLE_INITIAL);
  };

  const updateCart = (item: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    img: string;
  }): boolean => {
    if (!isAuthenticated()) {
      return false;
    }
    dispatch(addToCart(item));
    return true;
  };

  const openItem = (item: MenuItem) => {
    setSelectedItem(item);
    setQuantity(QUANTITY_MIN);
  };

  const closeItem = () => setSelectedItem(null);

  const addSelectedToCart = (): boolean => {
    if (!selectedItem) return;
    if (quantity < QUANTITY_MIN) return;
    return updateCart({ ...selectedItem, quantity });
  };

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () =>
    setQuantity((q) => Math.max(QUANTITY_MIN, q - 1));

  return {
    items,
    loading,
    error,
    visible,
    activeCategory,
    selectedItem,
    quantity,
    filteredItems,
    handleSeeMore,
    handleCategoryClick,
    openItem,
    closeItem,
    addSelectedToCart,
    setQuantity,
    increaseQty,
    decreaseQty,
    quantityMin: QUANTITY_MIN,
    categories: MENU_CATEGORIES,
  };
};
