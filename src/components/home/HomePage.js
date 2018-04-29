import React from 'react';
import CheckInButton from './CheckInButton';
import moment from 'moment';
import 'moment/locale/uk';
import toastr from 'toastr';
import * as dataService from '../../services/dataService';
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
    }

    checkIn() {

        this.setState({isDropDownOpened: false});
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
        this.isDatePickerJustClosed = true;
        this.toggleCalendar();
    }

    toggleCalendar(event) {
        event && event.preventDefault();
        this.setState({isDatePickerOpened: !this.state.isDatePickerOpened})
    }

    closeDatePicker() {
        this.setState({isDatePickerOpened: false});
        this.isDatePickerJustClosed = true;
    }

    handleClick() {
        if (this.isDatePickerJustClosed) {
            this.isDatePickerJustClosed = false;
            return;
        }

        if (this.state.isDatePickerOpened) {
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
            <div>
                <h1>Home Page</h1>
                <span className='SpentDays'>10</span>
                <span className='LastVisit'>10</span>
                <div className='CheckInBtn' ref={node => { this.node = node; }}>
                    <CheckInButton
                        handleClick={this.handleClick}
                        handleChange={this.handleChange}
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
        trips: state.trips,
        isOutside: isOutside
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dataService: bindActionCreators(dataService, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);