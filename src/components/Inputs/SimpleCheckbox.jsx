import React from 'react';
import { observer } from 'mobx-react';

export default observer(({ field }) => (
  <div className="field-wrapper">
    <div className="measure">
      <label className="pointer" htmlFor={field.name}>
        <input {...field.bind()} /> {field.label}
      </label>
      <small id="name-desc" className="error red">
        {field.error}
      </small>
    </div>
  </div>
));
