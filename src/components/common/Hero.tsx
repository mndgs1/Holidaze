import React from "react";

import Text from "./Text";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { PiHandWavingLight } from "react-icons/pi";

interface HeroProps {
    informational?: boolean;
    statement: string;
    suggestion: string;
    buttonText: string;
    navigateTo: string;
}

const Hero = ({
    informational,
    statement,
    suggestion,
    buttonText,
    navigateTo,
}: HeroProps) => {
    const navigate = useNavigate();

    if (informational) {
        return (
            <div className="flex flex-col items-center">
                <PiHandWavingLight className="mt-20 fill-primary h-16 w-16" />
                <Text primary bold className="mt-14">
                    {statement}
                </Text>
                <Text primary>{suggestion}</Text>
                <Button
                    primary
                    xl
                    className="mt-4"
                    onClick={() => navigate(navigateTo)}>
                    {buttonText}
                </Button>
            </div>
        );
    }
    return null;
};

export default Hero;
