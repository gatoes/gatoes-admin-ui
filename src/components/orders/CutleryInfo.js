

import React from 'react';

const CutleryInfo = ({ cutlery }) => {
  // Default value for cutlery
  const cutleryPreference = cutlery === undefined ? true : cutlery;

  return (
    <div className="cutlery-info" style={contentStyle}>
      <div className="order-heading-ui" style={headingStyle}>
        <h4>Don't Send Cutlery</h4>
      </div>
      <div className="content-detail">
        <div className="order-full-info">
          <ul style={ulStyle}>
            <li style={liStyle}>
              <input
                type="checkbox"
                checked={cutleryPreference}
                disabled
                id="dont-send-cutlery"
                style={{
                  ...checkboxStyle,
                  backgroundColor: cutleryPreference ? '#00c853' : '#f0f0f0', // Green if checked, grey otherwise
                  borderColor: cutleryPreference ? '#00c853' : '#ccc',
                }}
              />
              <label htmlFor="dont-send-cutlery" style={labelStyle}>Don't send Cutlery</label>

              {/* Styling for the checkbox tick */}
              <style>
                {`
                  input[type="checkbox"]#dont-send-cutlery:checked::after {
                    content: '';
                    position: absolute;
                    top: 3px;
                    left: 7px;
                    width: 6px;
                    height: 12px;
                    border: solid white;
                    border-width: 0 2px 2px 0;
                    transform: rotate(45deg);
                  }
                `}
              </style>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CutleryInfo;

// Styles (from the provided constants)
const headingStyle = {
  borderBottom: '1px solid #e4e4e4',
  paddingBottom: '10px',
};

const contentStyle = {
  padding: '10px 0',
  marginBottom: '20px', // Adds space after the component
};

const ulStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
};

const liStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '5px 0',
};

const checkboxStyle = {
  width: '24px',
  height: '24px',
  marginRight: '10px',
  cursor: 'not-allowed',
  backgroundColor: '#f0f0f0',
  border: '2px solid #ccc',
  borderRadius: '5px',
  position: 'relative',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  appearance: 'none',
};

const labelStyle = {
  fontWeight: 'bold',
};
