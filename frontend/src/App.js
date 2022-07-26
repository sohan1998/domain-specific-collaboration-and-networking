// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/login/login';
import Register from './components/register/register';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './components/common/navbar';
import AllProjects from './components/projects/projects';
import Roles from './components/roles/Roles';
import { RegisterUserInterests } from './components/registerUserInfo/RegisterUserInterests';
import { RegisterUserInfo } from './components/registerUserInfo/RegisterUserInfo';
import { Connections } from './components/common/Connections';
import ProjectDashboard from './components/projectDashboardView/dashboard';
import Sidebar from './components/common/Sidebar';
import { UserProfile } from './components/user/UserProfile';
import { Col, Row } from 'react-bootstrap';
// import { Navbar } from 'react-bootstrap';

function App() {
    let location = useLocation();

    return (
        <div className='App'>
            {/* {location.pathname !== '/login' && location.pathname !== '/register' && <NavbarComponent />} */}
            {<NavbarComponent />}
            <Row>
                {/* <Col xs={1}></Col> */}
                <Col xs={1}>
                    {location.pathname !== '/login' &&
                        location.pathname !== '/register' &&
                        location.pathname !== '/registerUserInfo' &&
                        location.pathname !== '/registerUserInterests' &&
                        location.pathname !== '/connections' && <Sidebar />}
                </Col>
                <Col xs={10}>
                    {/* <Router> */}
                    <Routes>
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/projects' element={<AllProjects />} />
                        <Route path='/roles' element={<Roles />} />
                        <Route path='/registerUserInfo' element={<RegisterUserInfo />} />
                        <Route path='/registerUserInterests' element={<RegisterUserInterests />} />
                        <Route path='/connections' element={<Connections />} />
                        {/* <Route path='/projectDashboardView' element={<ProjectDashboard />} /> */}
                        {/* <Route path='/sidebar' element={<Sidebar />} /> */}
                        <Route path='/editUserProfile' element={<UserProfile />} />
                    </Routes>
                    {/* </Router> */}
                </Col>
            </Row>
        </div>
    );
}

export default App;
