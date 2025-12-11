import { Routes, Route } from 'react-router'

import Home from "./routes/home/home.components";
import Navigation from './routes/navigation/navigation.component';
import SignIn from './routes/signin/signin.component';


const Shop = () => {
   return <h1>I am at the shop page</h1>;
};


const App = () => {
   return (
      <Routes>
         <Route path='/' element={<Navigation />}>
            <Route index element={<Home />} />
            <Route path='shop' element={<Shop />} />
            <Route path='signin' element={<SignIn />} /> 
         </Route>
      </Routes>
   );
};

export default App;
