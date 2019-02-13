import React from "react";
import { Alert } from "reactstrap";

export const FormErrors = ({ formErrors }) => (
  <div className="formErrors">
    {Object.keys(formErrors).map((fieldName, i) => {
      if (formErrors[fieldName].length > 0) {
        return (
          <Alert
            color="danger"
            style={{
              height: "44px",
              borderRadius: "0px",
              font: "16px Helvetica"
            }}
          >
            {formErrors[fieldName]}
          </Alert>
        );
      } else {
        return "";
      }
    })}
  </div>
);
