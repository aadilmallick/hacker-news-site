import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: true };
    case SET_STORIES:
      return {
        ...state,
        hits: action.payload.hits,
        nbPages: action.payload.nbPages,
        isLoading: false,
      };
    case REMOVE_STORY:
      const storyID = action.payload;
      return {
        ...state,
        hits: state.hits.filter((story) => story.objectID !== storyID),
      };
    case HANDLE_SEARCH:
      return { ...state, query: action.payload.query, page: 0 };
    case HANDLE_PAGE:
      const value = action.payload.value === "previous" ? -1 : 1;
      return { ...state, page: state.page + value };
    default:
      throw new Error(`No matchign action type ${action.type}`);
  }
};
export default reducer;
