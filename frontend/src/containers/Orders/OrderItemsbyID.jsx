import axios from "axios";
import React, { useEffect, useState } from "react";
import { getLogInDetailsFromLocalStorage } from "../../utils";

const OrderedItems = () => {
  const [userOrders, setUserOrders] = useState([]);
  const user = getLogInDetailsFromLocalStorage();

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/all/orders/user/${user.userID}/`
        );
        setUserOrders(response.data);
      } catch (error) {
        console.error("Error fetching user orders:", error);
      }
    };
    fetchUserOrders();
  }, []);

  return (
    <div className="flex h-screen mt-9">
      <div className="flex-1 px-9">
        <h1 className="text-4xl ml-3">Your Orders</h1>
        <div className="py-5">
          <div className="overflow-x-auto text-xl">
            <table className="w-full border border-collapse">
              {userOrders?.length !== 0 && (
                <thead>
                  <tr>
                    <th className="px-4 py-2 border">Order ID</th>
                    <th className="px-4 py-2 border">Total Amount</th>
                    <th className="px-4 py-2 border">Paid Amount</th>
                    {/* <th className="px-4 py-2 border">Status</th> */}
                    <th className="px-4 py-2 border">Action</th>
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
                    <td className="px-4 py-2 border">{order.status}</td>
                    <td className="px-4 py-2 border">View Details</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderedItems;
