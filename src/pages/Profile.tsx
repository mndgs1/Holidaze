import React from "react";

import Avatar from "../components/common/Avatar";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";
import { useUser } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const user = useUser();

    const navigate = useNavigate();
    if (user === null) {
        navigate("/login");
        return null;
    }
    return (
        <section className="flex flex-col items-center">
            <form className="flex flex-col items-center">
                <Avatar />
                <Heading h1>{user.name}</Heading>
                <Text primary bold>
                    {user.email}
                </Text>
                <Input
                    type="checkbox"
                    id="vanueManager"
                    label="I want to rent my property"
                />
                <Button primary xl>
                    Save Changes
                </Button>
            </form>
            <Button secondary xl>
                Logout
            </Button>
        </section>
    );
};

export default Profile;
