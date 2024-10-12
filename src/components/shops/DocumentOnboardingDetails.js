import React from 'react';

const DocumentOnboardingDetails = ({ doc }) => {
  console.log("doc check", doc);
  
  // Destructure the properties from doc
  const { doc_type, data } = doc;

  // Helper function to render document details based on type
  const renderDocumentDetails = () => {
    if (!data || !data.number) return null; // Return null if no data or number is provided

    switch (doc_type) {
      case 'Aadhar Card':
        return (
          <tr>
            <td style={cellStyle}>Aadhar Number:</td>
            <td style={cellStyle}>{data.number || 'Not Provided'}</td>
          </tr>
        );
      case 'PAN Card':
        return (
          <tr>
            <td style={cellStyle}>PAN Number:</td>
            <td style={cellStyle}>{data.number || 'Not Provided'}</td>
          </tr>
        );
      case 'GST':
        return (
          <>
            <tr>
              <td style={cellStyle}>GST Number:</td>
              <td style={cellStyle}>{data.number || 'Not Provided'}</td>
            </tr>
            <tr>
              <td style={cellStyle}>Tax Bracket:</td>
              <td style={cellStyle}>{data.gstCharges || 'Not Provided'}</td>
            </tr>
          </>
        );
      case 'FSSAI':
        return (
          <>
            <tr>
              <td style={cellStyle}>FSSAI Number:</td>
              <td style={cellStyle}>{data.number || 'Not Provided'}</td>
            </tr>
            <tr>
              <td style={cellStyle}>Expiry Date:</td>
              <td style={cellStyle}>{data.expiry || 'Empty'}</td>
            </tr>
          </>
        );
      default:
        return null; // Handle unknown document types
    }
  };

  // Styles for cells
  const cellStyle = {
    fontWeight: 'bold',
    padding: '10px',
    border: '1px solid #e4e4e4'
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f7f9fc', borderRadius: '8px', marginBottom: '20px' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Details</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          <tr>
            <td style={cellStyle}>Document Type:</td>
            <td style={{ padding: '10px', border: '1px solid #e4e4e4' }}>{doc_type || 'Empty'}</td>
          </tr>

          {renderDocumentDetails()}

          {/* Check if documents exist and are an array */}
          {Array.isArray(data.documents) && data.documents.length > 0 && (
            <tr>
              <td style={cellStyle}>Uploaded Images:</td>
              <td style={{ padding: '10px', border: '1px solid #e4e4e4' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {data.documents.map((doc) => (
                    <img
                      key={doc.id}
                      src={doc.url}
                      alt="Uploaded"
                      style={{ maxWidth: '100px', marginRight: '10px', marginBottom: '10px', borderRadius: '4px' }}
                    />
                  ))}
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentOnboardingDetails;
