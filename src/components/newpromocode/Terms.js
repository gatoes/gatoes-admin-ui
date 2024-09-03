


import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';

class TermsAndConditions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      termsAndConditions: '<p>&#8226;&nbsp;&nbsp;</p>', // Start with a bullet point and a tab space
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEditorChange(content, editor) {
    this.setState({ termsAndConditions: content });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { termsAndConditions } = this.state;
    const textOnly = termsAndConditions
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&bull;/g, '•') // Replace &bull; with actual bullet point
      .replace(/&nbsp;/g, ' '); // Replace &nbsp; with actual space
    console.log(textOnly);
  }

  handleEditorKeyDown = (e, editor) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      editor.execCommand('mceInsertContent', false, '<p>&#8226;&nbsp;&nbsp;</p>');
    }
  }

  render() {
    return (
      <div className="fields-ui-block promocode-ui">
        <div className="basic-details">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Terms and Conditions</h5>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <Editor
                    apiKey="m666sztktbfrt2vwon7h8ndd9zejiwd1ihgr96z56pblsvv8"
                    value={this.state.termsAndConditions}
                    init={{
                      plugins: 'link image code',
                      toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
                      images_upload_url: '/common/editorimage',
                      setup: (editor) => {
                        editor.on('keydown', (e) => this.handleEditorKeyDown(e, editor));
                      }
                    }}
                    onEditorChange={this.handleEditorChange}
                  />
                </div>
                <button type="submit" className="btn green-btn">Submit details</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TermsAndConditions;
// import React, { Component } from 'react';
// import { Editor } from '@tinymce/tinymce-react';

// class TermsAndConditions extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       termsAndConditions: props.value || '<p>&#8226;&nbsp;&nbsp;</p>', // Initialize with the passed value or default
//     };
//     this.handleEditorChange = this.handleEditorChange.bind(this);
//   }

//   handleEditorChange(content) {
//     this.setState({ termsAndConditions: content });
//     this.props.onChange(content); // Update the parent component
//   }

//   handleEditorKeyDown = (e, editor) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       editor.execCommand('mceInsertContent', false, '<p>&#8226;&nbsp;&nbsp;</p>');
//     }
//   }

//   render() {
//     return (
//       <div className="fields-ui-block promocode-ui">
//         <div className="basic-details">
//           <div className="card">
//             <div className="card-body">
//               <h5 className="card-title">Terms and Conditions</h5>
//               <div className="form-group">
//                 <Editor
//                   apiKey="m666sztktbfrt2vwon7h8ndd9zejiwd1ihgr96z56pblsvv8"
//                   value={this.state.termsAndConditions}
//                   init={{
//                     plugins: 'link image code',
//                     toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
//                     images_upload_url: '/common/editorimage',
//                     setup: (editor) => {
//                       editor.on('keydown', (e) => this.handleEditorKeyDown(e, editor));
//                     }
//                   }}
//                   onEditorChange={this.handleEditorChange}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default TermsAndConditions;
