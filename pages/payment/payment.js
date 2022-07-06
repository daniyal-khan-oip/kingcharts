import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Head from "next/head";
import settings from "../../settings";
import Header from "../../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import CheckoutForm from "../../components/checkoutform";
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
const qs = require("qs"); 

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51KQVarSBsAitFG6tvDXk2gDEjlLz2aRVxHErcgNcaxgdFLK9sNNom04IiRymlIAd3YU2M26EOO0Sm6XFFbImdV7F001e8X3tIN"
);

function Payment({ user }) {
  const router = useRouter();
  const cookies = parseCookies();
  const {
    price,
    clientSecretKey,
    sellingPrice,
    originalPrice,
    course,
    courseTitle,
    level,
    courseSummary,
    totalTime,
    totalEnrolled,
    id,
    code,
  } = router.query;
  console.log(
    price,
    clientSecretKey,
    courseSummary,
    id,
    code,
    "========================================......"
  );
  const options = {
    // passing the client secret obtained in step 2
    clientSecret: clientSecretKey,
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <div className=" bg-[#90a8fe0d]">
        <Head>
          <title>King's Charts</title>
        </Head>

        <div className="bg-white">
          <div className="container mx-auto px-5 lg:px-20 ">
            <Header jwt={cookies.jwt} username={user?.username} />
          </div>
        </div>
        <div className="container mx-auto px-5 lg:px-20 py-10 d-flex justify-content-center align-items-center">
          <div
            className="mt-5 flex gap-5 lg:flex-row  "
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              flexDirection: "row-reverse",
            }}
          >
            <div className="course-detail">
              <p className="text-brand">{courseTitle}</p>
              <h1
                style={{ textTransform: "capitalize" }}
                className="text-5xl text-white font-bold my-4 text-uppercase"
              >
                {course}
              </h1>
              <ul className="text-white opacity-80 my-5">
                {courseSummary?.split("|").map((element, index) => (
                  <li key={index}>
                    <span className="mx-2">-</span>
                    {element}
                  </li>
                ))}
              </ul>
              <div className="flex text-white py-1 lg:items-center flex-col lg:flex-row">
                <div className="border-r flex p-5 ">
                  <div>
                    <h3 className="text-5xl font-bold">
                      <span className="text-sm">$</span>
                      {sellingPrice}
                    </h3>
                    <p className="opacity-80 text-md">Lifetime</p>
                  </div>
                  <div className="px-5 opacity-40">
                    <h5 className="text-4xl font-bold line-through opacity-80">
                      <span className="text-sm">$</span>
                      {originalPrice}
                    </h5>
                    <p className="opacity-80 text-md">Lifetime</p>
                  </div>
                </div>
                <div className="flex w-full lg:w-auto">
                  <div className="p-5 text-center flex flex-col">
                    <div className="flex justify-center h-10">
                      <FontAwesomeIcon width="20" icon={faClock} />
                    </div>
                    <p>
                      <small>{`${totalTime} min`}</small>
                    </p>
                  </div>
                  <div className="p-5 text-center flex flex-col">
                    <div className="flex justify-center h-10">
                      <FontAwesomeIcon width="20" icon={faChartBar} />
                    </div>
                    <p>
                      <small>{level}</small>
                    </p>
                  </div>
                  <div className="p-5 text-center flex flex-col">
                    <div className="flex justify-center h-10">
                      <FontAwesomeIcon width="20" icon={faUsers} />
                    </div>
                    <p>
                      <small>{`${totalEnrolled} enrolled`}</small>
                    </p>
                  </div>
                </div>
              </div>
              <h1 className="text-4xl text-white font-bold">
                Total Enroll Price:
                {price ? ` $${price}` : "0.00"}
              </h1>
              {/* <h1 className="text-4xl text-white font-bold">
              <span className="text-sm">$</span>
                {price ? `${price}` : "0.00"}
              </h1> */}
            </div>
            <div className="payment-detail">
              <h1 className="text-4xl font-bold">Payment Details</h1>
              <CheckoutForm id={id} code={code} />
            </div>
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default Payment;

export async function getServerSideProps(context) {
  const cookies = context.req.cookies;

  const userResponse = await fetch(`${settings.APIURL}/users/me`, {
    headers: {
      Authorization: `Bearer ${cookies.jwt}`,
    },
  });
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
