import React from 'react';
import { observer } from 'mobx-react';

export default observer(
  ({
    field,
    type = 'text',
    placeholder = null,
    req,
    handleOnChange,
    onKeyPress,
  }) => (
    <div className="field-wrapper">
      <div className="measure">
        <div className="light-silver">
          {field.label}
          {req && <span className="highlight">*</span>}
        </div>
        <input
          className="input-reset"
          aria-describedby="name-desc"
          {...field.bind({
            type,
            placeholder,
            onChange: e => {
              handleOnChange && handleOnChange(e);
              field.set(e.target.value);
            },
          })}
          onKeyPress={e => {
            if (onKeyPress && e.key === 'Enter') {
              onKeyPress();
            }
          }}
        />
        <small className="error red">{field.error}</small>
      </div>
    </div>
  )
);
