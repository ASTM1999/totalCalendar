
interface PropContantEvent {
    title: string;
    detail: string;
    date: any;
    component: string;
    onClose: () => void;
}


const PopContantEvent = ({ title, detail, date, onClose, component }: PropContantEvent) => {
    console.log("Pop ContantEvent")
    console.log(date)
    function formatDateTime(dateTime: any) {
        const options: any = { year: 'numeric', month: 'short', day: 'numeric' };
        const date = new Date(dateTime);
        const formattedDate = date.toLocaleDateString('en-US', options);

        return `${formattedDate}`;
    }

    return (
        <div className="PopContant">
            <div className="popContantContainer">

                <div className="headContant">
                    <img src="../../public/xmark-solid.svg" alt="" style={{ width: "24px", cursor: "pointer" }} onClick={onClose} />
                </div>

                <div className="bodyContant">
                    <div className="hbodyContant">
                        {component === "calendar" ? (
                            <img src="../../public/calendar-day.svg" alt="calendar-day" style={{ width: "24px", marginRight: "10px" }} />
                        ) : (
                            <img src="../../public/paper-plane-top.svg" alt="paper-plane-top" style={{ width: "24px", marginRight: "10px" }} />
                        )}
                        <h1>
                            {title}
                        </h1>
                    </div>
                    <div className="bbodyContant">
                        <p style={{ fontSize: "20px" }}>{detail}</p>
                    </div>
                </div>

                <div className="footContant">
                    <b>

                        <p className="timeBody"><img src="../../public/clock.svg" alt="greenDot" style={{ width: "24px", marginRight: "10px" }} />
                            {formatDateTime(date)}
                        </p>
                    </b>
                    {/* <p className="timeBody"><img src="../../public/redDot.svg" alt="redDot" style={{ width: "24px" }} /> {date}</p> */}
                </div>
            </div>

        </div>

    )
}

export default PopContantEvent