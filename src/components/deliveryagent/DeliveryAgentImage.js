import React, { Component } from 'react';
import { API_ROOT} from '../../constants';
import { FilePond, File, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { Field, reduxForm, change } from 'redux-form';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType, FilePondPluginFileValidateSize);

export default class DeliveryAgentImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      init: true,
      itemImageUrl: props.itemImageUrl ? props.itemImageUrl : null
    };
  }

  handleInit() {
    console.log('FilePond instance has initialised', this.pond);
  }

  componentWillReceiveProps(nextProps){
    if(!this.state.init){
      return;
    }
    this.setState({
      itemImageUrl: nextProps.itemImageUrl ? nextProps.itemImageUrl : null
    });
  }

  imageOnLoad(res){
    res = JSON.parse(res);
    if(res.message == 'success'){
      this.setState({
        init: false,
        itemImageUrl: null
      });
      
      this.props.getAgentImage(res.data[0].id);
      return res.data[0].id
    } else {
      alert('Invalid image type, please upload gif/jpeg/jpg type only.')
    }
  }

  render() {
    
    return (
      <div className="upload-right-block">
        <div className="upload-ui-block">
          <div className="up-img-block">
            <FilePond ref={ref => this.pond = ref}
              name="uploadfile"
              acceptedFileTypes= {['image/png', 'image/jpg', 'image/jpeg']}
              allowMultiple={false}
              maxFileSize= "10MB"
              maxFiles={1}
              server={{
                  url:API_ROOT+"/common/uploadfile?image_type=SHOP_LOGO",
                  process: {
                    onload: this.imageOnLoad.bind(this)
                  }
                }}
              allowReplace={true}
              oninit={() => this.handleInit() }
              >
            </FilePond>

            <img id="item-image" src="/assets/images/img_upload_placeholder.png" alt="your image" />
            <div className="image-loader-block">
              <div className="loader-content">
                <figure><img src="/assets/images/ic_img_upload.svg" alt="" /> </figure>
                <figcaption>
                  <p>Uploading 50%</p>
                  <div className="progress">
                    <div className="progress-bar bg-danger" style={{ width: '70%' }}></div>
                  </div>
                </figcaption>
              </div>
            </div>
          </div>
          <div className="up-content-block">
            <p>File type: PNG, JPEG</p>
            <span>Max. Size 10MB</span>
          </div>
          <div className="filename-block">
            <div className="file-left-block">
              <span className="filname-text"></span>
            </div>
            <div className="file-right-block">
              <ul className="file-btn-block">
                <li><a href="javascript:;" className="ci-btn">Change Picture</a></li>
                <li><a href="javascript:;" className="di-btn">Delete</a></li>
              </ul>
            </div>
          </div>
        </div>
        <p>A High quality photograph of this dish is important. Items with images are generally sold more.</p>
        
        {
          this.state.itemImageUrl && this.state.itemImageUrl != null &&
          <div className="imageshowpanel col-lg-4"><img src = {this.state.itemImageUrl} style={{width: 100+"%"}} /></div>
        }

      </div>
    )
  }

}