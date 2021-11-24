import React from 'react';
import './AuthContainer.css'
import Logo from '../Logo/Logo';
import ContentContainer from '../ContentContainer/ContentContainer';

const AuthContainer = ({ title, children }) => {
  return (
    <ContentContainer type="auth">
      <section className="auth">
        <div className="auth__item">
          <Logo />
          <h1 className="auth__title">{title}</h1>
          { children }
        </div>
      </section>
    </ContentContainer>
  );
}

export default AuthContainer;
