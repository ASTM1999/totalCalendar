import { useState } from 'react';
import CalendarPopup from './CalendarPopupProps';

const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    const handleDayClick = (date: Date) => {
        setSelectedDate(date);
        setShowPopup(true);
    };
    const getDaysInMonth = (year: number, month: number) => {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        return Array.from({ length: daysInMonth }, (_, index) => new Date(year, month, index + 1));
    };

    const currentDate = new Date();
    const daysInCurrentMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());


    return (
        <div className='container-calendar'>
            <div className='month-jan'>
                <h2>
                    <a className="month-a" href='/#'>
                        มกราคม
                        <span>JANUARY</span>
                        <em>2566</em>
                    </a>
                </h2>

                <div className='calendar-week'>
                    {daysOfWeek.map(day => (
                        <div key={day}>
                            <span>{day}</span>
                        </div>
                    ))}
                </div>
                <div className='calendar-days'>
                    {daysInCurrentMonth.map((day) => (
                        <div className="calendar-day" key={day.toString()} onClick={() => handleDayClick(day)}>
                            {day.getDate()}
                        </div>
                    ))}
                </div>
                {showPopup && (
                    <CalendarPopup
                        date={selectedDate}
                        onClose={() => setShowPopup(false)}
                    />
                )}
            </div>
        </div>
    );
}

export default Calendar;
