export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export interface Users {
    _id: string;
    email: string;
    password: string;
    status: string;
    tel: string;
    username: string;
    role: string;
}

export interface Activity {
    _id: string;
    type: string;
    title: string;
    detail: string;
    time: string;
    userOwner: string;
    option: string;
}
