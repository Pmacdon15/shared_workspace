import './App.css';

import {Routes, Route} from 'react-router-dom';

//import Home from './pages/Home';
import SignIn from './pages/SignIn/SignIn';

function App() {
  return (<Routes>      
    <Route path="/" element={<SignIn />} />
    
  </Routes>
    
  );
}

export default App;
