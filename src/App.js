import { Routes, Route, Navigate} from 'react-router-dom';

import UserLogin from "./components/userLogin/LoginPage";
import CreateAdverts from "./components/adverts/NewAdvertPage";
import RequireAuth  from "./components/userLogin/RequireAuth";
import Layout from "./components/layout/Layout"
import AdvertsPage from './components/adverts/AdvertsPage';
import AdvertPage from './components/adverts/AdvertPage';


function App() {
  return (
    <div className="App">
     <Routes>
    <Route path="/login" element={<UserLogin />}/>
    <Route path="/adverts" element={<Layout />}>
    <Route index element={<AdvertsPage />} />
    <Route path=":advertId" element={<AdvertPage/>}/>
    <Route
            path="new"
            element={
              <RequireAuth>
                <CreateAdverts />
              </RequireAuth>
            }
          />
    </Route>

    <Route path="/" element={<Navigate to="/adverts" />} />
     </Routes>
      
    </div>
  );
}

export default App;
