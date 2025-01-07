"use client";

import React from "react";
import ItemCheckout from "../../Components/ItemCheckout";
import { useCart } from "../../Components/CartContext";

function Page() {
  const { cart, totalPrice, tax, shipping, estTotal, updateCart, setCart } =
    useCart();

  return (
    <div className="w-[100%] bg-[#FEF7E6] flex justify-center">
      <div className="flex flex-col gap-[3vh] lg:gap-[10vh] min-h-fit text-center w-[90%]">
        <section className="lg:text-left text-center w-full h-fit">
          <h2> Order </h2>
          <p> Review Your Order (__ Items) </p>
          <h2> Your items </h2>

          <button
            className="w-fit h-fit"
            onClick={() =>
              updateCart(
                "Citrus Treats",
                1,
                "/static/images/Stand-Up Pouch Bag Mockup label.png",
                "A bag of citrus treats, filled with tangy, refreshing fruit snacks",
                "ID",
                6.99,
                6.99
              )
            }
          >
            Add citrus treat
          </button>
        </section>
        <section>
          <div className="flex flex-col lg:flex-row gap-[2rem] ">
            {cart.length === 0
              ? "Your cart is empty"
              : cart.map((item) => (
                  <ItemCheckout
                    key={item.iD}
                    name={item.name}
                    quantity={item.quantity}
                    img={item.img}
                    altText={item.altText}
                    iD={item.iD}
                    price={item.price}
                    totalPrice={totalPrice}
                    nameF={item.name}
                    quantityF={1}
                    setArrF={setCart}
                    arrF={cart}
                  ></ItemCheckout>
                ))}
            <section className="flex flex-col gap-[3rem] w-full rounded-[0.5rem] border-2 border-black p-[2rem] h-full lg:h-[70vh] justify-between">
              <h2 className="text-left w-full h-fit"> Checkout Summary </h2>
              <div className=" flex flex-col lg:h-fit gap-[2rem]">
                <div className=" flex flex-row justify-between">
                  <h3> Subtotal</h3>
                  <p>${totalPrice}</p>
                </div>
                <div className=" flex flex-row justify-between">
                  <h3> Shipping </h3>
                  <p>${shipping}</p>
                </div>
                <div className=" flex flex-row justify-between">
                  <h3> Tax </h3>
                  <p>${tax}</p>
                </div>
                <div className=" flex flex-row justify-between">
                  <h3> Estimated Total Order</h3>
                  <p>${estTotal}</p>
                </div>
              </div>
              <button className="mx-auto"> Continue to payment </button>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Page;
