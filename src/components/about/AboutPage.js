import React from 'react';
import RegistrationLink from './RegistrationLink';
import {bindActionCreators} from 'redux';
import * as authService from '../../services/authService';
import {auth, fbProvider, googleProvider} from '../../api/database';
import toastr from 'toastr';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';

class AboutPage extends React.Component {
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
        const isLoggedIn = this.props.authentication.loggedIn;
        return (
            <div>
                <h1>Про Нас</h1>
                <p className="text">
                    Вас вітає найзручніший та найпростіший сервіс для підрахунку терміну перебування
                    за безвізом в країнах шенгенської угоди! Просто відмічайте дати перетину кордону
                    під час подорожі і Ви завжди будете володіти актуальною інформацією, яка оновлюватиметься
                    кожного дня! Сервіс також дозволяє планувати Ваші майбутні подорожі, вносячи відповідні дати
                    Ви будете бачити кількість використаних днів за безвізом на час повернення додому.
                </p>
                {!isLoggedIn && <div className='login-link'>
                    <p className='blue'>
                        Увійти за допомогою облікового запису
                    </p>
                    <RegistrationLink login={this.fbLogIn} text='Facebook'/>&nbsp;&nbsp;&nbsp;&nbsp;
                    <RegistrationLink login={this.googleLogIn} text='Google'/>
                </div>}
                <p>&nbsp;</p>
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
        authServices: bindActionCreators(authService, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);
