import Head from "next/head";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

import axios from "axios";
import settings from "../settings";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { faTelegramPlane } from "@fortawesome/free-brands-svg-icons";
import nookies, { parseCookies } from "nookies";

export default function Contact({ user }) {
  const [message, setMessage] = useState({
    name: "",
    email: "",
    message: "",
  });

  const router = useRouter();
  const cookies = parseCookies();

  function send(e) {
    e.preventDefault();

    console.table(message);

    axios
      .post(`${settings.APIURL}/contacts`, {
        data: {
          name: message.name,
          email: message.email,
          // telegramId: message.telegram,
          message: message.message,
        },
      })
      .then(function (response) {
        alert("Thanks. We'll get in touch soon.");
        // setMessage({
        //   name: "",
        //   message: "",
        //   email: "",
        //   telegram: "",
        // });
      })
      .catch(function (error) {
        alert("Try Again Later.");
      });
  }
  // /api/messages
  return (
    <>
      <Head>
        <title>Contact Us - King's Chart</title>
      </Head>

      <div className="container mx-auto px-5 lg:px-20 fixed w-full z-50 left-0 right-0 pt-5">
        <Header username={user.username} jwt={cookies.jwt} />
      </div>

      <div className="container mx-auto px-5 lg:px-20 pt-16">
        <div className="pt-20">
          <h1 className="text-5xl font-bold">Contact Us</h1>
        </div>

        <div className="flex justify-center  flex-col md:flex-row pt-20 pb-32">
          <div className="flex justify-center  items-center w-full md:w-1/2">
            <img
              className="md:pr-10  rounded-lg w-full"
              src="https://images.unsplash.com/photo-1508780709619-79562169bc64?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MnwxfDB8MXxyYW5kb218MHx8d29ya3x8fHx8fDE2NDI5Mzg4ODk&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500"
            />
          </div>
          <div className="flex justify-center items-center flex-col bg-white w-full md:w-1/2 rounded-lg p-2.5 py-10 shadow-lg">
            <div className="w-10/12 h-auto">
              <ul>
                <li>
                  <a
                    href="mailto:hello@kingscharts.io"
                    className="flex items-center"
                  >
                    <FontAwesomeIcon
                      className="font-bold"
                      icon={faEnvelope}
                      height={25}
                    />
                    <span className="mx-2 opacity-80">
                      hello@kingscharts.io
                    </span>
                  </a>
                </li>

                {/* <li className="mt-5">
                  <a
                    href="https://t.me/Kingchart"
                    target="_blank"
                    className="flex items-center"
                  >
                    <FontAwesomeIcon
                      className="text-[#FD4C5C]"
                      icon={faTelegramPlane}
                      height={25}
                    />
                    <span className="mx-2 opacity-80">kingscharts</span>
                  </a>
                </li> */}
              </ul>
              <form method="post" onSubmit={send} className="w-full">
                <div className="my-5">
                  <input
                    value={message.name}
                    onChange={(e) =>
                      setMessage({
                        name: e.target.value,
                        email: message.email,
                        telegram: message.telegram,
                        message: message.message,
                      })
                    }
                    name="name"
                    className="border rounded-lg bg-[#90a8fe0d] w-full p-3"
                    type="text"
                    required
                    placeholder="Enter your name*"
                  />
                </div>
                <div className="my-5">
                  <input
                    value={message.email}
                    onChange={(e) =>
                      setMessage({
                        name: message.name,
                        email: e.target.value,
                        telegram: message.telegram,
                        message: message.message,
                      })
                    }
                    name="email"
                    className="border rounded-lg bg-[#90a8fe0d] w-full  p-3"
                    type="email"
                    required
                    placeholder="Enter your email address*"
                  />
                </div>

                <div className="my-5">
                  <textarea
                    value={message.message}
                    onChange={(e) =>
                      setMessage({
                        name: message.name,
                        email: message.email,
                        telegram: message.telegram,
                        message: e.target.value,
                      })
                    }
                    name="massge"
                    className="border rounded-lg bg-[#90a8fe0d] w-full  p-3 h-40"
                    required
                    placeholder="Enter your message"
                  />
                </div>

                <button
                  className="block p-2 my-5 hover:bg-black bg-brand text-black hover:text-white"
                  type="submit"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto  px-5 lg:px-20">
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = context.req.cookies;

  const userResponse = await fetch(`${settings.APIURL}/users/me`, {
    headers: {
      Authorization: `Bearer ${cookies.jwt}`,
    },
  });
  const userData = await userResponse.json();

  return {
    props: {
      user: userData,
    },
  };
}
