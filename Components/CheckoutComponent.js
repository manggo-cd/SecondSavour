"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "../Components/CartContext";
function CheckoutComponent({
  img,
  altText,
  name,
  price,
  // iD,
  quantity,
  // nameF,
  // quantityF,
  setArrF,
  arrF,
  // totalPrice,
}) {
  const { removeItem } = useCart();

  //Keyboard listener
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // Perform your desired action here, e.g., call a function
      submitValue(inputValue);
    }
  };

  const updateCartQuantity = (name, newQuantity) => {
    if (arrF) {
      const newItem = arrF.map((item) =>
        name === item.name ? { ...item, quantity: newQuantity } : item
      );
      setArrF(newItem);
    }
  };

  const manageCart = (nameF, quantityF, state, setArrF, arrF) => {
    let newCart;
    if (state) {
      arrF.map((item) =>
        item.name === nameF
          ? (newCart = [
              {
                ...item,
                quantity: item.quantity + quantityF,
                totalPrice: item.price * (item.quantity + quantityF),
              },
            ])
          : item
      );
    }
    if (!state) {
      arrF.map((item) =>
        item.name === name && item.quantity > 1
          ? (newCart = [
              {
                ...item,
                quantity: item.quantity - quantityF,
                totalPrice: item.price * (item.quantity - quantityF),
              },
            ])
          : (newCart = [{ ...item, quantity: 1 }])
      );
    }

    setArrF(newCart);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <Image
          src={img}
          alt={altText}
          height={500}
          width={500}
          className="max-w-[30%] h-fit "
        />
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-[0.5rem]">
            <h3>
              {name} x {quantity}
            </h3>
            <p>${price}</p>
          </div>
          <div className="flex flex-col gap-[0.75rem]">
            <button
              className="min-h-[7vh] flex flex-col justify-end bg-transparent m-0 p-0 text-left  hover:text-red-600 hover:bg-transparent"
              onClick={() => removeItem(name)}
            >
              {" "}
              <p className="text-red-600 text-left m-0 p-0 ">Remove item </p>
            </button>
            <div className="flex flex-row border-2 border-gray-500 rounded-[0.5rem] justify-between overflow-hidden">
              <button
                className="w-fit h-fit bg-transparent hover:bg-my-green px-[1rem] py-[0.75rem] border-r-2 border-gray-500 rounded-none"
                onClick={() => manageCart(name, 1, true, setArrF, arrF)}
              >
                <p className="2xl">+</p>
              </button>
              <p className="w-fit h-full flex flex-col justify-center">
                <input
                  className="min-w-[5vw] max-w-[5rem]"
                  placeholder={quantity}
                  value={quantity}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const numericValue = parseFloat(inputValue) || ""; // Convert to number or empty string
                    updateCartQuantity(name, numericValue);
                    onKeyDown = { handleKeyDown };
                  }}
                />
              </p>
              <button
                className="w-fit h-fit bg-transparent hover:bg-my-green px-[1rem] py-[0.75rem] border-l-2 border-gray-500 rounded-none"
                onClick={() => manageCart(name, 1, false, setArrF, arrF)}
              >
                <p className="2xl">-</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutComponent;
