import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import PetRegister from "../Components/PetCredentials";
// import { useHistory } from 'react-router-dom';
import { Input } from "@material-tailwind/react";

function Register() {
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const defaultUserInfo = {
    petName: "",
    petType: "",
    age: 0,
    height: 0,
    weight: 0,
  };

  const [petInfo, setPetInfo] = useState(defaultUserInfo);

  const { registerUser, registerPet } = useContext(AuthContext);
  // const history = useHistory();

  const [step, setStep] = useState(1);

  const handleUserRegistration = async () => {
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

  const handlePetRegistration = async () => {
    try {
      await registerPet(petInfo);
      // history.push('/pet'); // Redirect upon successful
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle registration failure (e.g., display error message)
      alert("Registration failed. Please try again.");
    }
  };

  const handleBothUserAndPetRegistration = async () => {
    await Promise.all([handleUserRegistration, handlePetRegistration]);
  };

  const handlePetInfoChange = (e) => {
    const { name, value } = e.target;
    setPetInfo({ ...petInfo, [name]: value });
  };

  return (
    <div>
      {step === 1 && (
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
              <form className="flex flex-col gap-y-3">
                <h1 className="text-xl text-center">Create an account</h1>

                {/*<!-- firstName input --> */}
                <Input
                  label="First name"
                  type="text"
                  id="exampleFormControlInput22"
                  onChange={(e) => setFirstname(e.target.value)}
                />
                <div class="relative mb-2" data-te-input-wrapper-init>
                  {/* <input
                   
                    class="peer block min-h-[auto] w-full rounded border-b bg-transparent  px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    
                    name="first_name"
                    placeholder="First Name"
                    
                  /> */}
                  {/* <label
                    for="exampleFormControlInput22"
                    class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-400 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >
                    First Name
                  </label> */}
                </div>

                {/* <!-- lastName input --> */}
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
                  {/* <input
                    type="text"
                    class="peer block min-h-[auto] w-full rounded border-b bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput2"
                    name="username"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label
                    for="exampleFormControlInput2"
                    class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-400 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >
                    Username
                  </label> */}
                </div>

                {/* <!-- Email input --> */}
                <div class="relative mb-2" data-te-input-wrapper-init>
                  <Input
                    type="email"
                    id="exampleFormControlInput22"
                    label="Email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {/* <input
                    type="email"
                    class="peer block min-h-[auto] w-full rounded border-b bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput22"
                    name="email"
                    placeholder="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label
                    for="exampleFormControlInput22"
                    class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-400 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >
                    Email Address
                  </label> */}
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
                  {/* <input
                    type="tel"
                    class="peer block min-h-[auto] w-full rounded border-b bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput22"
                    name="mobile"
                    placeholder="Mobile Number"
                    onChange={(e) => setMobile(e.target.value)}
                  />
                  <label
                    for="exampleFormControlInput22"
                    class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-400 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >
                    Phone Number
                  </label> */}
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
                  {/* <input
                    type="password"
                    class="peer block min-h-[auto] w-full rounded border-b bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput22"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label
                    for="exampleFormControlInput22"
                    class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-400 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >
                    Password
                  </label> */}
                </div>

                <div className="login-button flex justify-center w-full my-3 hover:scale-110">
                  <button
                    className="w-[40%]  rounded-md py-2 bg-[#56A6B8] text-white"
                    type="button"
                    onClick={() => setStep(2)}
                  >
                    Next
                  </button>
                </div>

                <div className="text-center">
                  Already have an account? <a href="/login">Login</a>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}

      {step === 2 && (
        <PetRegister
          petInfo={petInfo}
          handleChange={handlePetInfoChange}
          setStep={setStep}
          handleUserRegistration={handleUserRegistration}
          handleBothUserAndPetRegistration={handleBothUserAndPetRegistration}
        />
      )}
    </div>
  );
}

export default Register;
