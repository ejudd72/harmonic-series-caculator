import React from "react";
import { InputGroup, FormControl, Form, Button } from "react-bootstrap";

const FrequencyInput = ({
  changeInputType,
  frequencyInput,
  frequency,
  handleInputChange,
  pitchName,
  numberOfPartials,
  calculate
}) => {
  return (
    <>
      <Form className="user-frequency-input">
        <p>Provide fundamental pitch as: </p>
        <div key={`custom-inline-radio`} className="mb-3">
          <Form.Check
            checked={frequencyInput}
            value={frequencyInput}
            name="inputType"
            onChange={() => changeInputType(true)}
            custom
            inline
            label="Frequency"
            type="radio"
            id={`custom-inline-radio-1`}
          />
          <Form.Check
            name="inputType"
            checked={!frequencyInput}
            value={frequencyInput}
            onChange={() => changeInputType(false)}
            custom
            inline
            label="Scientific notation"
            type="radio"
            id={`custom-inline-radio-2`}
          />
        </div>

        <div className="frequency-input">
          {frequencyInput && (
            <InputGroup className="mb-3 user-input">
              <InputGroup.Prepend>
                <InputGroup.Text id="frequency-input">
                  Frequency (Hz)
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="e.g. 55"
                aria-label="frequency input"
                aria-describedby="frequency-input"
                value={frequency}
                onChange={e => handleInputChange("frequency", e)}
              />
            </InputGroup>
          )}
          {!frequencyInput && (
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="scientific-input">
                  Pitch Name
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="e.g. A1"
                aria-label="notation input"
                aria-describedby="notation-input"
                value={pitchName}
                onChange={e => handleInputChange("pitchName", e)}
              />
            </InputGroup>
          )}
          <p>Provide number of partials to display (max. 256): </p>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="partial-input">Partials</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="number of partials"
              value={numberOfPartials}
              onChange={e => handleInputChange("partials", e)}
            />
          </InputGroup>

          <Button onClick={calculate}>Calculate</Button>
        </div>
      </Form>
    </>
  );
};

export default FrequencyInput;
