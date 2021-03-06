import React from 'react';
import 'moment/locale/uk';
import moment from 'moment';
import toastr from 'toastr';
import * as dataService from '../../services/dataService';
import * as authService from '../../services/authService';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TripList from "./TripList";
import './History.css';

class HistoryPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.deleteTrip = this.deleteTrip.bind(this);
    }


    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentWillMount() {
        if (!this.props.authentication.dataLoaded) {
            const uid = this.props.authentication.uid;
            const authService = this.props.authService;
            this.props.dataService.getTrips(uid).then((trips) => {
                let current = moment().endOf('day').unix();
                if (trips) {
                    const lastTrip = trips[Object.keys(trips).slice(-1)[0]];
                    if (lastTrip.back && lastTrip.back > current) {
                        current = lastTrip.back;
                    } else {
                        if (lastTrip.out > current) {
                            current = lastTrip.out;
                        }
                    }
                }
                this.props.dataService.updateCurrent(current);

                this.props.dataService.startListenDataChanges(uid,
                    function (error) {
                        toastr.error(error.message, error.code);
                    });
            }).catch(function (error) {
                if (error.code === 'PERMISSION_DENIED') {
                    authService.logOut();
                } else {
                    toastr.error(error.message, error.code);
                }
            });
        }


        this.interval = setInterval(() => {
            const currentDay = moment().endOf('day').unix();

            if (currentDay > this.props.currentDay) {
                this.props.dataService.updateCurrent(currentDay);
            }
        }, 10000);
    }

    deleteTrip(event) {
        let isDelete = window.confirm("Видалити останню подорож?");
        if (isDelete) {
            this.props.dataService.deleteTrip(this.props.authentication.uid, event.target.id)
                .catch((error) => {
                    toastr.error(error.message, error.code);
                    this.props.dataService.loadTrips(this.props.authentication.uid);
                });

        }
    }

    render() {
        const {trips} = this.props;
        const reversedTrips = trips.slice().reverse();
        const saving = this.props.saving;
        return (
            <div className="history-table">
                <h1>Історія подорожей</h1>
                {!saving && <TripList trips={reversedTrips} deleteTrip={this.deleteTrip}/>}
                {saving &&
                <span>
                    <div className="fa-3x">
                        <i className='fas fa-cog fa-spin'/>
                    </div>
                </span>}
                <p>&nbsp;</p>
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