import { faArrowRight, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import BlogCard from "../../components/BlogCard";
import BlogsSideBar from "../../components/BlogsSideBar";
import Footer from "../../components/Footer";
import FooterAlt from "../../components/FooterALT";
import Header from "../../components/Header";
import settings from "../../settings";
import nookies, { parseCookies } from "nookies";

export default function Blogs({ blogs, user }) {
  const cookies = parseCookies();

  return (
    <div className="bg-[#90a8fe0d]">
      <Head>
        <title>King's Charts Blogs</title>
      </Head>

      <div className="container mx-auto px-5 lg:px-20 fixed w-full z-50 left-0 right-0 pt-5">
        <Header username={user.username} jwt={cookies.jwt} />
      </div>

      <div className="pb-20 pt-32 container mx-auto px-5 lg:px-20">
        <h1 className="text-5xl font-bold">Blog</h1>
        <div className="flex mt-10 justify-between">
          <div className="w-full pl-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-10">
              {blogs?.data?.map((element) => (
                <div key={element.id}>
                  <div className="shadow-lg">
                    {/* <img
                      src={`${settings.ROOT}${element.attributes.Featured_Image.data[0].attributes.url}`}
                    /> */}
                    <div className="w-full relative">
                      <img
                        className="object-cover object-center h-64 w-full"
                        src={`${settings.ROOT}${element.attributes.Featured_Image.data[0].attributes.url}`}
                      />
                      <span className="py-1 absolute top-2 right-2 text-sm px-4 inline-flex items-center text-black bg-brand">
                        <FontAwesomeIcon
                          icon={faCalendar}
                        />

                        <small className="mx-2">
                          {moment(`${element.attributes.createdAt}`).calendar()}
                        </small>
                      </span>
                    </div>

                    <div className="p-5">
                      <h4 className="my-5 font-bold">
                        {element.attributes.Title}
                      </h4>
                      <p className="text-sm opacity-80">
                        {element.attributes.Summary}
                      </p>

                      <div className="mt-5">
                        <Link
                          href={`/blog/${encodeURIComponent(
                            element.attributes.Title
                          )}`}
                        >
                          <span className="flex items-center py-4 px-4 text-black bg-brand hover:bg-black hover:text-white cursor-pointer">
                            <a>Read more</a>
                            <span className="ml-2">
                              <FontAwesomeIcon
                                icon={faArrowRight}
                              />
                            </span>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* <ul className="mt-5">
              {[
                { id: 1, url: "/" },
                { id: 2, url: "/" },
                { id: 3, url: "/" },
                { id: 4, url: "/" },
              ].map((element) => (
                <li key={element.id} className="inline-block mr-5">
                  <Link href={element.url}>
                    <a
                      className={`${element.id == 1
                        ? "bg-[#FD4C5C] text-white"
                        : "border border-gray-500"
                        } p-2 h-8 w-8 flex items-center justify-center rounded-full`}
                    >
                      {element.id}
                    </a>
                  </Link>
                </li>
              ))}
            </ul> */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-5 lg:px-20">
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

  const blogsResponse = await fetch(`${settings.APIURL}/blogs?populate=*`);
  const blogsData = await blogsResponse.json();

  return {
    props: {
      blogs: blogsData,
      user: userData,
    },
  };
}
