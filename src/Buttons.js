import React from "react";
import { useGlobalContext } from "./context";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?";

const Buttons = () => {
  const {
    page,
    nbPages,
    handlePage,
    isLoading,
    getMostPopular,
    setPageToZero,
  } = useGlobalContext();

  return (
    <>
      <div className="btn-container">
        <button
          onClick={() => {
            setPageToZero();
            getMostPopular(`${API_ENDPOINT}tags=${"front_page"}`);
          }}
        >
          most popular
        </button>
      </div>
      <div className="btn-container">
        <button
          disabled={isLoading || page === 0}
          onClick={() => handlePage("previous")}
        >
          prev
        </button>
        <p>
          {page + 1} of {nbPages}
        </p>
        <button
          disabled={isLoading || page + 1 === nbPages}
          onClick={() => handlePage("next")}
        >
          next
        </button>
      </div>
    </>
  );
};

export default Buttons;
