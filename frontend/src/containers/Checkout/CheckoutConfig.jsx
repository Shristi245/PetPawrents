import myKey from "./CheckoutKey";
// import axios from "axios";
x
export const config = {
  publicKey: myKey.publicTestKey,
  productIdentity: "1234224",
  productName: "PetPawrents",
  productUrl: "http://localhost:3000/cart",
  paymentPreference: ["KHALTI"],
  eventHandler: {
    onSuccess(payload) {
      console.log(payload);
    },
    // onError handler is optional
    onError(error) {
      console.log(error);
    },
    onClose() {
      console.log("widget is closing");
    },
  },
};

