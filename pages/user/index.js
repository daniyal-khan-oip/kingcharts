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
  faPlus,
  faQuestionCircle,
  faSignOutAlt,
  faStar,
  faUser,
  faUsers,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import dynamic from 'next/dynamic'
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
const LanguageSelect = dynamic(() => import('../../components/LanguageSelector'));

export default function User({ user }) {
  const router = useRouter();
  const cookies = parseCookies();

  const [menuStatus, setMenuStatus] = useState(false);
  const [overlayActive, setOverlayActive] = useState(false);

  const [languageOverlayStatus, setLanguageOverlayStatus] = useState(false);

  const logout = () => {
    destroyCookie(null, "jwt", { path: "/" });
    router.push("/user");
  };


  if (cookies.jwt && user.logged_in_device_identifier !== cookies.session_id) {
    destroyCookie(null, 'jwt', { path: '/' })
    destroyCookie(null, 'session_id', { path: '/' })
  }

  if (user == null) {
    return (
      <>
        <Head>
          <title>King'sCharts Profile</title>
        </Head>
        <div className="h-screen flex justify-center items-center">
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
    );
  } else {
    return (
      <>
        <Head>
          <title>King'sCharts Profile</title>
        </Head>

        <div className="container mx-auto px-5 lg:px-20 fixed w-full z-50 left-0 right-0 pt-5">
          <Header username={user.username} jwt={cookies.jwt} />
        </div>

        {languageOverlayStatus ? <LanguageSelect closeOverlay={() => { setLanguageOverlayStatus(false); alert('Reload page') }} userID={user.id} /> : ""}

        {
          overlayActive ? <div
            className={`h-screen w-screen bg-[#799fff99] z-50 fixed top-0 left-0 flex justify-center items-center`}
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
          </div> : ""
        }

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
            <div className="pt-20">
              <h1 className="text-4xl font-bold pr-5">Dashboard</h1>
              <ul className="mt-5">
                <li className="mb-5">
                  <Link href="/user">
                    <div className="flex cursor-pointer bg-[#DFE0E8] p-3">
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
                    <div className="flex cursor-pointer p-3">
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
            <h1 className="lg:mt-20 text-xl">Hi, {user.username}</h1>
            <p className="text-4xl font-bold">Welcome back &#128075;</p>
            {/* <div className="mt-5 flex flex-col justify-center items-center">
              <img
                className="w-full rounded-lg"
                src="https://source.unsplash.com/1600x200"
              />
              <div className="text-center">
                <div className="bg-gray-800 inline-flex justify-center items-center text-white rounded-full h-20 w-20 -mt-10">
                  <FontAwesomeIcon width={30} icon={faUser} />
                </div>
                <h2>{user.username}</h2>
              </div>
            </div> */}

            <div className="flex gap-10 mt-10">
              <div className="w-full shadow-lg p-10">
                <div className="mb-10">
                  <h4 className="opacity-60">Enrolled</h4>
                  {
                      !user.Premium && !user.Masterclass ? 
                      <div className="bg-gray-200 p-5 rounded-md mt-2 flex flex-col lg:flex-row items-center">
                        <h2 className="text-6xl">🤔</h2>
                        <div className="p-5">
                          <h3 className="text-lg font-medium">Things are quite empty here.</h3>
                          <p className="text-gray-600">If you've purchased a package but it's not appearing here then contact <a className="font-bold text-gray-700" target="_blank" href="mailto:hello@kingscharts.io">support team</a>.</p>
                          <div className="my-5 flex items-center flex-col lg:flex-row">
                            <a href="/courses/masterclass" className="bg-brand px-5 py-2 lg:mr-2 text-sm lg:text-md w-full lg:w-auto">Enroll in the Masterclass</a> Or 
                            <a href="/courses/premium" className="bg-brand px-5 py-2 lg:ml-2 text-sm lg:text-md w-full lg:w-auto">Subscribe to premium</a>
                          </div>
                        </div>
                      </div> : 
                    
                      <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-10 items-center">

                        {user.Masterclass && (
                          <div className="my-10">
                            <div className="mb-2">
                              <img className="w-auto" src="/course-image.png" />
                            </div>
                            <h5 className="text-2xl">Masterclass</h5>
                            <p className="opacity-80">
                              Introduction to Bitcoin &amp; how to invest
                            </p>
                            <div className="mt-5">
                              <a
                                href={`/classroom/masterclass/${encodeURIComponent(
                                  "01. Introduction"
                                )}`}
                                className="px-4 text-white py-2 bg-black"
                              >
                                Visit
                              </a>
                            </div>
                          </div>
                        )}
                        {user.Premium && (
                          <div className="my-10">
                            <div className="mb-2">
                              <img className="w-auto" src="/course-image.png" />
                            </div>
                            <h5 className="text-2xl">Premium</h5>
                            <p className="opacity-80">
                              Elliott Wave Trading Group (Premium)
                            </p>
                            <div className="mt-5">
                              <a
                                href="/premium"
                                className="px-4 text-white py-2 bg-black"
                              >
                                Visit
                              </a>
                            </div>
                          </div>
                        )}
                        
                        {user.Masterclass && <>
                          {user.Language == "" || user.Language == "English" ? <div onClick={() => setLanguageOverlayStatus(true)} className="my-10 bg-gray-200 flex items-center justify-center rounded-lg p-10 cursor-pointer">
                          <div className="text-center">
                            <div className="p-10">
                              <FontAwesomeIcon className="text-xl" icon={faPlus} />
                            </div>
                            <p>View Masterclass in your native language</p>
                          </div>
                        </div> : <div className="my-10">
                          <div className="mb-2 relative">
                            <img className="w-auto" src="/course-image.png" />
                            <span className="absolute bottom-0 right-0 bg-brand px-3 py-2">{user.Language}</span>
                          </div>
                          <h5 className="text-2xl">Masterclass</h5>
                          <p className="opacity-80">
                            Introduction to Bitcoin &amp; how to invest ({user.Language})
                          </p>
                          <div className="mt-5">
                            <a
                              href={`/classroom/masterclass/${encodeURIComponent(
                                "01. Introduction"
                              )}?lang=${user.Language}`}
                              className="px-4 text-white py-2 bg-black"
                            >
                              Visit
                            </a>
                          </div>
                        </div>}
                        </>
                        }
                      </div>
                  }
                </div>
                <div className="mb-10">
                  <h4 className="opacity-60">Free Services</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-10 items-center mt-2">
                    <a
                      target="_blank"
                      href="https://t.me/Kingchart"
                      className="bg-white p-5 shadow-lg"
                    >
                      <img src="/telegram.png" />
                      <h4 className="font-bold mt-1">Telegram</h4>
                      <small className="opacity-0">Coming soon</small>
                    </a>

                    <a
                      target="_blank"
                      href="https://open.spotify.com/show/1KiPAtxH1I3zCNXpV3J8ia?si=bc7e4c32056f4606"
                      className=" bg-white p-5 shadow-lg"
                    >
                      <img src="/spotify.png" />
                      <h4 className="font-bold mt-1">Podcast</h4>
                      <small className="opacity-0">Coming soon</small>
                    </a>

                    <a
                      target="_blank"
                      href="https://www.youtube.com/c/KingChart007"
                      className=" bg-white p-5 shadow-lg"
                    >
                      <img src="/youtube.png" />
                      <h4 className="font-bold mt-1">Youtube</h4>
                      <small className="opacity-0">Coming soon</small>
                    </a>

                    <a
                      target="_blank"
                      href="https://twitter.com/kingscharts"
                      className=" bg-white p-5 shadow-lg"
                    >
                      <img src="/twitter.png" />
                      <h4 className="font-bold mt-1">Twitter</h4>
                      <small className="opacity-0">Coming soon</small>
                    </a>


                  </div>
                </div>
                {/* <h4 className="opacity-60">About</h4>
                <p className="mt-5">{user.About == null ? "" : user.About}</p> */}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export async function getServerSideProps(context) {
  const cookies = context.req.cookies;

  let userResponse = undefined;
  let userData = undefined;
  if (cookies.jwt) {
    userResponse = await fetch(`${settings.APIURL}/users/me`, {
      headers: {
        Authorization: `Bearer ${cookies.jwt}`,
      },
    });
    userData = await userResponse.json();
  } else {
    userData = null;
  }

  return {
    props: {
      user: userData,
    },
  };
}
