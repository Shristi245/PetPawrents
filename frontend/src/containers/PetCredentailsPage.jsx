import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Input } from "@material-tailwind/react";
function PetRegisterPage() {
  const history = useHistory();
  const { registerPet } = useContext(AuthContext);

  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    // Validation for height
    const heightPattern = /^\d+\s*feet$/i;
    if (!heightPattern.test(height)) {
      alert("Please enter the height in feet. For example, '4 feet'.");
      return;
    }

    // Validation for weight
    const weightPattern = /^\d+\s*kg$/i;
    if (!weightPattern.test(weight)) {
      alert("Please enter the weight in kilograms. For example, '40 kg'.");
      return;
    }

    // Validation for age
    const agePattern = /^\d+\s*years\s*old$/i;
    if (!agePattern.test(age)) {
      alert("Please enter the age in years. For example, '3 years old'.");
      return;
    }

    // Extracting the numerical values from the strings
    const heightValue = parseInt(height);
    const weightValue = parseInt(weight);
    const ageValue = parseInt(age);

    // Proceed with registration if all validations pass
    registerPet({
      petname: petName,
      pettype: petType,
      age: ageValue,
      height: heightValue,
      weight: weightValue,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle any general form submission actions here
    // This function can be extended to perform additional actions if needed
    console.log("Form submitted");
  };

  // Function to handle skipping the registration process

  return (
    <section className="h-[100vh] flex flex-col items-center justify-center w-full">
      <div className="grid grid-cols-1 w-full sm:grid-cols-2 place-items-center">
        <div className="flex  flex-col justify-center items-center w-[20rem]  ">
          <h1 className="text-[#1A8990]  font-semibold text-4xl pb-3">
            Pet Pawrents
          </h1>
          <p className="text-[#673405]">
            Pampering pets for pet-loving parents
          </p>
          <img src="/images/userpage.jpg" alt="" />
        </div>

        <div className="w-[60%] h-[110%] border p-5 shadow">
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-3">
            <h1 className="text-xl text-center mb-9">
              Pet Account Credentials
            </h1>
            {/*<!-- pet name input --> */}
            <div class="relative mb-2" data-te-input-wrapper-init>
              <Input
                type="text"
                class="peer block min-h-[auto] w-full rounded border-b bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlInput22"
                name="petName"
                label="Pet Name"
                placeholder="Pet Name"
                onChange={(e) => setPetName(e.target.value)}
              />
            </div>

            {/* <!-- Pet type input --> */}
            <div class="relative mb-2" data-te-input-wrapper-init>
              <Input
                type="text"
                class="peer block min-h-[auto] w-full rounded border-b bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlInput22"
                name="pet type"
                label="Pet Type"
                placeholder="Pet Type"
                onChange={(e) => setPetType(e.target.value)}
              />
            </div>

            {/* pet age input */}
            <div class="relative mb-2" data-te-input-wrapper-init>
              <Input
                type="text"
                class="peer block min-h-[auto] w-full rounded border-b bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlInput2"
                name="age"
                label="Age"
                placeholder="Age"
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            {/* <!-- pet height input --> */}
            <div class="relative mb-2" data-te-input-wrapper-init>
              <Input
                type="text"
                class="peer block min-h-[auto] w-full rounded border-b bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlInput22"
                name="height"
                label="Height"
                placeholder="Height"
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>

            {/* <!-- pet weight input --> */}
            <div class="relative mb-2" data-te-input-wrapper-init>
              <Input
                type="text"
                class="peer block min-h-[auto] w-full rounded border-b bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlInput22"
                name="weight"
                label="Weight"
                placeholder="Weight"
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            <div className="login-button flex justify-center w-full my-3 hover:scale-110">
              <button
                onClick={handleRegister}
                className="w-[40%]  rounded-md py-2 bg-[#56A6B8] text-white"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default PetRegisterPage;
