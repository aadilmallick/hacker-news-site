import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
  HANDLE_POPULAR,
  HANDLE_PAGE_ZERO,
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
  seeingFrontPage: false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchStories = async (url) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.get(url);
      const data = response.data;
      // console.log(data);
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
    dispatch({ type: HANDLE_POPULAR, payload: false });
    dispatch({ type: HANDLE_SEARCH, payload: { query } });
  };

  const handlePage = (value) => {
    dispatch({ type: HANDLE_PAGE, payload: { value } });
  };

  const setPageToZero = () => {
    dispatch({ type: HANDLE_PAGE_ZERO });
  };

  const getMostPopular = async (url) => {
    console.log(state);
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.get(url);
      const data = response.data;
      console.log(data);
      dispatch({
        type: SET_STORIES,
        payload: { hits: data.hits, nbPages: data.nbPages },
      });
      dispatch({ type: HANDLE_POPULAR, payload: true });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (state.seeingFrontPage === false) {
      console.log("im here");
      fetchStories(`${API_ENDPOINT}query=${state.query}&page=${state.page}`);
    } else {
      console.log("now im here mwahaha");
      getMostPopular(`${API_ENDPOINT}tags=${"front_page"}&page=${state.page}`);
    }
  }, [state.query, state.page, state.seeingFrontPage]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        removeStory,
        handleSearch,
        handlePage,
        getMostPopular,
        setPageToZero,
      }}
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
