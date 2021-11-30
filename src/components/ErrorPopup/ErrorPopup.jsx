import React from 'react'
import './ErrorPopup.css';
import goodImage from '../../images/good.svg';
import errorImage from '../../images/error.svg';

const ErrorPopup = ({config, onClose}) => {
  return (
    <div className={`popup ${config.open ? 'popup_type_visible' : 'popup_type_hidden'}`} onClick={onClose}>
      <img className="popup__error-image" src={config.status ? goodImage : errorImage} alt={config.status ? 'Успешно' : 'Ошибка' } />
      <p className="popup__error-title">{config.message}</p>
    </div>
  )
}

export default ErrorPopup

