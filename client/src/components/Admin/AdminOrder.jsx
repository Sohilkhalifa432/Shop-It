import Layout from "../layout/Layout";
import AdminMenu from "../layout/AdminMenu";
import { useAuth } from "../../context/authContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { Select } from "antd";

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const { Option } = Select;
  const [status] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);

  const getAllOrders = async () => {
    try {
      const { data } = await axios.get("https://shop-it-1-9q81.onrender.com/api/v1/product/all-orders", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (data.success) setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (orderId, value) => {
    try {
      await axios.put(
        `/api/v1/product/put-order/${orderId}`,
        { status: value },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      getAllOrders();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllOrders();
    // eslint-disable-next-line
  }, [auth?.token]);

  return (
    <Layout>
      <div className="min-h-screen bg-[#f4faff] py-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Sidebar */}
            <aside className="md:col-span-3 bg-[#053f5c] rounded-2xl shadow-lg h-fit flex flex-col">
              <div className="text-center py-5 text-[#9fe7f5] font-bold text-2xl border-b-2 border-[#429ebd] tracking-wide">
                Admin Menu
              </div>
              <div className="p-4">
                <AdminMenu />
              </div>
            </aside>
            {/* Main Content */}
            <main className="md:col-span-9 bg-white rounded-2xl shadow-lg px-8 py-8 border-l-8 border-[#429ebd]">
              <h2 className="text-2xl font-bold text-[#053f5c] mb-8 flex items-center gap-2">
                <span className="inline-block w-4 h-4 rounded-full bg-[#f7ad19]"></span>
                All Orders
              </h2>
              {orders.length === 0 ? (
                <p className="text-[#429ebd] text-lg">No orders found.</p>
              ) : (
                <div className="space-y-8">
                  {orders.map((order, idx) => (
                    <div
                      key={order._id}
                      className="bg-[#9fe7f5] rounded-xl shadow p-6 border-l-4 border-[#053f5c] flex flex-col gap-3"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-[#053f5c] text-lg">
                            Order #{idx + 1}
                          </span>
                          <span className="bg-[#f7ad19] text-[#053f5c] font-semibold px-3 py-1 rounded-full text-xs">
                            {order.status}
                          </span>
                        </div>
                        <Select
                          value={order.status}
                          onChange={(value) => handleChange(order._id, value)}
                          className="w-40"
                          dropdownStyle={{ background: "#9fe7f5" }}
                        >
                          {status.map((s, ind) => (
                            <Option
                              key={ind}
                              value={s}
                              className="!bg-white hover:!bg-[#429ebd] hover:!text-white"
                            >
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p>
                            <span className="font-semibold text-[#053f5c]">
                              Buyer:
                            </span>{" "}
                            <span className="text-[#429ebd]">
                              {order?.buyer?.name || "N/A"}
                            </span>
                          </p>
                          <p>
                            <span className="font-semibold text-[#053f5c]">
                              Order Date:
                            </span>{" "}
                            <span className="text-[#429ebd]">
                              {new Date(order.createdAt).toLocaleString()}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p>
                            <span className="font-semibold text-[#053f5c]">
                              Total Products:
                            </span>{" "}
                            <span className="text-[#429ebd]">
                              {order.products?.length}
                            </span>
                          </p>
                          <p>
                            <span className="font-semibold text-[#053f5c]">
                              Payment:
                            </span>{" "}
                            <span
                              className={`font-bold ${
                                order?.payment?.success
                                  ? "text-green-700"
                                  : "text-red-600"
                              }`}
                            >
                              {order?.payment?.success ? "Success" : "Failed"}
                            </span>
                          </p>
                        </div>
                      </div>
                      {/* Products */}
                      <div className="mt-2">
                        <span className="font-semibold text-[#053f5c]">
                          Products:
                        </span>
                        <ul className="list-disc ml-6 mt-1">
                          {order.products &&
                            order.products.map((product) => (
                              <li key={product._id} className="text-[#053f5c]">
                                {product.name}
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrder;
