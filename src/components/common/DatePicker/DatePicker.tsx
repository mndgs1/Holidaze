import React from "react";
import "./DatePicker.css";
import Calendar from "@hassanmojab/react-modern-calendar-datepicker";
interface FormattedDate {
    year: number;
    month: number;
    day: number;
}

const createStartingDate = (date: Date): FormattedDate => ({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
});

const DatePicker = ({ value, onChange, disabledDays }: any) => {
    const today = new Date();

    const minimumDate = createStartingDate(today);
    return (
        <Calendar
            value={value}
            onChange={onChange}
            shouldHighlightWeekends
            inputPlaceholder="Check Availability"
            inputClassName={`w-full h-13 rounded-lg cursor-pointer hover:ring-2 hover:ring-primary hover:ring-rounded hover:border-transparent border border-primary px-3.5 text-center py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                value.from && value.to
                    ? "ring-2 ring-primary border-transparent"
                    : ""
            }`}
            wrapperClassName="w-full mb-2.5 z-10 cursor-pointer "
            colorPrimaryLight="#D1FAE5"
            colorPrimary="#10B981"
            minimumDate={minimumDate}
            disabledDays={disabledDays}
        />
    );
};

export default DatePicker;
