
// import { saveAs } from 'file-saver';
// import XLSX from 'sheetjs-style'

// interface ExportExcelProps {
//     excelData: any;
//     filename: any
// }

// const ExportExcel = ({ excelData, filename }: ExportExcelProps) => {
//     const fileType = `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8`;
//     const fileExtension = 'xlsx'
//     const ws = XLSX.utils.json_to_sheet(excelData)
//     const wb: any = { Sheet: { 'data': ws }, SheetNames: ['data'] }
//     const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
//     const data = new Blob([excelBuffer], { type: fileType })
//     saveAs.saveAs(data, filename + fileExtension)
// }


// export default ExportExcel