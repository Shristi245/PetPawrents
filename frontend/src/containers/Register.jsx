import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
// import { useHistory } from 'react-router-dom';
import { Input } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { getLogInDetailsFromLocalStorage } from "../utils";
import { useHistory } from "react-router-dom";
function Register() {
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const { registerUser } = useContext(AuthContext);

  useEffect(() => {
    const isUserLoggedIn = getLogInDetailsFromLocalStorage();
    if (isUserLoggedIn) {
      history.push("/");
    }
  }, []);
  const handleUserRegistration = async (e) => {
    e.preventDefault();

    // Validation for email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Validation for phone number format
    const phoneRegex = /^[0-9]{10}$/; //phone number should be of 10 digits
    if (!phoneRegex.test(mobile)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    // Validation for password
    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      alert("Password must include at least one special character.");
      return;
    }
    try {
      await registerUser(
        first_name,
        last_name,
        email,
        username,
        mobile,
        password
      );

      // history.push('/pet'); // Redirect upon successful registration
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle registration failure (e.g., display error message)
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <section className="h-[100vh] flex flex-col items-center justify-center w-full">
        <div className="grid grid-cols-1 w-full sm:grid-cols-2 place-items-center">
          <div className="flex  flex-col justify-center items-center w-[20rem]  ">
            <h1 className="text-[#1A8990] font-semibold text-4xl pb-3">
              Pet Pawrents
            </h1>
            <p>Pampering pets for pet-loving parents</p>
            <img src="/images/userpage.jpg" alt="" />
          </div>

          <div className="w-[60%] h-[105%] border p-5 shadow">
            <form
              className="flex flex-col gap-y-3"
              onSubmit={handleUserRegistration}
            >
              <h1 className="text-xl text-center">Create an account</h1>

              {/*<!-- firstName input --> */}
              <Input
                label="First name"
                type="text"
                id="exampleFormControlInput22"
                onChange={(e) => setFirstname(e.target.value)}
              />
              <div class="relative mb-2" data-te-input-wrapper-init></div>

              <div class="relative mb-2" data-te-input-wrapper-init>
                <Input
                  type="text"
                  label="Last name"
                  id="exampleFormControlInput22"
                  name="last_name"
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>

              {/* username input */}
              <div class="relative mb-2" data-te-input-wrapper-init>
                <Input
                  type="text"
                  label="Username"
                  id="exampleFormControlInput2"
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div class="relative mb-2" data-te-input-wrapper-init>
                <Input
                  type="email"
                  id="exampleFormControlInput22"
                  label="Email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* <!-- phonenumber input --> */}
              <div class="relative mb-2" data-te-input-wrapper-init>
                <Input
                  type="tel"
                  id="exampleFormControlInput22"
                  name="mobile"
                  label="Mobile"
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>

              {/* <!-- Password input --> */}
              <div class="relative mb-2" data-te-input-wrapper-init>
                <Input
                  type="password"
                  id="exampleFormControlInput22"
                  label="Password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="login-button flex justify-center w-full my-3 hover:scale-110">
                <button className="w-[40%]  rounded-md py-2 bg-[#56A6B8] text-white">
                  Register
                </button>
              </div>

              <div className="text-center">
                Already have an account? <Link to="/login">Login</Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
