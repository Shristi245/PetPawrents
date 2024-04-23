import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSideMenu from "../../Components/AdminSideMenu";
import Swal from "sweetalert2";
import { useDebounce } from "../../utils";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrderItems, setSelectedOrderItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/all/orders/");
        setOrders(response.data);
        setFilteredOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  // useEffect(() => {
  //   const _searchText = debouncedSearchText.toLowerCase();
  //   const _filteredOrders = orders.filter((order) => {
  //     return (
  //       order.user.first_name.toLowerCase().includes(_searchText) ||
  //       order.user.last_name.toLowerCase().includes(_searchText) ||
  //       order.user.email.toLowerCase().includes(_searchText) ||
  //       order.user.username.toLowerCase().includes(_searchText) ||
  //       order.user.mobile.toLowerCase().includes(_searchText)
  //     );
  //   });
  //   setFilteredOrders(_filteredOrders);
  // }, [debouncedSearchText, orders]);

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
    <div className="flex h-screen mb-32 overflow-hidden ">
      <AdminSideMenu />
      <div className="flex-1  px-9  overflow-y-scroll">
        <div className="p-4 flex items-center justify-between">
          <div className="relative  ">
            <input
              type="text"
              className=" text-black text-xl px-3 py-1 rounded-full focus:outline-none"
              placeholder="Type to search..."
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="absolute right-0 top-0 mt-1 mr-2">
              <svg
                className="h-6 w-6 text-black fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M19.71 18.29l-5.47-5.47A5.93 5.93 0 0 0 14 10c0-3.31-2.69-6-6-6S2 6.69 2 10s2.69 6 6 6c1.3 0 2.49-.41 3.47-1.11l5.47 5.47c.39.39 1.02.39 1.41 0 .38-.39.39-1.02 0-1.41zM4 10c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z" />
              </svg>
            </button>
          </div>
        </div>
        <h1 className="text-4xl sticky top-0 bg-white py-3 ">Orders</h1>
        <div className="py-5 overflow-x-auto ">
          <div className="  text-xl flex-1">
            <table className="w-full h-full border border-collapse ">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Order ID</th>
                  <th className="px-4 py-2 border">User</th>
                  <th className="px-4 py-2 border">Address</th>
                  <th className="px-4 py-2 border">Phone Number</th>
                  <th className="px-4 py-2 border">Total Amount</th>
                  <th className="px-4 py-2 border">Paid Amount</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody className=" text-center">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border">
                    <td className="px-4 py-2 border">{order.id}</td>
                    <td className="px-4 py-2 border">{`${order.user.first_name} ${order.user.last_name}`}</td>
                    <td className="px-4 py-2 border">{order.user.address}</td>
                    <td className="px-4 py-2 border">{order.user.mobile}</td>
                    <td className="px-4 py-2 border">{order.total_amount}</td>
                    <td className="px-4 py-2 border">{order.paid_amount}</td>
                    <td className="px-4 py-2 border ">
                      <button
                        className="text-black font-bold py-2 px-4 rounded"
                        onClick={() => handleItemsDetails(order.id)}
                      >
                        View Details
                      </button>
                    </td>
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

export default OrderList;
