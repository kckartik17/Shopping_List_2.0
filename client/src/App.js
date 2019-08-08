import React, { useEffect, useContext } from "react";
import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";
import ItemModal from "./components/ItemModal";
import { Container } from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthContext from "./context/auth/authContext";
import AuthState from "./context/auth/AuthState";
import ErrorState from "./context/error/ErrorState";
import ItemState from "./context/item/ItemState";

const App = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
  }, []);

  return (
    <ErrorState>
      <AuthState>
        <div className="App">
          <AppNavbar />
          <ItemState>
            <Container>
              <ItemModal />
              <ShoppingList />
            </Container>
          </ItemState>
        </div>
      </AuthState>
    </ErrorState>
  );
};

export default App;
