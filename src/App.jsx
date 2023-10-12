import React, { useState } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom'; 
import AuthForms from './components/forms/AuthForms'; 
import Dashboard from './Dashboard'; 
import Header from './Header'; 
// import Cookies from 'cookies';

const checkAuth = (token) => {
  if (token.length) {
    return true;
  }
  return false;
};

const ProtectedRoute = (props) => {
  const { component: Component, token, ...rest } = props;

  return checkAuth(token) === true ? <Component {...rest} /> : <Navigate to="/signin" />;
};

function App() {
  const [token, setToken] = useState(''); 
  console.log(token)
  
  return (
    <>
      <Header token={token} setToken={setToken} />
      <Routes> {/* Use the Routes component */}
        <Route path="/signin" element={<AuthForms setToken={setToken} formType="signin" />} />
        <Route path="/signup" element={<AuthForms formType="signup" />} />
        <Route path="/" element={<ProtectedRoute component={Dashboard} token={token} />} />
        {/* <Route path="/" element={<Dashboard />} /> */}

      </Routes>
    </>
  );
}

export default App;
