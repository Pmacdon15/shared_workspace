import './App.css';

import {Routes, Route} from 'react-router-dom';

//import Home from './pages/Home';
import SignIn from './pages/SignIn/SignIn';
import CoworkersPage from './pages/CoworkersPage/CoworkersPage';

function App() {
  return (<Routes>      
    <Route path="/" element={<SignIn />} />
    <Route path="/coworkerspage" element={<CoworkersPage />} />
    
  </Routes>
    
  );
}

export default App;
