import { PROPERTIES_URL } from "../../constants/api";
import { Property } from "../../constants/interfaces/property";

export async function getProperty(token: string, id: string) {
    const options = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    const url = `${PROPERTIES_URL}/${id}?_owner=true&_bookings=true`;
    const response = await fetch(url, options);

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.errors?.[0]?.message ?? "There was an error");
    }

    const property: Property = json;
    return property;
}
