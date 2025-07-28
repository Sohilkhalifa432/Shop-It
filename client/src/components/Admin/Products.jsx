import React from "react";
import Layout from "../layout/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import AdminMenu from "../layout/AdminMenu";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [auth, setAuth] = useAuth();

  const GetAllPrdoducts = async () => {
    const { data } = await axios.get("https://shop-it-1-9q81.onrender.com/api/v1/product/Get-All-Products", {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    });
    if (data.success) {
      setProducts(data.products);
    }
  };

  useEffect(() => {
    GetAllPrdoducts();
  }, []);

  return (
    <>
      <Layout>
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-3 bg-gray-200 p-4">
              <AdminMenu />
            </div>
            <div className="col-span-9 bg-gray-400 p-4 w-full">
              <h1 className="text-center my-10 text-3xl font-semibold text-blue-600">
                All Products
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((p) => {
                  return (
                    <Link to={`/admin/update-product/${p.slug}`} key={p._id}>
                      <div className="rounded-2xl overflow-hidden shadow-lg bg-white p-5 transition-transform hover:scale-105">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          alt={p.name}
                          className="h-40 w-full object-cover mb-3 rounded-md"
                        />
                        <div className="text-xl font-semibold text-gray-800 mb-2">
                          {p.name}
                        </div>
                        <p className="text-gray-600 mb-3 line-clamp-3">
                          {p.description}
                        </p>
                        <div className="flex justify-between items-center mt-4">
                          <span className="text-green-600 font-bold text-lg">
                            ₹{p.price}
                          </span>
                          <span className="text-sm text-gray-500">
                            In Stock: <strong>{p.quantity}</strong>
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Products;
