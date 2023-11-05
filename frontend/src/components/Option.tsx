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
                    {/* <option value="วันหยุด">วันหยุด</option> */}
                    <option value="มหาวิทยาลัยเทคโนโลยีสุรนารี">มหาวิทยาลัยเทคโนโลยีสุรนารี</option>
                    <option value="คณะวิศวกรรม">คณะวิศวกรรม</option>
                    <option value="วิทยาศาสตร์">วิทยาศาสตร์</option>
                    <option value="แพทย์ศาสตร์">แพทย์ศาสตร์</option>
                    <option value="พยาบาลศาสตร์">พยาบาลศาสตร์</option>

                    {/* <option value="มหาวิทยาลัยอื่นๆ">มหาวิทยาลัยอื่นๆ</option> */}
                    {/* <option value="คณะแพทย์">คณะแพทย์</option> */}
                </Form.Select>
            </div>
        </div>
    )
}
export default Option