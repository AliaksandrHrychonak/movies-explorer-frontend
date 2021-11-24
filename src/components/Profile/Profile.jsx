import React from 'react';
import './Profile.css';
import Header from '../Header/Header';
import ProfileForm from '../ProfileFrom/ProfileForm';

const Profile = ({ user, isLoggedIn, isMobile, isMenuToggle }) => {
  return (
    <main>
      <Header isLoggedIn={isLoggedIn} isMobile={isMobile}  isMenuToggle={isMenuToggle} />
      <section className="profile">
        <h1 className="profile__title">{`Привет, ${user.name}!`}</h1>
        <ProfileForm  name={user.name} email={user.email} />
      </section>
    </main>
  );
}

export default Profile;
