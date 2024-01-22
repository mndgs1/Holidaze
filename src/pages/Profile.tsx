import React from "react";

import Avatar from "../components/common/Avatar";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";
import { useNavigate } from "react-router-dom";
import { LoggedInUser } from "../constants/interfaces/user";
import { useMutation } from "@tanstack/react-query";
import { updateAvatar, updateProfile } from "../api/profiles/putProfile";
import { useForm } from "react-hook-form";
import { updateSchema } from "../constants/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToken, useUserActions, useUser } from "../stores/useUserStore";

const Profile = () => {
    const user = useUser();
    const token = useToken();
    const navigate = useNavigate();

    const { clearUser } = useUserActions();

    const { register, handleSubmit, setValue, watch, reset } = useForm({
        resolver: yupResolver(updateSchema),
    });

    const profileMutation = useMutation({
        mutationFn: (data: LoggedInUser) => {
            const { venueManager } = data;
            return updateProfile({ token, name: user?.name, venueManager });
        },
        onMutate: (data: LoggedInUser) => {
            const { avatar } = data;
            updateAvatar({ token, name: user?.name, avatar });
        },
        onSuccess: (data: LoggedInUser) => {
            console.log(data);
            reset();
        },
        onError: (error: any) => {},
    });

    const { avatar } = watch();

    function onSubmit(data: any) {
        profileMutation.mutate(data);
    }

    const [modalFormData, setModalFormData] = React.useState("");

    React.useEffect(() => {
        setValue("avatar", modalFormData);
    }, [setValue, modalFormData]);

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
            <div className="flex flex-col items-center">
                <Avatar avatar={avatar} setModalFormData={setModalFormData} />
                <form
                    className="flex flex-col items-center mb-2"
                    onSubmit={handleSubmit(onSubmit)}>
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
                        {...register("venueManager")}
                    />
                    <Button primary xl className="mt-4">
                        Save Changes
                    </Button>
                </form>
            </div>
            <Button secondary xl onClick={handleLogout}>
                Logout
            </Button>
        </section>
    );
};

export default Profile;
