import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react"
import axios from "axios";
import settings from "../settings";
import { parseCookies } from 'nookies'

const languages = [
    { name: "English", shortform: "en" },
    { name: "German", shortform: "de-DE" },
    { name: "Spanish", shortform: "es" },
    { name: "Arabic", shortform: "ar" },
    { name: "French", shortform: "fr" },
    { name: "Japanese", shortform: "ja" },
    { name: "Vietnamese", shortform: "vi" },
    { name: "Portuguese", shortform: "pt" },
    { name: "Turkish", shortform: "tr-TR" },
    { name: "Tamil", shortform: "ta" },
    { name: "Telugu", shortform: "te" },
    { name: "Kannada", shortform: "kn" },
    { name: "Malayalam", shortform: "ml-IN" },
    { name: "Hindi", shortform: "hi-IN" }
]

export default function LanguageSelect(props) {
    const cookies = parseCookies();
    const [language, setLanguage] = useState("en");

    function addLanguage() {
        axios
            .put(`${settings.APIURL}/users/${props.userID}`, {
                "Language": language
            }, {
                headers: {
                    Authorization: `Bearer ${cookies.jwt}`,
                }
            })
            .then(function (response) {
                if (response.status == 200) {
                    props.closeOverlay();
                }
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    return <div className="h-screen w-screen fixed top-0 left-0 bg-[#000000a2] z-50 flex flex-col">


        <div style={{
            height: "90vh"
        }} className="bg-gray-100 p-10 flex flex-col overflow-y-auto">
            {
                languages.map((element, index) => (
                    <div onClick={() => setLanguage(element.shortform)} className="p-10 hover:bg-gray-200" key={index} >
                        {language == element.shortform && <FontAwesomeIcon icon={faCheck} />}
                        <span className="ml-3">{element.shortform}</span>
                    </div>
                ))
            }
        </div>
        <div className="bg-white flex-1 flex items-center px-5 justify-end p-5">
            <input onClick={addLanguage} type="button" className="bg-brand text-black hover:bg-black hover:text-white cursor-pointer text-xl p-5 px-10" value="Select" />
            <input onClick={props.closeOverlay} type="button" className="bg-gray-500 text-white hover:bg-black hover:text-white  text-xl p-5 px-10 cursor-pointer" value="Cancel" />
        </div>
    </div>
}   