import React, { useState, useEffect } from "react";
import classNames from "classnames";

import Icon from "./Icon";
import Text from "./Text";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Property } from "../../constants/interfaces/property";
import { useToken } from "../../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import { getProperties } from "../../api/properties/getProperties";

interface SearchProps {
    className?: string;
}

const Search = ({ className }: SearchProps) => {
    const classes = classNames("flex justify-center relative", className);
    const [search, setSearch] = useState("");
    const [openAccordion, setOpenAccordion] = useState(false);

    const navigate = useNavigate();
    const token = useToken();

    const { data } = useQuery({
        queryKey: ["properties"],
        queryFn: () => {
            if (!token) {
                navigate("/login");
                throw new Error("No token");
            }
            return Promise.resolve(getProperties(token));
        },
        staleTime: 5 * 100000,
    });

    const [filteredData, setFilteredData] = useState(data);

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        const filtered = data?.filter((property: Property) =>
            property.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const handleOpen = () => {
        setOpenAccordion(true);
    };

    const handleClose = () => {
        setOpenAccordion(false);
        setSearch("");
    };

    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest(".accordion-wrapper")) {
            setOpenAccordion(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative accordion-wrapper">
            <div className={classes} onClick={handleOpen}>
                <button>
                    <Icon
                        searchlite
                        md
                        className="absolute top-1/2 right-2 -translate-y-1/2 z-10"
                    />
                </button>
                <input
                    type="text"
                    className="px-4 py-2 pr-10 border border-secondary-100 drop-shadow-lg rounded-2xl sm:w-32 md:w-64 lg:w-72"
                    onChange={handleSearchInput}
                    value={search}
                />
            </div>
            {openAccordion && (
                <div className="absolute bg-white w-full mt-2 flex flex-col gap-1 rounded-xl">
                    {filteredData?.slice(0, 5).map((property: Property) => (
                        <div key={property.id} onClick={handleClose}>
                            <Link to={`/holidaze/properties/${property.id}`}>
                                <Text
                                    primary
                                    lg
                                    className="hover:bg-warning-100 px-2 py-1 rounded-xl">
                                    {property.name}
                                </Text>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Search;
