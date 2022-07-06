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

import ReactHtmlParser from "react-html-parser";
import { marked } from "marked";
import nookies, { parseCookies } from "nookies";

const qs = require("qs");

export default function Blogs({ BLOG, blogs, user }) {
  const cookies = parseCookies();


  return (
    <div className="bg-[#90a8fe0d]">

      {/* {BLOG.data[0].attributes.SEO ?  */}
      <Head>

      <title>{BLOG.data[0].attributes.SEO.Title}</title>
      {/* <!-- Primary Meta Tags --> */}
      <meta name="title" content={`${BLOG.data[0].attributes.SEO.Title}`} />
      <meta name="description" content={`${BLOG.data[0].attributes.SEO.Description}`} />
      <meta name="keywords" content={`${BLOG.data[0].attributes.SEO.Keywords}`} />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://kingscharts.io/blog/${BLOG.data[0].attributes.SEO.Title}`} />
      <meta property="og:title" content={`${BLOG.data[0].attributes.SEO.Title}`} />
      <meta property="og:description" content={`${BLOG.data[0].attributes.SEO.Description}`} />
      <meta property="og:image" content={`${settings.ROOT}${BLOG.data[0].attributes.Featured_Image.data[0].attributes.url}`} />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`https://kingscharts.io/blog/${BLOG.data[0].attributes.SEO.Title}`} />
      <meta property="twitter:title" content={`${BLOG.data[0].attributes.SEO.Title}`} />
      <meta property="twitter:description" content={`${BLOG.data[0].attributes.SEO.Description}`} />
      <meta property="twitter:image" content={`${settings.ROOT}${BLOG.data[0].attributes.Featured_Image.data[0].attributes.url}`} />
      </Head>

      
      <div className="container mx-auto px-5 lg:px-20 fixed w-full z-50 left-0 right-0 pt-5">
        <Header username={user.username} jwt={cookies.jwt} />
      </div>

      <div className="pb-20 pt-32 container mx-auto px-5 lg:px-20">
        <h1 className="text-5xl font-bold">{BLOG.data[0].attributes.Title}</h1>
        <div className="flex gap-5 mt-10 justify-between">
          <div className="w-full bg-white shadow-lg">
            <img
              className="w-full h-64 object-cover"
              src={`${settings.ROOT}${BLOG.data[0].attributes.Featured_Image.data[0].attributes.url}`}
            />
            <div className="py-5 px-8">
              <ul className="py-2 my-2">
                <li className="flex">
                  <FontAwesomeIcon height={20} icon={faCalendar} />
                  <span className="mx-2">
                    {moment(`${BLOG.data[0].attributes.createdAt}`).calendar()}
                  </span>
                </li>
              </ul>

              <div className="blog-content">
                {ReactHtmlParser(
                  marked.parse(BLOG.data[0].attributes.BlogContent)
                )}
              </div>
            </div>
          
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


  const blogQuery = qs.stringify({
    filters: {
      Title: {
        $eq: context.query.blog,
      },
    },
  });

  const blogResponse = await fetch(
    `${settings.APIURL}/blogs?${blogQuery}&populate=*`
  );
  const blogData = await blogResponse.json();

  const blogsResponse = await fetch(`${settings.APIURL}/blogs?populate=*`);
  const blogsData = await blogsResponse.json();

  return {
    props: {
      BLOG: blogData,
      blogs: blogsData,
      user: userData
    },
  };
}
