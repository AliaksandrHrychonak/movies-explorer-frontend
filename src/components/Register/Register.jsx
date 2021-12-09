import React from 'react';
import AuthContainer from "../AuthContainer/AuthContainer";
import RegistrationForm from '../Forms/RegistrationForm';

const Register = () => {
  return (
    <AuthContainer title="Добро пожаловать!">
      <RegistrationForm />
    </AuthContainer>
  );
}

export default Register;
