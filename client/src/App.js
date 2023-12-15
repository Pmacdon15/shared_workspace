import './App.css';

import {Routes, Route} from 'react-router-dom';

//import Home from './pages/Home';
import SignIn from './pages/SignIn/SignIn';
import CoworkersPage from './pages/CoworkersPage/CoworkersPage';
import OwnersPage from './pages/OwnersPage/OwnersPage';
import AddBuilding from './pages/AddBuilding/AddBuilding';
import EditBuilding from './pages/EditBuilding/EditBuilding';
import BuildingsWorkspaces from './pages/BuildingsWorkspaces/BuildingsWorkspaces';
import AddWorkspace from './pages/AddWorkspace/AddWorkspace';
import EditWorkspace from './pages/EditWorkspace/EditWorkspace';
import OwnerInfoPage from './pages/OwnerInfoPage/OwnerInfoPage';

function App() {
  return (<Routes>      
    <Route path="/" element={<SignIn />} />
    <Route path="/coworkerspage" element={<CoworkersPage />} />
    <Route path="/ownerspage/:userEmail" element={<OwnersPage />} />
    <Route path="/addbuilding/:userEmail" element={<AddBuilding />} />
    <Route path="/editbuilding/:building_name" element={<EditBuilding />} /> 
    <Route path="/workspaces/:building_name" element={<BuildingsWorkspaces />} />
    <Route path="/addworkspace/:building_name" element={<AddWorkspace />} />
    <Route path="/editworkspace/:workspace_name" element={<EditWorkspace />} />
    <Route path="/ownerInfo/:buildingId" element={<OwnerInfoPage />} />
    
  </Routes>
    
  );
}

export default App;
