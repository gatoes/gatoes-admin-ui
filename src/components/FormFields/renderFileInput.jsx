import React from 'react';

const renderFileInput = ({
  input,
  label,
  meta: { touched, error },
  multiple = true,  // Ensure the multiple attribute is set to true by default
  accept,
  ...custom
}) => {
  const handleChange = (e) => {
    const files = e.target.files;
    input.onChange(files);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '10px' }}>{label}</label>
      <input
        type="file"
        onChange={handleChange}
        multiple={multiple}  // Allow multiple file selection
        accept={accept}
        style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
        {...custom}
      />
      {touched && error && <span style={{ color: 'red', marginTop: '5px', display: 'block' }}>{error}</span>}
      {input.value && input.value.length > 0 && (
        <ul style={{ listStyleType: 'none', paddingLeft: '0', marginTop: '10px' }}>
          {Array.from(input.value).map((file, index) => (
            <li
              key={index}
              style={{
                backgroundColor: '#f1f1f1',
                padding: '5px',
                marginBottom: '5px',
                borderRadius: '4px',
              }}
            >
              {file.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default renderFileInput;
