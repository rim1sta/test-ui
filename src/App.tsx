import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { PartnersTable } from "./components/partners-table/partners-table";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { PartnerCreate } from "./components/partner-create/partner-create";
import { PartnerEdit } from "./components/partner-edit/partner-edit";
import { UsersTable } from "./components/users-table/users-table";
import { UserEdit } from "./components/user-edit/user-edit";
import { PasswordEdit } from "./components/password-edit/password-edit";
import { CreateUser } from "./components/create-user/create-user";
import { LoginPage } from "./components/login-page/login-page";
import { Navigation } from "./components/navigation/navigation";
import {PrivateRoute} from "./components/private-route/private-route";

const App = () => {
  return (
    <>
      
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/partners" />
          </Route>
          <Route exact path="/login">
            <LoginPage/>
          </Route>
          <PrivateRoute exact path="/partners">
            <Navigation />
            <PartnersTable />
            </PrivateRoute>

            <PrivateRoute exact path="/users">
          <Navigation/>
            <UsersTable />
            </PrivateRoute>
          
          <Route
            exact
            path="/partner/:id"
            render={(routerProps) => {
              const partnerId = routerProps.match.params.id;

              return <PartnerEdit id={partnerId} />;
            }}
          />
          <PrivateRoute exact path="/partner-create/">
            <PartnerCreate />
          </PrivateRoute>
          <Route
            exact
            path="/user/:id"
            render={(routerProps) => {
              const userId = routerProps.match.params.id;
              return <UserEdit id={userId} />;
            }}
          />
          <PrivateRoute exact path="/user-create/">
            <CreateUser />
          </PrivateRoute>
          <Route
            exact
            path="/user/:id/password"
            render={(routerProps) => {
              const userId = routerProps.match.params.id;
              return <PasswordEdit id={userId} />;
            }}
          />
        </Switch>
      </BrowserRouter>
      </>
  );
};


export default App;
