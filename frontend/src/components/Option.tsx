import Form from 'react-bootstrap/Form';

interface OptionProps {
    selectedOption: string;
    onOptionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
const Option = ({ selectedOption, onOptionChange }: OptionProps) => {
    return (
        <div>
            <div className="options">
                <Form.Select aria-label="Default select example" className="custom-select" onChange={onOptionChange} value={selectedOption}>
                    {/* <option value="วันหยุด">วันหยุด</option> */}
                    {/* <option>เลือก Option</option> */}
                    <option value="วันหยุด">วันหยุด</option>
                    <option value="วันพระ">วันพระ</option>
                    <option value="มหาวิทยาลัยเทคโนโลยีสุรนารี">มหาวิทยาลัยเทคโนโลยีสุรนารี</option>
                </Form.Select>
            </div>
        </div>
    )
}
export default Option