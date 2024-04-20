
import './App.css';
import { Route, Routes } from "react-router-dom"
import Login from '../components/Login/Login';
import Signup from '../components/Signup/Signup';


function App() {
  return (
    <div className="App">
<Routes>
<Route index element={<Login/>} />
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Signup' element={<Signup/>}/>
          </Routes>

    </div>
  );
}

export default App;
