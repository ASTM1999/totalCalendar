import { atom } from "recoil";
import { Todo } from "../../services/interface";

// ในส่วนนี้ไม่ค่อยได้ใช้งาน เลยไม่ต้องแยกออกไปเป็น Component ตามตัวอื่นก็ได้

export const contextValueState = atom({
  key: 'contextValueState',
  default: 'Initial Value'
});

export const todoListState = atom<Todo[]>({
  key: 'todoListState',
  default: []
})

export const counterState = atom({
  key: 'counterState',
  default: 0,
});

export const userState = atom({
  key: "userState",
  default: {
    email: "", // Add other user properties here
    password: "",
    username: ""
  },
});

export const selectedDateState = atom({
  key: 'selectedDateState',
  default: null, // ค่าเริ่มต้น
});

// สร้าง atom สำหรับ selectedDateEvents
export const selectedDateEventsState = atom({
  key: 'selectedDateEventsState',
  default: [

  ], // ค่าเริ่มต้น
});

// export const announcementsState = atom({
//     key: 'announcementsState',
//     default: [],
// });

// export const campsState = atom({
//     key: 'campsState',
//     default: [],
// });

// export const activitiesState = atom({
//     key: 'activitiesState',
//     default: [],
// });
export const announcementsState = atom({
  key: 'announcementsState',
  default: [
    {
      title: 'ประกาศ มทส. เรื่อง งดการเรียนการสอนในช่วงสัปดาห์การสอบกลางภาค 1/2566',
      detail: `ให้งดการเรียนการสอนทุกรายวิชาในระดับปริญญาตรี ระหว่างวันจันทร์ที่ 11 – ศุกร์ที่ 15 ก.ย. 66
      กรณีรายวิชาในระดับบัณฑิตศึกษา หากมีความประสงค์จะสอน ให้ประสานงานการใช้ห้องเรียนไปยัง ฝ่ายตารางสอนตารางสอบ  ศูนย์บริการการศึกษา [อ่านข้อมูลเพิ่มเติม]
      ประกาศโดย ฝ่ายตารางสอนตารางสอบ โทร. 044-223022 วันที่ประกาศ 10 สิงหาคม 2566`
    },
    { title: 'ประกาศที่ 2', detail: 'รายละเอียดประกาศที่ 2 announcementsState' },
  ],
});


export const campsState = atom({
  key: 'campsState',
  default: [
    { title: 'ค่ายที่ 1', detail: 'รายละเอียดค่ายที่ 1 campsState' },
    { title: 'ค่ายที่ 2', detail: 'รายละเอียดค่ายที่ 2 campsState' },
  ],
});

export const activitiesState = atom({
  key: 'activitiesState',
  default: [
    { title: 'กิจกรรมที่ 1', detail: 'รายละเอียดกิจกรรมที่ 1 activitiesState' },{ title: 'กิจกรรมที่ 2', detail: 'รายละเอียดกิจกรรมที่ 2 activitiesState' },
  ],
});
export const writingPostState = atom({
  key: 'writingPostState',
  default: { type: '', title: '', detail: '' },
});