import { React, useEffect, useState } from "react";
import "./SearchInput.css";
import SwitchButton from "../Buttons/SwitchButton/SwitchButton";
import searchIcon from "../../images/search-icon.svg";
import searchIconBlack from "../../images/search-icon-black.svg";
import useForm from "../../hooks/useForm";
const SearchInput = ({
  stateCheckBox,
  toogleCheckBox,
  onSearch,
  setMoviesFilter,
  lastSearchLocal,
}) => {
  const { values, handleChange, errors, isValid, resetForm } = useForm();
  const [isLastSearch, setIsLastSearch] = useState(lastSearchLocal);

  useEffect(() => {
    if (values.film === "") {
      localStorage.removeItem("beat-film-search-result");
      localStorage.removeItem("saved-film-search-result");
      localStorage.removeItem("beat-film-search-result-keyword");
      localStorage.removeItem("saved-film-search-result-keyword");
      setIsLastSearch("");
      setMoviesFilter();
      resetForm();
    }
  }, [resetForm, setMoviesFilter, values.film]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onSearch(values.film);
    }
    return;
  };

  return (
    <section className="search">
      <form className="form-search" noValidate onSubmit={handleSubmit}>
        <label
          htmlFor=""
          className="form-search__label"
          style={{ backgroundImage: `url(${searchIconBlack})` }}
        />
        <input
          type="text"
          name="film"
          required
          className="form-search__input"
          placeholder="Фильм"
          value={values.film || isLastSearch || ""}
          onChange={handleChange}
          autoComplete="off"
        />
        <button
          disabled={!isValid}
          className={`form-search__button ${
            isValid
              ? "form-search__button_type_active"
              : "form-search__button_type_disabled"
          }`}
          style={{ backgroundImage: `url(${searchIcon})` }}
        />
        <span
          className={`form__error form__error_type_search ${
            errors.film && "form__error_type_visible"
          }`}
        >
          {errors.film}
        </span>
      </form>
      <SwitchButton state={stateCheckBox} onChange={toogleCheckBox} />
    </section>
  );
};

export default SearchInput;
