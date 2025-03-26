export type AuthData = {
    login: string;
    password: string;
};
export type UserRegistration = {
    login: string;
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
}
export type Profile = {
    id: number;
    username: string;
    email: string;
    date: string;
    isBlocked: boolean;
    isAdmin: boolean;
    phoneNumber: string;
}