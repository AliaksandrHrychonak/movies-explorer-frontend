import React from "react";
import "./Profile.css";
import Header from "../Header/Header";
import ProfileForm from "../ProfileFrom/ProfileForm";
import ContentContainer from "../ContentContainer/ContentContainer";

const Profile = ({ user, isLoggedIn, onLogOut, isMobile, isMenuToggle, onEdit }) => {
  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        isMobile={isMobile}
        isMenuToggle={isMenuToggle}
      />
      <ContentContainer type="profile">
        <section className="profile">
          <h1 className="profile__title">{`Привет, ${user.name}!`}</h1>
          <ProfileForm name={user.name} email={user.email} onLogOut={onLogOut} onEdit={onEdit} />
        </section>
      </ContentContainer>
    </>
  );
};

export default Profile;
