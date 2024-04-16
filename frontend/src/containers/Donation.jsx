import React, { useState } from "react";
import { getLogInDetailsFromLocalStorage } from "../utils";
import { toast } from "react-toastify";
import { generalConfig } from "./Checkout/CheckoutConfig";
import KhaltiCheckout from "khalti-checkout-web";
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "@material-tailwind/react";

const DonationPage = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const [amount, setAmount] = useState(0);

  const khaltiConfig = {
    productUrl: "http://localhost:3000/donation",
    eventHandler: {
      async onSuccess(payload) {
        const paid_amount = payload.amount / 100;

        const user = getLogInDetailsFromLocalStorage();

        const res = await fetch("http://127.0.0.1:8000/transactions/create/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: user.id,
            amount: paid_amount,
            transaction_type: "donation",
          }),
        });

        if (res.ok) {
          toast.success("Thank you for your suport :)");
          return;
        }

        toast.error("Unable to donate at the moment");
      },
      // onError handler is optional1
      onError(error) {
        console.log(error);
      },
      onClose() {
        console.log("widget is closing");
      },
    },
  };

  let checkout = new KhaltiCheckout({ ...generalConfig, ...khaltiConfig });

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-5xl p-8 h-[80%] border rounded-[30px] flex">
        <div className="w-[80%]  mr-2 bg-white">
          <h1 className="text-4xl font-bold mb-4">DONATE NOW!!!</h1>
          <div className="flex space-x-3">
            <h1 className="text-3xl mb-4"> PETPAWRENTS </h1>
            <p className="mt-2 text-lg">fund collection</p>
          </div>

          <p className="text-lg mb-4 w-[70%]">
            At PetPawrents, we are dedicated to providing love, care, and
            shelter to animals in need. Your generous contribution helps us
            continue our mission and support animals on their journey to finding
            forever homes.
          </p>
          <br />
          <h1>How to donate</h1>
          <p className="text-lg mb-4 w-[70%]">
            To make a donation, Scan the QR code with your smartphone camera to
            access our donation page instantly. Your support is greatly
            appreciated!
          </p>
        </div>
        <div className="w-[30%] ml-20">
          <img
            src="images/esewa.png"
            alt="esewa"
            className="w-[80%] ml-7"
          ></img>
          <p className="text-center text-2xl">
            <button
              className="w-[80%] py-3 text-black text-2xl rounded-[30px] mt-11 bg-amber-400 transition-transform duration-200 ease-in-out transform hover:scale-110"
              onClick={handleOpen}
            >
              Donate
            </button>

            <Dialog open={open} handler={handleOpen}>
              <DialogHeader>Enter the amount to dontate</DialogHeader>

              <DialogBody>
                <p className="text-red-500">
                  Note: <span>The maximum amount is 200</span>
                </p>
                <br />
                <form
                  id="amount-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleOpen();

                    const checkout_amount = amount > 200 ? 2000 : amount * 100;

                    checkout.show({
                      amount: checkout_amount,
                    });
                  }}
                >
                  <Input
                    label="Amount"
                    type="number"
                    min={1}
                    required
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                    max={200}
                  />
                </form>
              </DialogBody>

              <DialogFooter>
                <div className="space-x-5">
                  <Button variant="text" onClick={handleOpen}>
                    Close
                  </Button>
                  <Button color="green" type="submit" form="amount-form">
                    Donate
                  </Button>
                </div>
              </DialogFooter>
            </Dialog>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
