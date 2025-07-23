import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import Layout from "../layout/Layout";

const statusColors = {
  Delivered: "bg-green-100 text-green-800",
  Processing: "bg-yellow-100 text-yellow-800",
  Shipped: "bg-blue-100 text-blue-800",
  Cancel: "bg-red-100 text-red-800",
  default: "bg-gray-100 text-gray-800",
};

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/orders", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (data.success) setOrders(data.orders);
    } catch (error) {
      alert("An error occurred while fetching orders.");
      console.error(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-[#053f5c] via-[#429ebd] to-[#9fe7f5] py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-white tracking-wide">
            Your Orders
          </h2>
          <div className="overflow-x-auto rounded-2xl shadow-lg bg-white">
            <table className="w-full min-w-[900px] border-separate border-spacing-0">
              <thead>
                <tr className="bg-[#429ebd] text-white sticky top-0 z-10">
                  <th className="py-3 px-4 text-left font-semibold">
                    Order ID
                  </th>
                  <th className="py-3 px-4 text-left font-semibold">Buyer</th>
                  <th className="py-3 px-4 text-left font-semibold">
                    Products
                  </th>
                  <th className="py-3 px-4 text-left font-semibold">Status</th>
                  <th className="py-3 px-4 text-left font-semibold">
                    Payment ID
                  </th>
                  <th className="py-3 px-4 text-left font-semibold">Amount</th>
                  <th className="py-3 px-4 text-left font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-8 text-[#053f5c] font-semibold"
                    >
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  orders.map((order, idx) => (
                    <tr
                      key={order._id}
                      className={
                        idx % 2 === 0
                          ? "bg-[#f4faff] hover:bg-[#9fe7f5]/40"
                          : "bg-white hover:bg-[#9fe7f5]/40"
                      }
                    >
                      <td className="py-3 px-4 font-mono text-[#053f5c]">
                        {order._id}
                      </td>
                      <td className="py-3 px-4">
                        {order.buyer?.name || "N/A"}
                      </td>
                      <td className="py-3 px-4">
                        <ul className="list-disc ml-4">
                          {order.products.map((p) => (
                            <li key={p._id} className="text-[#429ebd]">
                              {p.name}{" "}
                              <span className="text-xs text-gray-500">
                                ({p.price}₹)
                              </span>
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={
                            "px-3 py-1 rounded-full text-xs font-bold " +
                            (statusColors[order.status] || statusColors.default)
                          }
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono">
                        {order.payment?.transaction?.id ||
                          order.payment?.transaction?.paymentInstrumentType ||
                          order.payment?.id ||
                          "N/A"}
                      </td>
                      <td className="py-3 px-4 font-semibold text-[#f7ad19]">
                        {order.payment?.transaction?.amount ||
                          order.payment?.amount ||
                          "N/A"}
                      </td>
                      <td className="py-3 px-4">
                        {new Date(order.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
