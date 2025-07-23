import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import axios from "axios";
import { useParams } from "react-router";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const params = useParams();

  // Fetch single product
  const GetProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/Get-Single-Product/${params.slug}`
      );
      setProduct(data.product);

      if (
        data.product &&
        data.product._id &&
        data.product.categorey &&
        data.product.categorey._id
      ) {
        GetSimilarProducts(data.product._id, data.product.categorey._id);
      } else {
        setSimilarProducts([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch similar products
  const GetSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/similar-products/${pid}/${cid}`
      );
      setSimilarProducts(data.products || []);
    } catch (error) {
      console.log(error);
      setSimilarProducts([]);
    }
  };

  useEffect(() => {
    if (params?.slug) GetProduct();
    // eslint-disable-next-line
  }, [params?.slug]);

  return (
    <Layout>
      <div className="min-h-screen bg-[#f4faff] py-10">
        <div className="container mx-auto px-4">
          {/* Main Product Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
            {/* Product Image */}
            <div className="flex justify-center items-center">
              {product && product._id && (
                <img
                  src={`http://localhost:3000/api/v1/product/product-photo/${product._id}`}
                  alt={product.name}
                  className="w-full max-w-md h-96 object-cover rounded-2xl shadow-lg  bg-white"
                />
              )}
            </div>
            {/* Product Info */}
            <div className="flex flex-col justify-center items-start gap-5">
              <h1 className="text-3xl font-bold text-[#053f5c]">
                {product?.name}
              </h1>
              <p className="text-lg text-[#429ebd]">{product?.description}</p>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-[#f7ad19]">
                  ₹{product?.price}
                </span>
                <span className="bg-[#9fe7f5] text-[#053f5c] px-3 py-1 rounded-full font-semibold">
                  {product?.shipping ? "Shipping Available" : "No Shipping"}
                </span>
              </div>
              <button className="mt-4 px-8 py-2 bg-[#053f5c] text-white rounded-lg font-bold hover:bg-[#429ebd] transition">
                Add To Cart
              </button>
            </div>
          </div>

          {/* Similar Products */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-[#053f5c] mb-6 flex items-center gap-2">
              <span className="inline-block w-4 h-4 rounded-full bg-[#f7ad19]"></span>
              Similar Products
            </h2>
            {similarProducts.length === 0 ? (
              <p className="text-[#429ebd] text-lg">
                No similar products found.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {similarProducts.map((sp) => (
                  <div
                    key={sp._id}
                    className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center border-l-4 border-[#429ebd] hover:scale-[1.03] transition"
                  >
                    <img
                      src={`http://localhost:3000/api/v1/product/product-photo/${sp._id}`}
                      alt={sp.name}
                      className="w-full h-40 object-cover rounded-lg mb-3 border-2 border-[#9fe7f5]"
                    />
                    <h5 className="text-lg font-bold text-[#053f5c] mb-1">
                      {sp.name}
                    </h5>
                    <p className="text-sm text-[#429ebd] mb-2 line-clamp-2">
                      {sp.description}
                    </p>
                    <p className="text-base font-bold text-[#f7ad19] mb-2">
                      ₹{sp.price}
                    </p>
                    <button className="px-4 py-1 bg-[#053f5c] text-white rounded hover:bg-[#429ebd] transition">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
