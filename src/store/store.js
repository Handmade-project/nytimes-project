import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

const NEWS_CLIP_KEY="NEWS_CLIP";
const SEARCH_HISTORY_KEY = "SEARCH_HISTORY";

export const setLocalStorageMiddleware = (store) => (next) => (action) =>
{
  if (action.type === "newsSlice/axiosNewsbyWords/fulfilled") {    
    const storeHistoryList = [...store.getState().history.history];  
    storeHistoryList.unshift(action.meta.arg.query);
    const updateHistoryList = [...new Set(storeHistoryList)];
    if (updateHistoryList.length >= 6) updateHistoryList.length = 5;
    try {
      localStorage.setItem(
        SEARCH_HISTORY_KEY,
        JSON.stringify(updateHistoryList)
      );
      store.dispatch(historySlice.actions.addHistory(updateHistoryList));
      store.dispatch(newsSlice.actions.addnews(action.payload.data.response));
    } catch (e) {
      throw new Error("LocalStorage를 사용할 수 없습니다.", e);
    }
  }  

  return next(action);
};

export const axiosNewsbyWords = createAsyncThunk(
  "newsSlice/axiosNewsbyWords",
  async (querySet) => {
      const query=querySet.query
      const pageNumber=querySet.pageNumber
      const API_KEY=querySet.API_KEY
      let cancel
    try {
      const res=  await axios({ 
      method: 'GET', 
      url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
      params: { q: query, page: pageNumber,'api-key':API_KEY },
      cancelToken: new axios.CancelToken(c => cancel = c)    })          
      return res;
    } catch (error) {
      if (axios.isCancel(error)) return
    }
    return () => cancel()
  }
);

export const newsSlice = createSlice({
  name: "news",
  initialState: {
    newsdata: [],
    loading: false,
    error: ""   
  },
  reducers: {
    addnews: (state, action) => {
      state.newsdata = action.payload;
    },
  
    },
});
  
const initialHistoryList = (() => {
  let initialState = { history: [],isClip:[],isClip:false };
  try {
    initialState.history =JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY)) || [];
    initialState.isClip =JSON.parse(localStorage.getItem(NEWS_CLIP_KEY)) || [];
  } catch (e) {
    // error
    throw new Error("LocalStorage를 사용할 수 없습니다.", e);
  } finally {
    return initialState;
  }
})();

export const historySlice = createSlice({
  name: "history",
  initialState: initialHistoryList,
  reducers: {   
    addHistory: (state, action) => {
      state.history = action.payload;
    },
    addClip: (state, action) => {      
      state.isClip.push(action.payload)
      localStorage.setItem(
        NEWS_CLIP_KEY,
        JSON.stringify(state.isClip)
      ); 
    },
    deleteClip: (state, action) => {     
      state.isClip= current(state.isClip).filter(e=>e.web_url !== action.payload)        
      localStorage.setItem( NEWS_CLIP_KEY, JSON.stringify(state.isClip));
    },
  },
});

export const { addClip,deleteClip } = historySlice.actions;