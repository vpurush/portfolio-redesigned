import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Padding } from "styled-components-spacing";
import { Layout } from "../components/layout";
import { Provider } from "react-redux";
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
import { history, store } from "../redux/note/store";

export const Note = () => {
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
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/add-note" render={() => "Add note"} />
            <Route exact path="/add-notebook" render={() => "Add notebook"} />
            <Route
              exact
              path="/notebook/:notebook"
              render={() => "Show notebook"}
            />
            <Route exact path="/notebooks" render={() => "Show notebooks"} />
            <Redirect to="/notebooks" />
          </Switch>
        </ConnectedRouter>
      </Provider>
    </Layout>
  );
};

export default Note;
