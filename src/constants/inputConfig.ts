export const RegisterInputConfig = [
    {
        type: "text",
        id: "name",
        label: "Name",
        autoFocus: true,
        message: "Name must be minimum 4 characters",
    },
    {
        type: "text",
        id: "email",
        label: "Email address",
        message: "Email must be a valid @stud.noroff.no",
    },
    {
        type: "text",
        id: "repeatEmail",
        label: "Repeat email address",
    },
    {
        type: "password",
        id: "password",
        label: "Password",
        message: "Password must be minimum 6 characters",
    },
    {
        type: "password",
        id: "repeatPassword",
        label: "Repeat password",
    },
    {
        type: "checkbox",
        id: "venueManager",
        label: "I will be renting my property",
    },
];

export const LoginInputConfig = [
    {
        type: "text",
        id: "email",
        label: "Email address",
        autocomplete: true,
        autoFocus: true,
    },
    {
        type: "password",
        id: "password",
        label: "Password",
    },
    {
        type: "checkbox",
        id: "remember",
        label: "Remember Me",
    },
];

export const CombinedInputConfig = {
    name: {
        type: "text",
        id: "name",
        label: "Name",
        message: "Name must be minimum 4 characters",
    },
    password: {
        type: "password",
        id: "password",
        label: "Password",
        message: "Password must be minimum 6 characters",
    },
    email: {
        type: "text",
        id: "email",
        label: "Email address",
        message: "Email must be a valid @stud.noroff.no",
    },
    repeatEmail: {
        type: "text",
        id: "repeatEmail",
        label: "Repeat email address",
    },
    repeatPassword: {
        type: "password",
        id: "repeatPassword",
        label: "Repeat password",
    },
    venueManager: {
        type: "checkbox",
        id: "venueManager",
        label: "I will be renting my property",
    },
    remember: {
        type: "checkbox",
        id: "remember",
        label: "Remember Me",
    },
    avatar: {
        type: "text",
        id: "avatar",
        label: "Avatar URL",
    },
};
