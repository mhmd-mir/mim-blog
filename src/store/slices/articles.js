import { createSlice } from "@reduxjs/toolkit";

const articleSlice = createSlice({
  name: "articles",
  initialState: [],
  reducers: {
    INIT_ARTICLES: (state, action) => {
      return [...action.payload];
    },
    ADD_ARTICLE: (state, action) => {
      state.push(action.payload);
    },
    REMOVE_ARTICLE: (state, action) => {
      console.log(action);
      const newArticles = state.filter(
        (article) => article.id !== action.payload.id
      );
      return newArticles;
    },
    EDIT_ARTICLE: (state, action) => {
      const index = state.findIndex(
        (article) => article.id === action.payload.id
      );
      state[index] = action.payload;
    },
  },
});

export default articleSlice.reducer;
