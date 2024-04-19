import logo from './logo.svg';
import './App.css';
import Navbar from '../components/Navbar/Navbar';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from '../components/Login/Login';
import Signup from '../components/Signup/Signup';
import { useHistory as history } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Router history={history}>
          <Route path='/login' component={Login}/>
          <Route path='/signup' component={Signup}/>
      </Router>
    </div>
  );
}

export default App;
