import React from 'react';
import 'moment/locale/uk';
import toastr from 'toastr';
import moment from 'moment';
import * as dataService from '../../services/dataService';
import * as authService from '../../services/authService';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TripList from "./TripList";
import './History.css';

class HistoryPage extends React.Component {


    componentWillMount() {
        if(!this.props.authentication.dataLoaded) {

            dataService.updateCurrent(moment().endOf('day').unix());

            const uid = this.props.authentication.uid;
            const authService = this.props.authService;
            this.props.dataService.getTrips(uid).then(() => {

                this.props.dataService.startListenDataChanges(uid,
                    function (error) {
                        toastr.error(error.message, error.code);
                    });
            }).catch(function (error) {
                if(error.code === 'PERMISSION_DENIED') {
                    authService.logOut();
                }else {
                    toastr.error(error.message, error.code);
                }
            });
        }
    }

    render() {
        const {trips} = this.props;
        const reversedTrips = trips.slice().reverse();
        return (
            <div className="history-table">
                <h1>History Page</h1>
                <TripList trips={reversedTrips}/>
            </div>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        authentication: state.authentication,
        trips: state.trips,
        saving: state.ajaxCallsInProgress > 0
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dataService: bindActionCreators(dataService, dispatch),
        authService: bindActionCreators(authService, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage);