import React from 'react';
import CheckInButton from './CheckInButton';
import moment from 'moment';
import 'moment/locale/uk';
import toastr from 'toastr';
import SpentDays from './SpentDays';
import LastVisit from './LastVisit';
import * as dataService from '../../services/dataService';
import * as authService from '../../services/authService';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class HomePage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            isDropDownOpened: false,
            isDatePickerOpened: false
        };
        moment.locale("uk");
        this.isDatePickerJustClosed = false;
        this.checkInDate = moment();
        this.minDate = moment().subtract(12, "months");
        this.maxDate = moment().add(6, "months");
        this.checkIn = this.checkIn.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.toggleCalendar = this.toggleCalendar.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.closeDatePicker = this.closeDatePicker.bind(this);
        this.calculateMinDate = this.calculateMinDate.bind(this);
        this.handleSelectOnDatePicker = this.handleSelectOnDatePicker.bind(this);
    }

    componentWillUpdate(newProps,newState) {
        if(newProps.saving) {
            if(this.state.isDropDownOpened || this.state.isDatePickerOpened) {
                this.setState({isDropDownOpened: false, isDatePickerOpened: false});
            }
        }
    }

    componentWillMount() {
        if(!this.props.authentication.dataLoaded) {
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
                if(error.code === 'PERMISSION_DENIED') {
                    authService.logOut();
                }else {
                    toastr.error(error.message, error.code);
                }
            });
        }
    }

    checkIn() {
        this.setState({isDropDownOpened: false});

        if(this.props.currentDay < this.checkInDate.unix()) {
            this.props.dataService.updateCurrent(this.checkInDate.unix());
        }

        if(this.props.isOutside) {
            const lastTrip = this.props.trips.slice(-1)[0];
            this.props.dataService.back(this.props.authentication.uid,
                this.checkInDate.unix(), lastTrip.id).then(() => {
                this.setState({isDropDownOpened: false});
            }).catch(function (error) {
                toastr.error(error.message, error.code);
            });
        } else {
            this.props.dataService.out(this.props.authentication.uid,
                this.checkInDate.unix()).then(() => {
                this.setState({isDropDownOpened: false});
            }).catch(function (error) {
                toastr.error(error.message, error.code);
            });
        }
    }

    calculateMinDate() {
        if (this.props.trips.length > 0) {
            const lastTrip = this.props.trips.slice(-1)[0];

            this.minDate = moment.unix(lastTrip.out);
            if(lastTrip.back) {
                this.minDate = moment.unix(lastTrip.back);
            }

            let todayCrossingCount = 0;
            if (this.props.trips.length > 1) {
                const day = this.minDate.dayOfYear();
                const year = this.minDate.year();

                for (let i = this.props.trips.length - 2; i < this.props.trips.length; i++) {
                    if(this.props.trips[i].back) {
                        const backDate = moment.unix(this.props.trips[i].back);
                        if (backDate.dayOfYear() === day && backDate.year() === year) {
                            todayCrossingCount++;
                        }
                    }

                    const outDate = moment.unix(this.props.trips[i].out);
                    if (outDate.dayOfYear() === day && outDate.year() === year) {
                        todayCrossingCount++;
                    }
                }

                if (todayCrossingCount > 2) {
                    this.minDate.add(1, "days");
                }
            }
        }
    }

    handleChange(date) {
        this.checkInDate = date;
        this.toggleCalendar();
    }

    toggleCalendar(event) {
        event && event.preventDefault();
        this.setState({isDatePickerOpened: !this.state.isDatePickerOpened})
    }

    closeDatePicker() {
        this.setState({isDatePickerOpened: false});
    }


    handleSelectOnDatePicker() {
        this.isDatePickerJustClosed = true;
        this.setState({isDatePickerOpened: false});
    }

    handleClick() {
        if (this.isDatePickerJustClosed) {
            this.isDatePickerJustClosed = false;

            return;
        }

        if (this.state.isDatePickerOpened || this.props.saving) {
            return;
        }

        if (!this.state.isDropDownOpened) {
            // attach/remove event handler
            document.addEventListener('click', this.handleOutsideClick, false);
            this.calculateMinDate();
            if (this.minDate < moment()) {
                this.checkInDate = moment();
            } else {
                this.checkInDate = this.minDate;
            }
            const clonedMinDate = moment(this.minDate);
            if (clonedMinDate.add(1, "days") > this.maxDate) {
                toastr.error("You have no available dates for operations", "Warning");
                document.removeEventListener('click', this.handleOutsideClick, false);
                return;
            }
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }

        this.setState(prevState => ({
            isDropDownOpened: !prevState.isDropDownOpened
        }));
    }

    handleOutsideClick(event) {
        // ignore clicks on the component itself
        if (!this.node) {
            return;
        }
        if (this.node.contains(event.target)) {
            return;
        }
        this.handleClick();
    }

    render() {

        return (
            <div className='result-numbers'>
                <SpentDays trips={this.props.trips} />
                <LastVisit trips={this.props.trips} />
                <div className='CheckInBtn' ref={node => { this.node = node; }}>
                    <CheckInButton
                        saving={this.props.saving}
                        handleClick={this.handleClick}
                        handleChange={this.handleChange}
                        handleSelectOnDatePicker={this.handleSelectOnDatePicker}
                        toggleCalendar={this.toggleCalendar}
                        isDropDownOpened={this.state.isDropDownOpened}
                        isDatePickerOpened={this.state.isDatePickerOpened}
                        minDate={this.minDate}
                        maxDate={this.maxDate}
                        checkInDate={this.checkInDate}
                        checkIn={this.checkIn}
                        closeDatePicker={this.closeDatePicker}
                        isOutside={this.props.isOutside}
                    />
                </div>
            </div>
        );
    };
}

function mapStateToProps(state, ownProps) {
    let isOutside = false;
    if(state.trips.length > 0) {
        const lastTrip = state.trips.slice(-1)[0];
        if(!lastTrip.back) {
            isOutside = true;
        }
    }

    return {
        authentication: state.authentication,
        currentDay: state.currentDay,
        trips: state.trips,
        isOutside: isOutside,
        saving: state.ajaxCallsInProgress > 0
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dataService: bindActionCreators(dataService, dispatch),
        authService: bindActionCreators(authService, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);