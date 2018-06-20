import React from 'react';
import RegistrationLink from '../about/RegistrationLink';
import {auth, fbProvider, googleProvider} from '../../api/database';
import {bindActionCreators} from 'redux';
import * as authService from '../../services/authService';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import toastr from 'toastr';

class LogInPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.fbLogIn = this.fbLogIn.bind(this);
        this.googleLogIn = this.googleLogIn.bind(this);
    }


    fbLogIn() {
        this.login(fbProvider);
    }

    googleLogIn() {
        this.login(googleProvider);
    }


    login(provider) {
        const authServices = this.props.authServices;
        const redirect = this.props.redirect;
        auth.signInWithPopup(provider).then(function (result) {
            authServices.logIn(result.user);
            toastr.success(result.user.displayName, 'Вітаємо');
            redirect('/');
        }).catch(function (error) {
            toastr.error(error.message, error.code);
        });
    }

    render() {
        return (
            <div>
                <h1>Продовжити з</h1>

                <div className='login-link'>
                    <RegistrationLink login={this.fbLogIn} text={<i className="fab fa-facebook"/>}/>&nbsp;&nbsp;&nbsp;&nbsp;
                    <RegistrationLink login={this.googleLogIn} text={<i className="fab fa-google google-blue"/>}/>
                </div>
                <p>&nbsp;</p>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return { };
}

function mapDispatchToProps(dispatch) {
    return {
        redirect: (path) => dispatch(push(path)),
        authServices: bindActionCreators(authService, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInPage);
