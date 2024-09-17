"use client";
import { useFormState } from "react-dom";
import { login } from "../../actions/userController";

const Login = () => {
  const [formState, formAction] = useFormState(login, {});
  return (
    <div className="">
      <h2>Login</h2>
      <form action={formAction} className="max-w-xs mx-auto m-10">
        <div className="mb-3 ">
          <input
            name="username"
            type="text"
            placeholder="Username"
            className="input input-bordered w-full max-w-xs"
          />
          {formState.errors?.username && (
            <div role="alert" className="mt-3 alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{formState.errors?.username}</span>
            </div>
          )}
        </div>
        <div className="mb-3 ">
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs"
          />
          {formState.errors?.password && (
            <div role="alert" className="mt-3 alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{formState.errors?.password}</span>
            </div>
          )}
        </div>
        <button className="btn btn-outline btn-accent">Submit</button>
      </form>
    </div>
  );
};

export default Login;
