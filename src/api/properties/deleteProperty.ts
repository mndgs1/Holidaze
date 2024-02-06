import { PROPERTIES_URL } from "../../constants/api";

export async function deleteProperty(id: string, token: string) {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(`${PROPERTIES_URL}/${id}`, options);

    if (!response.ok) {
        const json = await response.json();
        throw new Error(json.errors?.[0]?.message ?? "There was an error");
    }

    return;
}
