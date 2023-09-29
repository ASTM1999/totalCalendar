import { useState } from 'react';
import Form from 'react-bootstrap/Form';

const ContactAdmin = () => {
    const [title, setTitle] = useState(1);
    const [inputValue, setInputValue] = useState('');

    const handleClickTitle = (num: any) => {
        setTitle(num);
    };

    const handleSubmit = () => {
        console.log('submit');
    };

    const handleInputChange = (e: any) => {
        setInputValue(e.target.value);
    };

    return (
        <html>
            <body>
                <div className="ContactAdmin" >
                    <h1 style={{ marginBottom: '135px', marginTop: '80px' }}>ติดต่อ Admin</h1>
                    <div className="box-ContactAdmin">
                        <div className="div-btTitle">
                            <button
                                className='bt-title'
                                onClick={() => handleClickTitle(1)}
                                style={{ backgroundColor: title === 1 ? '#FFD9C0' : '#FAF0D7' }}
                            >
                                ข้อเสนอแนะ
                            </button>
                            <button
                                className='bt-title'
                                onClick={() => handleClickTitle(0)}
                                style={{ backgroundColor: title === 0 ? '#FFD9C0' : '#FAF0D7' }}
                            >
                                ติดต่อเรื่องบทบาท
                            </button>
                        </div>
                        {title === 1 ? (
                            <div className="boxInsite1">
                                <h3 className='headerContact'>ข้อเสนอแนะ</h3>
                                <textarea
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    placeholder='เขียนข้อเสนอแนะ'
                                    className='inputContact'
                                />
                                <div>
                                    <button className="submit-bt" onClick={handleSubmit}>
                                        submit
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="boxInsite2">
                                <h2 className='headerContact1'>บทบาท admin ของมหาลัย</h2>
                                <div className="options">
                                    <Form.Select aria-label="Default select example" className="custom-select">
                                        <option>Open this select menu</option>
                                        <option value="1">Admin มหาวิทยาลัยเทคโนโลยีสุรนารี</option>
                                        <option value="2">Admin มห่ลัย</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </div>
                                <div>
                                    <button className="submit-bt" onClick={handleSubmit}>Submit</button>
                                </div>
                                <p>ติดต่อเรื่องบทบาท 099-299-9999</p>
                            </div>
                        )}

                    </div>
                </div>
            </body>
        </html>

    );
};

export default ContactAdmin;
