import { getNoteDB } from "../db/note";

export const GetNotebooks = async () => {
  const db = getNoteDB();
  // await db.post({
  //   doc_type: "notebook",
  //   name: "notebook one 1",
  // });
  return await db
    .find({
      selector: {
        doc_type: {
          $eq: "notebook",
        },
      },
    })
    .then(result => {
      console.log("result.docs", result.docs);
      return result.docs;
    });
};

export const GetNotes = async (notebookId: string) => {
  const db = getNoteDB();
  // await db.post({
  //   doc_type: "notebook",
  //   name: "notebook one 1",
  // });
  return await db
    .find({
      selector: {
        doc_type: {
          $eq: "note",
        },
        notebookId: {
          $eq: notebookId,
        },
      },
    })
    .then(result => {
      console.log("result.docs", result.docs);
      return result.docs;
    });
};
