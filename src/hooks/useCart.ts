import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { clearCart, updateCartItemQuantity, removeFromCart } from "../store/cartSlice";
import { ROUTES } from "../constants/routes";
import { QUANTITY_MIN } from "../constants/app";

export const useCart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    dispatch(updateCartItemQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const goBack = () => navigate(ROUTES.MENU);

  return {
    cartItems,
    totalQuantity,
    totalAmount,
    handleClearCart,
    handleQuantityChange,
    handleRemoveItem,
    goBack,
    quantityMin: QUANTITY_MIN,
  };
};
