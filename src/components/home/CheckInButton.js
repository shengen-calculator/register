import React from 'react';
import './CheckInButton.css';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

const CheckInButton = ({
                           saving,
                           handleClick,
                           handleChange,
                           handleSelectOnDatePicker,
                           toggleCalendar,
                           isDropDownOpened,
                           isDatePickerOpened,
                           minDate,
                           maxDate,
                           checkInDate,
                           checkIn,
                           closeDatePicker,
                           isOutside
                       }) => {


    let btnClass = saving ? 'dropbtn disabled' : 'dropbtn';
    if(!isOutside) {
        btnClass = saving ? 'dropbtn disabled' : 'dropbtn eu';
    }
    const btnText = isOutside ? <i className='fas fa-shoe-prints'/> : '';
    return (
        <div className="dropdown">
            <button onClick={handleClick} className={btnClass} disabled={saving}>
                {
                    saving ? "moment..." : btnText
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
                <div onClick={checkIn}>Додати</div>
            </div>)}
            {
                isDatePickerOpened && (
                    <DatePicker
                        selected={checkInDate}
                        onChange={handleChange}
                        minDate={minDate}
                        maxDate={maxDate}
                        onClickOutside={closeDatePicker}
                        onSelect={handleSelectOnDatePicker}
                        withPortal
                        inline/>
                )
            }
        </div>
    );
};

export default CheckInButton;