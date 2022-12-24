import { useState } from "react";

export default function useForm(data, callback) {
  const initialValues = {};
  Object.keys(data).forEach((key) => {
    initialValues[key] = data[key].value;
  });
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    setValues((prevValues) => {
      return { ...prevValues, [e.target.name]: e.target.value };
    });
  };
  const onError = (errors) => {
    setErrors({ ...errors });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    callback(values, onError);
  };

  const inputs = Object.keys(data).map((key, index) => (
    <Input
      key={index}
      name={key}
      label={data[key].label}
      type={data[key].type}
      value={values[key]}
      error={errors[key]}
      onChange={onChange}
    />
  ));

  return [inputs, onSubmit];
}

const Input = (props) => {
  const { error, label, name, type, value, onChange } = props;
  return (
    <div className="form-group mb-3">
      <label>{label}</label>
      <input
        type={type}
        className="form-control"
        name={name}
        value={value}
        onChange={onChange}
        required
      />
      <p style={{ color: "red", fontSize: "0.8rem" }}>{error}</p>
    </div>
  );
};
