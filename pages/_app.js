import Head from "next/head";
import "swiper/css";
import 'swiper/css/navigation';
import "../styles/globals.css";
import nookies, { parseCookies } from "nookies";
import Router from "next/router";
import settings from "../settings";
import Header from "../components/Header";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  // const jwt = nookies.get("jwt");
  // const username = nookies.get("username");

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/logo.png" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />

      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-FYB787WKW9"
      />
      <Script
        dangerouslySetInnerHTML={{
          __html: `
        
    adroll_adv_id = "JZG42SKJ6ZGWHLKY6OTSZB";
    adroll_pix_id = "Y4JGSFAUDREHFOYWXJMSXK";
    adroll_version = "2.0";

    (function(w, d, e, o, a) {
        w.__adroll_loaded = true;
        w.adroll = w.adroll || [];
        w.adroll.f = [ 'setProperties', 'identify', 'track' ];
        var roundtripUrl = "https://s.adroll.com/j/" + adroll_adv_id
                + "/roundtrip.js";
        for (a = 0; a < w.adroll.f.length; a++) {
            w.adroll[w.adroll.f[a]] = w.adroll[w.adroll.f[a]] || (function(n) {
                return function() {
                    w.adroll.push([ n, arguments ])
                }
            })(w.adroll.f[a])
        }

        e = d.createElement('script');
        o = d.getElementsByTagName('script')[0];
        e.async = 1;
        e.src = roundtripUrl;
        o.parentNode.insertBefore(e, o);
    })(window, document);
    adroll.track("pageView");
`,
        }}
      />

      <Script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-FYB787WKW9');`,
        }}
      />
    </>
  );
}

export default MyApp;
