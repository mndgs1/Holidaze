import { PROPERTIES_URL } from "../../constants/api";
import { Property } from "../../constants/interfaces/property";

export async function getProperties(token: string) {
    const options = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(PROPERTIES_URL, options);

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.errors?.[0]?.message ?? "There was an error");
    }

    const properties: Property[] = json;
    return properties;
}
