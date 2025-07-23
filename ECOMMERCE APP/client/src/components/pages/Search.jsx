import React from "react";
import { useSearch } from "../../context/SearchContext";
import Layout from "../layout/Layout";
import { useNavigate } from "react-router";
import { cartApi } from "../../context/CartContext";
const Search = () => {
  const [values] = useSearch();
  const navigate = useNavigate();
  const [cart, setCart] = cartApi([]);
  // Safely get products array
  const products =
    Array.isArray(values.results) && values.results.length
      ? values.results
      : Array.isArray(values.results?.products)
      ? values.results.products
      : [];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Show searched keyword */}
        <div className="mb-4">
          <span className="font-bold">Search Keyword:</span>{" "}
          <span className="italic text-blue-600">
            {values.keyword || "N/A"}
          </span>
        </div>

        {/* Show count of results */}
        <div className="mb-4">
          {products.length > 0 ? (
            <span className="text-green-700 font-semibold">
              Found: {products.length} product{products.length > 1 ? "s" : ""}
            </span>
          ) : (
            <span className="text-red-600 font-semibold">No Product Found</span>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="bg-gray-100 p-4 rounded-lg shadow-lg w-80 sm:w-full"
              >
                <img
                  src={`http://localhost:3000/api/v1/product/product-photo/${product._id}`}
                  alt={product.name}
                  className="h-40 w-full sm:w-80 object-cover mb-3 rounded-md"
                />
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-700">{product.description}</p>
                <div className="mt-4">
                  <span className="text-lg text-green-500">
                    ₹{product.price}
                  </span>
                  <span className="ml-2 text-gray-500">
                    In Stock: {product.quantity}
                  </span>
                  <div className="lg:flex my-2">
                    <button
                      className="btn btn-outline-dark hover:bg-gray-600 py-2 text-sm text-nowrap"
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
                      className="btn btn-outline-dark hover:bg-gray-600 py-2 text-sm text-nowrap"
                      onClick={() => navigate(`/product/${product.slug}`)}
                    >
                      More Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-6 w-full col-span-3">
              No products available
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
