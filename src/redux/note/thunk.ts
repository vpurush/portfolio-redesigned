import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetNotebooks } from "../../service/note";

export const fetchNotebooksThunk = createAsyncThunk(
  "NOTEBOOKS_FETCH",
  async () => {
    const a = await GetNotebooks()
      .catch(e => {
        console.error(e);
        throw e;
      })
      .then(result => result);
    console.log("a", a);
    return a;
    // return [
    //   {
    //     name: "notebook one",
    //   },
    // ];
  }
);
