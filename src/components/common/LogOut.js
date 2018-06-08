import React from 'react';
import {bindActionCreators} from 'redux';
import * as authService from '../../services/authService';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import toastr from 'toastr';


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
        this.props.authServices.logOut(this.props.authentication.uid).then(() => {
            toastr.success('До зустрічі');
        }).catch((error) => {
            toastr.error(error.message, error.code);
        });
    }

    render() {
        const isLoggedIn = this.props.authentication.loggedIn;
        return (
            <div>
                {isLoggedIn &&
                <a className="log-out" href='#logOut' onClick={this.logOut}>
                    <i className="fas fa-sign-out-alt"/>
                </a>}
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
