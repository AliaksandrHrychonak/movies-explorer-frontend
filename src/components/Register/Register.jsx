import React from 'react';
import AuthContainer from "../AuthContainer/AuthContainer";
import RegistrationForm from '../Forms/RegistrationForm';

const Register = ({ onRegistration }) => {
  return (
    <AuthContainer title="Добро пожаловать!">
      <RegistrationForm onRegistartion={onRegistration} />
    </AuthContainer>
  );
}

export default Register;
