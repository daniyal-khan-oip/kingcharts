import Head from "next/head";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import settings from "../settings";

export default function Done() {
  const router = useRouter();
  // const { id, code } = router.query;

  useEffect(() => {
    confirm();
  }, []);

  const confirm = () => {
    // axios.post(`http://192.168.0.38:1337/api/invoices/checkout`, {
      axios.post(`${settings.APIURL}/invoices/checkout`, {
      code: localStorage.getItem("code"),
      user: localStorage.getItem("id"),
    });
  };
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Head>
        <title>kingscharts | Thanks a lot</title>
      </Head>

      <div className="text-center container mx-auto px-5 lg:px-20">
        <img src="/email.gif" className="w-40 inline-block" />
        <h1 className="font-bold text-2xl">
          Thanks for joining the community.
        </h1>
        <p className=" lg:text-xl mt-2">
          We'll provide you a secret passage to the email you provided after the
          payment is marked done on the blockchain.
        </p>
        <p className="text-md text-gray-600 mt-2">
          (Our website is fairly new and thus we might have landed in your spam
          folder! Check that out too before you panic, and mark it as not spam
          before we do!)
        </p>
        <div className="mt-10">
          <a href="/" className="font-bold">
            Return Home
          </a>
        </div>
      </div>
    </div>
  );
}
