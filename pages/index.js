import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import FAQ from "../components/FAQ";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faInstagram,
  faLinkedinIn,
  faSpotify,
  faTelegram,
  faTelegramPlane,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import {
  faArrowDown,
  faArrowRight,
  faCalendar,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import Accordion from "../components/Accordion";
import axios from "axios";
import settings from "../settings";
import moment from "moment";
import nookies, { parseCookies } from "nookies";

import Avatar, { genConfig } from 'react-nice-avatar'

const qs = require("qs");

export default function Home({ FAQs, blogs, user }) {
  SwiperCore.use([Autoplay]);

  const [isPopupVisible, setPopupVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [success, SetSuccess] = useState("");

  const [showAbout, setShowAbout] = useState(false);
  const cookies = parseCookies();


  const config = genConfig({})

  function subscribe(e) {
    e.preventDefault();
    // setclicked(true);
    if (email !== "") {
      axios
        .post(`${settings.APIURL}/email-lists`, {
          data: {
            Email: email,
          },
        })
        .then(function (response) {
          if (response.status == 200) {
            SetSuccess("You're Subscribed.");
          }
        })
        .catch(function (error) {
          if (
            error.response.data.error.message == "This attribute must be unique"
          ) {
            SetSuccess("You're already subscribed");
          } else {
            SetSuccess("Try Again Later");
          }
        });
    }
  }

  return (
    <div>
      <Head>
        <title>King's Charts</title>
        <link rel="icon" href="/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {isPopupVisible ? (
        <div
          style={{
            marginTop: "5em",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: "10",
          }}
          className="shadow-xl flex p-5 fixed bg-white rounded-lg items-center w-full lg:w-auto gap-5"
        >
          <p>Join our free telegram group to get a free weekly trade call</p>

          <a
            href="https://t.me/Kingchart"
            target="_blank"
            className="text-black font-bold text-sm bg-brand p-3 rounded-sm"
          >
            Join now
          </a>

          <span
            onClick={() => setPopupVisible(false)}
            className="text-xl ml-5 cursor-pointer"
          >
            &times;
          </span>
        </div>
      ) : (
        ""
      )}
      <div className="container mx-auto px-5 lg:px-20 fixed w-full z-50 left-0 right-0 pt-5">
        <Header username={user.username} jwt={cookies.jwt} />
      </div>
      <div
        className="min-h-screen w-screen flex items-center justify-center relative pt-24"
        style={{ backgroundImage: "url('/herobg.png')" }}
      >
        {/* <img src="/ellipse.png" className="absolute left-0 mt-36 -z-10" /> */}

        <div className="container mx-auto px-5 lg:px-20 flex lg:min-h-screen gap-5 items-center w-full flex-col-reverse lg:flex-row">
          <div className="lg:w-6/12 ">
            <div>
              <h1 className="text-4xl lg:text-6xl text-[#000B33] font-black whitespace-normal capitalize">
                Start your L(earn)ing journey today
              </h1>
              <p className="my-10 opacity-80">
                Sign up to get details about our crypto masterclass and our
                premium trading calls group
              </p>

              <form onSubmit={subscribe} className="rounded-lg flex justify-between">
                <div className="bg-white p-3 w-8/12">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-3 rounded-lg"
                    type="email"
                    placeholder="Email Address*"
                  />
                </div>

                <button
                  className={`w-4/12 bg-brand hover:bg-black hover:text-white text-black font-bold text-sm px-3 ${success == "Done" || success == "You're already subscribed"
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                    }`}
                  type="submit"
                  disabled={
                    success == "Done" || success == "You're already subscribed"
                  }
                // disabled={sent}
                >
                  {success !== "" ? success : "I'm Ready to L(earn)"}
                </button>
              </form>


              <div className="mt-10">
                <p>Languages we support</p>
                <ul className="grid grid-cols-6 text-gray-500 mt-4">
                  <li className="p-1">English</li>
                  <li className="p-1">नमस्ते</li>
                  <li className="p-1">こんにちは</li>
                  <li className="p-1">Hej</li>
                  <li className="p-1">Bonjour</li>
                  <li className="p-1">你好!</li>
                  <li className="p-1">今日は</li>
                  <li className="p-1">안녕하세요</li>
                  <li className="p-1">Hola</li>
                  <li className="p-1">Привет</li>
                  <li className="p-1">γεια σας</li>
                  <li className="p-1">Hallo</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex-1 flex justify-end  w-full lg:w-5/12 drop-shadow-lg">
            <div className="relative">
              {/* <img src="/hero-banner.png" />
               */}
              <video className="w-full h-auto bg-red-400" controls>
                <source
                  src="https://backend.kingscharts.io/uploads/Crypto_Masterclass_Final_English_cb937b624a.mp4?updated_at=2022-02-08T14:21:12.311Z"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
              <img src="/half-circle.svg" className="absolute -top-16 -z-10 right-0" />
              <img src="/half-circle.svg" className="absolute top-1/2 -translate-y-1/2 -z-10 -left-6" />
            </div>
          </div>

        </div>
        <div className="bg-[#FFFDF0] absolute top-0 left-0 h-full w-full -z-10"></div>
      </div>


      <div className="bg-[#fefff8c0] py-20">
        <div className="container px-5 lg:px-20 mx-auto">
          <div className="flex gap-5 py-10 flex-wrap lg:flex-nowrap">
            <a className="w-full lg:w-1/2">
              <div className="p-10 drop-shadow-2xl text-center bg-white">
                <img className="w-20 inline-block m-5" src="/star.svg" />
                <h4 className="font-bold text-xl">Masterclass Pack</h4>
                <p className="opacity-60 mt-3 text-justify">
                  Our Crypto trading Masterclass not only gives you a basic
                  background of technical analysis but also goes further and
                  dives into the most advanced techniques used by crypto
                  investors particularly focussing upon the Elliott Wave Trading
                  Pattern. Explore now!
                </p>

                <div className="mt-10">
                  <a
                    href="/courses/masterclass"
                    className="px-8 bg-brand hover:bg-black text-black hover:text-white py-3"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </a>
            <a className="w-full lg:w-1/2 h-full">
              <div className="p-10 drop-shadow-2xl text-center bg-white">
                <img className="w-20 inline-block m-5" src="/diamond.svg" />
                <h4 className="font-bold text-xl">Premium Pack</h4>
                <p className="opacity-60 mt-3 text-justify">
                  The King's Charts Premium Group exists with one simple purpose
                  - "help the members secure the most profitable crypto trades".
                  With our daily crypto signals that hold a 90% accuracy record,
                  the odds of you making money from your crypto investments is
                  almost 100%.
                </p>

                <div className="mt-10">
                  <a
                    href="/courses/premium"
                    className="px-8 bg-brand hover:bg-black text-black hover:text-white py-3"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 pb-5 flex-wrap lg:flex-nowrap">
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
              // target="_blank"
              // href=""
              disabled
              className="bg-white p-5 shadow-lg cursor-not-allowed"
            >
              <img src="/discord.png" />
              <h4 className="font-bold mt-1">Discord</h4>
              <small className="opacity-50">Coming soon</small>
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
      </div>


      <div className="container mx-auto px-5 lg:px-20 py-20">
        <h1 className="uppercase text-6xl text-center">Featured <span className="font-bold">in</span></h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-16">

          <div className="p-5 flex items-center justify-center">
            <img src="/featuredin/001.png" />
          </div>

          <div className="p-5 flex items-center justify-center">
            <img className="w-auto" src="/featuredin/002.png" />
          </div>

          <div className="p-5 flex items-center justify-center">
            <img src="/featuredin/003.png" />
          </div>

          <div className="p-5 flex items-center justify-center">
            <img src="/featuredin/004.png" />
          </div>

          <div className="p-5 flex items-center justify-center">
            <img src="/featuredin/005.png" />
          </div>

          <div className="p-5 flex items-center justify-center">
            <img src="/featuredin/006.png" />
          </div>

          <div className="p-5 flex items-center justify-center">
            <img src="/featuredin/007.png" />
          </div>

          <div className="p-5 flex items-center justify-center">
            <img src="/featuredin/008.png" />
          </div>
        </div>
      </div>

      {/* About us */}
      <div className="flex items-start lg:justify-between px-5 lg:px-20 py-20 flex-col-reverse lg:flex-row bg-[#F8FBFF]">
        <div className="lg:w-1/2 lg:pr-20">
          <h2 className="text-4xl font-bold">About Us</h2>
          <p className="mt-5 opacity-70">
            King's Charts started with a simple mission, help the Indian
            Investors find their groove in a very imminent crypto market. Today,
            6 years later, what started as a simple trading telegram channel has
            now grown into a robust community of new age investors who thanks to
            Kings Charts, are not just financially savvy but also future ready.
            After years of undying support from its users, Kings Charts is now
            taking the next step in achieving its mission by transforming into a
            full fledged crypto ecosystem set to guide and support anyone and
            everyone interested.
          </p>
          {showAbout ? (
            <>
              <p className="mt-5 opacity-70">
                Under the new and improved Kings Charts, We are offering
              </p>
              <p className="mt-5 opacity-70">
                A. The Crypto Masterclass, a sure shot way to learning technical
                crypto analysis and Eliott Wave trading patterns along with live
                Q &amp;A sessions with our in-house crypto genius.
              </p>
              <p className="mt-5 opacity-70">
                B. Telegram channels to learn and grow together with hundreds of
                other traders and crypto enthusiasts.
              </p>
              <p className="mt-5 opacity-70">
                C. Daily trading signals with a track record of 90% accuracy.
              </p>
              <p className="mt-5 opacity-70">
                So, whether you are a trader who wants to maximize his profits,
                a beginner who just needs help getting started, or simply a
                fellow enthusiast curious about the magnificent cryptoverse,
                Kings Charts has got you covered.
              </p>
              <p className="mt-5 opacity-70">
                So, join us and hundreds of others in our collective journey to
                financial freedom!
              </p>{" "}
            </>
          ) : (
            ""
          )}

          <div className="mt-5">
            <a
              onClick={() => setShowAbout(!showAbout)}
              className="px-8 bg-brand hover:bg-black text-black hover:text-white py-3 cursor-pointer"
            >
              {!showAbout ? "Show more" : "Show less"}
            </a>
          </div>
        </div>

        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <div className="relative z-0">
            <div className="z-10 relative w-full h-auto">
            <video className="w-full h-auto bg-red-400" controls>
              <source
                src="https://backend.kingscharts.io/uploads/Crypto_Masterclass_Final_English_cb937b624a.mp4?updated_at=2022-02-08T14:21:12.311Z"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <ul className="mt-5">
              <li className="mr-5 inline-block">
                <a
                  href="https://t.me/Kingchart"
                  target="_blank"
                  className="hover:text-brand"
                >
                  <FontAwesomeIcon height={15} icon={faTelegramPlane} />
                </a>
              </li>

              <li className="mr-5 inline-block">
                <a
                  target="_blank"
                  href="https://www.instagram.com/kingscharts/"
                  className="hover:text-brand"
                >
                  <FontAwesomeIcon height={15} icon={faInstagram} />
                </a>
              </li>

              <li className="mr-5 inline-block">
                <a
                  target="_blank"
                  href="https://open.spotify.com/show/1KiPAtxH1I3zCNXpV3J8ia?si=bc7e4c32056f4606"
                  className="hover:text-brand"
                >
                  <FontAwesomeIcon height={15} icon={faSpotify} />
                </a>
              </li>

              <li className="mr-5 inline-block">
                <a
                  href="https://twitter.com/kingscharts"
                  target="_blank"
                  className="hover:text-brand"
                >
                  <FontAwesomeIcon height={15} icon={faTwitter} />
                </a>
              </li>
            </ul>
            </div>
            
            <img src="/dots.png" className="absolute -top-5 -right-5 z-0 w-28" />
            
          </div>
        </div>
      </div>

      <div className="container mx-auto px-5 lg:px-20 bg-[rgba(0,28,128,0.02)]">
        <div className="pt-5">
          <h2 className="text-5xl font-bold">Latest blogs</h2>
        </div>

        <div className=" mb-10 flex justify-center items-center">
          <Swiper
            loop={true}
            modules={[Navigation]}
            navigation
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
              1280: {
                slidesPerView: 4,
              },
            }}
            spaceBetween={10}
          >
            {blogs?.data?.map((element) => (
              <SwiperSlide className="py-10" key={element.id}>
                <div className="shadow-lg">
                  <img
                    className="object-cover object-center h-64"
                    src={`${settings.ROOT}${element.attributes.Featured_Image.data[0].attributes.url}`}
                  />

                  <div className="p-5">
                    <span className="flex items-center text-[#377CFD]">
                      <FontAwesomeIcon
                        style={{ width: "15px" }}
                        icon={faCalendar}
                      />

                      <small className="mx-2">
                        {moment(`${element.attributes.createdAt}`).calendar()}
                      </small>
                    </span>
                    <h4 className="my-5 font-bold">{element.attributes.Title}</h4>
                    <p className="text-sm opacity-80">
                      {element.attributes.Summary.slice(0, 50)} ...
                    </p>

                    <div className="mt-5">
                      <a
                        target="_blank"
                        href={`/blog/${encodeURIComponent(
                          element.attributes.Title
                        )}`}
                      >
                        <span className="flex text-black font-bold cursor-pointer">
                          <a>Read more</a>
                          <FontAwesomeIcon
                            className="mx-5"
                            width="10"
                            icon={faArrowRight}
                          />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="flex items-center justify-between px-5 lg:px-20 flex-wrap">
        <div className="text-center w-1/2 lg:w-1/4 p-5 flex-1 ">
          <h3 className="text-5xl font-bold text-[#2B59FF]">40K+</h3>
          <p>Followers</p>
        </div>

        <div className="text-center w-1/2 lg:w-1/4 p-5">
          <h3 className="text-5xl font-bold text-[#FFC83E]">10+</h3>
          <p>Countries</p>
        </div>

        <div className="text-center w-1/2 lg:w-1/4 p-5">
          <h3 className="text-5xl font-bold text-[#00BB98]">500+</h3>
          <p>Premium Members</p>
        </div>

        <div className="text-center w-1/2 lg:w-1/4 p-5">
          <h3 className="text-5xl font-bold text-[#FD4C5C]">1000+</h3>
          <p>Course Students</p>
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
                {/* <img
                  className="bg-brand rounded-full"
                  src={`https://robohash.org/${element.id}?size=70x70`}
                /> */}

                <Avatar className="w-16 h-16"  {...{ id: element.id, sex: element.gender, hatStyle: 'none', hairStyle: `${element.gender == 'woman' ? "womanLong" : 'thick'}` }} />

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

      <div className="flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 text-center flex justify-center">
          <img className="w-4/6" src="/join-telegram.png" />
        </div>

        <div className="lg:w-1/2 flex justify-center items-center px-20 mt-10">
          <div>
            <h2 className="text-5xl font-bold">Join our free telegram</h2>
            <p className="my-5">
              Join our free telegram for all your questions, Find out about the
              most frequently asked questions related to our online trading
              courses
            </p>

            <div className="mt-10">
              <a target="_blank" href="https://t.me/Kingchart">
                <div className="flex items-center">
                  <a className="px-10 cursor-pointer  py-5 hover:bg-black rounded-full bg-brand text-black hover:text-white">
                    Join Now
                  </a>
                  <FontAwesomeIcon
                    className="mx-5 text-4xl"
                    icon={faTelegramPlane}
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <FAQ faqs={FAQs} />

      <div className="container mx-auto px-5 xl:px-20 relative hidden xl:block">
        <div className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <h2 className="hidden md:block xl:text-4xl font-bold text-white">
            Want us to email you about special offers &amp; updates?
          </h2>
          <form
            onSubmit={subscribe}
            className="flex flex-col xl:flex-row justify-center items-center xl:bg-white rounded-md mt-2 w-full lg:w-3/4"
          >
            <input
              className="p-3 w-full rounded-md"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className={`w-full  bg-brand text-black hover:bg-black hover:text-white p-2 mr-1 rounded-md ${success == "Done" || success == "You're already subscribed"
                ? "opacity-50 cursor-not-allowed xl:w-2/4"
                : "xl:w-1/4"
                }
              `}
              type="submit"
              disabled={
                success == "Done" || success == "You're already subscribed"
              }
            >
              {success !== "" ? "Try Again Later" : "Subscribe"}
            </button>
          </form>
        </div>
        <img src="/newsletter.png" />
      </div>

      <div className="container mx-auto  px-5 lg:px-20 mt-10">
        <Footer />
      </div>
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
  const userData = await userResponse.json();

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

  const blogsResponse = await fetch(`${settings.APIURL}/blogs?populate=*`);
  const blogsData = await blogsResponse.json();

  return {
    props: {
      FAQs: faqData,
      blogs: blogsData,
      user: userData,
    },
  };
}
