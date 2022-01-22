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
import { NotebookDBContentType } from "../../db/types/note";
import { fetchNotebooksThunk } from "./thunk";

export const history = createBrowserHistory({ basename: "/note" });

export const notebooksSlice = createSlice({
  name: "notebooks",
  initialState: {
    value: [] as PouchDB.Core.ExistingDocument<NotebookDBContentType>[],
    status: "",
  },
  reducers: {},
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

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: undefined,
    isAuthenticated: false,
  },
  reducers: {
    USER_SIGNIN: (state, action) => {
      console.log("USER_SIGNIN", action, {
        ...state,
        ...action.payload,
      });
      return {
        ...state,
        ...action.payload,
      };
    },
    USER_SIGNOUT: (state, action) => {
      return {
        ...state,
        username: undefined,
        isAuthenticated: false,
      };
    },
  },
});

export const store = configureStore({
  devTools: true,
  // middleware: getDefaultMiddleware => getDefaultMiddleware(),
  reducer: {
    router: connectRouter(history),
    notebooks: notebooksSlice.reducer,
    user: userSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
