import { createAsyncThunk } from "@reduxjs/toolkit";
import { NoteType } from "../../db/types/note";
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

export const fetchNotesThunk = createAsyncThunk<NoteType[], string>(
  "NOTEBOOKS_FETCH",
  async notebookId => {
    const a = await GetNotebooks()
      .catch(e => {
        console.error(e);
        throw e;
      })
      .then(result => result as NoteType[]);
    console.log("a", a);
    return a;
    // return [
    //   {
    //     name: "notebook one",
    //   },
    // ];
  }
);
