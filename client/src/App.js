import React, {useEffect,useContext} from 'react';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AuthContext from './context/auth/authContext'
import AuthState from './context/auth/AuthState'

const App = () => {

  const authContext = useContext(AuthContext)

  useEffect(() => {
    authContext.loadUser();
  },[])

  render() {
    return (
      <AuthState>
        <div className='App'>
          <AppNavbar />
          <Container>
            <ItemModal />
            <ShoppingList />
          </Container>
        </div>
      </AuthState>
    );
  }
}

export default App;
