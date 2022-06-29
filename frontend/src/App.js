// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/login';
import Register from './components/register/register';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './components/common/navbar';
import AllProjects from './components/projects/projects';
import Roles from './components/roles/roles';
import { RegisterUserInterests } from './components/registerUserInfo/RegisterUserInterests';
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
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/projects' element={<AllProjects />} />
                    <Route path='/roles' element={<Roles />} />
                    <Route path='/userInterests' element={<RegisterUserInterests />} />
                    <Route path='/connections' element={<Connections />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
