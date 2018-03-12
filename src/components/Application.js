import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Item from './Item';
import blankImage from '../static/blank.png';
import API_SERVER_URL from '../config.js';

const propTypes = {

};

const defaultProps = {

};

class Application extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
            questionList: [],
            major: [],
            special: [],
            answer: '',
            startTime: null,
            endTime: null
        };
    }

    componentDidMount() {
        axios.get(API_SERVER_URL + '/application/' + this.props.match.params.id)
            .then((result) => {
              let data = result.data;
              this.setState({
                  name: data.name,
                  sid: data.sid,
                  pnumber: data.pnumber,
                  email: data.email,
                  hobby: data.hobby,
                  strong: data.strong,
                  study: data.study,
                  profile: data.profile,
                  last: data.last,
                  photo: data.photo,
                  questionList: data.questionList,
                  major: data.major,
                  special: data.special,
                  answer: data.answer,
                  startTime: data.startTime,
                  endTime: data.endTime
              });
              //TODO notify setState changed to Item Model {"title": "취미", "content": data.hobby}
            })
            .catch((error) => { window.location = '/list'; });
    }

    render() {
      let detailview = (
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
                    <Item title={"취미"} content={this.state.hobby} isEditable={false} />
                    <Item title={"특기"} content={this.state.strong} isEditable={false} />
                    <Item title={"공부한 것"} content={this.state.study} isEditable={false} />
                    <Item title={"자기소개"} content={this.state.profile} isEditable={false} />
                    <Item title={"마지막으로 하고 싶은 말"} content={this.state.last} isEditable={false} />
                    <br />
                    <Item title={"질문 리스트"} content={this.state.questionList} isEditable={true} />
                    <Item title={"전공 실력"} content={this.state.major} isEditable={true} />
                    <Item title={"특이사항"} content={this.state.special} isEditable={true} />
                    <Item title={"답변"} content={this.state.answer} isEditable={true} />
                  </ul>
                  </div>
                <div className="col-md-2" />
              </div>
            </div>
          </div>
      );
        return(
          <div>
            {detailview}
          </div>
        );
    }
}
Application.propTypes = propTypes;
Application.defaultProps = defaultProps;

export default Application;
