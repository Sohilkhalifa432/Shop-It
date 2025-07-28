import React from "react";
import { useSearch } from "../../context/SearchContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `https://shop-it-1-9q81.onrender.com/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setValues({
      keyword: "",
      results: [],
    });
  };

  return (
    <>
      <form
        className="form-inline my-2 my-lg-0 flex gap-3 items-center relative"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control mr-sm-2 lg:h-9"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        {values.keyword && (
          <span
            className="absolute lg:top-2 right-28 text-black cursor-pointer"
            onClick={handleCancel}
          >
            <i className="fa fa-times" aria-hidden="true"></i>
          </span>
        )}
        <button className="btn btn-dark my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    </>
  );
};

export default SearchInput;
