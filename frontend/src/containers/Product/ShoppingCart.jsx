import React, { useEffect, useState } from "react";
import { Trash, Heart } from "lucide-react";
import {
  calculateOrderTotal,
  decreaseQuantity,
  getItemsFromCart,
  removeItemFromCart,
  setItemsToCart,
} from "../../utils";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { Alert, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);

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
  };

  const handleIncreaseQuantity = (product) => () => {
    const newCartItems = setItemsToCart(product);
    setCartItems(newCartItems);

    toast.success("Quantity is increased");
  };

  return (
    <div className="mx-auto flex max-w-3xl flex-col space-y-4 p-6 px-2 sm:p-10 sm:px-2">
      <h2 className="text-3xl font-bold">Your cart</h2>
      <p className="mt-3 text-sm font-medium text-gray-700">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum eius
        repellat ipsam, sit praesentium incidunt.
      </p>

      {cartItems?.length === 0 && (
        <div className="space-y-5">
          <Alert color="blue">No Items in the carrt</Alert>
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
