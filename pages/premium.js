import Header from "../components/Header";
import { parseCookies } from "nookies";
import settings from "../settings";

export default function Premium({ user }) {
  const cookies = parseCookies();
  return (
    <>
      <div className="container mx-auto px-5 lg:px-20">
        <Header username={user.username} jwt={cookies.jwt} />

        <h1 className="text-3xl font-bold text-center mt-48">
          Thank you for joining the premium group.
        </h1>
        <p className="text-center mt-2 opacity-80">
          We'll add you to the group within 24 hours.
        </p>
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

  return {
    props: {
      user: userData,
    },
  };
}
