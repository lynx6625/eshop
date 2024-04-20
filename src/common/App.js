
import './App.css';
import { Route, Routes } from "react-router-dom"
import Login from '../components/Login/Login';
import Signup from '../components/Signup/Signup';
import Products from '../components/Products/Products';

function App() {
  return (
    <div className="App">
<Routes>
<Route index element={<Login/>} />
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Signup' element={<Signup/>}/>
          <Route path='/Products' element={<Products/>}/>
          </Routes>

    </div>
  );
}

export default App;
