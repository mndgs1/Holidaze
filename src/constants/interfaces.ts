export interface UserCredentials {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface User extends UserCredentials {
    name: string;
    avatar?: string;
    venueManager?: boolean;
}

export interface LoggedInUser extends User {
    accessToken: string;
}
