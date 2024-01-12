import * as yup from "yup";

// Registration Form schema
export const registrationSchema = yup.object({
    name: yup
        .string()
        .min(4, "Your name should be at least 4 characters")
        .required("Please enter your name"),
    email: yup
        .string()
        .matches(/@stud.noroff.no$/, "Email must be a valid @stud.noroff.no")
        .required("Email must be a valid @stud.noroff.no"),
    repeatEmail: yup
        .string()
        .oneOf([yup.ref("email")], "Emails must match")
        .required("Repeat email is required"),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    repeatPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Repeat password is required"),
    venueManager: yup.boolean(),
});

export const loginSchema = yup.object({
    email: yup
        .string()
        .matches(/@stud.noroff.no$/, "Email must be a valid @stud.noroff.no")
        .required("Email is required"),
    password: yup.string().required("Please enter a password"),
    remember: yup.boolean(),
});