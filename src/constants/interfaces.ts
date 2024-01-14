export interface UserCredentials {
    email: string;
    password: string;
    remember?: boolean;
}

export interface User extends UserCredentials {
    name?: string;
    avatar?: string | null;
    venueManager?: boolean;
}

export interface LoggedInUser extends User {
    accessToken: string;
}
