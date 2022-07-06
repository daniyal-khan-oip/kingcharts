import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faClock,
  faHeart,
  faStar,
  faUser,
  faUsers,
  faDollarSign,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Country, State, City } from "country-state-city";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import settings from "../../settings";
import { useState, useEffect } from "react";
import axios from "axios";
const qs = require("qs");
import { parseCookies } from "nookies";
import Script from "next/script";

export default function Checkout({ Course, user }) {
  const router = useRouter();
  const {
    course,
    totalTime,
    totalEnrolled,
    level,
    courseSummary,
    discountedPrice,
    originalPrice,
  } = router.query;
  const cookies = parseCookies();
  // console.log(
  //   totalTime,
  //   totalEnrolled,
  //   level,
  //   courseSummary,
  //   discountedPrice,
  //   originalPrice,
  //   "======"
  // );

  const selected_package = router.query.package;

  const ISSERVER = typeof window === "undefined";
  if (!ISSERVER) localStorage.setItem("jwtsaved", cookies.jwt);

  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [password, setPassword] = useState("");
  const [method, setMethod] = useState("fiat");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [name, setName] = useState("");

  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const [states, setStates] = useState([]);
  const [selectedStateCode, setSelectedStateCode] = useState("");

  const [countries, setCountries] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState("");

  const [showState, setShowState] = useState(true);
  const [showCity, setShowCity] = useState(true);
  const [jwt, setJwt] = useState("");

  const tariff = () => {
    if (course == "masterclass") {
      return 1;
    } else if (course == "premium") {
      if (router.query.package == "quarterly") {
        return 3;
      } else if (router.query.package == "yearly") {
        return 2;
      } else {
        return 4;
      }
    }
  };

  console.error(cookies.jwt, "cookiesssss");
  console.error(method, "method");

  const redirectPayment = (event) => {
    event.preventDefault();

    if (cookies.jwt === null || cookies.jwt === undefined) {
      axios
        // .post(`http://192.168.0.38:1337/api/invoices/createInvoice`, {
        .post(`${settings.APIURL}/invoices/createInvoice`, {
          action: "Create",
          tariff: `${tariff()}`,
          telegram: telegram,
          email: email,
          password: password,
          name: name,
          address: {
            line1: method != "fiat" ? "" : address,
            postal_code: method != "fiat" ? "" : postalCode,
            city: method != "fiat" ? "" : selectedCity,
            state: method != "fiat" ? "" : selectedStateCode,
            country: method != "fiat" ? "" : selectedCountryCode,
          },
          method: method,
        })
        .then(function (response) {
          if (response.data.errorCode == "email_in_use_error") {
            alert("Email already registered. Signin to perform action.");
          } else {
            const res = response.data.response;
            console.log(res, "============res");
            // router.push(redirect_url);
            if (method == "fiat") {
              router.push({
                pathname: "/payment/payment",
                query: {
                  clientSecretKey: res,
                  price: discountedPrice,
                  course: course,
                  courseTitle: Course.attributes.Title,
                  sellingPrice: discountedPrice,
                  originalPrice: originalPrice,
                  totalTime: totalTime,
                  totalEnrolled: totalEnrolled,
                  level: level,
                  courseSummary: courseSummary,
                },
              });
              localStorage.setItem("code", response.data.code);
              localStorage.setItem("id", response.data.id);
            } else {
              router.push(res);
            }
          }
        })
        .catch(function (error) {
          alert("Try again later.");
          console.log(error);
        });
    } else {
      axios
        // .post(`http://192.168.0.38:1337/api/invoices/createInvoice`, {
        .post(`${settings.APIURL}/invoices/createInvoice`, {
          action: "Update",
          tariff: `${tariff()}`,
          email: user.email,
          name: name,
          address: {
            line1: method != "fiat" ? "" : address,
            postal_code: method != "fiat" ? "" : postalCode,
            city: method != "fiat" ? "" : selectedCity,
            state: method != "fiat" ? "" : selectedStateCode,
            country: method != "fiat" ? "" : selectedCountryCode,
          },
          method: method,
        })
        .then(function (response) {
          const redirect_url = response.data.response;
          // router.push(redirect_url);
          if (method == "fiat") {
            if (response.data.errorCode == "email_in_use_error") {
              alert("Email already registered. Signin to perform action.");
            } else {
              const res = response.data.response;
              // router.push(redirect_url);
              router.push({
                pathname: "/payment/payment",
                query: {
                  clientSecretKey: res,
                  price: discountedPrice,
                  course: course,
                  courseTitle: Course.attributes.Title,
                  sellingPrice: discountedPrice,
                  originalPrice: originalPrice,
                  totalTime: totalTime,
                  totalEnrolled: totalEnrolled,
                  level: level,
                  courseSummary: courseSummary,
                },
              });
            }
          } else {
            router.push(redirect_url);
          }
        })
        .catch(function (error) {
          alert("Try again later.");
          console.log(error);
        });
    }
  };

  // Runs only in page load
  useEffect(() => {
    let index = 0;
    let countries = Country.getAllCountries();
    let india = countries.filter((ele, idx) => {
      if (ele.isoCode == "IN") {
        index = idx;
      }
      return ele.isoCode == "IN";
    });
    console.log(index, "====");
    countries.splice(index, 1);
    countries.unshift(india[0]);

    setCountries(countries);
  }, []);

  // Runs when countries array is changed
  useEffect(() => {
    setSelectedCountryCode(countries[0]?.isoCode);
  }, [countries]);

  // Runs when country is changed
  useEffect(() => {
    // console.log("selectedCountryCode: ", selectedCountryCode);
    let states = State.getStatesOfCountry(selectedCountryCode);
    // console.log("states", states);
    if (states.length > 0) {
      setStates(states);
      setSelectedStateCode(states[0]?.isoCode);
      setShowState(true);
    } else {
      setStates([]);
      setSelectedStateCode("");
      setShowState(false);
    }
  }, [selectedCountryCode]);

  // Runs when state is changed
  useEffect(() => {
    // console.log("selectedStateCode: ", selectedStateCode);

    let cities = City.getCitiesOfState(selectedCountryCode, selectedStateCode);
    // console.log("cities", cities);
    if (cities?.length > 0) {
      setCities(cities);
      setSelectedCity(cities[0]?.name);
      setShowCity(true);
    } else {
      setSelectedCity("");
      setShowCity(false);
    }
  }, [selectedStateCode]);

  if (!ISSERVER)
    console.log(
      localStorage.getItem("jwtsaved"),
      "---------------=================="
    );

  useEffect(() => {
    if (!ISSERVER) {
      setJwt(localStorage.getItem("jwtsaved"));
    }
  }, [ISSERVER]);

  console.log(jwt, "=======jwt");
  return (
    <div className=" bg-[#90a8fe0d]">
      <Head>
        <title>King's Charts</title>
      </Head>

      <div className="bg-white">
        <div className="container mx-auto px-5 lg:px-20 ">
          <Header jwt={cookies.jwt} username={user.username} />
        </div>
      </div>

      <div className="container mx-auto px-5 lg:px-20 py-20">
        <h1 className="text-4xl mt-10 font-bold">Checkout</h1>
        <p>Please review your purchase</p>

        <div className="flex gap-5 lg:flex-row flex-col">
          <div className="w-full lg:w-4/12">
            <form
              onSubmit={(e) => {
                e.stopPropagation();
                redirectPayment(e);
              }}
              className="bg-white shadow-lg p-5 mt-10 rounded-md py-8"
            >
              <>
                {!jwt? (
                  <>
                    <div className="mb-5">
                      <input
                        required
                        value={telegram}
                        onChange={(e) => setTelegram(e.target.value)}
                        className="px-3 rounded py-4 bg-[rgba(55,124,253,0.10)] w-full"
                        type="text"
                        placeholder="Telegram* ( i.e. @example )"
                      />
                    </div>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="px-3 mb-5  rounded py-4 bg-[rgba(55,124,253,0.10)] w-full"
                      type="text"
                      placeholder="Name"
                    />
                    <input
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="px-3 mb-5 rounded py-4 bg-[rgba(55,124,253,0.10)] w-full"
                      type="email"
                      placeholder="Email* ( i.e. example@kingscharts.io )"
                    />
                    <input
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="px-3 mb-5 rounded py-4 bg-[rgba(55,124,253,0.10)] w-full"
                      type="password"
                      placeholder="Password*"
                      minLength={6}
                    />

                    {/* Countries Input  */}

                    {method == "fiat" && (
                      <>
                        <input
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="px-3 mb-5 rounded py-4 bg-[rgba(55,124,253,0.10)] w-full"
                          type="text"
                          placeholder="Street Address"
                        />
                        <select
                          required={method === "fiat" ? true : false}
                          className="mb-5"
                          onChange={(e) => {
                            setSelectedCountryCode(e.target.value);
                          }}
                        >
                          {countries?.map((ele, idx) => (
                            <option key={idx} value={ele.isoCode}>
                              {ele.name}
                            </option>
                          ))}
                        </select>

                        {showState && (
                          /* States Input  */
                          <select
                            required={method === "fiat" ? true : false}
                            className="mb-5"
                            onChange={(e) => {
                              setSelectedStateCode(e.target.value);
                            }}
                            // value={selectedStateName}
                          >
                            {states?.map((ele, idx, arr) => (
                              <option
                                key={idx}
                                value={ele.isoCode}
                                selected={selectedStateCode === ele.isoCode}
                              >
                                {ele.name}
                              </option>
                            ))}
                          </select>
                        )}
                        {showCity && (
                          /* Cities Input  */
                          <select
                            required={method === "fiat" ? true : false}
                            onChange={(e) => {
                              setSelectedCity(e.target.value);
                            }}
                            className="mb-5"
                          >
                            {cities?.map((ele, idx) => (
                              <option key={idx} value={ele.isoCode}>
                                {ele.name}
                              </option>
                            ))}
                          </select>
                        )}
                        <input
                          required={method === "fiat" ? true : false}
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          className="px-3 mb-5  rounded py-4 bg-[rgba(55,124,253,0.10)] w-full"
                          type="text"
                          placeholder="Postal Code"
                        />
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <p className="my-4 text-gray-700">
                      Logged in as {user.username} ({user.email})
                    </p>
                    {/* Countries Input  */}

                    {method == "fiat" && (
                      <>
                        <input
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="px-3 mb-5 rounded py-4 bg-[rgba(55,124,253,0.10)] w-full"
                          type="text"
                          placeholder="Street Address"
                        />
                        <select
                          required={method === "fiat" ? true : false}
                          className="mb-5"
                          onChange={(e) => {
                            setSelectedCountryCode(e.target.value);
                          }}
                        >
                          {countries?.map((ele, idx) => (
                            <option key={idx} value={ele.isoCode}>
                              {ele.name}
                            </option>
                          ))}
                        </select>

                        {showState && (
                          <select
                            required={method === "fiat" ? true : false}
                            className="mb-5"
                            onChange={(e) => {
                              setSelectedStateCode(e.target.value);
                            }}
                          >
                            {states?.map((ele, idx, arr) => (
                              <option
                                key={idx}
                                value={ele.isoCode}
                                selected={selectedStateCode === ele.isoCode}
                              >
                                {ele.name}
                              </option>
                            ))}
                          </select>
                        )}
                        {showCity && (
                          <select
                            required={method === "fiat" ? true : false}
                            onChange={(e) => {
                              setSelectedCity(e.target.value);
                            }}
                            className="mb-5"
                          >
                            {cities?.map((ele, idx) => (
                              <option key={idx} value={ele.isoCode}>
                                {ele.name}
                              </option>
                            ))}
                          </select>
                        )}
                        <input
                          required={method === "fiat" ? true : false}
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          className="px-3 mb-5  rounded py-4 bg-[rgba(55,124,253,0.10)] w-full"
                          type="text"
                          placeholder="Postal Code"
                        />
                      </>
                    )}
                  </>
                )}

                {user.Masterclass ? (
                  <div className="text-xl flex">
                    <span className="text-green-600 mr-3">
                      <FontAwesomeIcon icon={faCheck} />
                    </span>{" "}
                    <span>
                      Congrats! You have already purchased this product!
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="my-5">
                      <p>Pay using</p>
                      <div className=" grid gap-5 grid-cols-2 mt-2">
                        <div
                          onClick={() => setMethod("crypto")}
                          className={`drop-shadow-lg px-10 py-3 rounded-lg cursor-pointer flex items-center ${
                            method == "crypto"
                              ? "bg-brand text-black"
                              : "bg-white"
                          }`}
                        >
                          <FontAwesomeIcon icon={faBitcoin} />
                          <span className="mx-2">Crypto</span>
                        </div>
                        <div
                          onClick={() => setMethod("fiat")}
                          className={`drop-shadow-lg px-10 py-3 rounded-lg cursor-pointer ${
                            method == "fiat"
                              ? "bg-brand text-black"
                              : "bg-white"
                          }`}
                        >
                          <FontAwesomeIcon icon={faDollarSign} />
                          <span className="mx-2">FIAT</span>
                        </div>
                      </div>
                    </div>

                    <p className="opacity-80 font-thin text-xs">
                      {method == "fiat"
                        ? "Your purchase will be handled by stripe payment gateway for a secure payment flow."
                        : "You will be redirected to btcpay payment gateway for a secure payment flow."}
                    </p>

                    <input
                      type="submit"
                      value="Confirm and Pay"
                      className="w-full p-3 bg-brand hover:text-white hover:bg-black mt-5 cursor-pointer text-black"
                      id="adroll_track"
                    />
                  </>
                )}
              </>
            </form>
          </div>

          <div className="w-full lg:w-8/12 flex gap-5 flex-col lg:flex-row">
            <div className="w-full lg:w-1/2">
              <h4 className="font-bold text-xl mb-5">
                Package You are purchasing
              </h4>

              <div className="shadow-lg rounded-lg">
                <img className="w-full" src="/course.png" />
                <div className="p-5">
                  <div>
                    <h2 className="font-bold text-xl mr-4">
                      {Course.attributes.Title}{" "}
                      <span className="text-gray-400">{originalPrice}</span>
                    </h2>
                  </div>
                  <small className="opacity-80">King's Charts</small>

                  {course == "masterclass" && (
                    <p className="text-blue-700">
                      {/* ${Course.attributes.Selling_Price}{" "} */}$
                      {discountedPrice}{" "}
                      {discountedPrice < originalPrice && (
                        <small className="line-through text-gray-700">
                          ${originalPrice}
                        </small>
                      )}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <h4 className="font-bold opacity-0 select-none  mb-5">
                Package You are purchasing
              </h4>
              <div className=" bg-[#F1F1F1] p-10">
                <h5 className="font-bold">Receipt</h5>

                <div className="mt-5">
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td className="font-thin opacity-50">Original Price</td>
                        <td>${originalPrice}</td>
                      </tr>
                      <tr>
                        <td className="font-thin opacity-50">
                          Discounted Price
                        </td>
                        <td>${discountedPrice}</td>
                      </tr>
                    </tbody>
                  </table>

                  <hr className="my-5 border-black" />

                  <h5 className="font-bold">Summary</h5>
                  <p className="opacity-60">
                    kingscharts is required by law to collect applicable
                    transaction taxes for purchases made in certain tax
                    jurisdictions. By completing your purchase you agree to
                    these{" "}
                    <a className="text-blue-600" target="_blank" href="/terms">
                      Terms of Service
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-5 lg:px-20">
        <Footer />
      </div>

      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
        if( document.querySelector("#adroll_track")){
          document.querySelector("#adroll_track").addEventListener("click", function () {
            try {
              __adroll.track("pageView", {"segment_name": "f3625037"})
            } catch (error) {
              console.log(error);
            }
          })
        }
        `,
        }}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  const cookies = context.req.cookies;

  const userResponse = await fetch(`${settings.APIURL}/users/me`, {
    headers: {
      Authorization: `Bearer ${cookies.jwt}`,
    },
  });
  console.log(cookies.jwt, "---------");

  const userData = await userResponse.json();

  const courseQuery = qs.stringify({
    filters: {
      Shortname: {
        $eq: context.query.course,
      },
    },
  });

  const courseResponse = await fetch(
    `${settings.APIURL}/courses?${courseQuery}&populate=*`
  );
  const courseData = await courseResponse.json();

  // console.log(courseData.data[0])

  return {
    props: {
      Course: courseData?.data[0] || undefined,
      user: userData,
    },
  };
}
