import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

function Register() {
  const { registerUser } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    email.length > 0 && registerUser(email, password);

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

      
        <div className="w-[60%] h-[105%] border p-5 shadow" >
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-3">
          
            <h1 className="text-xl text-center">Create an account</h1>
                     {/*<!-- firstName input --> */}
            <div class="relative mb-2" data-te-input-wrapper-init>
              <input
                type="text"
                class="peer block min-h-[auto] w-full rounded border-b bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlInput22"
                name="firstName"
                placeholder="First Name" />
              <label
                for="exampleFormControlInput22"
                class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-400 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                >First Name
              </label>
            </div>

                {/* <!-- lastName input --> */}
            <div class="relative mb-2" data-te-input-wrapper-init>
              <input
                type="text"
                class="peer block min-h-[auto] w-full rounded border-b bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlInput22"
                name="lastName"
                placeholder="Last Name" />
              <label
                for="exampleFormControlInput22"
                class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-400 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                >Last Name
              </label>
            </div>


            {/* username input */}
            <div class="relative mb-2" data-te-input-wrapper-init>
              <input
                type="username"
                class="peer block min-h-[auto] w-full rounded border-b bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlInput2"
                name="username"
                placeholder="Username" />
              <label
                for="exampleFormControlInput2"
                class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-400 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                >Username
              </label>
            </div>

            {/* <!-- Email input --> */}
            <div class="relative mb-2" data-te-input-wrapper-init>
              <input
                type="email"
                class="peer block min-h-[auto] w-full rounded border-b bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlInput22"
                name="email"
                placeholder="Email Address" />
              <label
                for="exampleFormControlInput22"
                class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-400 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                >Email Address
              </label>
            </div>


                {/* <!-- Password input --> */}
            <div class="relative mb-2" data-te-input-wrapper-init>
              <input
                type="password"
                class="peer block min-h-[auto] w-full rounded border-b bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlInput22"
                name="password"
                placeholder="Password" />
              <label
                for="exampleFormControlInput22"
                class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-400 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                >Password
              </label>
            </div>


            {/* <!-- Password2 input --> */}
            <div class="relative mb-2" data-te-input-wrapper-init>
              <input
                type="password"
                class="peer block min-h-[auto] w-full rounded border-b bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlInput22"
                name="confirmPassword"
                placeholder="Confirm Password" />
              <label
                for="exampleFormControlInput22"
                class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-400 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                >Confirm Password
              </label>
            </div>


            <div className="login-button flex justify-center w-full my-3 hover:scale-110">
              <button className="w-[40%]  rounded-md py-2 bg-[#56A6B8] text-white">
                <a href="/pet">Next</a>
              </button>
            </div>

            <div className="text-center">
              Already have an account? <a href="/login">Login</a>
            </div>
          
            
          </form>                       
        </div>
      </div>
    </section>

  );
}

export default Register;
