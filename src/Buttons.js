import React from "react";
import { useGlobalContext } from "./context";

const Buttons = () => {
  const { page, nbPages, handlePage, isLoading } = useGlobalContext();
  return (
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
        disabled={isLoading || page === nbPages}
        onClick={() => handlePage("next")}
      >
        next
      </button>
    </div>
  );
};

export default Buttons;
