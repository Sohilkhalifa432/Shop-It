import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import { Checkbox } from "antd";
import { useNavigate } from "react-router";
import { cartApi } from "../../context/CartContext";

const Homepage = () => {
  const [categorey, setCategorey] = useState([]);
  const [products, setProducts] = useState([]);
  const [auth, setAuth] = useAuth();
  const [checked, setChecked] = useState([]);
  const [cart, setCart] = cartApi([]);
  const navigate = useNavigate();

  // Fetch categories
  const fetchCategories = async () => {
    console.log("auth object:", auth);
    console.log("token:", auth?.token);

    try {
      const res = await axios.get("https://shop-it-1-9q81.onrender.com/api/v1/Categorey/Categorey", {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      if (res.data.success) {
        setCategorey(res.data.categorey);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      fetchCategories();
    }
  }, [auth?.token]);

  // Fetch products
  const GetAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/Get-All-Products", {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error.response?.data || error);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const FilterCategorey = async () => {
    console.log("Checked array:", checked); // <-- यह डालें
    const { data } = await axios.post(
      `/api/v1/Categorey/filter-categorey`,
      { checked },
      {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      }
    );
    console.log(auth?.token);
    setProducts(data?.product);
  };

  useEffect(() => {
    if (auth?.token) {
      GetAllProducts();
    }
  }, [auth?.token]);

  useEffect(() => {
    if (checked.length) FilterCategorey();
  }, [checked]);

  return (
    <Layout>
      {/* Main background */}
      <div className="min-h-screen w-full bg-white py-8">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Categories Section */}
            <div className="bg-[#9fe7f5] p-4 rounded-2xl shadow-md">
              <h2 className="text-lg text-[#053f5c] font-bold mb-3">
                Categories
              </h2>
              {categorey?.length > 0 ? (
                categorey.map((c) => (
                  <div className="my-1" key={c._id}>
                    <Checkbox
                      style={{
                        color: "#053f5c",
                        fontWeight: "500",
                        fontFamily: "inherit",
                        fontSize: "0.95rem",
                      }}
                      onChange={(e) => handleFilter(e.target.checked, c._id)}
                    >
                      {c.name}
                    </Checkbox>
                  </div>
                ))
              ) : (
                <p className="text-xs text-[#429ebd] mt-2">
                  No categories found
                </p>
              )}
            </div>

            {/* Products Section */}
            <div className="col-span-2">
              <div className="bg-white p-4 rounded-2xl shadow-md">
                <h2 className="text-lg text-[#053f5c] font-bold text-center mb-4">
                  {/* {JSON.stringify(checked, null, 4)} */}
                  All Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {products.length > 0 ? (
                    products.map((product) => (
                      <div
                        key={product._id}
                        className="bg-white p-3 rounded-lg shadow flex flex-col transition-transform duration-200 hover:scale-[1.03]"
                      >
                        <img
                          src={`http://localhost:3000/api/v1/product/product-photo/${product._id}`}
                          alt={product.name}
                          className="h-32 w-full object-cover mb-2 rounded-md bg-white"
                        />

                        <h3 className="text-base font-bold text-[#053f5c] mb-1">
                          {product.name}
                        </h3>
                        <p className="text-[#429ebd] text-xs mb-2 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-base font-bold text-[#053f5c]">
                            ₹{product.price}
                          </span>
                          <span className="text-xs text-[#053f5c] bg-[#9fe7f5] px-2 py-0.5 rounded">
                            In Stock: {product.quantity}
                          </span>
                        </div>
                        <div className="flex mt-2">
                          <button
                            className="flex-1 py-1.5 rounded bg-[#053f5c] text-white text-xs font-bold hover:bg-[#429ebd] hover:text-white transition-all duration-200"
                            onClick={() => {
                              setCart([...cart, product]);
                              localStorage.setItem(
                                "cart",
                                JSON.stringify([...cart, product])
                              );
                              alert("Value added to Cart !");
                            }}
                          >
                            Add To Cart
                          </button>
                          <button
                            className="flex-1 py-1.5 rounded bg-[#9fe7f5] text-[#053f5c] text-xs font-bold hover:bg-[#429ebd] hover:text-white transition-all duration-200"
                            onClick={() => navigate(`/product/${product.slug}`)}
                          >
                            More Details
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-[#429ebd] mt-6 text-sm">
                      No products available
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
