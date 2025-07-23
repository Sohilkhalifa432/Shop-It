import React, { useState, useEffect } from "react";
import { cartApi } from "../../context/CartContext";
import Layout from "../layout/Layout";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = cartApi();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => (item.id || item._id) !== id));
  };

  // Update quantity
  const updateQuantity = (id, amount) => {
    setCart(
      cart.map((item) =>
        (item.id || item._id) === id
          ? { ...item, quantity: Math.max(1, (item.quantity || 1) + amount) }
          : item
      )
    );
  };

  // Get Braintree client token
  const GetClientToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken || data);
    } catch (err) {
      alert("Failed to load payment gateway!");
    }
  };

  useEffect(() => {
    GetClientToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      if (!instance) {
        alert("Payment instance not ready");
        setLoading(false);
        return;
      }
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        cart,
        nonce,
      });
      if (data && data.ok) {
        navigate("/dashboard/orders");
        setCart([]);
        localStorage.removeItem("cart");
        alert("Payment Successful! Order Placed.");
      } else {
        alert("Payment failed! Please try again.");
      }
    } catch (error) {
      alert("Payment failed! " + (error?.response?.data?.err || error.message));
      navigate("/dashboard/orders");
    } finally {
      setLoading(false);
    }
  };



  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-4 text-[#053f5c]">
          {auth?.token && auth?.user?.name
            ? `Hello, ${auth.user.name}!`
            : "Your Cart"}
        </h1>
        {cart.length === 0 ? (
          <div className="bg-[#9fe7f5] rounded-lg shadow p-8 text-center">
            <img
              src="/empty-cart.svg"
              alt="Empty Cart"
              className="mx-auto w-40 mb-4"
            />
            <h2 className="text-xl font-semibold mb-2 text-[#053f5c]">
              Your cart is empty!
            </h2>
            <p className="mb-4 text-[#429ebd]">
              Looks like you haven't added anything yet.
            </p>
            <a
              href="/"
              className="inline-block bg-[#053f5c] text-white px-6 py-2 rounded hover:bg-[#429ebd] transition"
            >
              Go to Shop
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4 text-[#053f5c]">
                  Cart Items
                </h2>
                <ul>
                  {cart.map((item) => (
                    <li
                      className="flex items-center justify-between border-b py-4"
                      key={item._id || item.id}
                    >
                      <div className="lg:flex items-center gap-4 ">
                        <img
                          src={`http://localhost:3000/api/v1/product/product-photo/${
                            item._id || item.id
                          }`}
                          alt={item.name}
                          className="h-32 w-32 object-cover mb-3 rounded-md"
                        />
                        <div>
                          <div className="font-semibold text-[#053f5c]">
                            {item.name}
                          </div>
                          <div className="text-[#f7ad19] font-bold">
                            ₹{item.price}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id || item._id, -1)
                          }
                          className="px-2 py-1 bg-[#9fe7f5] text-[#053f5c] rounded hover:bg-[#429ebd] hover:text-white transition"
                        >
                          -
                        </button>
                        <span className="px-2 font-semibold text-[#053f5c]">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id || item._id, 1)}
                          className="px-2 py-1 bg-[#9fe7f5] text-[#053f5c] rounded hover:bg-[#429ebd] hover:text-white transition"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id || item._id)}
                          className="ml-4 text-red-500 hover:text-red-700"
                          title="Remove"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Cart Summary */}
            <div>
              <div className="bg-white rounded-lg shadow p-6 sticky top-24 border-2 border-[#9fe7f5]">
                <h2 className="text-xl font-semibold mb-4 text-[#053f5c]">
                  Summary
                </h2>
                <div className="flex justify-between mb-2 text-[#429ebd]">
                  <span>Total Items:</span>
                  <span>
                    {cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}
                  </span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-[#429ebd]">Total Price:</span>
                  <span className="font-bold text-lg text-[#f7ad19]">
                    ₹{totalPrice.toFixed(2)}
                  </span>
                </div>
                {auth?.user ? (
                  <>
                    <button
                      className={`w-full bg-[#f7ad19] text-[#053f5c] font-bold py-2 rounded hover:bg-[#429ebd] hover:text-white transition ${
                        cart.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={handlePayment}
                      disabled={cart.length === 0}
                    >
                      Proceed to Checkout
                    </button>
                    <div className="my-2 text-md text-[#053f5c]">
                      <span className="font-bold">Address:</span>{" "}
                      {auth?.user?.address}
                    </div>
                    <button
                      className="bg-[#9fe7f5] text-[#053f5c] font-bold px-8 py-2 my-3 mx-auto rounded hover:bg-[#429ebd] hover:text-white transition"
                      onClick={() => navigate("/dashboard")}
                    >
                      Update Address
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-[#053f5c] text-white font-bold px-8 py-2 rounded hover:bg-[#429ebd] transition"
                      onClick={() => navigate("/login")}
                    >
                      Please login to check out
                    </button>
                  </>
                )}
                <div className="mt-3">
                  {clientToken ? (
                    <>
                      <DropIn
                        key={clientToken}
                        options={{
                          authorization: clientToken,
                          paypal: {
                            flow: "vault",
                          },
                        }}
                        onInstance={(inst) => {
                          setInstance(inst);
                        }}
                      />
                      <button
                        className="w-full bg-[#053f5c] text-white font-bold py-2 rounded hover:bg-[#429ebd] transition mt-2"
                        onClick={handlePayment}
                        disabled={!instance || loading || !auth?.token}
                      >
                        {loading ? "Processing..." : "Make Payment"}
                      </button>
                    </>
                  ) : (
                    <span className="text-[#429ebd]">
                      Loading payment gateway...
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
