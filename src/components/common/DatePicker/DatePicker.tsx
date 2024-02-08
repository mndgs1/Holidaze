import React from "react";
import "./DatePicker.css";
import Calendar from "@hassanmojab/react-modern-calendar-datepicker";

const DatePicker = ({ value, onChange, disabledDays }: any) => {
    return (
        <Calendar
            value={value}
            onChange={onChange}
            shouldHighlightWeekends
            inputPlaceholder="Check Availability"
            inputClassName={`w-full h-13 rounded-lg border border-primary px-3.5 text-center py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                value.from && value.to
                    ? "ring-2 ring-primary border-transparent"
                    : ""
            }`}
            wrapperClassName="w-full mb-2.5 z-50"
            colorPrimaryLight="#D1FAE5"
            colorPrimary="#10B981"
            disabledDays={disabledDays}
        />
    );
};

export default DatePicker;
