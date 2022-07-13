// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/login';
import Register from './components/register/register';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './components/common/navbar';
import AllProjects from './components/projects/projects';
import Roles from './components/roles/Roles';
import { RegisterUserInterests } from './components/registerUserInfo/RegisterUserInterests';
import { RegisterUserInfo } from './components/registerUserInfo/RegisterUserInfo';
import { Connections } from './components/common/Connections';
// import { Navbar } from 'react-bootstrap';

function App() {
    // const location = useLocation();
    return (
        <div className='App'>
            {/* {location.pathname !== '/login' && location.pathname !== '/register' && <NavbarComponent />} */}
            {<NavbarComponent />}

            <Router>
                <Routes>
                    <Route path='/login' exact element={<Login />} />
                    <Route path='/register' exact element={<Register />} />
                    <Route path='/projects' exact element={<AllProjects />} />
                    <Route path='/roles' exact element={<Roles />} />
                    <Route path='/registerUserInterests' exact element={<RegisterUserInterests />} />
                    <Route path='/registerUserInfo' exact element={<RegisterUserInfo />} />
                    <Route path='/connections' exact element={<Connections />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
