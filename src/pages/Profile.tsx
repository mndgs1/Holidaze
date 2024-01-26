import React from "react";

// import Avatar from "../components/common/Avatar";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";
import { useUser } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import { useUserActions } from "../stores/useUserStore";

const Profile = () => {
    const user = useUser();
    const navigate = useNavigate();
    const { clearUser } = useUserActions();

    if (user === null) {
        navigate("/login");
        return null;
    }

    const handleLogout = () => {
        clearUser();
        navigate("/");
    };

    return (
        <section className="flex flex-col items-center">
            <form className="flex flex-col items-center mb-2">
                {/* <Avatar /> */}
                <Heading h1 className="mt-4">
                    {user.name}
                </Heading>
                <Text primary bold className="mb-8">
                    {user.email}
                </Text>
                <Input
                    type="checkbox"
                    id="venueManager"
                    label="I want to rent my property"
                />
                <Button primary xl className="mt-4">
                    Save Changes
                </Button>
            </form>
            <Button secondary xl onClick={handleLogout}>
                Logout
            </Button>
        </section>
    );
};

export default Profile;
