import { List } from "@fluentui/react/lib/List";
import { connect, ConnectedProps, ConnectedComponent } from "react-redux";
import React from "react";
import { dispatch } from "d3";
import { fetchNotesThunk } from "../redux/note/thunk";
import { notebooksSlice, RootState } from "../redux/note/store";
import { useEffect } from "react";
import { NotebookListItem } from "./notebook-list-item";
import { NotebookType } from "../db/types/note";
import { useParams } from "react-router-dom";

const connector = connect(
  (state: RootState) => ({
    items: state.notebooks.value,
  }),
  dispatch => ({
    loadNoteList: (notebookId: string) =>
      dispatch(fetchNotesThunk(notebookId) as any),
  })
);

type NotebookProps = ConnectedProps<typeof connector>;

// export const NotebookList: React.FC<NotebookListProps> = connector(
const DisconnectedNotebook = ({ items, loadNoteList }: NotebookProps) => {
  const { notebookId } = useParams();
  useEffect(() => {
    console.log("invoke action", notebookId);
    loadNoteList(notebookId);
  }, []);
  return (
    // <List
    //   items={items}
    //   //   getItemCountForPage={getItemCountForPage}
    //   //   getPageHeight={getPageHeight}

    //   renderedWindowsAhead={4}
    //   onRenderCell={NotebookListItem}
    // />
    <div>
      {items.map((item, i) => (
        <NotebookListItem
          key={i}
          name={(item as NotebookType).name}
          notebookId={item._id}
        />
      ))}
    </div>
  );
};
export const Notebook = connector(DisconnectedNotebook);
