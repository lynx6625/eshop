import logo from './logo.svg';
import './App.css';
import Navbar from '../components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../components/Login/Login';
import Signup from '../components/Signup/Signup';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Router>
      <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
