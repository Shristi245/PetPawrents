import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

function Login() {
  const { loginUser } = useContext(AuthContext);
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
          <h1 className="text-[#1A8990]  font-semibold text-4xl pb-3">
            Pet Pawrents
          </h1>
          <p className="text-[#673405]">Pampering pets for pet-loving parents</p>
          <img src="/images/userpage.jpg" alt="" />
        </div>  

      
        <div className="w-[60%] h-[110%] border p-5 shadow" >
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-3">
          
            <h1 className="text-xl text-center">Pet Account Credentials</h1>
                     {/*<!-- pet name input --> */}
            <div class="relative mb-2" data-te-input-wrapper-init>
              <input
                type="text"
                class="peer block min-h-[auto] w-full rounded border-b bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlInput22"
                name="petName"
                placeholder="Pet Name" />
              <label
                for="exampleFormControlInput22"
                class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-400 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                >Pet Name
              </label>
            </div>

                {/* <!-- Pet type input --> */}
            <div class="relative mb-2" data-te-input-wrapper-init>
              <input
                type="text"
                class="peer block min-h-[auto] w-full rounded border-b bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlInput22"
                name="pet type"
                placeholder="Pet Type" />
              <label
                for="exampleFormControlInput22"
                class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-400 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                >Pet Type
              </label>
            </div>


            {/* pet age input */}
            <div class="relative mb-2" data-te-input-wrapper-init>
              <input
                type="text"
                class="peer block min-h-[auto] w-full rounded border-b bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlInput2"
                name="age"
                placeholder="Age" />
              <label
                for="exampleFormControlInput2"
                class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-400 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                >Age
              </label>
            </div>

            {/* <!-- pet height input --> */}
            <div class="relative mb-2" data-te-input-wrapper-init>
              <input
                type="text"
                class="peer block min-h-[auto] w-full rounded border-b bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlInput22"
                name="height"
                placeholder="Height" />
              <label
                for="exampleFormControlInput22"
                class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-400 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                >Height
              </label>
            </div>


                {/* <!-- pet weight input --> */}
            <div class="relative mb-2" data-te-input-wrapper-init>
              <input
                type="text"
                class="peer block min-h-[auto] w-full rounded border-b bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlInput22"
                name="weight"
                placeholder="Weight" />
              <label
                for="exampleFormControlInput22"
                class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-400 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                >Weight
              </label>
            </div>


            <div className="flex justify-between">
              <div className="text-left">
                <a href="/register">Back</a>              
              </div>

              <div className="text-right">
                <a href="/login">Skip></a>
              </div>
              
            </div>
          


     
            <div className="login-button flex justify-center w-full my-3 hover:scale-110">
              <button className="w-[40%]  rounded-md py-2 bg-[#56A6B8] text-white">
                Register
              </button>
            </div>

          
            
          </form>  

        </div>
      </div>
    </section>

  );
}

export default Login;
