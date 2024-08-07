import {
  Alert,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import KhaltiCheckout from "khalti-checkout-web";
import { Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  calculateOrderTotal,
  clearCart,
  decreaseQuantity,
  getItemsFromCart,
  getLogInDetailsFromLocalStorage,
  removeItemFromCart,
  setItemsToCart,
} from "../../utils";
import { generalConfig } from "../Checkout/CheckoutConfig";

export function ShoppingCart() {
  const [addressDialog, setAddressDialog] = useState(false);

  const handleOpen = () => setAddressDialog(!addressDialog);

  const [address, setAddress] = useState();

  const khaltiConfig = {
    productUrl: "http://localhost:3000/cart",
    eventHandler: {
      async onSuccess(payload) {
        const paid_amount = payload.amount / 100;

        const user = getLogInDetailsFromLocalStorage();

        const cartItems = getItemsFromCart().map((item) => {
          return { product: item.id, quantity: item.quantity };
        });

        const total_amount = calculateOrderTotal();

        const res = await fetch("http://127.0.0.1:8000/place-order/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            total_amount,
            paid_amount,
            user: user.id,
            order_items: cartItems,
            address,
          }),
        });

        const orderResMsg = await res.json();

        if (!res.ok) {
          toast.error("Unable to place order at the moment");
          return;
        }

        toast.success(
          "Order placed successfully. The courier will deliver the items soon"
        );
        setCartItems([]);
        clearCart();
        handleOpen();

        await fetch("http://127.0.0.1:8000/transactions/create/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: user.id,
            reference_id: orderResMsg.id,
            amount: paid_amount,
            transaction_type: "products",
          }),
        });
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

  const [cartItems, setCartItems] = useState([]);

  let checkout = new KhaltiCheckout({ ...generalConfig, ...khaltiConfig });

  const handleCheckout = () => {
    if (!address) {
      toast.error("Address is required");
      return;
    }

    const orderTotal = calculateOrderTotal();

    if (orderTotal < 200) {
      checkout.show({ amount: orderTotal * 100 });
      return;
    }

    checkout.show({ amount: 20000 });
  };

  useEffect(() => {
    setCartItems(getItemsFromCart());
  }, []);

  const handleDeleteCartItem = (id) => () => {
    const newCartItems = removeItemFromCart(id);
    setCartItems(newCartItems);
    toast.success("Item is removed from the cart");
  };

  const handleDecreaseQuantity = (id, quantity) => () => {
    if (quantity === 1) {
      toast.error("Quantity cannot be less than 1");
      return;
    }

    const newCartItems = decreaseQuantity(id);
    setCartItems(newCartItems);
    toast.success("Quantity is decreased");
  };

  const handleIncreaseQuantity = (product) => () => {
    const newQuantity = product.quantity + 1;

    // Limit the quantity to 3
    if (newQuantity > 3) {
      toast.warning("Maximum quantity reached (3 items)");
      return;
    }

    const updatedProduct = { ...product, quantity: newQuantity };
    const newCartItems = setItemsToCart(updatedProduct);
    setCartItems(newCartItems);

    toast.success("Quantity is increased");
  };

  return (
    <div className="mx-auto flex max-w-3xl flex-col space-y-4 p-6 px-2 sm:p-10 sm:px-2">
      <Dialog handler={handleOpen} open={addressDialog}>
        <DialogHeader>Enter Delivery address</DialogHeader>
        <DialogBody>
          <Input
            label="Address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
        </DialogBody>

        <DialogFooter className="space-x-4">
          <Button onClick={handleCheckout}>Checkout</Button>

          <Button onClick={handleOpen} color="red" variant="text">
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>

      <h2 className="text-3xl font-bold">My cart</h2>
      <p className="mt-3 text-sm font-medium text-gray-700"></p>

      {cartItems?.length === 0 && (
        <div className="space-y-5">
          <Alert color="blue">No Items in the cart</Alert>
          <div>
            <Link to="/product">
              <Button>Browse Products</Button>
            </Link>
          </div>
        </div>
      )}
      {cartItems?.length !== 0 && (
        <>
          <ul className="flex flex-col divide-y divide-gray-200">
            {cartItems.map((product) => (
              <li
                key={product.id}
                className="flex flex-col py-6 sm:flex-row sm:justify-between"
              >
                <div className="flex w-full space-x-2 sm:space-x-4">
                  <img
                    className="h-20 w-20 flex-shrink-0 rounded object-contain outline-none dark:border-transparent sm:h-32 sm:w-32"
                    src={product.image}
                    alt={product.title}
                  />
                  <div className="flex w-full flex-col justify-between pb-4">
                    <div className="flex w-full justify-between space-x-2 pb-2">
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                          {product.title}
                        </h3>
                        <p className="text-sm">{product.category}</p>
                      </div>
                      <div className="text-right flex gap-x-3 items-center">
                        <div className="flex gap-x-1 text-sm">
                          <p> RS. {product.price}</p>
                          <p>X</p>
                          <p>{product.quantity}</p>
                          <p>=</p>
                        </div>
                        <p className="font-semibold">
                          RS. {product.price * product.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="flex text-sm justify-between items-center">
                      <button
                        type="button"
                        className="flex items-center gap-x-2"
                        onClick={handleDeleteCartItem(product.id)}
                      >
                        <Trash size={16} />
                        <span>Remove</span>
                      </button>

                      <div className="flex gap-x-2 items-center justify-center">
                        <button onClick={handleIncreaseQuantity(product)}>
                          <FaPlus />
                        </button>

                        <button
                          onClick={handleDecreaseQuantity(
                            product.id,
                            product.quantity
                          )}
                        >
                          <FaMinus />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="space-y-1 text-right">
            <p>
              Total amount:
              <span className="font-semibold">
                {" "}
                RS. {calculateOrderTotal()}
              </span>
            </p>
          </div>
          <div className="flex justify-end space-x-4">
            <Link to="/product">
              <button
                type="button"
                className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Back to shop
              </button>
            </Link>
            <button
              type="button"
              className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={handleOpen}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ShoppingCart;
