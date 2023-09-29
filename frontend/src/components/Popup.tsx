
import ReactDOM from 'react-dom';
interface PopupProps {
    event: string | null;
    onClose: () => void;
}
const Popup: React.FC<PopupProps> = ({ event, onClose }) => {

    if (!event) {
        return null;
    }

    const handlePopupClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // ตรวจสอบว่าคลิกอยู่ภายในเนื้อหาของ Popup หรือไม่
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    return ReactDOM.createPortal(
        <div className="popup" onClick={handlePopupClick}>
            <div className="container-popup">
                <h2> Event: {event.event}</h2>
                <p>Date: {event.date}</p>
                <button onClick={onClose}>Close</button>
            </div>

        </div>,
        document.querySelector('.month') // เลือกตำแหน่งที่จะแสดง Popup
    );
};

export default Popup;
