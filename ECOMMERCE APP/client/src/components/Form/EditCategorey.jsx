// src/components/EditCategoryForm.jsx
import React, { useState } from "react";
const EditCategoryForm = () => {
  const [selectedId, setSelectedId] = useState("");
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedId || !updatedName) {
      alert("Please select a category and enter a new name.");
      return;
    }

    onEdit(selectedId, updatedName);
    setSelectedId("");
    setUpdatedName("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        className="border p-2 mr-2"
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="New Category Name"
        value={updatedName}
        onChange={(e) => setUpdatedName(e.target.value)}
        className="border p-2 mr-2"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Update
      </button>
    </form>
  );
};

export default EditCategoryForm;
