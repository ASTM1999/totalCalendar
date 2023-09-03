
import Month from './Month';

const TestCalendar = () => {
  const year = new Date().getFullYear();

  return (
    <div className="calendar">
      {[...Array(12)].map((_, month) => (
        <Month key={month} year={year} month={month} />
      ))}
    </div>
  );
};

export default TestCalendar;
