export interface Employee {
    id: string;
    name: string;
    email: string;
    phone: number;
    salary: number;
    department: string;
}
export interface TokenApiModel{
    accessToken: string,
    refreshToken: string
}