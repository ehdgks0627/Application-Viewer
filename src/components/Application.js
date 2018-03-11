import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Alert from './Alert';

import Item from './Item';
import blankImage from '../static/blank.png';


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
            photo: '',
            alert: ''
        };

        this.makeAlert = this.makeAlert.bind(this);
    }

    makeAlert(content) {
      this.setState({
        alert: <Alert content={content} />
      });
    }

    render() {
        return(
          <div>
            <div className="py-3">
              <div className="container">
                <div className="row">
                  <div className="col-md-2" />
                  <div className="col-md-8">
                    <div className="form-group">
                      <center>
                        <img src={this.state.photo ? this.state.photo : blankImage} style={{"maxWidth": "100%", "height": "150px"}} onClick={() => {alert('TODO')}} />
                      </center>
                    </div>
                    <br />
                    <ul className="breadcrumb" style={{"marginBottom": "0px", "marginTop": "0px"}}>
                      <p className="lead">
                        이름 : {this.state.name}
                        <br /> 학번 : {this.state.sid}
                        <br /> 전화번호 : {this.state.pnumber}
                        <br /> 이메일 : {this.state.email}
                      </p>
                    </ul>
                    <hr />
                    <ul className="list-group">
                      <Item title={"취미"} isEditable={false} />
                      <Item title={"특기"} isEditable={false} />
                      <Item title={"공부한 것"} isEditable={false} />
                      <Item title={"자기소개"} isEditable={false} />
                      <Item title={"마지막으로 하고 싶은 말"} isEditable={false} />
                      <Item title={"사진"} isEditable={false} />
                      <br />
                      <Item title={"질문 리스트"} isEditable={true} />
                      <Item title={"전공 실력"} isEditable={true} />
                      <Item title={"특이사항"} isEditable={true} />
                      <Item title={"답변"} isEditable={true} />
                    </ul>
                    </div>
                  <div className="col-md-2" />
                </div>
              </div>
            </div>
            {this.state.alert}
          </div>
        );
    }
}
Application.propTypes = propTypes;
Application.defaultProps = defaultProps;

export default Application;
