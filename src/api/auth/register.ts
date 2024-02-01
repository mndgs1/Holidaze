import { REGISTER_URL } from "../../constants/api";
import { User } from "../../constants/interfaces/user";

export async function registerUser(userDetails: User) {
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetails),
    };

    const response = await fetch(REGISTER_URL, options);
    const json = await response.json();

    if (!response.ok) {
        // How can I return this object in tanstack?
        throw new Error(json.errors?.[0]?.message ?? "There was an error");
    }

    return json;
}
