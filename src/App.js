import React, { useReducer } from 'react';
import {
  BrowserRouter as Router, Route, Switch
} from 'react-router-dom';
import './App.css';
// import './bootstrap/dist/css/bootstrap.min.css';
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import TicketBooking from './components/TicketBooking';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import CreateMovie from './components/CreateMovie';
import Booking from './components/Booking';
import Logout from './components/Logout';
import { initialState, reducer } from './components/reducer/reducer';
function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
      <Router>
        <Sidebar />
        <Navbar state={state} dispatch={dispatch} />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path='/ticket/:_id' component={TicketBooking} />
          <Route path='/login' component={Login} state={state} dispatch={dispatch} />
          <Route path='/register' component={Register} />
          <Route path='/profile' component={Profile} />
          <Route path='/create' component={CreateMovie} />
          <Route path='/booking' component={Booking} />
          <Route path='/logout' component={Logout} state={state} dispatch={dispatch} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
