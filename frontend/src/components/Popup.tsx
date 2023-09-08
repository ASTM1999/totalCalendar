
import ReactDOM from 'react-dom';
interface PopupProps {
    event: string | null;
    onClose: () => void;
}
const Popup: React.FC<PopupProps> = ({ event, onClose }) => {

    if (!event) {
        return null;
    }
    return ReactDOM.createPortal(
        <div className="popup">
            <div className="container-popup">
                <h2> Event: {event.name}</h2>
                <p>Date: {event.date}</p>
                <button onClick={onClose}>Close</button>
            </div>

        </div>,
        document.getElementById('popup-root') // เลือกตำแหน่งที่จะแสดง Popup
    );
};

export default Popup;
