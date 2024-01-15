import { LOGIN_URL } from "../../constants/api";
import { UserCredentials, LoggedInUser } from "../../constants/interfaces/user";

export async function login(
    userDetails: UserCredentials
): Promise<LoggedInUser> {
    const options = {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(userDetails),
    };

    const response = await fetch(LOGIN_URL, options);

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.errors?.[0]?.message ?? "There was an error");
    }

    const loggedInUser: LoggedInUser = json;

    return loggedInUser;
}
