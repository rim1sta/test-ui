import { BrowserRouter, Switch, Route } from "react-router-dom";
import { PartnersTable } from "./components/partners-table/partners-table";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { PartnerCreate } from './components/partner-create/partner-create';
import { PartnerEdit } from "./components/partner-edit/partner-edit";



const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <PartnersTable />
        </Route>
        <Route exact path="/partner/:id"
        render={(routerProps) => {
          const partnerId = routerProps.match.params.id;
          
          return (
            <PartnerEdit id={partnerId}/>
          );
          }} 
          />  
          <Route exact path="/partner-create/">
            <PartnerCreate/>
          </Route>
          
        
      </Switch>
    </BrowserRouter>
  );
};

export default App;
