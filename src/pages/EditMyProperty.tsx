import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProperty } from "../api/properties/getProperty";
import { useToken } from "../stores/useUserStore";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";
import Button from "../components/common/Button";
import EditMyPropertyForm from "../components/forms/EditMyPropertyForm";
import Icon from "../components/common/Icon";
import { Link as RouterLink } from "react-router-dom";
import { deleteProperty } from "../api/properties/deleteProperty";
import Modal from "../components/common/Modal";
import Seo from "../components/layout/Seo";

const EditMyProperty = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const token = useToken();

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    if (id === undefined) {
        throw new Error("Cant find a property id");
    }

    if (!token) {
        navigate("/login");
        throw new Error("No token");
    }

    const { isLoading, isError, data } = useQuery({
        queryKey: [`myProperties/edit/${id}`],
        queryFn: () => {
            return Promise.resolve(getProperty(token, id));
        },
    });

    if (isError || !data) {
        const handleRefresh = () => {
            window.location.reload();
        };
        return (
            <Text danger>
                There was an error trying to get properties! Try refreshing...
                <Button secondary md onClick={handleRefresh}>
                    Refresh
                </Button>
            </Text>
        );
    }

    const handleDelete = () => {
        deleteProperty(id, token);
        navigate("/holidaze/myProperties");
    };

    return (
        <>
            <Seo title={`Edit ${data.name}`} />
            <Heading h1>Edit Listing</Heading>
            <EditMyPropertyForm property={data} />
            <div>
                <div className="flex justify-center items-center gap-4 border-t border-secondary-100 pt-4 mb-4">
                    <Text secondary>Don't like the changes you made? </Text>
                    <RouterLink to={`/holidaze/myProperties`}>
                        <Button secondary type="button" sm loading={isLoading}>
                            <Icon back md className="mr-1" />
                            Back
                        </Button>
                    </RouterLink>
                </div>
                <div className="flex justify-center gap-4 border-t border-secondary-100 pt-4">
                    <div>
                        <Text secondary>Want to delist your property?</Text>
                        <Text danger sm>
                            Warning: This action is irreversible
                        </Text>
                    </div>
                    <Button
                        danger
                        sm
                        type="button"
                        loading={isLoading}
                        onClick={() => setOpenDeleteModal(!false)}>
                        <Icon deleteIcon md />
                        Delete
                    </Button>
                </div>
            </div>
            <Modal isOpen={openDeleteModal}>
                <div className="p-4">
                    <div className="mb-4">
                        <Heading h2>Your Listing will be lost</Heading>
                        <Text primary>
                            Are you sure you want to delete {data.name}?
                        </Text>
                    </div>
                    <Text danger sm>
                        Warning: This action is irreversible
                    </Text>
                    <div className="flex justify-end gap-4">
                        <Button
                            secondary
                            type="button"
                            sm
                            onClick={() => setOpenDeleteModal(false)}>
                            <Icon back md className="mr-1" />
                            Cancel
                        </Button>
                        <Button
                            danger
                            sm
                            type="button"
                            loading={isLoading}
                            onClick={handleDelete}>
                            <Icon deleteIcon md />
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default EditMyProperty;
