import { getUserFromCookie } from "../lib/getUser";
import RegisterForm from "../components/RegisterForm";
import Dashboard from "../components/Dashboard";

const Page = async () => {
  const user = await getUserFromCookie();
  return (
    <>
      {user && <Dashboard user={user} />}
      {!user && (
        <>
          <p className="text-center text-5xl text-gray-600 mb-5">
            Don&rsquo;t have an account <strong>Create one</strong>{" "}
          </p>
          <RegisterForm />
        </>
      )}
    </>
  );
};

export default Page;
