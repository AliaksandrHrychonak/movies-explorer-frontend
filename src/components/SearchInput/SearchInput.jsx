import React from 'react';
import './SearchInput.css'
import SwitchButton from '../SwitchButton/SwitchButton'
import searchIcon from '../../images/search-icon.svg'
import searchIconBlack from '../../images/search-icon-black.svg'
const SearchInput = ({ stateCheckBox, toogleCheckBox }) => {

  return (
    <section className="search">
      <form className="form-search">
        <label htmlFor="" className="form-search__label" style={{backgroundImage:  `url(${searchIconBlack})`}} />
        <input type="text" className="form-search__input" placeholder="Фильм"/>
        <button className="form-search__button" style={{backgroundImage:  `url(${searchIcon})`}}/>
      </form>
      <SwitchButton state={stateCheckBox} onChange={toogleCheckBox} />
    </section>
  );
}

export default SearchInput;
