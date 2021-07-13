import './App.css';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Home from './pages/Home'
import Chat from './pages/Chat';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { auth } from './service/firebase';

const PrivateRoute = ({component: Component, authenticated, ...rest}) => {
  return(
    <Route 
    {...rest}
    render={(props) => authenticated === true
      ? <Component {...props} />
      : <Redirect to="/signup" />
    }
    />
  )
}

const PublicRoute = ({component: Component, authenticated, ...rest}) => {
  return(
    <Route 
    {...rest}
    render={(props) => authenticated === false
      ? <Component {...props} />
      : <Redirect to="/chat" />
    }
    />
  )
}

function App() {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  // if user is authenticated render the component and info needed
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if(user) {
        setAuthenticated(true)
        setLoading(false)
      } else {
        setAuthenticated(false)
        setLoading(false)
      }
    })
  }, [authenticated])

  return loading === true ? <h2>Loading...</h2> : (
    <Router className="App">
      <Switch>
        <PrivateRoute
          path="/chat"
          authenticated={authenticated}
          component={Chat}
        />
        <Route
          exact path="/"
          authenticated={authenticated}
          component={Home}
        />
        <PublicRoute 
          path="/signup"
          authenticated={authenticated}
          component={Signup}
        />
        <PublicRoute 
          path="/login"
          authenticated={authenticated}
          component={Login}
        />
      </Switch>
    </Router>
  );
}

export default App;
