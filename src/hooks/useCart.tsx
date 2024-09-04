import { useEffect, useMemo, useState } from "react";
import {db as guitars, Product} from "../data/index"

export const useCart = () => {

  const cartStorage = () => {
    const storage = localStorage.getItem("carrito");
    return storage ? JSON.parse(storage) : [];
  };

  const [guitarras] = useState(guitars);
  const [cart, setCart] = useState(cartStorage());

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(cart));
  }, [cart]);

  const agregarCarrito = (item:Product) => {
    //comprobar si el elemento ya se encuentra en el carrito
    const siExiste = cart.some((guitarra: { id: number; }) => guitarra.id === item.id);
    if (siExiste) {
      //aumentar la cantidad
      alert("El elemento ya se encuentra en el carrito");
    } else {
      const elemento = { ...item, cantidad: 1 };
      setCart( [...cart, elemento]);
    }
  };

  const aumentarElemento = (id : Product["id"]) => {
    const index = cart.findIndex((elemento: { id: number; })=> elemento.id === id);
    if (cart[index].cantidad <= 4) {
      cart[index].cantidad++;
      setCart([...cart]);
    }
  };

  const disminuirElemento = (id : Product["id"]) => {
    const index = cart.findIndex((elemento: { id: number; }) => elemento.id === id);
    if (cart[index].cantidad > 1) {
      cart[index].cantidad--;
      setCart([...cart]);
    }
  };

  const removeItemCart = (id : Product["id"]) => {
    const newCart = cart.filter((item: { id: number; }) => item.id !== id);
    setCart(newCart);
  };

  const isNotEmpty = useMemo(() => cart.length > 0, [cart]);

  const totalPagar = useMemo(
    () =>
      cart.reduce(
        (total: number, guitarra: { price: number; cantidad: number; }) => total + guitarra.price * guitarra.cantidad,
        0
      ),
    [cart]
  );

  const cleanCart = () => {
    setCart([]);
  };
  return {
    cart,
    guitarras,
    isNotEmpty,
    totalPagar,
    agregarCarrito,
    cleanCart,
    removeItemCart,
    disminuirElemento,
    aumentarElemento,
  };
}