import React from 'react';
import {Button, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';
export default function FieldGroup({ id, label, help, type, placeholder}) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input className="form-control" type={type} placeholder={placeholder} id={id}/>
      {help && <HelpBlock>{help}</HelpBlock>}
    </div>
  );
}
