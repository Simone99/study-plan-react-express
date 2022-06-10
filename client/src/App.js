import { Container, Row, Col} from 'react-bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom'
import { CoursesList } from './Components/CoursesList';
import { CourseNavBar } from './Components/CourseNavBar';
import { LoginForm } from './Components/LoginForm';
import { LoggedUserPage } from './Components/LoggedUserPage'
import {getAllCourses, getUserInfo} from './API';
import UserContext from './Context/UserContext'

function App() {
  const [courses, setCourses] = useState([]);
  const [loggedUser, setLoggedUser] = useState('');

  const getCoursesAsync = async () => {
    try{
      const result = await getAllCourses();
      setCourses(result.sort((c1, c2) => {
        if(c1.name < c2.name){
          return -1;
        }
        if(c1.name > c2.name){
          return 1;
        }
        return 0;
      }));
    }catch(err){
      console.log(err);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getUserInfo();
      setLoggedUser(user);
    };
    checkAuth();
  }, []);


  useEffect(() => {
    getCoursesAsync();
  }, []);

  return (
    <UserContext.Provider value={{loggedUser, setLoggedUser}}>
      <Container fluid>
        <Router>
          <Routes>
            <Route path="/" element = {<Layout/>}>
              <Route index element={loggedUser? <LoggedUserPage courses = {courses}/> : <HomePage courses = {courses}/>}/>
              <Route path="/login" element={<LoginForm/>}/>
            </Route>
          </Routes>
        </Router>
      </Container>
    </UserContext.Provider>
  );
}

function Layout(props){
  return (
    <>
      <Row>
        <CourseNavBar/>
      </Row>
      <Outlet/>
    </>
  );
}

function HomePage(props){
  return(
    <Row className="justify-content-md-center">
      <Col md="auto">
        <CoursesList courses = {props.courses}/>
      </Col>
    </Row>
  );
}

export default App;
