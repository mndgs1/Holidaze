import { PROFILES_URL } from "../../constants/api";

export async function getProfile(
    token: string | undefined,
    name: string | undefined
) {
    const options = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(`${PROFILES_URL}/${name}`, options);

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.errors?.[0]?.message ?? "There was an error");
    }

    return json;
}
