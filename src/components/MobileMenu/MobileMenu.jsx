import React from 'react';
import AccountBar from '../AccountBar/AccountBar';
import ButtonCross from '../Buttons/ButtonCross/ButtonCross';
import Navigation from '../Navigation/Navigation';
import './MobileMenu.css';

const MobileMenu = ({ isOpen, isLoggedIn, isMobile, isMenuToggle }) => {
  return (
    <aside className={`mobile-menu ${ isOpen ?  'mobile-menu_type_visible ' : 'mobile-menu_type_hidden' }`} onClick={isMenuToggle}>
      <div className="mobile-menu__content" onClick={(e) => e.stopPropagation()}>
        <ButtonCross event={isMenuToggle} />
        <div className="mobile-menu__content-container">
          <Navigation row={false} toggleMenu={isMenuToggle}/>
          <AccountBar isLoggedIn={isLoggedIn} isMobile={isMobile} accountBarMenu={false} isMenuToggle={isMenuToggle}/>
        </div>
      </div>
    </aside>
  );
}

export default MobileMenu;
