import React from 'react';
import {bindActionCreators} from 'redux';
import * as authService from '../../services/authService';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';

class AboutPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.logOut = this.logOut.bind(this);
    }

    componentWillMount() {
        if(!this.props.authentication.loggedIn) {
            const user = JSON.parse(localStorage.getItem('USER'));
            if(user) {
                this.props.authServices.logIn(user);
            }
        }
    }

    logOut() {
        this.props.authServices.logOut();
        localStorage.removeItem("USER");
    }

    render() {
        const isLoggedIn = this.props.authentication.loggedIn;
        return (
            <div>
                {isLoggedIn && <a href='#logOut' onClick={this.logOut}>LogOut</a>}
            </div>
        )
    }
}


function mapStateToProps(state, ownProps) {
    return {
        authentication: state.authentication
    };
}

function mapDispatchToProps(dispatch) {
    return {
        redirect: (path) => dispatch(push(path)),
        authServices: bindActionCreators(authService, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);
