import React from 'react';
import AuthContainer from "../AuthContainer/AuthContainer";
import LoginForm from '../Forms/LoginForm';

const Login = ({onLogin}) => {
  return (
    <AuthContainer title="Рады видеть!">
      <LoginForm onLogin={onLogin}/>
    </AuthContainer>
  );
}

export default Login;
