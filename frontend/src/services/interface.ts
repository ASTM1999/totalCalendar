export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export interface events {
    date: any;
    event: any;
}
export interface CommentUI {
    comment: string;
    userId: any;
    activityId: string;
    type: string
    date: any
}
export interface Contract {
    id?: string;
    title?: string
    recommend?: string;
    require_role?: string;
    detail?: string;
    userOwner: string;
    time: any;
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

// export interface UserData {
//     userId?: string | null;
//     username: string | null;
//     tel: string | null;
//     email: string | null;
//     role: string | null;

// }
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
    picture: string;
}

