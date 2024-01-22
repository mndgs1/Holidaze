import { PROFILES_URL } from "../../constants/api";

export async function updateAvatar({
    name,
    avatar,
    token,
}: {
    name: string | undefined;
    avatar: string | undefined;
    token: string | undefined;
}) {
    const url = `${PROFILES_URL}/${name}/media`;
    const options = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: "PUT",
        body: JSON.stringify({ avatar: avatar }),
    };

    const response = await fetch(url, options);
    const json = await response.json();

    if (!response.ok) {
        // How can I return this object in tanstack?
        throw new Error(json.errors?.[0]?.message ?? "There was an error");
    }

    return json;
}

export async function updateProfile({
    name,
    venueManager,
    token,
}: {
    name: string | undefined;
    venueManager: boolean;
    token: string | undefined;
}) {
    const url = `${PROFILES_URL}/${name}`;
    const options = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: "PUT",
        body: JSON.stringify({ venueManager: venueManager }),
    };

    const response = await fetch(url, options);
    const json = await response.json();

    if (!response.ok) {
        // How can I return this object in tanstack?
        throw new Error(json.errors?.[0]?.message ?? "There was an error");
    }

    return json;
}
