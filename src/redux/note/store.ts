import {
  combineReducers,
  configureStore,
  createSlice,
  PayloadAction,
  createAsyncThunk,
  MiddlewareArray,
} from "@reduxjs/toolkit";
import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import { composeWithDevTools } from "redux-devtools-extension";
import { fetchNotebooksThunk } from "./thunk";

export const history = createBrowserHistory({ basename: "/note" });

export const notebooksSlice = createSlice({
  name: "notebooks",
  initialState: {
    value: [],
    status: "",
  },
  reducers: {
    NOTEBOOKS_FETCH_SUCCESS: (state, action: PayloadAction<any[]>) => {
      return {
        ...state,
        value: action.payload,
        status: "SUCCESS",
      };
    },
    // NOTEBOOKS_FETCH: (state, action: PayloadAction<any[]>) => {
    //   return {
    //     ...state,
    //     status: "PENDING",
    //   };
    // },
    NOTEBOOKS_FETCH_FAILED: (state, action: PayloadAction<any[]>) => {
      return {
        ...state,
        status: "PENDING",
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchNotebooksThunk.pending, (state, action) => {
      return {
        ...state,
        status: "PENDING",
      };
    });
    builder.addCase(fetchNotebooksThunk.fulfilled, (state, action) => {
      return {
        ...state,
        value: action.payload,
        status: "SUCCESS",
      };
    });
    builder.addCase(fetchNotebooksThunk.rejected, (state, action) => {
      return {
        ...state,
        status: "FAILED",
      };
    });
  },
});

export const store = configureStore({
  devTools: true,
  // middleware: getDefaultMiddleware => getDefaultMiddleware(),
  reducer: {
    router: connectRouter(history),
    notebooks: notebooksSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
