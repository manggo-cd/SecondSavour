"use client";

import React, { useState, useEffect } from "react";
import Hyperlink from "./Hyperlink";
import { useCart } from "../Components/CartContext";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import CheckoutComponent from "../Components/CheckoutComponent";
import { FaCartShopping } from "react-icons/fa6";
import Image from "next/image";

/* Icons */
import { IoMenu } from "react-icons/io5";

function Navbar() {
  const {
    cart,
    totalPrice,
    tax,
    shipping,
    estTotal,
    setCart,
    popup,
    setPopup,
    purchase,
    setPurchase,
    name,
    img,
    quantity,
  } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [price, setPrice] = useState(true);
  const [checkout, setCheckout] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Run on initial render
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggle = (set, name) => {
    set(!name);
  };

  return (
    <nav className=" mb-[8vh] md:mb-[5vh] lg:mb-[3%] ">
      <div
        className=" z-20 flex flex-row justify-between fixed h-[fit] lg:h-[6%] 
        top-0 left-0 bg---color-black backdrop-blur-[8px]"
      ></div>

      <div className=" flex flex-row justify-center lg:mt-[1%]">
        <div
          className={`flex flex-col lg:flex-row justify-between lg:w-[60vw] S w-[100vw] lg:rounded-full h-fit z-[100] lg:py-[1%] pb-[6vh] lg:px-[3%] fixed lg:mt-[0%] mt-[-3%] lg:pt-[21] pt-[5%] rounded-[0.5rem] ease-in-out duration-[500ms] lg:bg-my-beige  ${
            isOpen ? "bg-green-700" : "bg-[#fef7e6]"
          }`}
        >
          <div className="flex flex-row lg:w-fit w-full h-fit justify-between lg:relative  fixed lg:px-0  pr-[1%] pl-[5%]">
            <div className="flex flex-col justify-center">
              <Hyperlink
                Text={"Second Savour"}
                Link={"/"}
                Color={"--color-black"}
                HoverColor={"--purple"}
                Display={"none"}
              />
            </div>

            <button
              className="lg:hidden lg:bg-transparent lg:w-0 w-fit bg-transparent group-hover:bg-transparent hover:bg-transparent active:bg-transparent"
              onClick={() => toggle(setIsOpen, isOpen)}
              aria-label={
                isOpen ? "Close navigation menu" : "Open navigation menu"
              }
            >
              <span
                className={`text-3xl font-sans lg:hidden bg-transparent font-bold ease-in-out duration-300 h-full mt-[-1vh] flex flex-col justify-center  ${
                  isOpen ? "text-black" : "text-black"
                }`}
              >
                {isOpen ? "x" : <IoMenu className="w-[10] h-[10] text-4xl" />}
              </span>
            </button>
          </div>
          <div
            className={`flex flex-col lg:flex-row lg:gap-[1rem] gap-[1rem] min-w-[50%] lg:w-[20%]  lg:px-0 px-[7%] lg:mt-0 justify-end z-10 ease-in-out duration-300 ${
              isOpen ? "mt-[6vh] " : "mt-[-30vh] "
            }`}
          >
            <Hyperlink
              Text={"About"}
              Link={"/about"}
              Color={"--color-black"}
              HoverColor={"--purple"}
              Display={"none"}
            />
            <Hyperlink
              Text={"Locations"}
              Link={"/map"}
              Color={"--color-black"}
              HoverColor={"--purple"}
              Display={"none"}
            />
            <Hyperlink
              Text={"Shop"}
              Link={"/shop"}
              Color={"--color-black"}
              HoverColor={"--purple"}
              Display={"none"}
            />
            <div className="  w-fit">
              <button
                className="relative w-fit h-full p-0 shadow-none hover:bg-transparent  hover:text-my-green text-xl bg-transparent"
                onClick={() => toggle(setCheckout, checkout)}
              >
                <FaCartShopping />

                {cart.length !== 0 ? (
                  <div className="absolute top-0 right-0 bg-red-700 text-sm w-fit h-fit px-[0.4rem] rounded-full -mt-[0.6rem] -mr-[0.8rem]">
                    <p className="text-sm text-white">{cart.length}</p>
                  </div>
                ) : (
                  <p></p>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="pb-[3%]"></div>
      </div>

      {/* cart */}
      <div
        className={`lg:w-[24vw] lg:right-0 w-full h-[100vh] lg:h-[96vh] overflow-auto overscroll-y-auto fixed  rounded-[0.5rem] lg:py-[2rem] px-[2rem] bg-white opacity-full z-[100] flex flex-col gap-[5rem] ease-in-out duration-300 transition-all lg:my-[0] lg:top-[2vh] top-0 py-[2rem]
          ${checkout && !isMobile ? "mr-[2vh]" : "-mr-[30rem]"} ${
            checkout && isMobile ? "-mt-[1vh]" : "-mt-[110vh]"
          }`}
      >
        <div>
          <div className="flex flex-row justify-between ">
            <h2> Your cart </h2>
            <button
              className="text-xl  w-fit h-fit flex flex-col justify-center py-[0.5rem] px-[1rem] rounded-full text-white bg-red-600 hover:bg-red-800"
              onClick={() => (
                toggle(setCheckout, checkout), setPurchase(false)
              )}
            >
              x
            </button>
          </div>
          <p className="mt-[0.85rem]">
            {" "}
            You have {cart.length} items in your cart.
          </p>
        </div>
        {cart.length === 0 ? (
          <p> Your cart is empty.</p>
        ) : (
          cart.map((item, index) => (
            <CheckoutComponent
              name={item.name}
              quantity={item.quantity}
              img={item.img}
              altText={item.altText}
              key={index}
              iD={item.Id}
              price={item.price}
              totalPrice={totalPrice}
              nameF={item.name}
              quantityF={1}
              setArrF={setCart}
              arrF={cart}
            ></CheckoutComponent>
          ))
        )}

        <div className="flex flex-col gap-[1rem]">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row ">
              <h3> Subtotal</h3>
              <button
                onClick={() => toggle(setPrice, price)}
                className="w-fit p-[0.2rem] bg-transparent h-fit shadow-none hover:bg-transparent hover:text-black "
              >
                {price ? (
                  <IoIosArrowDown className="m-0 p-0 h-fit w-fit" />
                ) : (
                  <IoIosArrowUp />
                )}
              </button>
            </div>
            <p>${totalPrice.toFixed(2)}</p>
          </div>
          <div
            className={`flex flex-col gap-[1rem] overflow-hidden ease-in-out duration-300 transition-all 
            ${price ? "h-0" : "h-[15vh]"}`}
          >
            <div className="flex flex-row justify-between">
              <h3> Tax</h3>
              <p>${tax.toFixed(2)}</p>
            </div>
            <div className="flex flex-row justify-between">
              <h3> Shipping</h3>
              <p>${shipping.toFixed(2)}</p>
            </div>
            <div className="flex flex-row justify-between">
              <h3> Estimated Total</h3>
              <p>${estTotal.toFixed(2)}</p>
            </div>
          </div>
          <p className="-mt-[1rem]"> Message about our shipping or delivery</p>
        </div>
        <button> Proceed to payment </button>
      </div>

      {/* Screen to click out the shopping cart from  */}

      <button
        className={` min-w-[100vw] min-h-[100vh] overflow-hidden  top-0 opacity-[80%] hover:bg-black rounded-none
          ${!checkout ? "opacity-[0%] bg-transparent -z-100 hidden" : "bg-black opacity-[80%] z-20 fixed"}`}
        onClick={() => setCheckout(!checkout)}
      ></button>

      {/* Alerts */}
      <div>
        <div
          className={`fixed px-[1.5rem] lg:px-[1.5rem] top-0 bg-red-400 rounded-[0.5rem] py-[1rem] lg:w-fit w-[90vw] lg:left-[70vw] left-[5vw] mx-auto text-md ease-in-out duration-300 lg:m-[2rem] transition-all lg:right-[6vw] filter flex flex-row gap-[0.5rem] shadow-lg
         ${popup ? "lg:mt-[5rem] mt-[0.5rem] opacity-full z-[5]" : "mt-[0rem] opacity-0 -z-50"}`}
        >
          <div className="flex flex-col gap-[0.5rem] w-fit">
            <div className="flex flex-row justify-between">
              <div className="">
                {popup ? (
                  <Image
                    src={img}
                    alt={`${name} product image`}
                    width={80}
                    height={80}
                    className="max-w-[5rem] max-h-[10rem] object-contain"
                  />
                ) : (
                  <Image
                    src={img}
                    alt={`${name} product image`}
                    width={80}
                    height={80}
                    className="max-w-[5rem] max-h-[10rem] object-contain"
                  />
                )}
              </div>
              <div className="pl-[2rem] w-[100%] whitespace-nowrap flex flex-col gap-[0.25rem] text-left">
                <h3>{name}</h3>
                <span className="">
                  <p> Quantity: {quantity?.toString() || "0"}</p>
                  <button
                    className="strip text-[#272727] decoration-[#272727] underline whitespace-nowrap mt-[0.5rem]"
                    onClick={() => (setCheckout(true), setPopup(false))}
                  >
                    <p className="text-[#272727]">Removed from cart</p>
                  </button>
                </span>
              </div>
              <button
                className="strip flex flex-col"
                onClick={() => setPurchase(!popup)}
              >
                {" "}
                <p className="text-2xl ml-[1.5rem] leading-[1.2rem] text-black hover:text-[#272727] transition-all ease-in-out duration-300">
                  x
                </p>
              </button>
            </div>
          </div>
        </div>

        <div
          className={`fixed px-[1.5rem] lg:px-[1.5rem] top-0 bg-white rounded-[0.5rem] py-[1rem] lg:w-fit w-[90vw] lg:left-[70vw] left-[5vw] mx-auto text-md ease-in-out duration-300 lg:m-[2rem] transition-all lg:right-[6vw] filter flex flex-row gap-[0.5rem] shadow-lg
         ${purchase ? "lg:mt-[5rem] mt-[0.5rem] opacity-full z-[5]" : "mt-[0rem] opacity-0 -z-50"}`}
        >
          <div className="flex flex-col gap-[0.5rem] w-fit">
            <div className="flex flex-row justify-between">
              <div className="">
                {purchase ? (
                  <Image
                    src={img}
                    alt={`${name} product image`}
                    width={80}
                    height={80}
                    className="max-w-[5rem] max-h-[10rem]"
                  />
                ) : (
                  <Image
                    src={img}
                    alt={`${name} product image`}
                    width={80}
                    height={80}
                    className="max-w-[5rem] max-h-[10rem]"
                  />
                )}
              </div>
              <div className="pl-[2rem] w-[100%] whitespace-nowrap flex flex-col gap-[0.25rem] text-left">
                <h3>{name}</h3>
                <span className="">
                  <p> Quantity: {quantity?.toString() || "0"}</p>

                  <button
                    className="strip text-[#272727] decoration-[#272727] underline whitespace-nowrap mt-[0.5rem]"
                    onClick={() => (setCheckout(true), setPurchase(false))}
                  >
                    <p className="text-[#272727]">Added to cart</p>
                  </button>
                </span>
              </div>
              <button
                className="strip flex flex-col"
                onClick={() => setPurchase(!purchase)}
              >
                {" "}
                <p className="text-2xl ml-[1.5rem] leading-[1.2rem] text-black hover:text-[#272727] transition-all ease-in-out duration-300">
                  x
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
