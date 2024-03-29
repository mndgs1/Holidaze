import React from "react";

import Text from "./Text";
import Input from "./Input";

const InputWithValidation = ({
    input,
    register,
    errors,
    defaultValue,
}: any) => {
    const fieldId = input.id as
        | "name"
        | "email"
        | "repeatEmail"
        | "password"
        | "repeatPassword"
        | "remember"
        | "venueManager"
        | "avatar";

    return (
        <div className="flex flex-col gap-1 w-full" key={input.id}>
            <Input
                type={input.type}
                id={input.id}
                label={input.label}
                autoFocus={input.autoFocus || false}
                {...register(fieldId as string)}
                danger={!!errors[fieldId]?.message}
                defaultValue={defaultValue}
            />
            {errors[fieldId]?.message && (
                <Text danger sm>
                    {errors[fieldId]?.message}
                </Text>
            )}
        </div>
    );
};

export default InputWithValidation;
