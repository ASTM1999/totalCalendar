import { atom } from "recoil";
import { Activity, Todo, Users } from "../../services/interface";

// ในส่วนนี้ไม่ค่อยได้ใช้งาน เลยไม่ต้องแยกออกไปเป็น Component ตามตัวอื่นก็ได้

export const contextValueState = atom({
  key: 'contextValueState',
  default: 'Initial Value'
})

export const todoListState = atom<Todo[]>({
  key: 'todoListState',
  default: []
})

export const counterState = atom({
  key: 'counterState',
  default: 0,
})

export const userState = atom<Users[]>({
  key: "userState",
  default: [],
})

export const selectedDateState = atom({
  key: 'selectedDateState',
  default: null, // ค่าเริ่มต้น
})

// สร้าง atom สำหรับ selectedDateEvents
export const selectedDateEventsState = atom({
  key: 'selectedDateEventsState',
  default: [

  ], // ค่าเริ่มต้น
})

export const announcementsState = atom<Activity[]>({
  key: 'announcementsState',
  default: [],
})


export const campsState = atom<Activity[]>({
  key: 'campsState',
  default: [],
})


export const writingPostState = atom({
  key: 'writingPostState',
  default: { type: '', title: '', detail: '' },
})

export const activityState = atom<Activity[]>({
  key: 'activityState',
  default: [],
});

