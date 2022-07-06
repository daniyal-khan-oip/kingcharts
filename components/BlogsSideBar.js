import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import Link from "next/link";
import settings from "../settings";

export default function BlogsSideBar(props) {
  return (
    <div className="bg-white shadow-lg p-5 px-8">
      <form
        style={{ boxShadow: "0px 4px 40px 0px #2B59FF14" }}
        className="flex items-center bg-white"
      >
        <span className="w-2/12 flex justify-center items-center px-1 text-[#FD4C5C]">
          <FontAwesomeIcon width="15" icon={faSearch} />
        </span>
        <input
          className="p-2 py-4 w-10/12"
          placeholder="Type to Search"
          type="text"
        />
      </form>

      <div>
        <h4 className="py-3 text-lg mt-5">Blog Categories</h4>
        <hr />
        <ul className="my-5">
          <li className="opacity-80">
            <Link href="/">
              <a className="py-4 block">Block Chain</a>
            </Link>
            <hr />
          </li>
          <li className="opacity-80">
            <Link href="/">
              <a className="py-4 block">NFT</a>
            </Link>
            <hr />
          </li>
          <li className="opacity-80">
            <Link href="/">
              <a className="py-4 block">Token</a>
            </Link>
            <hr />
          </li>
          <li className="opacity-80">
            <Link href="/">
              <a className="py-4 block">Meta Verse</a>
            </Link>
            <hr />
          </li>
        </ul>
      </div>

      <div className="mt-5">
        <h4 className="py-3 text-lg mt-10">Recent Posts</h4>
        <hr />
        <ul className="my-5">
          {props.blogs.map((element) => (
            <li className="my-2 cursor-pointer">
              <Link
                href={`/blogs/${encodeURIComponent(element.attributes.Title)}`}
              >
                <div className="flex items-center">
                  <div>
                    <img
                      width={100}
                      className="rounded-lg"
                      src={`${settings.ROOT}${element.attributes.Featured_Image.data[0].attributes.url}`}
                    />
                  </div>
                  <div className="p-2 opacity-80">
                    <h4> {element.attributes.Title}</h4>
                    <small className="opacity-70">
                      {" "}
                      {moment(`${element.attributes.createdAt}`).calendar()}
                    </small>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
