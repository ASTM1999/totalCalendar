
interface PropContantEvent {
    title: string;
    detail: string;
    start?: any;
    end?: any;
    email?: string;
    tel?: string;
    component: string;
    onClose: () => void;
}


const PopContantEvent = ({ title, detail, start, end, email, tel, onClose, component }: PropContantEvent) => {
    // console.log("Pop ContantEvent")
    // console.log(email)

    function formatDateTime(dateTime: any) {
        const options: any = { year: 'numeric', month: 'short', day: 'numeric' };
        const date = new Date(dateTime);
        const formattedDate = date.toLocaleDateString('en-US', options);
        return `${formattedDate}`;
    }

    return (
        <div className="PopContant" onClick={onClose} >
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
                    {email && (
                        <div className="bbodyContant">

                            <p style={{ fontSize: "20px" }}>Contact</p>
                            <p style={{ fontSize: "20px" }}>Email: {email}</p>
                            <p style={{ fontSize: "20px" }}>Tel: {tel}</p>
                        </div>
                    )}
                    <div className="bbodyContant">
                        <p style={{ fontSize: "20px" }}>{detail}</p>
                    </div>
                </div>

                <div className="footContant">
                    <b>
                        {/* {end !== null ? (
                            <p className="timeBody"><img src="../../public/clock.svg" alt="greenDot" style={{ width: "24px", marginRight: "10px" }} />
                                {formatDateTime(start)} - {formatDateTime(end)}
                            </p>

                        ) : ( */}
                            <p className="timeBody"><img src="../../public/clock.svg" alt="greenDot" style={{ width: "24px", marginRight: "10px" }} />
                                {formatDateTime(start)}
                            </p>
                        {/* )} */}
                    </b>
                    {/* <p className="timeBody"><img src="../../public/redDot.svg" alt="redDot" style={{ width: "24px" }} /> {date}</p> */}
                </div>
            </div>

        </div>

    )
}

export default PopContantEvent