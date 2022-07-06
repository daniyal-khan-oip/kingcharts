import { faGgCircle } from "@fortawesome/free-brands-svg-icons";
import {
  faCircle,
  faCircleNotch,
  faDotCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import settings from "../../../settings";
const qs = require("qs");
import { parseCookies } from "nookies";

import ReactHtmlParser from "react-html-parser";
import { marked } from "marked";
import { useState } from "react";

function fancyTimeFormat(duration) {
  // Hours, minutes and seconds
  var hrs = ~~(duration / 3600);
  var mins = ~~((duration % 3600) / 60);
  var secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = "";

  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
}

export default function Classroom({ Course, user, Chapter }) {
  const router = useRouter();
  const cookies = parseCookies();
  const { classroom, chapter, lang } = router.query;
  const [downloadsDropdowmState, setDownloadsDropdownState] = useState(false);

  if (cookies.jwt && user.logged_in_device_identifier !== cookies.session_id) {
    destroyCookie(null, 'jwt', { path: '/' })
    destroyCookie(null, 'session_id', { path: '/' })
  }
  
  if (Chapter.meta.pagination.total == 1) {
    return (
      <>
        <Head>
          <title>{classroom} -Classroom</title>
        </Head>

        <div className="container mx-auto px-5 lg:px-20 fixed w-full z-50 left-0 right-0 pt-4">
          <Header username={user.username} jwt={cookies.jwt} />
        </div>

        <div className="pt-24">
          <div className="container mx-auto px-5 lg:px-20 flex flex-col lg:flex-row border">
            <div className="lg:border-r p-5 w-full lg:w-4/6">
              <h1 className="text-4xl py-5 font-semibold mt-4">
                {Course.attributes.Title}
              </h1>
              <video
                onContextMenu={(e) => e.preventDefault()}
                controlsList="nodownload"
                className="select-none w-full h-auto"
                controls
              >
                <source
                  src={`${settings.ROOT}${Chapter.data[0].attributes.Content.data[0].attributes.url}`}
                  type="video/mp4"
                />
                Update to a more recent brower
              </video>
            </div>

            <div className="lg:border-l p-5 w-full lg:w-2/6">
              <div className="flex justify-between items-center">
                <span>Lesson {chapter.slice(0, 2)}</span>
                {Chapter.data[0].attributes.next_chapter.data !== null ? (
                  <a
                    href={`/classroom/masterclass/${encodeURIComponent(
                      Chapter.data[0].attributes.next_chapter.data.attributes
                        .Title
                    )}${lang == undefined ? "" : `?lang=${lang}`}`}
                    className="px-6 py-3 bg-[#334CB9] text-white text-sm"
                  >
                    Next Lesson
                  </a>
                ) : (
                  ""
                )}
              </div>

              {/* {Course.attributes.chapters &&  */}
              <ul className="mt-5 h-96 overflow-y-auto">
                {Course.attributes.chapters.data
                  .sort((a, b) =>
                    a.attributes.Title > b.attributes.Title ? 1 : -1
                  )
                  .map((element) => (
                    <a
                      key={element.id}
                      href={`/classroom/${classroom}/${encodeURIComponent(
                        element.attributes.Title
                      )}${lang === undefined ? "" : `?lang=${lang}`}`}
                    >
                      <li
                        className={`cursor-pointer flex ${chapter == element.attributes.Title
                          ? "bg-[#D2D8F6]"
                          : "bg-white"
                          } w-full p-5 items-center`}
                        key={element.id}
                      >
                        <FontAwesomeIcon
                          className="mr-2"
                          height={15}
                          icon={faCircle}
                        />
                        <div>
                          <h2>{element.attributes.Title}</h2>
                          <small>
                            {fancyTimeFormat(element.attributes.Duration)}
                          </small>
                        </div>
                      </li>
                    </a>
                  ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-5 lg:px-20">
          <div className="py-10">
            {Chapter.data[0].attributes.Article ? (<>
              <div className="flex justify-between">
                <span className="text-xl block font-medium">Description</span>
                {Chapter.data[0].attributes.downloadables.data ? 
                <button className="relative">
                  <span onClick={()=> setDownloadsDropdownState(!downloadsDropdowmState)} className="text-md px-5 py-2 bg-brand text-black hover:text-white hover:bg-black ">Download files</span>
                  <ul className={`${downloadsDropdowmState ? "absolute top-full left-full -translate-x-full hover:black bg-white z-50 shadow-lg w-full" : "hidden"} `}>
                    {
                      Chapter.data[0].attributes.downloadables.data.map(item => <a target="_blank" key={item.id} href={settings.ROOT+item.attributes.url}><li className="hover:bg-black hover:p-2 hover:text-white p-1">{item.attributes.name}</li></a>)
                    }
                  </ul>
                </button> : ""}
              </div>
              <div className="overflow-y-scroll w-full h-56 lg:h-96 bg-gray-100 mt-5 p-10 blog-content">
                {ReactHtmlParser(
                  marked.parse(Chapter.data[0].attributes.Article)
                )}
              </div>
            </>
            ) : (
              ""
            )}
          </div>
          
        </div>

        <div className="container mx-auto px-5 lg:px-20">
          <Footer />
        </div>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>{classroom} -Classroom</title>
        </Head>
        <div className="h-screen w-screen flex justify-center items-center">
          <div className="text-center">
            <h1 className="text-2xl">Something went wrong :)</h1>
            <p>Contact the support team <a href="mailto:hello@kingscharts.io">hello@kingscharts.io</a></p>
          </div>
        </div>
      </>
    )
  }
}

export async function getServerSideProps(context) {
  const cookies = context.req.cookies;
  const courseQuery = qs.stringify({
    populate: "*",
    filters: {
      Shortname: {
        $eq: context.query.classroom,
      },
    },
  });

  const courseResponse = await fetch(
    `${settings.APIURL}/courses?${courseQuery}`,
    {
      headers: {
        Authorization: `Bearer ${cookies.jwt}`,
      },
    }
  );
  const courseData = await courseResponse.json();

  const userResponse = await fetch(`${settings.APIURL}/users/me`, {
    headers: {
      Authorization: `Bearer ${cookies.jwt}`,
    },
  });
  const userData = await userResponse.json();

  const chapterQuery = qs.stringify({
    populate: "*",
    filters: {
      Title: {
        $eq: context.query.chapter,
      },
    },
  });
  console.log(chapterQuery)

  const chapterResponse = await fetch(
    `${settings.APIURL}/chapters?${chapterQuery}`,
    {
      headers: {
        Authorization: `Bearer ${cookies.jwt}`,
      },
    }
  );
  const chapterData = await chapterResponse.json();

  console.log(chapterData)
  return {
    props: {
      Course: courseData?.data[0],
      user: userData,
      Chapter: chapterData,
    },
  };
}
