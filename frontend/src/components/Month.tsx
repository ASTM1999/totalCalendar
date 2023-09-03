
const Month = ({ year, month }) => {
  // สร้างปฏิทินของเดือนและปีที่กำหนด
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // สร้างวันของเดือน
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div className="month">
      <h3>{`${year} ${month + 1}`}</h3>
      <table>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {days.map((day, index) => (
            <td key={index}>{day}</td>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Month;
