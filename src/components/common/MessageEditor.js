import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { API_ROOT} from '../../constants';

class MessageEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg : props.msg
    }
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      msg: nextProps.msg
    });
  }

  handleEditorChange(e){
  	this.props.getMessage(e.target.getContent());
    //this.props.change('message', e.target.getContent());
  }

  render() {
    const {mag} = this.state;
    
    return (
		<div className="row">
          <div className="col-lg-12">
            <div className="form-group">
              <label>Message</label>
              <div className="textfield-block">
                <Editor
                  apiKey='m666sztktbfrt2vwon7h8ndd9zejiwd1ihgr96z56pblsvv8'
                  initialValue={this.state.msg}
                  init={{
                    plugins: 'link image code',
                    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
                    images_upload_url: API_ROOT + '/common/editorimage'
                  }}
                  onChange={this.handleEditorChange}
                />
              </div>
            </div>
          </div>
        </div>
        );
  	}
}

export default MessageEditor;