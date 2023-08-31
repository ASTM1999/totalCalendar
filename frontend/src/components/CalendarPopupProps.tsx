import React from 'react';

interface CalendarPopupProps {
    date: Date | null;
    onClose: () => void;
}

const eventData = [
    { date: new Date(2023, 7, 28), name: 'Workshop A' },
    { date: new Date(2023, 7, 28), name: 'Meeting B' },
    { date: new Date(2023, 7, 30), name: 'Conference C' },
    // ... เพิ่มข้อมูลเหตุการณ์ต่อไป
  ];

const getEventsForDate = (date: Date) => {
    return eventData.filter(event => event.date.toDateString() === date.toDateString());
};
const CalendarPopup: React.FC<CalendarPopupProps> = ({ date, onClose }) => {
    if (!date) {
        return null;
    }

    // ส่วนนี้คุณสามารถดึงข้อมูลเหตุการณ์ในวันที่เลือกมาแสดง
    const eventsForDate = getEventsForDate(date);
    return (
        <div className="popup">
            <div className="popup-content">
                <h3>Events on {date.toDateString()}</h3>
                {eventsForDate.length === 0 ? (
                    <p>No events for this date.</p>
                ) : (
                    <ul>
                        {eventsForDate.map((event, index) => (
                            <li key={index}>{event.name}</li>
                        ))}
                    </ul>
                )}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default CalendarPopup;
