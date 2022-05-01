// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/login';
import Register from './components/register/register';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Navbar } from 'react-bootstrap';

function App() {
    return (
        <Router>
            <div className='app'>
                <Routes>
                    {/* <Route path="/login">
						<Login />
					</Route> */}
                    {/* <Route path='/navbar' element={<Navbar />} /> */}
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    {/* <register /> */}
                    {/* </Route> */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
