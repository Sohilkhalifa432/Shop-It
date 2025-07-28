import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Select } from "antd";
import AdminMenu from "../layout/AdminMenu";
import Layout from "../layout/Layout";

const CreateProduct = () => {
  const [categorey, setCategorey] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [cat, setCat] = useState("");
  const [photo, setPhoto] = useState("");

  const navigate = useNavigate();
  const { Option } = Select;

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://shop-it-1-9q81.onrender.com/api/v1/Categorey/Categorey");
      if (res.data.success) {
        setCategorey(res.data.categorey);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Prepare FormData to send
      const ProductData = new FormData();
      ProductData.append("name", name);
      ProductData.append("description", description);
      ProductData.append("price", price);
      ProductData.append("quantity", quantity);
      ProductData.append("shipping", shipping);
      ProductData.append("categorey", cat);
      ProductData.append("photo", photo);

      const { data } = await axios.post(
        "/api/v1/product/Create-Product",
        ProductData
      );

      if (data.success) {
        alert("Product added successfully!");
        navigate("/products");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
              <h1 className="text-2xl font-bold text-[#053f5c] mb-6 flex items-center gap-2">
                <span className="inline-block w-4 h-4 rounded-full bg-[#f7ad19]"></span>
                Create Product
              </h1>
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Category Select */}
                <div>
                  <label className="block mb-2 font-semibold text-[#053f5c]">
                    Category
                  </label>
                  <Select
                    placeholder="Select a category"
                    size="large"
                    className="w-full"
                    onChange={(value) => setCat(value)}
                    value={cat || undefined}
                    dropdownStyle={{ background: "#9fe7f5" }}
                  >
                    {categorey.map((c) => (
                      <Option key={c._id} value={c._id}>
                        {c.name}
                      </Option>
                    ))}
                  </Select>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block mb-2 font-semibold text-[#053f5c]">
                    Product Image
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    accept="image/*"
                    className="block w-full text-[#053f5c] bg-[#9fe7f5] rounded-lg border-2 border-[#429ebd] p-2"
                  />
                  {photo && (
                    <div className="mt-4 flex justify-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product"
                        className="h-40 w-40 object-cover rounded-lg border-4 border-[#9fe7f5]"
                      />
                    </div>
                  )}
                </div>

                {/* Product Info Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-[#053f5c]">
                      Product Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Product Name"
                      className="px-4 py-2 rounded-lg border-2 border-[#9fe7f5] focus:border-[#429ebd] focus:ring-2 focus:ring-[#429ebd] text-[#053f5c] bg-[#f4faff] outline-none transition-all"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-[#053f5c]">
                      Price
                    </label>
                    <input
                      type="number"
                      placeholder="Enter Product Price"
                      className="px-4 py-2 rounded-lg border-2 border-[#9fe7f5] focus:border-[#429ebd] focus:ring-2 focus:ring-[#429ebd] text-[#053f5c] bg-[#f4faff] outline-none transition-all"
                      onChange={(e) => setPrice(e.target.value)}
                      value={price}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-[#053f5c]">
                      Quantity
                    </label>
                    <input
                      type="number"
                      placeholder="Enter Product Quantity"
                      className="px-4 py-2 rounded-lg border-2 border-[#9fe7f5] focus:border-[#429ebd] focus:ring-2 focus:ring-[#429ebd] text-[#053f5c] bg-[#f4faff] outline-none transition-all"
                      onChange={(e) => setQuantity(e.target.value)}
                      value={quantity}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-[#053f5c]">
                      Shipping
                    </label>
                    <Select
                      className="w-full"
                      placeholder="Shipping"
                      value={shipping || undefined}
                      onChange={(value) => setShipping(value)}
                      dropdownStyle={{ background: "#9fe7f5" }}
                    >
                      <Option value="yes">Yes</Option>
                      <Option value="no">No</Option>
                    </Select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="font-semibold text-[#053f5c]">
                    Description
                  </label>
                  <textarea
                    placeholder="Enter Product Description"
                    className="w-full px-4 py-2 rounded-lg border-2 border-[#9fe7f5] focus:border-[#429ebd] focus:ring-2 focus:ring-[#429ebd] text-[#053f5c] bg-[#f4faff] outline-none transition-all"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    rows={3}
                  />
                </div>

                <button
                  className="w-full py-3 bg-[#053f5c] text-white font-bold rounded-lg hover:bg-[#429ebd] transition text-lg mt-4"
                  type="submit"
                >
                  Submit Product
                </button>
              </form>
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
