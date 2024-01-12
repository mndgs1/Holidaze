import React from "react";

import Text from "./Text";
import Input from "./Input";

const InputWithValidation = ({ input, register, errors }: any) => {
    const fieldId = input.id as
        | "name"
        | "email"
        | "repeatEmail"
        | "password"
        | "repeatPassword";

    return (
        <div className="flex flex-col gap-1 w-full" key={input.id}>
            <Input
                type={input.type}
                id={input.id}
                label={input.label}
                autoFocus={input.autoFocus || false}
                {...register(fieldId as any)}
                danger={!!errors[fieldId]?.message}
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
