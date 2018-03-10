import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Item from './Item';

const propTypes = {

};

const defaultProps = {

};

class Application extends Component {

    constructor(props) {
        super(props);
        this.state = {
            no: -1,
            name: '',
            sid: 10000, //학번
            pnumber: '010-0000-0000',
            email: '',
            hobby: '',
            strong: '',
            study: '',
            profile: '',
            last: '',
            photo: ''
        };
    }

    render() {
        return(
          <div className="py-3">
            <div className="container">
              <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                  <div className="form-group">
                    <center>
                      <img src={this.state.photo ? this.state.photo : "blank"} style={{"maxWidth": "100%", "height": "150px"}} onClick={() => {alert('TODO')}}/>
                    </center>
                  </div>
                  <br/>
                  <ul className="breadcrumb" style={{"marginBottom": "0px", "marginTop": "0px"}}>
                    <p className="lead">
                      이름 : {this.state.name}
                      <br/> 학번 : {this.state.sid}
                      <br/> 전화번호 : {this.state.pnumber}
                      <br/> 이메일 : {this.state.email}</p>
                  </ul>
                  <hr/>
                  <ul className="list-group">
                    <Item title={"취미"} isEditable={false}/>
                    <Item title={"특기"} isEditable={false}/>
                    <Item title={"공부한 것"} isEditable={false}/>
                    <Item title={"자기소개"} isEditable={false}/>
                    <Item title={"마지막으로 하고 싶은 말"} isEditable={false}/>
                    <Item title={"사진"} isEditable={false}/>
                  </ul>
                  </div>
                <div className="col-md-2"></div>
              </div>
            </div>
          </div>
        );
    }
}
Application.propTypes = propTypes;
Application.defaultProps = defaultProps;

export default Application;
