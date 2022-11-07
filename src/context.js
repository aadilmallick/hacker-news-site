import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";
import reducer from "./reducer";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?";

const initialState = {
  isLoading: true,
  hits: [],
  page: 0,
  query: "react",
  nbPages: 0,
  hitsPerPage: 0,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchStories = async (url) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.get(url);
      const data = response.data;
      console.log(data);
      dispatch({
        type: SET_STORIES,
        payload: { hits: data.hits, nbPages: data.nbPages },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const removeStory = (storyID) => {
    console.log(storyID);
    dispatch({ type: REMOVE_STORY, payload: storyID });
  };

  const handleSearch = (query) => {
    dispatch({ type: HANDLE_SEARCH, payload: { query } });
  };

  const handlePage = (value) => {
    dispatch({ type: HANDLE_PAGE, payload: { value } });
  };

  useEffect(() => {
    fetchStories(`${API_ENDPOINT}query=${state.query}&page=${state.page}`);
  }, [state.query, state.page]);

  return (
    <AppContext.Provider
      value={{ ...state, removeStory, handleSearch, handlePage }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
