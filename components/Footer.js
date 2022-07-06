import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faInstagram,
  faLinkedinIn,
  faSpotify,
  faTelegram,
  faTelegramPlane,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Footer = () => (
  <div>
    <div className="flex md:flex-wrap justify-between pt-20 flex-col lg:flex-row">
      <div className="md:p-8 xl:p-0 md:w-full xl:w-1/4 lg:pr-5">
        <h6 className="text-lg italic mt-10">
          KING'S<span className="font-bold">CHARTS</span>
        </h6>

        <ul className="mt-5">
          <li className="mr-3 inline-block">
            <a target="_blank" href="https://www.youtube.com/c/KingChart007">
              <FontAwesomeIcon height={20} icon={faYoutube} />
            </a>
          </li>
          <li className="mx-3 inline-block">
            <a
              target="_blank"
              href="https://open.spotify.com/show/1KiPAtxH1I3zCNXpV3J8ia?si=bc7e4c32056f4606"
            >
              <FontAwesomeIcon height={20} icon={faSpotify} />
            </a>
          </li>

          <li className="mx-3 inline-block">
            <a target="_blank" href="https://www.instagram.com/kingscharts/">
              <FontAwesomeIcon height={20} icon={faInstagram} />
            </a>
          </li>
          <li className="mx-3 inline-block">
            <a
              href="https://t.me/Kingchart"
              target="_blank"
            >
              <FontAwesomeIcon height={20} icon={faTelegramPlane} />
            </a>
          </li>

          {/* <li className="mx-3 inline-block">
            <a
              target="_blank"
              href="https://www.facebook.com/profile.php?id=100076961797256"
            >
              <a className="hover:text-[#FD4C5C]">
                <FontAwesomeIcon height={20} icon={faFacebookSquare} />
              </a>
            </a>
          </li> */}

          <li className="ml-3 inline-block">
            <a
              href="https://twitter.com/kingscharts"
              target="_blank"
            >
              <FontAwesomeIcon height={20} icon={faTwitter} />
            </a>
          </li>
        </ul>
      </div>

      <div className="p-5 md:w-1/3 lg:w-1/4">
        <ul className="text-[#000B33]">
          <li className="font-bold mb-3">Quick Links</li>

          <li className="opacity-80 mt-5">
            <Link href="/blog">
              <a>Blog</a>
            </Link>
          </li>

          <li className="opacity-80 mt-5">
            <Link href="/contact">
              <a>Contact us</a>
            </Link>
          </li>

          <li className="opacity-80 mt-5">
            <Link href="/courses/masterclass">
              <a>Masterclass</a>
            </Link>
          </li>

          <li className="opacity-80 mt-5">
            <Link href="/courses/premium">
              <a>Premium</a>
            </Link>
          </li>
        </ul>
      </div>

      <div className="p-5  md:w-1/3 lg:w-1/4">
        <ul className="text-[#000B33]">
          <li className="font-bold mb-3">Legal</li>

          <li className="opacity-80 mt-5">
            <Link href="/terms">
              <a>Terms and Conditions</a>
            </Link>
          </li>

          <li className="opacity-80 mt-5">
            <Link href="/privacy">
              <a>Privacy Policy</a>
            </Link>
          </li>

          <li className="opacity-80 mt-5">
            <Link href="/refund">
              <a>Refund Policy</a>
            </Link>
          </li>
        </ul>
      </div>

      <div className="p-5  md:w-1/3 lg:w-1/4">
        <ul className="text-[#000B33]">
          <li className="font-bold mb-3">Reach us at</li>

          {/* <li className="mt-5">
            <a className="flex items-center " href="https://t.me/Kingchart">
              <span className="mr-2">
                <FontAwesomeIcon
                  className="text-[#09183F]"
                  icon={faTelegramPlane}
                  width={20}
                />
              </span>
              <span className="opacity-80">@kingscharts</span>
            </a>
          </li> */}

          <li className="mt-5">
            <a className="flex items-center" href="mailto:hello@kingscharts.io">
              <span className="mr-2 ">
                <FontAwesomeIcon
                  className="text-[#09183F]"
                  icon={faEnvelope}
                  width={20}
                />
              </span>
              <span className="opacity-80">hello@kingscharts.io</span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div className="mt-10 text-center text-[#000B33] text-md">
      <hr className="opacity-80" />
      <p className="py-10 opacity-60">
        © 2022 King’s Charts All Rights Reserved.
      </p>
    </div>
  </div>
);

export default Footer;
