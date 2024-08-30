import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import {getAllLanguages} from '../../actions/users';

class HeaderLanguageNavigation extends Component {
    constructor(props){
        super(props);
        this.state = {
            languageList: [],
            lang: window.localStorage.contentlanguage
        }
    }

    componentDidMount(){
        getAllLanguages().then((response) => {
          this.setState({
                languageList : response.data.data
          })
        })
    }

    handleChange(event){
        const {name, value} = event.target;
        localStorage.setItem('contentlanguage', value);
        this.setState({
            lang: value
        })
        window.location.reload();
    }

    render() {
        const {languageList, lang} = this.state;
        
        console.log(lang, 'languageList', languageList);
        return (
            <form name="filter" onChange={this.handleChange.bind(this)} >
                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <div className="select-ui">
                                <select className="form-control selectbox-block" name="language">
                                  {
                                    languageList.map((obj, index) => (
                                      <option value={obj.language_code} selected={obj.language_code == lang ? "selected" : ""} key={obj.id}>{obj.language_name}</option>
                                    ))
                                  }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}



export default HeaderLanguageNavigation;