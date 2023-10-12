export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export interface Contract {
    id?: string;
    recommend?: string;
    require_role?: string;
    userOwner: string;
    time:string;
}

export interface Users {
    _id?: string;
    email: string;
    password?: string;
    status?: string;
    tel?: string;
    username: string;
    role?: string;
    byGoogle?: boolean,
    sub?: string
}

export interface UserData {
    userId?: string | null;
    username: string | null;
    tel: string | null;
    email: string | null;
    role: string | null;
    // เพิ่มคุณสมบัติอื่น ๆ ที่จำเป็นตามความต้องการ
}
export interface Activity {
    _id: string;
    type: string;
    title: string;
    detail: string;
    startDate: string;
    endDate: string;
    userOwner: string;
    option: string;
    role: string;
}

