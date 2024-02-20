import React from "react";

import Avatar from "../components/common/Avatar";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";

import { useNavigate } from "react-router-dom";
import { LoggedInUser } from "../constants/interfaces/user";
import { useMutation } from "@tanstack/react-query";
import { updateProfile, updateAvatar } from "../api/profiles/putProfile";
import { useForm } from "react-hook-form";
import { updateSchema } from "../constants/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToken, useUserActions, useUser } from "../stores/useUserStore";
import ServerMessage from "../components/common/ServerMessage";

const Profile = () => {
    const loggedInUser = useUser();
    const token = useToken();
    const navigate = useNavigate();

    const { clearUser, updateStoreAvatar, updateStoreVenueManager } =
        useUserActions();

    const { register, handleSubmit, setValue, watch, reset } = useForm({
        resolver: yupResolver(updateSchema),
    });

    const { mutate, isError, error, isPending, isSuccess } = useMutation({
        mutationFn: (data: LoggedInUser) => {
            const { venueManager } = data;
            return updateProfile({
                token,
                name: loggedInUser?.name,
                venueManager,
            });
        },
        onMutate: (data: LoggedInUser) => {
            const { avatar } = data;
            console.log(data);
            updateAvatar({ token, name: loggedInUser?.name, avatar });
            if (data.avatar) {
                updateStoreAvatar(data.avatar);
            }
        },
        onSuccess: (data: LoggedInUser) => {
            updateStoreVenueManager(data.venueManager);
            reset();
        },
    });

    const { avatar } = watch();

    function onSubmit(data: any) {
        mutate(data);
    }

    const [modalFormData, setModalFormData] = React.useState("");

    React.useEffect(() => {
        setValue("avatar", modalFormData);
    }, [setValue, modalFormData]);

    if (!loggedInUser) {
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
                <Avatar
                    avatar={avatar}
                    setModalFormData={setModalFormData}
                    user={loggedInUser}
                />
                <form
                    className="flex flex-col items-center mb-2"
                    onSubmit={handleSubmit(onSubmit)}>
                    <Heading h1 className="mt-4">
                        {loggedInUser.name}
                    </Heading>
                    <Text primary bold className="mb-8">
                        {loggedInUser.email}
                    </Text>
                    <Input
                        type="checkbox"
                        id="venueManager"
                        label="I am a property manager"
                        defaultChecked={loggedInUser.venueManager}
                        {...register("venueManager")}
                    />

                    <Button primary xl className="mt-4" loading={isPending}>
                        Save Changes
                    </Button>
                </form>
            </div>
            <Button secondary xl onClick={handleLogout}>
                Logout
            </Button>
            <div className="mt-4">
                {isSuccess && (
                    <ServerMessage success>Profile updated!</ServerMessage>
                )}
                {isError && (
                    <ServerMessage danger>{error?.message}</ServerMessage>
                )}
            </div>
        </section>
    );
};

export default Profile;
