import React, { useState, useEffect } from "react";
import AdminMenu from "../layout/AdminMenu";
import Layout from "../layout/Layout";
import axios from "axios";
import CategoreyForm from "../Form/CategoreyForm";

const Category = () => {
  const [categorey, setCategorey] = useState([]);
  const [name, setName] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [selectedId, setSelectedId] = useState("");

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

  // Create category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/Categorey/Create-Categorey", {
        name,
      });
      if (data.success) {
        alert(`${name} created!`);
        setName("");
        fetchCategories();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  // Update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/Categorey/Update-Categorey/${selectedId}`,
        { name: updatedName }
      );
      if (data.success) {
        alert("Category updated successfully!");
        setUpdatedName("");
        setSelectedId("");
        fetchCategories();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `/api/v1/Categorey/Delete-Categorey/${id}`
      );
      if (res.data.success) {
        alert("Deleted successfully");
        fetchCategories();
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
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
                Manage Categories
              </h1>

              {/* Create Form */}
              <div className="mb-6">
                <form
                  onSubmit={handleSubmit}
                  className="flex gap-4 items-center"
                >
                  <input
                    type="text"
                    placeholder="Category Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="px-4 py-2 rounded-lg border-2 border-[#9fe7f5] focus:border-[#429ebd] focus:ring-2 focus:ring-[#429ebd] text-[#053f5c] bg-[#f4faff] outline-none transition-all w-64"
                  />
                  <button
                    type="submit"
                    className="bg-[#053f5c] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#429ebd] transition"
                  >
                    Add Category
                  </button>
                </form>
              </div>

              {/* Update Form (shown only when selectedId exists) */}
              {selectedId && (
                <form
                  onSubmit={handleUpdate}
                  className="flex gap-4 items-center mb-6"
                >
                  <input
                    type="text"
                    placeholder="Update Category Name"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                    className="px-4 py-2 rounded-lg border-2 border-[#f7ad19] focus:border-[#429ebd] focus:ring-2 focus:ring-[#429ebd] text-[#053f5c] bg-[#f4faff] outline-none transition-all w-64"
                  />
                  <button
                    type="submit"
                    className="bg-[#f7ad19] text-[#053f5c] px-6 py-2 rounded-lg font-semibold hover:bg-[#429ebd] hover:text-white transition"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedId("");
                      setUpdatedName("");
                    }}
                    className="bg-[#9fe7f5] text-[#053f5c] px-6 py-2 rounded-lg font-semibold hover:bg-[#429ebd] hover:text-white transition"
                  >
                    Cancel
                  </button>
                </form>
              )}

              {/* Category Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse rounded-xl overflow-hidden shadow">
                  <thead>
                    <tr className="bg-[#9fe7f5] text-[#053f5c]">
                      <th className="px-6 py-3 text-left font-semibold">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categorey.map((c, idx) => (
                      <tr
                        key={c._id}
                        className={idx % 2 === 0 ? "bg-white" : "bg-[#f4faff]"}
                      >
                        <td className="px-6 py-3 text-[#053f5c] font-medium">
                          {c.name}
                        </td>
                        <td className="px-6 py-3 space-x-2">
                          <button
                            onClick={() => {
                              setSelectedId(c._id);
                              setUpdatedName(c.name);
                            }}
                            className="bg-[#429ebd] text-white px-4 py-1 rounded-lg font-semibold hover:bg-[#053f5c] transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(c._id)}
                            className="bg-red-500 text-white px-4 py-1 rounded-lg font-semibold hover:bg-red-700 transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Category;
