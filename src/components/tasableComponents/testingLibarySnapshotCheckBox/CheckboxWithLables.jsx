import React, { useState } from "react";

const CheckboxWithLabel = ({ labelOn, labelOff }) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <label>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => {
          setIsChecked(!isChecked);
        }}
      />
      {isChecked ? labelOn : labelOff}
    </label>
  );
};

export default CheckboxWithLabel;
