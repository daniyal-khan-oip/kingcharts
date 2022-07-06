
import Head from "next/head"
import settings from "../../settings";
import { parseCookies } from "nookies";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from "axios";

import Header from '../../components/Header'
import { faCheck, faCheckCircle, faCircle, faKaaba } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Footer from "../../components/Footer";

export default function Webinar({ webinar, user }) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [sent, setSent] = useState(false)

    function save(e) {
        e.preventDefault();
        axios
            .post(`${settings.APIURL}/webinar-enrollments`, {
                data: {
                    Name: name,
                    Email: email,
                    Mobile: phone,
                },
            })
            .then(function (response) {
                setSent(true)
            })
            .catch(function (error) {
                setSent(false)
            });
    }
    const cookies = parseCookies();

    return (
        <>
            <Head>
                <title>King's Charts - {webinar.data.attributes.Title}</title>
            </Head>

            <div className="container mx-auto px-5 lg:px-20">
                <Header username={user.username} jwt={cookies.jwt} />
                <div className="grid grid-cols-1 lg:grid-cols-2 mb-10">
                    <div className="mt-20 lg:p-10 mb-10">
                        <p className=" inline-block text-3xl uppercase font-bold bg-brand px-2">Free webinar</p>
                        <h1 className="text-3xl mt-2">{webinar.data.attributes.Title}</h1>
            <video
              onContextMenu={(e) => e.preventDefault()}
              controlsList="nodownload"
              className="select-none w-full h-auto border-8 border-brand mt-4"
              controls
            >
              <source
                src="https://backend.kingscharts.io/uploads/Webinar_video_4ba62af0fa.mp4"
                type="video/mp4"
              />
              Update to a more recent brower
            </video>

                        <div className="ml-5">
                            <h2 className=" capitalize text-3xl bg-brand px-2 mt-10 inline-block">After this webinar</h2>
                            <ul className="mt-5">
                                {webinar.data.attributes.Learning_Outcomes.split("|").map((element) => (
                                    <li key={element.id} className="flex items-start mt-5">
                                        <span className="bg-brand h-5 w-5 p-2 rounded-full flex items-center justify-center text-xs">
                                            <FontAwesomeIcon icon={faCheck} />
                                        </span>
                                        <span className="ml-3">{element}</span>
                                    </li>
                                ))}

                            </ul>
                        </div>
                    </div>


                    <div className="bg-brand">
                        <div className="bg-[#4f4dfc] shaper-clipped-triange-top h-full w-full p-5 lg:p-10">
                            <h2 className="mt-56 text-white text-3xl">{webinar.data.attributes.Summary}</h2>
                            <form onSubmit={save} className="mt-10">
                                <input required value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Name*" className="p-5 w-full rounded-md my-2" />
                                <input required value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="Mobile*" className="p-5 w-full rounded-md my-2" />
                                <input required value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email*" className="p-5 w-full rounded-md my-2" />
                                <input type="submit" className={`bg-brand ${sent ? "bg-gray-500 cursor-not-allowed" : "hover:bg-black hover:text-white cursor-pointer"} text-black w-full p-5 mt-10`} value={sent ? "Thanks" : "Watch Now"} disabled={sent} />
                            </form>
                        </div>
                    </div>
                </div>

                <div className="flex items-end justify-end flex-col-reverse  lg:flex-row">
                    <div>
                        <p className="text-3xl">{webinar.data.attributes.Estimated_enrolls}+ Students Already Joined It!</p>
                        <div className="flex items-end flex-col lg:flex-row">
                            <img src="/avatars.png" />
                            <span className="text-6xl font-medium text-gray-400 px-5">+{webinar.data.attributes.Estimated_enrolls}</span>
                        </div>
                    </div>
                    <div className="w-1/2 px-5">
                        <img src="/arrow-shapedlikereturnkey.png" />
                    </div>

                </div>

                <div className="text-center my-20 text-6xl">
                    <p>"YOU'LL REGRET NOT TAKING THIS <span style={{
                        backgroundImage: "url('/oval.png')"
                    }} className="bg-center bg-cover bg-no-repeat overflow-visible px-16 -mx-16">FREE</span> WEBINAR IN 5 YEARS, SO REGISTER NOW AND START YOUR <span style={{
                        backgroundImage: "url('/oval.png')"
                    }} className="bg-center bg-contain bg-no-repeat overflow-visible px-8 py-5 -my-5 -mx-8">EARNING</span> JOURNEY"</p>

                    <div className="my-20">
                        <img className="inline-block w-64 lg:w-96" src="/Three.png" />
                    </div>

                    <div className="my-10">
                        <img className="inline-block w-64 lg:w-96" src="/treasure-chest.png" />
                    </div>

                    <div>
                        <h3 className="text-6xl font-bold">SO WHAT ARE YOU WAITING FOR? GO GET IT <span className="bg-brand">SIGNUP NOW</span>!</h3>
                        <img className="inline-block lg:w-16 my-10" src="/downarrow.png" />

                    </div>

                </div>
                <div className="flex items-center justify-center">
                    <form onSubmit={save} className="mt-10 flex flex-col bg-gray-800 p-5 w-full lg:w-1/3">
                        <input required value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Name*" className="px-4 py-3 my-2" />
                        <input required value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="Mobile*" className="px-4 py-3 my-2" />
                        <input required value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email*" className="px-4 py-3 my-2" />
                        <input type="submit" className={`bg-brand ${sent ? "bg-gray-500 cursor-not-allowed" : "hover:bg-black hover:text-white cursor-pointer"} text-black w-full p-5 mt-10`} value={sent ? "Thanks" : "Watch Now"} disabled={sent} />
                    </form>
                </div>

                <Footer />
            </div>
        </>
    )
}




export async function getServerSideProps(context) {

    const cookies = context.req.cookies;

    const userResponse = await fetch(`${settings.APIURL}/users/me`, {
        headers: {
            Authorization: `Bearer ${cookies.jwt}`,
        },
    });
    const userData = await userResponse.json();

    const webinarResponse = await fetch(`${settings.APIURL}/webinars/${context.params.webinar}?populate=*`);
    const webinarData = await webinarResponse.json();


    console.log(webinarData.data.attributes.Webinar_Feature_Image.data.attributes.url)

    return {
        props: {
            webinar: webinarData,
            user: userData,
        },
    };
}
