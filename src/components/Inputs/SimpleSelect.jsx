import React from 'react';
import { observer } from 'mobx-react';

export default observer(({ field, countries }) => (
  <div className="field-wrapper">
    <div className="measure">
      <div className="row-name">{field.label}</div>
      <select {...field.bind()} id={field.id}>
        {countries.map(country => (
          <option key={country.country_id} value={country.country_id}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  </div>
));
