import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

const FormSelectComponent = ({
  methods,
  options,
  name,
  label,
  className,
  ...rest
}) => {
  return (
    <Form.Group as={Row} className={className} controlId={`ipt-${name}`}>
      {label && <Form.Label>{label}</Form.Label>}
      <Col>
        <Form.Select
          {...methods.register(name)}
          {...rest}
          size="sm"
          isInvalid={methods.formState.errors[name] ? true : false}
        >
          {options?.map((option, index) => (
            <option key={option.key} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>
        {methods.formState.errors[name] && (
          <Form.Control.Feedback type="invalid">
            {methods.formState.errors[name].message}
          </Form.Control.Feedback>
        )}
      </Col>
    </Form.Group>
  );
};

export default FormSelectComponent;
