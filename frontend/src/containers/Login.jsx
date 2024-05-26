import React, { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import { getLogInDetailsFromLocalStorage } from "../utils";
import { useHistory } from "react-router-dom";

//impor material tailwind
import { Input } from "@material-tailwind/react";
function Login() {
  const { loginUser } = useContext(AuthContext);

  const history = useHistory();
  useEffect(() => {
    const isUserLoggedIn = getLogInDetailsFromLocalStorage();
    if (isUserLoggedIn) {
      history.push("/");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    email.length > 0 && loginUser(email, password);

    console.log(email);
    console.log(password);
  };

  return (
    <section className="h-[100vh] flex flex-col items-center justify-center w-full">
      <div className="grid grid-cols-1 w-full sm:grid-cols-2 place-items-center">
        <div className="flex  flex-col justify-center items-center w-[20rem]  ">
          <h1 className="text-[#1A8990] font-semibold text-4xl pb-3">
            Pet Pawrents
          </h1>
          <p>Pampering pets for pet-loving parents</p>
          <img src="/images/userpage.jpg" alt="" />
        </div>
        <div className="flex flex-col">
          <div className=" w-[100%] flex justify-center">
            <img
              className="w-[25%] ml-16"
              src="/images/sleep-cat.png "
              alt=""
            />
          </div>

          <div className="w-[80%] h-[80%] border p-9 shadow ">
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-3">
              <h1 className="text-3xl text-center">Sign in</h1>
              <br></br>
              <div class="relative mb-6" data-te-input-wrapper-init>
                <Input
                  type="email"
                  id="username"
                  name="email"
                  label="email"
                  required
                />
              </div>

              {/* <!-- Password input --> */}
              <div class="relative mb-6" data-te-input-wrapper-init>
                <Input
                  type="password"
                  label="Password"
                  id="exampleFormControlInput22"
                  name="password"
                />
              </div>
              <div className="text-right">
                <Link to="/reset-password">Forgot Password?</Link>
              </div>

              <div className="login-button flex justify-center w-full my-3 hover:scale-110">
                <button
                  type="submit"
                  className="w-[40%]  rounded-md py-2 bg-[#56A6B8] text-white"
                >
                  Login
                </button>
              </div>

              <div className="text-center">
                Don't have an account? <Link to="/register">Register</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
