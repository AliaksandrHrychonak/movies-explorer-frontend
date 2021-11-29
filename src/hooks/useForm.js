import { useState, useEffect } from 'react';

const useForm = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      setIsValid(true)
    }
  }, [errors]);

  const checkValidity = (event) => {
   return event.target.closest('form').checkValidity();
  };

  const handleChange = (event) => {
    event.persist();
    setErrors({ ...errors, [event.target.name]: event.target.validationMessage });
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    setIsValid(event.target.closest('form').checkValidity());
  };

  return {
    handleChange,
    checkValidity,
    values,
    errors,
    isValid
  }
};

export default useForm;