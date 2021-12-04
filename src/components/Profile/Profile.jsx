import React from "react";
import "./Profile.css";
import Header from "../Header/Header";
import ProfileForm from "../ProfileFrom/ProfileForm";
import ContentContainer from "../ContentContainer/ContentContainer";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Profile = ({ isLoggedIn, onLogOut, isMobile, isMenuToggle, onEdit }) => {
  const currentUser = React.useContext(CurrentUserContext)

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        isMobile={isMobile}
        isMenuToggle={isMenuToggle}
      />
      <ContentContainer type="profile">
        <section className="profile">
          <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
          <ProfileForm name={currentUser.name} email={currentUser.email} onLogOut={onLogOut} onEdit={onEdit} />
        </section>
      </ContentContainer>
    </>
  );
};

export default Profile;
