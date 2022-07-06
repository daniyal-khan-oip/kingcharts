import {
  faArrowLeft,
  faBriefcase,
  faBuilding,
  faCalendarAlt,
  faCog,
  faEnvelope,
  faLocationArrow,
  faMap,
  faMapMarkedAlt,
  faMapMarker,
  faPhone,
  faQuestionCircle,
  faSignOutAlt,
  faStar,
  faUser,
  faUsers,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Error from "next/error";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FormInputBlock from "../../components/FormInputBlock";
import Header from "../../components/Header";
import nookies, { parseCookies, destroyCookie } from "nookies";
import moment from "moment";
import settings from "../../settings";
import qs from "qs";
import Accordion from "../../components/Accordion";

export default function User({ user, FAQs }) {
  const router = useRouter();
  const cookies = parseCookies();

  const [menuStatus, setMenuStatus] = useState(false);
  const [overlayActive, setOverlayActive] = useState(false);

  const logout = () => {
    destroyCookie(null, "jwt");
    destroyCookie(null, "email");
    router.push("/user");
  };

  if (user == null) {
    return (
      <>
        <div className="h-screen w-screen flex justify-center items-center">
          <Head>
            <title>King'sCharts Profile</title>
          </Head>

          <div className="shadow-lg p-10">
            <h1 className="text-xl">Login to view content</h1>
            <div className="mt-5">
              <Link href="/auth/login">
                <a className="px-8 py-3 bg-black text-white hover:bg-gray-800">
                  Login
                </a>
              </Link>
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Head>
          <title>King'sCharts Profile - FAQ</title>
        </Head>

        <div className="fixed top-0 left-0 right-0 h-auto bg-white z-10">
          <div className="container mx-auto px-5 lg:px-20">
            <Header username={user.username} jwt={cookies.jwt} />
          </div>
        </div>
        <div
          className={`h-screen w-screen bg-[#799fff99] z-50 fixed top-0 left-0 flex justify-center items-center ${overlayActive ? "" : "hidden"
            }`}
        >
          <div className="bg-white p-10 text-center shadow-lg">
            <h5 className="font-bold text-2xl">
              Are you sure, you want to logout?
            </h5>
            <div className="mt-5">
              <a
                onClick={() => setOverlayActive(false)}
                className="px-5 py-2 border-2 cursor-pointer border-[#FD4C5C] hover:bg-black hover:border-black bg-[#FD4C5C] text-white mx-2 font-normal"
              >
                No
              </a>
              <a
                onClick={logout}
                className="px-5 py-2 border-2  cursor-pointer hover:bg-[#FD4C5C] hover:text-white border-[#FD4C5C] text-[#FD4C5C] mx-2 font-normal"
              >
                Yes
              </a>
            </div>
          </div>
        </div>
        <div className="flex bg-[rgba(144,168,254,0.05)] h-screen">
          <div
            className={`lg:w-2/12 p-6 h-full flex fixed top-0 left-0 right-0 bottom-0 lg:static ${menuStatus ? "" : "-translate-x-full"
              }  lg:translate-x-0 flex-col justify-between bg-white z-50 lg:z-0`}
          >
            <div
              onClick={() => setMenuStatus(false)}
              className="fixed lg:hidden top-0 right-0 text-4xl bg-slate-900 text-white w-12 h-12 flex items-center justify-center cursor-pointer select-none"
            >
              <span className="inline">&times;</span>
            </div>
            <div className="pt-20 ">
              <h1 className="text-4xl  font-bold">Dashboard</h1>
              <ul className="mt-5">
                <li className="mb-5">
                  <Link href="/user">
                    <div className="flex cursor-pointer p-3">
                      <img width={25} src="/Delete-user.svg" />
                      <span className="ml-2">Profile</span>
                    </div>
                  </Link>
                </li>

                <li className="mb-5">
                  <Link href="/user/settings">
                    <div className="flex cursor-pointer p-3">
                      <FontAwesomeIcon width={20} icon={faCog} />
                      <span className="ml-2">Account Settings</span>
                    </div>
                  </Link>
                </li>

                <li className="mb-5">
                  <Link href="/user/help">
                    <div className="flex cursor-pointer bg-[#DFE0E8]  p-3">
                      <FontAwesomeIcon width={20} icon={faQuestionCircle} />
                      <span className="ml-2">Help</span>
                    </div>
                  </Link>
                </li>

                <li className="mb-5">
                  <a
                    className="cursor-pointer "
                    onClick={() => setOverlayActive(true)}
                  >
                    <div className="flex cursor-pointer p-3">
                      <FontAwesomeIcon width={20} icon={faSignOutAlt} />
                      <span className="ml-2">Log Out</span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            {/* <div className="flex items-center">
                <img
                  className="rounded-full inline-block"
                  src="https://source.unsplash.com/50x50"
                />
                <p className="ml-3">{"Test"}</p>
              </div> */}
          </div>

          <div className="w-full lg:w-10/12 p-10 overflow-y-auto">
            <div
              onClick={() => setMenuStatus(true)}
              className="mt-20 lg:hidden p-5 bg-black text-white mb-5 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-menu-2"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
              <a className="px-2">Navigate Profile</a>
            </div>

            <h1 className="mt-20 text-xl">Hi, {user.username}</h1>
            <p className="text-4xl font-bold">Welcome back &#128075;</p>

            <div>
              <h2 className="text-4xl mt-20 text-center font-bold">
                Frequently Asked Question
              </h2>
              <p className="text-center mt-2">
                Haven’t got your answer?
                <Link href="/contact">
                  <a className="ml-2 text-blue-500">Contact our Support</a>
                </Link>
              </p>

              <div className="mt-10">
                {FAQs.data.map((element) => (
                  <Accordion
                    key={element.id}
                    title={element.attributes.Question}
                  >
                    {element.attributes.Answer}
                  </Accordion>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>)
  }
}

export async function getServerSideProps(context) {
  const faqQuery = qs.stringify({
    sort: ["Question"],
    filters: {
      Location: {
        $eq: "home",
      },
    },
  });

  const faqResponse = await fetch(`${settings.APIURL}/faqs?${faqQuery}`);
  const faqData = await faqResponse.json();
  const cookies = context.req.cookies;


  let userResponse = null;
  let userData = null;

  if (cookies.jwt) {
    userResponse = await fetch(`${settings.APIURL}/users/me`, {
      headers: {
        Authorization: `Bearer ${cookies.jwt}`,
      },
    });

    userData = await userResponse.json();
  }


  return {
    props: {
      FAQs: faqData,
      user: userData,
    },
  };
}
