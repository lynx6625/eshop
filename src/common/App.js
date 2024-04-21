
import './App.css';
import { Route, Routes } from "react-router-dom"
import Login from '../components/Login/Login';
import Signup from '../components/Signup/Signup';
import Products from '../components/Products/Products';
import ProductDetails from '../components/ProductDetails/ProductDetails';

function App() {
  return (
    <div className="App">
<Routes>
<Route index element={<Login/>} />
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Signup' element={<Signup/>}/>
          <Route path='/Products' element={<Products/>}/>
          <Route path='/product-details/:id' element={<ProductDetails/>}/>
          </Routes>

    </div>
  );
}

export default App;
