import React from 'react';
import { observer } from 'mobx-react';

export default observer(({ field }) => (
  <div className="field-wrapper">
    <div className="measure">
      <div className="row-name">{field.label}</div>
      {field.extra.map((option, index) => {
        return (
          <div className="radio-wrapper" key={index}>
            <input
              {...field.bind()}
              type="radio"
              value={option.value}
              id={option.name}
              checked={field.value === option.value}
            />
            <label htmlFor={option.name}>{option.label}</label>
          </div>
        );
      })}
      <small className="error red">{field.error}</small>
    </div>
  </div>
));
