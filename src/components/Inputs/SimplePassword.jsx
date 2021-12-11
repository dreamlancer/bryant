import React from 'react';
import { observer } from 'mobx-react';

export default observer(
  ({ field, type = 'text', placeholder = null, req, onKeyPress }) => (
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
