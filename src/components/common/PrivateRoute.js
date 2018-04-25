import React from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router'
import {Redirect} from 'react-router-dom'


class PrivateRoute extends React.Component {
    render() {
        const {
            isAuthenticated,
            component: Component,
            ...props
        } = this.props;

        return (
            <Route
                {...props}
                render={props =>
                    isAuthenticated
                        ?
                        <Component {...props} />
                        :
                        (
                            <Redirect to={{
                                pathname: '/about',
                                state: {from: props.location}
                            }}/>
                        )
                }
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.authentication.loggedIn
    };
}

export default connect(mapStateToProps)(PrivateRoute);