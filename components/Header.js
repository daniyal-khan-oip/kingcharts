import Link from "next/link";
import React from "react";
import { useState } from "react";

const Header = (props) => {
  const [isActive, setActive] = useState(false);
  const [overlayActive, setOverlayActive] = useState(false);

  return (
    <>
      {/* Mobile */}
      <nav className="flex lg:hidden container mx-auto py-3 justify-between items-center lg:px-20 px-5 z-50 bg-white rounded-full drop-shadow">
        <div className="w-1/4">
          <Link href="/" passHref>
            <a className="cursor-pointer">
               <img
                width="30"
                className="cursor-pointer"
                src="/logo.png"
                alt="kingscharts"
              />
            </a>
          </Link>
        </div>

        <div className="flex items-center gap-5">
          {props.jwt === null || props.jwt === undefined ? (
            <Link href="/auth/login">
              <a className="px-8 py-2 bg-brand text-black hover:text-white rounded-sm hover:bg-black">
                Login
              </a>
            </Link>
          ) : (
            <Link href="/user">
              <a className="px-5">{props.username}</a>
            </Link>
          )}
          <svg
            onClick={() => {
              setActive(true);
              console.log("working");
            }}
            className="cursor-pointer"
            viewBox="0 0 100 80"
            width="30"
            height="30"
          >
            <rect width="100" height="10"></rect>
            <rect y="30" width="100" height="10"></rect>
            <rect y="60" width="100" height="10"></rect>
          </svg>
        </div>
      </nav>

      <ul
        className={`lg:hidden ${isActive === true ? "flex" : "hidden"
          } flex-col items-center justify-center fixed top-0 left-0 h-screen w-screen bg-white z-50`}
      >
        <li
          onClick={() => setActive(false)}
          className="text-5xl fixed top-2 right-2 m-5 cursor-pointer select-none"
        >
          &times;
        </li>

        <li className="block mx-4 font-bold p-5 text-xl hover:text-brand">
          <a href="/courses/masterclass">Masterclass</a>
        </li>

        <li className="block mx-4 font-bold p-5 text-xl hover:text-brand">
          <a href="/courses/premium">Premium Services</a>
        </li>

        <li className="block mx-4 font-bold p-5 text-xl hover:text-brand">
          <Link href="/blog">
            <a>Blog</a>
          </Link>
        </li>

        <li className="block mx-4 font-bold p-5 text-xl hover:text-brand">
          <Link href="/contact">
            <a>Contact</a>
          </Link>
        </li>
      </ul>

      {/* Desktop */}
      <nav className="hidden lg:flex py-3 justify-between items-center w-full bg-white px-5 rounded-full drop-shadow">
        <div className="w-3/4 flex items-center ml-3">
          <Link href="/">
            <img
              width="30"
              className="cursor-pointer"
              src="/logo.png"
              alt="kingscharts logo"
            />
          </Link>
        
        <div className="hidden lg:block text-center ml-5 text-sm">
          <ul>
            <li className="inline-block mx-4 font-bold relative">
              <a className="select-none cursor-pointer" onClick={()=> setOverlayActive(!overlayActive)}>Explore</a>
              <div className={`${overlayActive ? "" : "hidden"} bg-white p-10 absolute top-full translate-y-10 left-0 flex text-left drop-shadow-lg rounded-2xl`}>
                <div className="w-56 mr-10">
                  <h4 className="text-md">Masterclass</h4>
                  <p className="text-sm font-normal">Basics Of TA (Charts, Candlesticks) Fibonacci Retracements Advanced Elliott Wave trading patterns Risk Management</p>
                  <a href="/courses/masterclass" className="bg-brand hover:bg-black hover:text-white text-black text-lg px-3 py-2 mt-5 block text-center rounded-lg">Check it out NOW!</a>
                </div>
                <div className=" border-l px-5"></div>
                <div className="w-56">
                  <h4 className="text-sm">Premium (VIP) 💎</h4>
                  <p className="text-sm font-normal">Multiple trading calls every week 90% accuracy from the past 6 years Access to Q&A sessions with Mr. Khan himself</p>
                  <a href="/courses/premium" className="bg-brand hover:bg-black hover:text-white text-black text-lg px-3 py-2 mt-5 block text-center rounded-lg">Check it out NOW!</a>
                </div>
              </div>
            </li>

            <li className="inline-block mx-4 font-bold">
              <a href="/blog">Blog</a>
            </li>

            <li className="inline-block mx-4 font-bold">
              <Link passHref href="/contact">
                <a>Contact</a>
              </Link>
            </li>
          </ul>
        </div>
        </div>

        <div className="hidden lg:block w-1/4 text-right mr-3">
          {props.jwt === null || props.jwt === undefined ? (
            <Link href="/auth/login">
              <a className="px-8 py-2 bg-brand text-black hover:text-white rounded-sm hover:bg-black rounded-full">
                Login
              </a>
            </Link>
          ) : (
            <Link href="/user">
              <a className="px-5">{props.username}</a>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
