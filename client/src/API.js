const SERVER_URL = 'http://localhost:3001';

const getAllCourses = async () => {
    const res = await fetch(SERVER_URL + '/api/courses', {
        credentials: 'include'
    });
    let coursesList = await res.json();
    if(res.ok){
        return coursesList;
    }else{
        throw coursesList;
    }
};

const getStudyPlan = async () => {
  const res = await fetch(SERVER_URL + '/api/students/courses', {
    credentials: 'include'
  });
  let courseList = await res.json();
  if(res.ok){
    return courseList;
  }else{
    throw courseList;
  }
};

const logIn = async(credentials) => {
    const response = await fetch(SERVER_URL + '/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
      });
      if(response.ok) {
        const user = await response.json();
        return user;
      }
      else {
        const errDetails = await response.text();
        throw errDetails;
      }    
};

const getUserInfo = async() => {
    const response = await fetch(SERVER_URL + '/api/sessions/current', {
        credentials: 'include',
      });
      const user = await response.json();
      if (response.ok) {
        return user;
      } else {
        throw user;
      }
};

const logout = async() => {
    const response = await fetch(SERVER_URL + '/api/logout', {
        method: 'DELETE',
        credentials: 'include'
      });
      if (response.ok)
        return null;
};


export{getAllCourses, logIn, getUserInfo, logout, getStudyPlan};