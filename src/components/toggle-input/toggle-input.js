import React, { useCallback, useEffect } from "react";
import OptionToggle from "../option-toggle/option-toggle";

const ToggleInput = ({
  styles,
  label,
  options,
  field: { value, name },
  form: { touched, errors, setFieldValue }
}) => {

  useEffect(() => {
    console.log(touched, errors)
  }, [touched, errors])

  return (
    <label>
      {label}
      <OptionToggle
        options={options}
        value={value}
        onChange={val => setFieldValue(name, val)}
      />
      {errors[name] && touched[name] ? (
        <div>
          <small className={styles.error}>{errors[name]}</small>
        </div>
      ) : null}
    </label>
  );
};
export default ToggleInput;
