import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Padding } from "styled-components-spacing";
import { Layout } from "../components/layout";
import { connect, ConnectedProps, Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import {
  CommandBar,
  ICommandBarItemProps,
  PrimaryButton,
} from "@fluentui/react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { history, RootState, store, userSlice } from "../redux/note/store";
import { NotebookList } from "../components/notebook-list";
import { fetchNotebooksThunk } from "../redux/note/thunk";
import { initializeNoteDB } from "../db/note";
import { useState } from "react";
import { Notebook } from "../components/notebook";

const connector = connect(
  (state: RootState) => ({
    user: state.user,
  }),
  dispatch => ({
    signin: user => dispatch(userSlice.actions.USER_SIGNIN(user)),
  })
);

type NoteProps = ConnectedProps<typeof connector>;

export const Note = connector(({ user, signin }: NoteProps) => {
  const [isDBInitialized, setIsDBInitialized] = useState<boolean>(false);
  if (!user.isAuthenticated) {
    signin({
      isAuthenticated: true,
      username: "vpurush",
    } as RootState["user"]);
  }

  useEffect(() => {
    if (user.isAuthenticated) {
      initializeNoteDB(user.username);
      setIsDBInitialized(true);
    }
  }, [user.isAuthenticated]);

  const commandBarItems: ICommandBarItemProps[] = [
    {
      key: "new",
      text: "New",
      submenuIconProps: { iconName: "ChevronDownMedIcon" },
      iconProps: { iconName: "Add" },
      subMenuProps: {
        items: [
          {
            key: "new-note",
            text: "New note",
            iconProps: { iconName: "Mail" },
            ["data-automation-id"]: "newEmailButton", // optional
            onClick: () => console.log("on first menu item click"),
          },
          {
            key: "new-notebook",
            text: "New notebook",
            iconProps: { iconName: "Calendar" },
          },
        ],
      },
    },
  ];

  return (
    <Layout>
      <CommandBar items={[]} farItems={commandBarItems} />
      <ConnectedRouter history={history}>
        <Switch>
          {user.isAuthenticated && isDBInitialized ? (
            <>
              <Route exact path="/add-note" render={() => "Add note"} />
              <Route exact path="/add-notebook" render={() => "Add notebook"} />
              <Route
                exact
                path="/notebook/:notebookId"
                render={() => <Notebook />}
              />
              <Route exact path="/notebooks" render={() => <NotebookList />} />
              <Redirect to="/notebooks" />
            </>
          ) : (
            <div>Unauthenticated</div>
          )}
        </Switch>
      </ConnectedRouter>
    </Layout>
  );
});

export default () => {
  return (
    <Provider store={store}>
      <Note />
    </Provider>
  );
};
