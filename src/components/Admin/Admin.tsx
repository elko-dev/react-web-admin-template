import React, { Fragment } from "react";
import LeftMenu from "../LeftMenu/LeftMenu";
import TopMenu from "../TopMenu/TopMenu";
import { Switch, Route } from "react-router";
import Users from "../Users/Users";
import Locations from "../Products/Products";
import Notifications from "../../common/components/Notification";

const Admin: React.FC = () => {

  return (
    <Fragment>
      <Notifications />
      <LeftMenu />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <TopMenu />
          <div className="container-fluid">
            <Switch>
              <Route path={`/users`}><Users /></Route>
              <Route path={`/locations`}><Locations /></Route>
              {/* <Route path="/"><Home /></Route> */}
            </Switch>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Admin;
