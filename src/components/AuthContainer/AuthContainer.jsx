import React from 'react';
import './AuthContainer.css'
import Logo from '../Logo/Logo';

const AuthContainer = ({ title, children }) => {
  return (
    <main>
      <section className="auth">
        <div className="auth__item">
          <Logo />
          <h1 className="auth__title">{title}</h1>
          { children }
        </div>
      </section>
    </main>
  );
}

export default AuthContainer;
