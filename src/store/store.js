import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUrl } from "../api/index.js";

const SEARCH_HISTORY_KEY = "SEARCH_HISTORY";
const CLIP_KEY = "CLIP_HISTORY";

export const setLocalStorageMiddleware = (store) => (next) => (action) => {
  console.log("setLocalStorageMiddleware", action);
  if (action.type === "history/addClip") {
    console.log("addClip",store.getState().history.clip ); 
    const storeClipList = [...store.getState().history.clip];
    try {
      localStorage.setItem(CLIP_KEY, JSON.stringify(storeClipList));    
    } catch (e) {
      throw new Error("LocalStorage를 사용할 수 없습니다.", e);
    }    
  }
  if (action.type === "history/deleteClip") {
    console.log("deleteClip",store.getState().history.clip ); 
    
    try {
      localStorage.removeItem(CLIP_KEY, JSON.stringify(store.getState()));    
    } catch (e) {
      throw new Error("LocalStorage를 사용할 수 없습니다.", e);
    }    
  }



  if (action.type === "newsSlice/fetchNewsbyWords/fulfilled") {
    // 중복허용
    // const UpdateHistoryList = Array.from(store.getState().history.history);
    // UpdateHistoryList.unshift(action.meta.arg.q);
    // if (UpdateHistoryList.length >= 6) UpdateHistoryList.length = 5;

    // 중복제거
    const storeHistoryList = [...store.getState().history.history];
    storeHistoryList.unshift(action.meta.arg.q);
    const UpdateHistoryList = [...new Set(storeHistoryList)];
    if (UpdateHistoryList.length >= 6) UpdateHistoryList.length = 5;


    try {
      localStorage.setItem(
        SEARCH_HISTORY_KEY,
        JSON.stringify(UpdateHistoryList)
      );
      store.dispatch(historySlice.actions.addHistory(UpdateHistoryList));
    } catch (e) {
      throw new Error("LocalStorage를 사용할 수 없습니다.", e);
    }
  }

  return next(action);
};

export const fetchNewsbyWords = createAsyncThunk(
  "newsSlice/fetchNewsbyWords",
  async (searchInfo, thunkAPI) => {
    try {
      console.log("createAsyncThunk 진입");
      const res = await fetch(getUrl(searchInfo));
      const jsondata = await res.json();
      return jsondata;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const newsSlice = createSlice({
  name: "news",
  initialState: {
    news: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: {
    [fetchNewsbyWords.pending]: (state) => {
      state.loading = true;
      state.news = [];
      state.error = "";
    },
    [fetchNewsbyWords.fulfilled]: (state, action) => {
      state.news = action.payload.response.docs;
      state.loading = false;
      state.error = "";
    },
    [fetchNewsbyWords.rejected]: (state, action) => {
      state.loading = false;
      state.news = [];
      state.error = action.payload;
    },
  },
});

export const clipSlice = createSlice({
  name: "clippednews",
  initialState: {
    clippednews: [],
  },
  reducers: {
    clip: ({ clippednews }, action) => {
      clippednews.push(action.payload);
    },
    unclip: ({ clippednews }, action) => {
      clippednews.filter((item) => item.id !== action.id);
    },
  },
});

// const initialHistoryList =
//   JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY)) || [];

const initialHistoryList = (() => {
  let initialState = { history: [],clip:[],isClip:false };
  // console.log("history initialState");
  try {
    initialState.history =
      JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY)) || [];
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
      state.clip = action.payload;
      state.isClip=true
    },
    deleteClip: (state, action) => {
      state.clip = 'none';
      state.isClip=false;
    },
  },
});

//----------------------------------------------
// 컴포넌트 영역

export const Stores = () => {
  const loading = useSelector(({ news }) => news.loading);
  const clippednewsList = useSelector(
    ({ clippednews }) => clippednews.clippednews
  );
  const newsList = useSelector(({ news }) => news.news);
  const historyList = useSelector(({ history }) => history.history);

  const nextId = React.useRef(4);
  const dispatch = useDispatch();
  const { clip } = clipSlice.actions;

  //---------
  let page = 1;
  const [value, setValue] = useState("");
  const [timer, setTimer] = useState(null);
  //---------
  const onDelay = (e) => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setTimer(
      setTimeout(() => {
        setValue(e.target.value.trim());
      }, 500)
    );
  };

  React.useEffect(() => {
    // console.log("React.useEffect");
    if (value !== "") {
      dispatch(fetchNewsbyWords({ q: value, page }));
    }
  }, [dispatch, value, page]);

  //------------
  // React.useEffect(() => {
  //   dispatch(fetchNewsbyWords({ q: "korea", page: 1 }));
  // }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      clip({
        id: nextId.current,
        article: event.target.elements.form__input.value,
      })
    );
    nextId.current++;
  };

  return (
    <>
      <div>store-clippednews</div>
      {clippednewsList.map((item) => (
        <div key={item.id}>
          <div>id: {item.id}</div>
          <div>article: {item.article}</div>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input id="form__input" type="text" style={{ border: "1px solid" }} />
        <button>add</button>
      </form>
      <br />
      <br />
      <br />

      <input
        onChange={onDelay}
        placeholder="검색어를 입력하세용..."
        style={{ border: "1px solid" }}
      ></input>
      <div>
        {/* 중복허용 */}
        {/* {historyList.map((item, index) => (
          <div key={index}>{item}</div>
        ))} */}
        {/* 중복제거 */}
        {historyList.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
      {loading ? "🕑loading🕒" : null}
      <section>
        {newsList.map((item) => (
          <div key={item._id}>
            <div>{item.headline.main}</div>
            <div>{item.pub_date.replace("T", " ").substring(0, 19)}</div>
          </div>
        ))}
      </section>

      {/* {console.log("newsList : ", newsList)} */}
    </>
  );
};

export default Stores;

export const { clip, unclip } = clipSlice.actions;
export const { addHistory , addClip, deleteClip} = historySlice.actions;
