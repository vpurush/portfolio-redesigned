import { List } from "@fluentui/react/lib/List";
import { connect, ConnectedProps, ConnectedComponent } from "react-redux";
import React from "react";
import { dispatch } from "d3";
import { fetchNotebooksThunk } from "../redux/note/thunk";
import { notebooksSlice, RootState } from "../redux/note/store";
import { useEffect } from "react";

const onRenderNotebook = ({ name }) => {
  return <span>{name}</span>;
};

const connector = connect(
  (state: RootState) => ({
    items: state.notebooks.value,
  }),
  dispatch => ({
    loadNotebookList: () => dispatch(fetchNotebooksThunk() as any),
  })
);

type NotebookListProps = ConnectedProps<typeof connector>;

// export const NotebookList: React.FC<NotebookListProps> = connector(
const UnConnectedNotebookList = ({
  items,
  loadNotebookList,
}: NotebookListProps) => {
  useEffect(() => {
    console.log("invoke action");
    loadNotebookList();
  }, []);
  return (
    <List
      items={items}
      //   getItemCountForPage={getItemCountForPage}
      //   getPageHeight={getPageHeight}
      renderedWindowsAhead={4}
      onRenderCell={onRenderNotebook}
    />
  );
};
export const NotebookList = connector(UnConnectedNotebookList);
