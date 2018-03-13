import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';

import Item from './Item';
import blankImage from '../static/blank.png';
import { SERVER_URL, API_SERVER_URL } from '../config';

const propTypes = {
    startInterview: PropTypes.func.isrequired,
    endInterview: PropTypes.func.isrequired
};

const defaultProps = {
    startInterview: () => {console.log('startInterview is not defined')},
    endInterview: () => {console.log('endInterview is not defined')}
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
            endTime: null,
            _id: this.props.match.params._id
        };
    }

    componentDidMount() {
        axios.get(API_SERVER_URL + '/application/' + this.state._id)
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
            })
            .catch((error) => { window.location = '/list'; });
    }

    componentWillReceiveProps(nextProps, nextState) {

        if(nextProps._id === this.state._id) {
            let newState = {};
            if('photo' in nextProps &&
               nextProps.photo !== this.state.photo) {
                newState.photo = nextProps.photo;
            }
            if('startTime' in nextProps &&
               nextProps.startTime !== this.state.startTime) {
                newState.startTime = nextProps.startTime;
            }
            if('endTime' in nextProps &&
               nextProps.endTime !== this.state.endTime) {
                newState.endTime = nextProps.endTime;
            }
            if(Object.keys(newState).length !== 0) {
                this.setState(newState);
            }
        }
    }

    render() {
      let startInterviewButton = (<button className="btn-primary mt-3" onClick={() => {this.props.startInterview(this.state.name, this.state._id)}}>면접 시작(알림 보내기)</button>);
      let endInterviewButton = (<button className="btn-primary mt-3" onClick={() => {this.props.endInterview(this.state._id)}}>면접 끝내기</button>);
      let doneInterviewButton = (<button className="btn-primary mt-3">면접 종료됨</button>)

      let detailview = (
          <div className="py-3">
            <div className="container">
              <div className="row">
                <div className="col-md-2" />
                <div className="col-md-8">
                  <div className="form-group">
                    <center>
                        <input
                        name="profile"
                        type="file"
                        style={{"display": "none"}}
                        accept="image/*"
                        ref={(imageInput => {this.imageInput = imageInput;})}
                        onChange={(event)=> {
                            if(event.target.value) {
                                let data = new FormData();
                                data.append(this.state._id, event.target.files[0], event.target.files[0].name);
                                const config = {
                                    headers: { 'content-type': 'multipart/form-data' }
                                }
                                axios.post(API_SERVER_URL + '/upload', data, config)
                                .then((response) => {})
                                .catch((error) => {console.log(error);});
                            }
                        }} />
                      <img
                      src={this.state.photo ? this.state.photo : blankImage}
                      style={{"maxWidth": "100%", "height": "150px"}}
                      onClick={() => {this.imageInput.click()}} />
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
                  {
                    this.state.startTime ?
                    this.state.endTime ? doneInterviewButton : endInterviewButton :
                    startInterviewButton
                  }
                  <br />

                  경과 시간 : {this.state.startTime}
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

const mapStateToProps = (state = {}) => {
    return {
        photo: state.application.photo,
        startTime: state.application.startTime,
        endTime: state.application.endTime,
        _id: state.application._id
    };
};

export default connect(mapStateToProps)(Application);
