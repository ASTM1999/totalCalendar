import { atom } from "recoil";

// ในส่วนนี้ไม่ค่อยได้ใช้งาน เลยไม่ต้องแยกออกไปเป็น Component ตามตัวอื่นก็ได้

export const contextValueState = atom({
    key: 'contextValueState',
    default: 'Initial Value'
});

export const todoListState = atom({
    key: 'todoListState',
    default: []
})

export const counterState = atom({
    key: 'counterState',
    default: 0,
});