import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  // 1. Single Source of Truth: Initialize immediately from storage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = sessionStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      return [];
    }
  });

  // 2. Sync sessionStorage whenever cartItems changes
  // This handles the "last item removed" (empty array) correctly
  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // 3. Add item logic
  function addToCart(pID, name) {
    setCartItems((prevCart) => {
      const existing = prevCart.find((item) => item.pID === pID);
      if (existing) {
        return prevCart.map((item) =>
          item.pID === pID ? { ...item, qty: (item.qty || 1) + 1 } : item
        );
      }
      return [...prevCart, { pID, name, qty: 1 }];
    });
  }

  // 4. Remove item logic (This fixes your "last item" bug)
  function removeFromCart(pID) {
    setCartItems((prevItems) => prevItems.filter(item => item.pID !== pID));
  }

  // 5. Update method (Triggered by Navbar or refresh)
  const updateCart = () => {
    const stored = sessionStorage.getItem("cart");
    if (stored) {
      setCartItems(JSON.parse(stored));
    } else {
      setCartItems([]); // If storage is empty, state MUST be empty
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
}