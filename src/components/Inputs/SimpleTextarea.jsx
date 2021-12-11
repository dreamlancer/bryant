import React from 'react';
import { observer } from 'mobx-react';

export default observer(({ field, placeholder = null, req, row }) => (
  <div className="field-wrapper">
    <div className="measure">
      <div className="light-silver">
        {field.label}
        {req && <span className="highlight">*</span>}
      </div>
      <textarea
        row={row}
        className="input-reset"
        aria-describedby="name-desc"
        {...field.bind({
          placeholder,
        })}
      />
      <small className="error red">{field.error}</small>
    </div>
  </div>
));
