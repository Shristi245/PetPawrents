import axios from "axios";
import React, { useEffect, useState } from "react";
import { getLogInDetailsFromLocalStorage } from "../../utils";

const OrderedItems = () => {
  const [userOrders, setUserOrders] = useState([]);
  const user = getLogInDetailsFromLocalStorage();
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderItems, setSelectedOrderItems] = useState([]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/all/orders/user/${user.id}/`
        );
        setUserOrders(response.data);
      } catch (error) {
        console.error("Error fetching user orders:", error);
      }
    };
    fetchUserOrders();
  }, [user.id]);

  const handleItemsDetails = async (orderID) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/all/order-items/${orderID}/`
      );
      const itemsDetails = response.data;
      setSelectedOrderItems(itemsDetails);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };

  return (
    <div className="flex h-screen mt-9">
      <div className="flex-1 px-9">
        <h1 className="text-4xl ml-3">Your Orders</h1>
        <div className="py-5">
          <div className="overflow-x-auto text-xl">
            <table className="w-full border border-collapse">
              {userOrders?.length !== 0 && (
                <thead>
                  <tr className="bg-blue">
                    <th className="px-4 py-2 border">Order ID</th>
                    <th className="px-4 py-2 border ">Total Amount</th>
                    <th className="px-4 py-2 border">Paid Amount</th>
                    <th className="px-4 py-2 border">Actions</th>
                  </tr>
                </thead>
              )}

              <tbody className="text-center">
                {userOrders?.length === 0 && (
                  <tr>
                    <td className="px-4 py-2 border">No Orders Found</td>
                  </tr>
                )}
                {userOrders?.map((order) => (
                  <tr key={order.id} className="border">
                    <td className="px-4 py-2 border">{order.id}</td>
                    <td className="px-4 py-2 border">{order.total_amount}</td>
                    <td className="px-4 py-2 border">{order.paid_amount}</td>
                    <td className="px-4 py-2 border ">
                      <button
                        className="text-black font-bold py-2 px-4 rounded underline hover:text-amber-700"
                        onClick={() => handleItemsDetails(order.id)}
                      >
                        View Details
                      </button>
                    </td>{" "}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white  px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-xl leading-6 font-bold text-gray-900 underline">
                      Order Items Details
                    </h3>
                    <div className="mt-3">
                      {selectedOrderItems.map((order, index) => (
                        <div key={index} className="mb-2 space-y-3 text-lg">
                          <p>Product Name: {order.product.title}</p>
                          <p>Quantity: {order.quantity}</p>
                          <p>
                            Total Amount: Rs.
                            {order.quantity * order.product.price}
                          </p>
                          <p>Order ID: {order.order}</p>
                          {index !== selectedOrderItems.length - 1 && (
                            <hr className="my-2" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderedItems;
