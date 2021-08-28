import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchNotebooksThunk = createAsyncThunk(
  "NOTEBOOKS_FETCH",
  async () => {
    return [
      {
        name: "notebook one",
      },
    ];
  }
);
