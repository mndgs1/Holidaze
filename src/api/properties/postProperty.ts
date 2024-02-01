import { PROPERTIES_URL } from "../../constants/api";
import { CreateProperty, Property } from "../../constants/interfaces/property";

export async function postProperty(token: string, data: CreateProperty) {
    const options = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify(data),
    };

    const response = await fetch(PROPERTIES_URL, options);

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.errors?.[0]?.message ?? "There was an error");
    }

    const property: Property = json;
    return property;
}
