import { faArrowLeft, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { useState } from "react";
import FormInputBlock from "../../components/FormInputBlock";
import settings from "../../settings";
import { v4 as uuidv4 } from 'uuid';
import nookies, { parseCookies } from "nookies";
// import { v4 as uuidv4 } from 'uuid';

export default function Login({ user }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const router = useRouter();
  const cookies = parseCookies();

  async function login(event) {
    event.preventDefault();

    const logininfo = {
      identifier: email,
      password: password,
    };

    const login = await fetch(`${settings.APIURL}/auth/local`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logininfo),
    });

    const loginResponse = await login.json();

    if (!loginResponse.error) {

      const sessionid = uuidv4()

      fetch(`${settings.APIURL}/users/${loginResponse.user.id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${loginResponse.jwt}`
        },
        body: JSON.stringify({
          "logged_in_device_identifier": `${sessionid}`,
        })
      })
        .then(res => res.json())
        .then(data => {
          nookies.set(null, "jwt", loginResponse.jwt, {
            maxAge: 24 * 60 * 60,
            path: "/",
          });

          nookies.set(null, "session_id", sessionid, {
            maxAge: 24 * 60 * 60,
            path: "/",
          })

          router.push('/user')
        })
        .catch(error => { console.log(error); alert("Something went wrong. Try again later") })


    } else {
      setError("Account not activated or, Password or Email is incorrect");
    }
  }

  if (cookies.jwt == null) {
    return (
      <div className="flex w-screen h-screen items-center justify-center">
        <Head>
          <title>Login in</title>
        </Head>
        {/* <div className="h-full w-1/2 overflow-hidden hidden lg:block xl:block">
          <img className="w-auto h-full" src="/login.png" alt="" />
        </div> */}

        <div className="h-full xl:w-1/2 flex items-center justify-center p-10">
          <div>
            <Link href="/">
              <small className="my-5 cursor-pointer flex items-center">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-arrow-narrow-left"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <line x1="5" y1="12" x2="9" y2="16" />
                    <line x1="5" y1="12" x2="9" y2="8" />
                  </svg>
                </span>
                <span className="mx-4">Home</span>
              </small>
            </Link>
            <h1 className="font-extrabold text-4xl">Login to your account</h1>

            <form onSubmit={login}>
              <FormInputBlock error={error} label="Email Address" required>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border rounded-lg w-full p-2"
                  type="email"
                />
              </FormInputBlock>

              <div>
                <FormInputBlock error={error} label="Password" required>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border rounded-lg w-full p-2"
                    type="password"
                  />
                </FormInputBlock>
              </div>
              {error && (
                <p className="my-4 text-blue-400">
                  <FontAwesomeIcon
                    width={15}
                    className="mr-2"
                    icon={faInfoCircle}
                  />{" "}
                  {error}
                </p>
              )}
              <button
                className="block w-full p-2 py-3 hover:bg-black hover:text-white bg-brand text-black mt-4"
                type="submit"
              >
                Login Now
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-screen w-screen">
        <Head>
          <title>King'sCharts</title>
        </Head>
        <div className="flex justify-center items-center text-center h-full w-full">
          <div className="p-5">
            <h1 className="text-3xl font-bold">You are alreay logged in.</h1>
            <p className="text-lg mt-2 opacity-80">
              {user.username}({user.email})
            </p>
            <div className="mt-10">
              <Link href="/">Return home</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  const cookies = context.req.cookies;

  const userResponse = await fetch(`${settings.APIURL}/users/me`, {
    headers: {
      Authorization: `Bearer ${cookies.jwt}`,
    },
  });
  const userData = await userResponse.json();

  return {
    props: {
      user: userData,
    },
  };
}
