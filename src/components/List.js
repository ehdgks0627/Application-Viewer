import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {

};

const defaultProps = {

};

class List extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>List</div>
        );
        //TODO application each preview
        //<Application preview={true} />
    }
}
List.propTypes = propTypes;
List.defaultProps = defaultProps;

export default List;
