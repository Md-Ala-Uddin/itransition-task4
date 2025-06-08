export type User = {
    id: number;
    name: string;
    email: string;
    address: string | null;
    last_login: string | null | Date;
    status: string | null;
};