
import ReactDOM from 'react-dom';
interface PopupProps {
    event: any;
    onClose: () => void;
}
const Popup = ({ event, onClose }: PopupProps) => {

    if (!event) {
        return null;
    }

    const handlePopupClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

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
        document.querySelector('.month') 
    );
};

export default Popup;
