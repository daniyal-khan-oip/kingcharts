import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ReactHtmlParser from "react-html-parser";
import { parseCookies } from "nookies";
import settings from "../settings";
import { marked } from "marked";

export default function Refund({ user, refund }) {
  const cookies = parseCookies();

  return (
    <>
      <Head>
        <title>{refund.data.attributes.Heading} | King'sCharts</title>
      </Head>
      <div className="container mx-auto px-5 lg:px-20">
        <Header jwt={cookies.jwt} username={user.username} />

        <h1 className="text-5xl text-center mt-36 font-bold">
          {refund.data.attributes.Heading}
        </h1>

        <div className="p-10 mt-10 opacity-80 blog-content">
          {ReactHtmlParser(marked.parse(refund.data.attributes.Content))}
        </div>

        <Footer />
      </div>
    </>
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

  const refundResponse = await fetch(`${settings.APIURL}/refund-policy`);
  const refundData = await refundResponse.json();

  return {
    props: {
      user: userData,
      refund: refundData,
    },
  };
}
