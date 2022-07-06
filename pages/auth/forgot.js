import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import FormInputBlock from "../../components/FormInputBlock";
import axios from "axios";
import settings from '../../settings';
import Head from "next/head";


export default function Forgot() {
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();

  function forgotPassword(e) {
    e.preventDefault();
    axios
      .post(`${settings.APIURL}/auth/forgot-password`, {
        email: "shahriarimtiaz47@gmail.com",
      })
      .then(function (response) {
        console.log(response)
        setMessage("We've sent you a secret passage.");
      })
      .catch(function (error) {
        setMessage("Something went wrong :)");
        console.log(error)
      });

  }

  return (
    <div className="flex w-screen h-screen items-center justify-center">
      {/* <div className="h-full w-1/2 overflow-hidden hidden lg:block xl:block">
        <img className="w-auto h-full" src="/login.png" alt="" />
      </div> */}
      <Head>
        <title>KingsCharts - Forgot Password</title>
      </Head>

      <div className={`text-center p-5 ${message == "We've sent you a secret passage." ? "" : "hidden"}`}>
        <h1 className="font-bold text-2xl">We've sent you a secret passage.</h1>
        <p>Check your email's spam incase you can't find it.</p>
      </div>

      <div className={`h-full w-full xl:w-1/2 flex items-center justify-center p-10 ${message == "We've sent you a secret passage." ? "hidden" : ""}`}>
        <div>
          <Link href="/">
            <small className="my-5 cursor-pointer flex items-center">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-arrow-narrow-left"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <line x1="5" y1="12" x2="9" y2="16" />
                  <line x1="5" y1="12" x2="9" y2="8" />
                </svg>
              </span>
              <span className="mx-4">Home</span>
            </small>
          </Link>
          <h1 className="font-extrabold text-4xl">Reset Password</h1>

          <form onSubmit={forgotPassword}>
            <FormInputBlock label="Email Address" required>
              <input value={email} onChange={e => setEmail(e.target.value)} required className="border rounded-lg w-full p-2" type="email" />
            </FormInputBlock>

            <p className="mt-4 opacity-80">{message}</p>
            <button
              className="block w-full p-2 mt-2 hover:bg-black hover:text-white bg-brand text-black"
              type="submit"

            >
              Send Reset Link
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
