import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { PartnersTable } from "./components/partners-table/partners-table";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { PartnerCreate } from "./components/partner-create/partner-create";
import { PartnerEdit } from "./components/partner-edit/partner-edit";
import { UsersTable } from "./components/users-table/users-table";
import { UserEdit } from "./components/user-edit/user-edit";
import { PasswordEdit } from "./components/password-edit/password-edit";
import Nav from "react-bootstrap/Nav";
import { CreateUser } from "./components/create-user/create-user";

const App = () => {
  return (
    <>
      <Nav variant="tabs" defaultActiveKey="/">
        <Nav.Item>
          <Nav.Link href="/partners">Партнеры</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/users" eventKey="link-1">
            Пользователи
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <BrowserRouter>
        <Switch>
           
          <Route exact path="/">
            <Redirect to="/partners" />
          </Route>
          <Route exact path="/partners">
            <PartnersTable />
          </Route>
          <Route exact path="/users">
            <UsersTable />
          </Route>
          <Route
            exact
            path="/partner/:id"
            render={(routerProps) => {
              const partnerId = routerProps.match.params.id;

              return <PartnerEdit id={partnerId} />;
            }}
          />
          <Route exact path="/partner-create/">
            <PartnerCreate />
          </Route>
          <Route
            exact
            path="/user/:id"
            render={(routerProps) => {
              const userId = routerProps.match.params.id;
              return <UserEdit id={userId} />;
            }}
          />
          <Route exact path="/user-create/">
            <CreateUser />
          </Route>
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
