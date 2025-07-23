import React from "react";

const CategoreyForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit} className="mb-3 space-x-4">
        <input
          type="text"
          placeholder="Enter New Categorey"
          value={value}
          className="border px-30 py-2 mb-2 "
          onChange={(e) => setValue(e.target.value)}
        />

        <button className="px-11 py-2 border rounded bg-green-600 text-white hover:text-green-600 hover:bg-white">
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoreyForm;
