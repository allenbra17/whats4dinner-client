
    export interface User {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: string;
        updatedAt: Date;
        createdAt: Date;
    }

    export interface ISignup {
        message: string;
        user: User;
        sessionToken: string;
    }


