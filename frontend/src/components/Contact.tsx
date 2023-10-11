import { useEffect, useState } from 'react';
import Option from './Option';
import { Contract } from '../services/interface';
import { contractService } from '../services/contractService';
import { UserService } from '../services/userServices';


const ContactAdmin = () => {
    const [title, setTitle] = useState(1);
    const [inputValue, setInputValue] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    const [id, setId] = useState('')
    // const [role, setRole] = useState<string | null>()

    const handleClickTitle = (num: any) => {
        setTitle(num);
    };

    const handleSubmit = async () => {
        console.log('submit');
        const createContract: Contract = {
            recommend: inputValue,
            require_role: selectedOption,
            userOwner: id
        }
        await contractService.createContract(createContract)
        // console.log("create",create)
    };

    const handleInputChange = (e: any) => {
        setInputValue(e.target.value);
    };

    const handleOptionChange = (event: any) => {
        setSelectedOption(event.target.value);
    };


    async function fetchUser() {
        const id = await UserService.getUserId()
        const data = await UserService.getUserData(id)
        // setRole(data.role)
        setId(id)
    }
    useEffect(() => {
        fetchUser()
    }, [])

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
                                style={{ backgroundColor: title === 1 ? '#FAF0D7' : '#FFD9C0' }}
                            >
                                ข้อเสนอแนะ
                            </button>
                            <button
                                className='bt-title'
                                onClick={() => handleClickTitle(0)}
                                style={{ backgroundColor: title === 0 ? '#FAF0D7' : '#FFD9C0' }}
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
                                <h2 className='headerContact1'>บทบาท admin vvv</h2>
                                <div className="options">
                                    <Option selectedOption={selectedOption} onOptionChange={handleOptionChange} />
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
