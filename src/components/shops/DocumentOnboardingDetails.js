
import React from 'react';

const DocumentOnboardingDetails = ({ docType, docName, link, images = [], expiryDate, aadharNumber, panNumber, gstNumber, taxBracket = "GST - 6%", fssaiNumber }) => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f7f9fc', borderRadius: '8px', marginBottom: '20px' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Details</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          <tr>
            <td style={{ fontWeight: 'bold', padding: '10px', border: '1px solid #e4e4e4' }}>Name:</td>
            <td style={{ padding: '10px', border: '1px solid #e4e4e4' }}>{docName || 'Empty'}</td>
          </tr>

          {docType === 'Aadhar Card' && (
            <tr>
              <td style={{ fontWeight: 'bold', padding: '10px', border: '1px solid #e4e4e4' }}>Aadhar Number:</td>
              <td style={{ padding: '10px', border: '1px solid #e4e4e4' }}>{aadharNumber || 'Not Provided'}</td>
            </tr>
          )}

          {docType === 'PAN Card' && (
            <tr>
              <td style={{ fontWeight: 'bold', padding: '10px', border: '1px solid #e4e4e4' }}>PAN Number:</td>
              <td style={{ padding: '10px', border: '1px solid #e4e4e4' }}>{panNumber || 'Not Provided'}</td>
            </tr>
          )}

          {docType === 'GST' && (
            <>
              <tr>
                <td style={{ fontWeight: 'bold', padding: '10px', border: '1px solid #e4e4e4' }}>GST Number:</td>
                <td style={{ padding: '10px', border: '1px solid #e4e4e4' }}>{gstNumber || 'Not Provided'}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold', padding: '10px', border: '1px solid #e4e4e4' }}>Tax Bracket:</td>
                <td style={{ padding: '10px', border: '1px solid #e4e4e4' }}>{taxBracket}</td>
              </tr>
            </>
          )}

          {docType === 'FSSAI' && (
            <>
              <tr>
                <td style={{ fontWeight: 'bold', padding: '10px', border: '1px solid #e4e4e4' }}>FSSAI Number:</td>
                <td style={{ padding: '10px', border: '1px solid #e4e4e4' }}>{fssaiNumber || 'Not Provided'}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold', padding: '10px', border: '1px solid #e4e4e4' }}>Expiry Date:</td>
                <td style={{ padding: '10px', border: '1px solid #e4e4e4' }}>{expiryDate || 'Empty'}</td>
              </tr>
            </>
          )}

{docType === 'MENU' && (
            <>
              <tr>
                <td style={{ fontWeight: 'bold', padding: '10px', border: '1px solid #e4e4e4' }}>FSSAI Number:</td>
                <td style={{ padding: '10px', border: '1px solid #e4e4e4' }}>{fssaiNumber || 'Not Provided'}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold', padding: '10px', border: '1px solid #e4e4e4' }}>Expiry Date:</td>
                <td style={{ padding: '10px', border: '1px solid #e4e4e4' }}>{expiryDate || 'Empty'}</td>
              </tr>
            </>
          )}

          {link && (
            <tr>
              <td style={{ fontWeight: 'bold', padding: '10px', border: '1px solid #e4e4e4' }}>Link:</td>
              <td style={{ padding: '10px', border: '1px solid #e4e4e4' }}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
              </td>
            </tr>
          )}

          {images.length > 0 && (
            <tr>
              <td style={{ fontWeight: 'bold', padding: '10px', border: '1px solid #e4e4e4' }}>Uploaded Images:</td>
              <td style={{ padding: '10px', border: '1px solid #e4e4e4' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
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
