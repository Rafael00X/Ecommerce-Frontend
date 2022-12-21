import { useState } from "react";

export default function useForm(initialValues, callback) {
  const [values, setValues] = useState(initialValues);

  const onChange = (e) => {
    setValues((prevValues) => {
      return { ...prevValues, [e.target.name]: e.target.value };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    callback(values);
  };

  return [values, onChange, onSubmit];
}
