
    export interface User {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }

    export interface ILoginResponse {
        user: User;
        message: string;
        sessionToken: string;
    }



