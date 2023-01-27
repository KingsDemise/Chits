import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Route, BrowserRouter as Router, Switch, withRouter } from 'react-router-dom';
import {auth,onAuthStateChanged} from './firebase'
import Login from './components/Login/login';
import "semantic-ui-css/semantic.min.css"
import Admin from './Admin';
import { connect, Provider } from 'react-redux';
import {combinedReducers} from "./store/reducer";
import {setUser} from "./store/actioncreator";
import {createStore} from 'redux';
const root=ReactDOM.createRoot(document.getElementById('root'));

const store=createStore(combinedReducers);
const Index=props=> {
  useEffect(()=>{
    onAuthStateChanged(auth,(user) => {
      if(user) {
        props.setUser(user);
        props.history.push("/admin");
      } else {
        props.setUser(null);
        props.history.push("/Chits");
      }
    })
  },[]);
  return (<>
    <Switch>
        <Route exact path="/Chits" component={App}/>
        <Route path="/login" component={Login}/>
        <Route path="/admin" component={Admin}/>
    </Switch></>)
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user)=>{dispatch(setUser(user))}
  }
}

const IndexWithRouter=withRouter(connect(mapStateToProps,mapDispatchToProps)(Index));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <IndexWithRouter/>
      </Router>
    </Provider>
  </React.StrictMode>
);

