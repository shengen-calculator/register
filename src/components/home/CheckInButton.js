import React from 'react';
import './CheckInButton.css';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

const CheckInButton = ({
                           handleClick,
                           handleChange,
                           toggleCalendar,
                           isDropDownOpened,
                           isDatePickerOpened,
                           minDate,
                           maxDate,
                           checkInDate,
                           checkIn,
                           closeDatePicker

                       }) => {
    return (
        <div className="dropdown" >
            <button onClick={handleClick} className="dropbtn">
                {
                    "Дому"
                }
            </button>
            {isDropDownOpened && (<div className="dropdown-content">
                <div onClick={toggleCalendar}>
                    {
                        minDate > checkInDate ?
                            minDate.format("DD-MM-YYYY") :
                            checkInDate.format("DD-MM-YYYY")
                    }
                </div>
                <div onClick={checkIn}>Check In</div>
            </div>)}
            {
                isDatePickerOpened && (
                    <DatePicker
                        selected={checkInDate}
                        onChange={handleChange}
                        minDate={minDate}
                        maxDate={maxDate}
                        onClickOutside={closeDatePicker}
                        onSelect={closeDatePicker}
                        withPortal
                        inline />
                )
            }
        </div>
    );
};

export default CheckInButton;