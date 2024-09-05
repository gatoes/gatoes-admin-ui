import React from 'react';

const DocumentDetails = ({ doc }) => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f7f9fc', borderRadius: '8px', marginBottom: '20px' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Details</h2>
      
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          <tr>
            <td style={{ fontWeight: 'bold', padding: '10px', border: '1px solid #e4e4e4' }}>Document Type:</td>
            <td style={{ padding: '10px', border: '1px solid #e4e4e4' }}>{doc.docs_type}</td>
          </tr>

          {doc.details && (
            <tr>
              <td style={{ fontWeight: 'bold', padding: '10px', border: '1px solid #e4e4e4' }}>Details:</td>
              <td style={{ padding: '10px', border: '1px solid #e4e4e4' }}>{doc.details}</td>
            </tr>
          )}

          {doc.link_to_file && (
            <tr>
              <td style={{ fontWeight: 'bold', padding: '10px', border: '1px solid #e4e4e4' }}>Link:</td>
              <td style={{ padding: '10px', border: '1px solid #e4e4e4' }}>
                <a href={doc.link_to_file} target="_blank" rel="noopener noreferrer">
                  View Document
                </a>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentDetails;
