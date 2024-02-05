import { PROPERTIES_URL } from "../../constants/api";
import { CreateProperty } from "../../constants/interfaces/property";

export async function putProperty(
    id: string,
    token: string,
    data: CreateProperty
) {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    };

    const response = await fetch(`${PROPERTIES_URL}/${id}`, options);

    const json = response.json();

    if (!response.ok) {
        const json = await response.json();
        throw new Error(json.errors?.[0]?.message ?? "There was an error");
    }

    return json;
}
