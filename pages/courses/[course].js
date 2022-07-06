import { faFantasyFlightGames } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowLeft,
  faChartBar,
  faChartLine,
  faCheckCircle,
  faClock,
  faHeart,
  faSearch,
  faStar,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

import { Swiper, SwiperSlide } from "swiper/react";
const qs = require("qs");

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Link from "next/link";
import { useRouter, withRouter } from "next/router";
import FooterAlt from "../../components/FooterALT";
import HeaderALT from "../../components/HeaderALT";
import FAQ from "../../components/FAQ";
import settings from "../../settings";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

import ReactHtmlParser from "react-html-parser";
import { marked } from "marked";
import nookies, { parseCookies, destroyCookie } from "nookies";
import { useState } from "react";
import Avatar, { genConfig } from "react-nice-avatar";
import { useEffect } from "react";

export default function Courses({ href, FAQs, Course, user }) {
  const router = useRouter();
  const { course } = router.query;
  const cookies = parseCookies();
  const [discountedPrice, setDiscountedPrice] = useState(
    Course?.attributes?.shortname == "masterclass"
      ? Course?.attributes?.Selling_Price
      : "549"
  );
  const [originalPrice, setOriginalPrice] = useState(
    Course?.attributes?.shortname == "masterclass"
      ? Course.attributes.Original_Price
      : "658"
  );
  const [price, setPrice] = useState("quarterly");

  if (cookies.jwt && user.logged_in_device_identifier !== cookies.session_id) {
    destroyCookie(null, "jwt", { path: "/" });
    destroyCookie(null, "session_id", { path: "/" });
  }
  const [summary, setSummary] = useState(Course?.attributes?.Summary);
  const config = genConfig({});

  // console.log(
  //   Course.attributes.shortname,
  //   "=-=-==-==-=--=-=-====-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=====================",
  //   Course.attributes.Original_Price,
  //   originalPrice
  // );
  // console.log(Course.attributes.Selling_Price,Course.attributes.Summary, "........................");

  // useEffect(() => {
  //   setOriginalPrice(
  //     Course?.attributes?.shortname == "masterclass"
  //       ? Course?.attributes?.Original_Price
  //       : "658"
  //   );
  //   setDiscountedPrice(
  //     Course?.attributes?.shortname == "masterclass"
  //       ? Course?.attributes?.Selling_Price
  //       : "549"
  //   );
  // }, [Course?.attributes?.shortname]);

  useEffect(() => {
    if (Course?.attributes?.Summary) {
      setSummary(Course?.attributes?.Summary);
    }
  }, [Course?.attributes?.Summary]);

  useEffect(() => {
    if (Course?.attributes?.shortname !== "masterclass") {
      if (price == "yearly") {
        setOriginalPrice(Math.floor(1999 + 1999 * 0.2));
      }
      if (price == "quarterly") {
        setOriginalPrice(Math.floor(549 + 549 * 0.2));
      }

      if (price == "monthly") {
        setOriginalPrice(Math.floor(199 + 199 * 0.2));
      }
    }
  }, [price]);

  useEffect(() => {
    console.log("Disocunted: ", discountedPrice);
  }, [discountedPrice]);

  useEffect(() => {
    console.log("Original: ", originalPrice);
  }, [originalPrice]);

  // useEffect(() => {
  //   console.log(
  //     " Course.attributes.Original_Price: ",
  //     Course?.attributes.Original_Price
  //   );
  // }, [Course.attributes.Original_Price]);
  return (
    <>
      <Head>
        <title>Courses that KingsChart offers</title>
      </Head>

      <div className="container mx-auto px-5 lg:px-20 fixed w-full z-50 left-0 right-0 pt-5">
        <Header username={user.username} jwt={cookies.jwt} />
      </div>

      <div className="bg-gray-900 py-10 pt-24">
        <div className="flex flex-col-reverse lg:flex-row">
          <div className="w-full lg:w-1/2 p-5 lg:p-20">
            <p className="text-brand">
              {course.charAt(0).toUpperCase() + course.slice(1)}
            </p>
            <h1 className="text-5xl text-white font-bold mt-4">
              {Course.attributes.Title}
            </h1>
            <ul className="text-white opacity-80 my-5">
              {Course.attributes.Summary.split("|").map((element, index) => (
                <li key={index}>
                  <span className="mx-2">-</span>
                  {element}
                </li>
              ))}
            </ul>

            <div className="flex text-white py-1 lg:items-center flex-col lg:flex-row">
              {Course.attributes.shortname == "masterclass"
                ? !user.Premium && (
                    <div
                      className={`${
                        Course.attributes.shortname == "masterclass"
                          ? "border-r"
                          : "w-full"
                      } flex p-5 `}
                    >
                      <div>
                        <h3 className="text-5xl font-bold">
                          <span className="text-sm">$</span>
                          {Course.attributes.Selling_Price}
                        </h3>
                        <p className="opacity-80 text-md">
                          {Course.attributes.Pricing_Type}
                        </p>
                      </div>
                      <div className="px-5 opacity-40">
                        <h5 className="text-4xl font-bold line-through opacity-80">
                          <span className="text-sm">$</span>
                          {Course.attributes.Original_Price}
                        </h5>
                        <p className="opacity-80 text-md">
                          {Course.attributes.Pricing_Type}
                        </p>
                      </div>
                    </div>
                  )
                : !user.Premium && (
                    <div className="flex p-5">
                      <div>
                        <h3 className="text-4xl font-bold">
                          <span className="text-sm">$</span>
                          {price == "yearly" && 1999}
                          {price == "quarterly" && 549}
                          {price == "monthly" && 199}
                        </h3>
                        <p className="opacity-80 text-md">
                          {Course.attributes.Pricing_Type}
                        </p>
                      </div>

                      <div className="ml-5 opacity-40">
                        <h3 className="text-3xl font-bold">
                          <span className="text-sm">$</span>
                          {price == "yearly" && Math.floor(1999 + 1999 * 0.2)}
                          {price == "quarterly" && Math.floor(549 + 549 * 0.2)}
                          {price == "monthly" && Math.floor(199 + 199 * 0.2)}
                        </h3>
                        <p className="opacity-80 text-md">Previous Price</p>
                      </div>
                    </div>
                  )}

              {Course.attributes.shortname == "masterclass" ? (
                <div className="flex w-full lg:w-auto">
                  <div className="p-5 text-center flex flex-col">
                    <div className="flex justify-center h-10">
                      <FontAwesomeIcon width="20" icon={faClock} />
                    </div>
                    <p>
                      <small>{Course.attributes.Total_Time} mins</small>
                    </p>
                  </div>

                  <div className="p-5 text-center flex flex-col">
                    <div className="flex justify-center h-10">
                      <FontAwesomeIcon width="20" icon={faChartBar} />
                    </div>
                    <p>
                      <small>{Course.attributes.Level}</small>
                    </p>
                  </div>

                  <div className="p-5 text-center flex flex-col">
                    <div className="flex justify-center h-10">
                      <FontAwesomeIcon width="20" icon={faUsers} />
                    </div>
                    <p>
                      <small>
                        {Course.attributes.Total_Enrolled}K enrolled
                      </small>
                    </p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>

            {Course.attributes.shortname == "masterclass"
              ? ""
              : !user.Premium && (
                  <div className="mt-5 grid grid-cols-2 lg:grid-cols-3 gap-5 mb-10 select-none">
                    <div
                      onClick={() => {
                        setPrice("yearly");
                        setDiscountedPrice("1999");
                      }}
                      className="flex items-center  bg-white p-5 rounded-md cursor-pointer"
                    >
                      <div>
                        <input
                          checked={price == "yearly"}
                          onChange={(e) => {
                            setPrice(e.target.value);
                            setDiscountedPrice("1999");
                          }}
                          value="yearly"
                          name="price_package"
                          type="radio"
                        />
                      </div>
                      <div className="px-3">
                        <h3 className="font-bold text-4xl">
                          <small>$</small>
                          1999
                        </h3>
                        <div>
                          <p>
                            <small>Yearly</small>
                          </p>
                          <p className="text-green-500">
                            <small>20% off</small>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => {
                        setPrice("quarterly");
                        setDiscountedPrice("549");
                      }}
                      className="flex items-center bg-white p-5 rounded-md cursor-pointer"
                    >
                      <div className="flex">
                        <input
                          checked={price == "quarterly"}
                          onChange={(e) => {
                            setPrice(e.target.value);
                            setDiscountedPrice("549");
                          }}
                          value="quarterly"
                          name="price_package"
                          type="radio"
                        />
                      </div>
                      <div className="px-3">
                        <h3 className="font-bold text-4xl">
                          <small>$</small>
                          549
                        </h3>
                        <div>
                          <p>
                            <small>Quarterly</small>
                          </p>
                          <p className="text-green-500">
                            <small>20% off</small>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => {
                        setPrice("monthly");
                        setDiscountedPrice("199");
                      }}
                      className="flex items-center bg-white p-5 rounded-md cursor-pointer"
                    >
                      <div className="flex">
                        <input
                          checked={price == "monthly"}
                          onChange={(e) => {
                            setPrice(e.target.value);
                            setDiscountedPrice("199");
                          }}
                          value="monthly"
                          name="price_package"
                          type="radio"
                        />
                      </div>
                      <div className="px-3">
                        <h3 className="font-bold text-4xl">
                          <small>$</small>
                          199
                        </h3>
                        <div>
                          <p>
                            <small>Monthly</small>
                          </p>
                          <p className="text-green-500">
                            <small>20% off</small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

            <div className="mt-5">
              {course == "premium" ? (
                !user.Premium ? (
                  <Link
                    href={{
                      pathname: `/checkout/${course}`,
                      query: {
                        discountedPrice: discountedPrice,
                        originalPrice: originalPrice,
                        totalTime: Course?.attributes?.Total_Time,
                        totalEnrolled: Course?.attributes?.Total_Enrolled,
                        level: Course?.attributes?.Level,
                        courseSummary: Course.attributes.Summary,
                      },
                    }}
                  >
                    <a className="hover:bg-black px-20 bg-brand text-black hover:text-white py-4">
                      Enroll Now
                    </a>
                  </Link>
                ) : (
                  <Link href={`/premium`}>
                    <a className="hover:bg-black px-20 bg-brand text-black hover:text-white py-4">
                      Visit
                    </a>
                  </Link>
                )
              ) : !user.Masterclass ? (
                <Link
                  href={{
                    pathname: `/checkout/${course}`,
                    query: {
                      discountedPrice: discountedPrice,
                      originalPrice: originalPrice,
                      totalTime: Course?.attributes?.Total_Time,
                      totalEnrolled: Course?.attributes?.Total_Enrolled,
                      level: Course?.attributes?.Level,
                      courseSummary: Course.attributes.Summary,
                    },
                  }}
                >
                  <a className="hover:bg-black px-20 bg-brand text-black hover:text-white py-4">
                    Enroll Now
                  </a>
                </Link>
              ) : (
                <Link
                  href={`/classroom/${course}/${encodeURIComponent(
                    "01. Introduction"
                  )}`}
                >
                  <a className="hover:bg-black px-20 bg-brand text-black hover:text-white py-4">
                    Open Classroom
                  </a>
                </Link>
              )}
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-end items-center relative">
            <video
              onContextMenu={(e) => e.preventDefault()}
              controlsList="nodownload"
              className=" select-none w-full h-auto"
              controls
            >
              <source
                src={`${settings.ROOT}${Course.attributes.Trailer.data.attributes.url}`}
                type="video/mp4"
              />
              Update to a more recent brower
            </video>
          </div>
        </div>
      </div>

      <div className="container px-5 lg:px-20 mx-auto mt-20">
        <h2 className="text-4xl font-bold mb-4 capitalize">
          About the {course}
        </h2>
      </div>

      <div className="container mx-auto mt-10 px-5 lg:px-20 flex flex-col lg:flex-row w-full justify-between items-start">
        <div className="w-full lg:w-1/2">
          <p className="opacity-60 course-text lg:pr-10">
            {ReactHtmlParser(marked.parse(Course.attributes.Description))}
          </p>
        </div>

        <div className="w-full lg:w-1/2 text-center lg:text-right">
          <img
            className="w-auto inline-block"
            src={`${settings.ROOT}${Course.attributes.Featured_Image.data.attributes.url}`}
          />
        </div>
      </div>

      <div className="container mx-auto mt-36 px-5 lg:px-20 flex flex-col lg:flex-row w-full justify-between items-center">
        <div className="w-full">
          <h2 className="text-4xl font-bold mb-4">What you will learn</h2>
          {/* <p className="opacity-60 prose">{ReactHtmlParser(marked.parse(Course.attributes.Summary))}</p> */}
          <div className="flex items-center">
            <ul className="p-10 opacity-80 my-5 bg-white grid grid-cols-1 md:grid-cols-2 lg:w-2/3">
              {Course.attributes.Learning_Outcome.split("|").map(
                (element, index) => (
                  <li key={index} className="my-2 flex items-center p-5">
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="mr-5 text-green-500 text-xl"
                    />
                    <p>{element}</p>
                  </li>
                )
              )}
            </ul>
            <div className="flex-1">
              <img
                src="https://source.unsplash.com/random/500x500"
                className=" w-auto"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-40 lg:px-20">
        <h2 className="text-5xl font-bold text-center">
          What our Happy Students say
        </h2>
      </div>

      <div className="mt-10 mb-40 mx-auto container px-20">
        <Swiper
          className="py-10 items-center"
          loop={true}
          spaceBetween={20}
          autoplay={{ delay: 1000 }}
          centeredSlides={true}
          breakpoints={{
            // when window width is >= 640px
            576: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {[
            {
              id: 0,
              name: "Inaya Kaur",
              gender: "woman",
              message:
                "I have been following King’s Charts for many months now, and I am proud to say that I got the chance to follow its trading calls. My portfolio has shot up, and now I am more confident in my trades than ever before.",
            },
            {
              id: 1,
              name: "Albert Weber",
              gender: "man",
              message:
                "I used to be very fascinated with the concept of crypto trading, however there was no defined place where I could learn the basics of trading and analysis. The masterclass provided by King’s Charts was a game changer, and I think it was one of the best investments that I ever made.",
            },
            {
              id: 2,
              name: "Mudit",
              gender: "man",
              message:
                " The signals presented by King’s Charts are not only accurate, but are easy to apply as well. The consistency and accuracy of the calls has made me hooked to trading crypto, and now I am proud of the status of my portfolio.",
            },
            {
              id: 3,
              name: "Kouki Satō",
              gender: "woman",
              message:
                "I was into the crypto space for a while before I started to actively monitor the calls by King’s Charts. I have never seen a better growth in my portfolio. Thank you King’s Charts!",
            },
            {
              id: 4,
              name: "Ananya Ray",
              gender: "woman",
              message:
                "If you are a beginner who wants to learn the nuances of advanced technical analysis, there is no better place than King’s Masterclass. The masterclass is meticulously divided into small chapters so that the user can navigate at their own convenience.",
            },
            {
              id: 5,
              name: "Tyagi Biswas",
              gender: "man",
              message:
                "My life got changed after I started following the calls of King’s Charts. The interaction of the VIP community has expanded my horizon as a trader, and I shall forever be grateful to King’s Charts for that! Thank you!",
            },
          ].map((element) => (
            <SwiperSlide className="p-10 shadow-lg" key={element.id}>
              <div className="flex items-center">
                <Avatar
                  className="w-16 h-16"
                  {...{
                    id: element.id,
                    sex: element.gender,
                    hatStyle: "none",
                    hairStyle: `${
                      element.gender == "woman" ? "womanLong" : "thick"
                    }`,
                  }}
                />

                <div className="mx-5">
                  <h5>{element.name}</h5>
                  {/* <small className="opacity-80">{element.job}</small> */}
                </div>
              </div>

              <p className="mt-5 font-thin opacity-70">{element.message}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <FAQ faqs={FAQs} />

      <div className="container mx-auto px-5 lg:px-20">
        <Footer />
      </div>
    </>
  );
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

  const cookies = context.req.cookies;

  const userResponse = await fetch(`${settings.APIURL}/users/me`, {
    headers: {
      Authorization: `Bearer ${cookies.jwt}`,
    },
  });
  const userData = await userResponse.json();

  const faqResponse = await fetch(`${settings.APIURL}/faqs?${faqQuery}`);
  const faqData = await faqResponse.json();

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
      FAQs: faqData,
      Course: courseData?.data[0],
      user: userData,
    },
  };
}
