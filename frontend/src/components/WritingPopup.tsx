// import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import xmark from '../../public/xmark-solid.svg';

interface WritingPopupProps {
    title: string;
    detail: string;
    selectedDateStart: Date | null;
    selectedDateEnd: Date | null;
    onTitleChange: (e: React.ChangeEvent<HTMLInputElement>, _id?: any) => void;
    onDetailChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;

    onStartDate: (e: any) => void;
    onEndDate: (e: any) => void;
    onConfirm: () => void;
    onCancel: () => void;
}


const WritingPopup = ({ onConfirm, onCancel, title, detail, selectedDateStart, selectedDateEnd, onStartDate, onEndDate, onTitleChange, onDetailChange }: WritingPopupProps) => {
    // const [selectedDateStart, setSelectedDateStart] = useState<Date | null>(new Date());
    // const [selectedDateEnd, setSelectedDateEnd] = useState<Date | null>(new Date());
    // console.log(onTitleChange)
    // console.log(onDetailChange)
    // console.log(onStartDate)
    // console.log(onEndDate)
    const handleSaveClick = () => {
        onConfirm();
    };
    return (


        <div className="writing"  >
            <div className="writingPopup" style={{ backgroundColor: "white", width: "650px" }}>
                <div className="writingHead">
                    <h3 className="addNewEvent">Add a New Event</h3>
                    <img
                        style={{ marginRight: "25px", width: "18px", cursor: "pointer" }}
                        src={xmark}
                        alt='Icon Xmark'
                        onClick={onCancel}
                    />
                    {/* <button onClick={onCancel} style={{ marginRight: "25px" }}>.</button> */}
                </div>
                <div className="writingPopup-container">
                    <div className="eventn">
                        <label className="eventname">Event Name</label>
                        <input
                            style={{ fontSize: "18px", paddingLeft: "20px", height: "49.2px", backgroundColor: "#F9F9F9", border: "none", borderRadius: "10px" }}
                            type="text"
                            placeholder="หัวข้อ"
                            value={title}
                            onChange={onTitleChange}
                        />
                    </div>
                    <div className="eventds">
                        <label>Event Description</label>
                        <textarea
                            style={{ fontSize: "18px", width: "474px", padding: "20px", height: "270px", backgroundColor: "#F9F9F9", border: "none", borderRadius: "10px" }}
                            placeholder="รายละเอียด"
                            value={detail}
                            onChange={onDetailChange}
                        />
                    </div>



                    <div className="sdate">
                        <label style={{ width: "253px" }}>Event Start Date</label>
                        <DatePicker
                            selected={selectedDateStart}
                            onChange={(date: Date) => {
                                if (selectedDateEnd && date > selectedDateEnd) {
                                    return;
                                }
                                onStartDate(date);
                            }}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            className="datecustom-picker"
                        />
                    </div>
                    <div className="edate">
                        <label style={{ width: "253px" }}>Event end Date Time</label>
                        <DatePicker
                            selected={selectedDateEnd}
                            onChange={(date: Date) => {
                                if (selectedDateStart && date < selectedDateStart) {
                                    return;
                                }
                                onEndDate(date);
                            }}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            className="datecustom-picker"
                        />
                    </div>




                    <div className="warning" style={{ fontSize: "14px", display: "flex", paddingTop: "15px" }}>
                        <p style={{ color: "red", paddingRight: "6px" }}>กรุณากำหนด</p>
                        <p style={{ paddingRight: "6px" }}>End Date</p>
                        <p style={{ color: "red", paddingRight: "6px" }}>ให้มากกว่า</p>
                        <p >StartDate</p>
                    </div>
                </div>
                <div className="bt-write-popup">
                    <div className="div-cancel-write">
                        <button className="bt-cacel-write" onClick={onCancel}>Cancle</button>
                    </div>
                    <div className="div-cancel-write">
                        <button className="bt-submit-write" onClick={handleSaveClick}>Submit</button>
                    </div>
                </div>


            </div>
        </div>

    );

}

export default WritingPopup