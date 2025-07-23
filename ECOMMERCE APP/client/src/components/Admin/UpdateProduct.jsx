import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Select } from "antd";
import AdminMenu from "../layout/AdminMenu";
import Layout from "../layout/Layout";

const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState(null);
  const [oldPhoto, setOldPhoto] = useState("");

  const navigate = useNavigate();
  const params = useParams();
  const { Option } = Select;

  // Get Single Product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/Get-Single-Product/${params.slug}`
      );
      const p = data.product;
      setName(p.name);
      setDescription(p.description);
      setPrice(p.price);
      setQuantity(p.quantity);
      setShipping(p.shipping);
      setCategory(p.category?._id);
      setOldPhoto(p.photo); // If you are sending image path from backend
    } catch (error) {
      console.log("Error loading product:", error);
    }
  };

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/v1/Categorey/Categorey");
      if (res.data.success) {
        setCategories(res.data.categorey);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    getSingleProduct();
  }, []);

  // Update Product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      productData.append("category", category);
      if (photo) {
        productData.append("photo", photo);
      }

      const { data } = await axios.put(
        `/api/v1/product/Update-Product/${params.slug}`,
        productData
      );

      if (data?.success) {
        alert("Product updated successfully");
        navigate("/dashboard/admin/products");
      } else {
        alert(data.message || "Update failed");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-3">
            <AdminMenu />
          </div>
          <div className="col-span-9 bg-white p-6 rounded shadow">
            <h1 className="text-2xl font-semibold mb-6">Update Product</h1>

            <form onSubmit={handleUpdate} className="space-y-4">
              <Select
                placeholder="Select a category"
                size="large"
                className="w-full"
                onChange={(value) => setCategory(value)}
                value={category}
              >
                {categories.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
              />

              {/* Show new photo preview if selected */}
              {photo ? (
                <img
                  src={URL.createObjectURL(photo)}
                  alt="new"
                  height="200"
                  width="200"
                  className="object-cover"
                />
              ) : (
                // Show old photo if exists
                oldPhoto && (
                  <img
                    src={`/api/v1/product/product-photo/${params.slug}`}
                    alt="product"
                    height="200"
                    width="200"
                    className="object-cover"
                  />
                )
              )}

              <input
                type="text"
                placeholder="Product Name"
                className="w-full border p-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                placeholder="Product Description"
                className="w-full border p-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="number"
                placeholder="Price"
                className="w-full border p-2"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                type="number"
                placeholder="Quantity"
                className="w-full border p-2"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />

              <Select
                className="w-full"
                placeholder="Shipping"
                value={shipping}
                onChange={(value) => setShipping(value)}
              >
                <Option value="yes">Yes</Option>
                <Option value="no">No</Option>
              </Select>

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded"
              >
                Update Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
