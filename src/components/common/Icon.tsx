import React from "react";

import {
    MdEdit,
    MdOutlineWifi,
    MdOutlinePets,
    MdOutlineRestaurantMenu,
} from "react-icons/md";
import {
    IoArrowBackCircleOutline,
    IoArrowForwardCircleOutline,
} from "react-icons/io5";
import { GoSync, GoSearch } from "react-icons/go";
import { PiHandWavingLight, PiReceiptLight } from "react-icons/pi";
import {
    FaSuitcaseRolling,
    FaSearch,
    FaUserCircle,
    FaFacebook,
    FaInstagram,
    FaYoutube,
} from "react-icons/fa";
import { LuParkingSquare } from "react-icons/lu";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { FaHouse } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
import { FaMapLocationDot, FaXTwitter } from "react-icons/fa6";

import className from "classnames";

interface IconProps {
    edit?: boolean;
    back?: boolean;
    wifi?: boolean;
    pets?: boolean;
    breakfast?: boolean;
    facebook?: boolean;
    instagram?: boolean;
    youtube?: boolean;
    twitter?: boolean;
    refresh?: boolean;
    wave?: boolean;
    luggage?: boolean;
    search?: boolean;
    user?: boolean;
    parking?: boolean;
    plus?: boolean;
    forward?: boolean;
    minus?: boolean;
    money?: boolean;
    className?: string;
    location?: boolean;
    sm?: boolean;
    md?: boolean;
    lg?: boolean;
    xl?: boolean;
    xxl?: boolean;
    home?: boolean;
    searchlite?: boolean;
    receipt?: boolean;
}

const Icon = ({
    edit,
    back,
    wifi,
    pets,
    breakfast,
    refresh,
    wave,
    luggage,
    search,
    searchlite,
    user,
    facebook,
    instagram,
    youtube,
    forward,
    twitter,
    parking,
    plus,
    minus,
    money,
    location,
    sm,
    md,
    lg,
    xl,
    xxl,
    home,
    receipt,
    ...rest
}: IconProps) => {
    const classes = className(rest.className, "", {
        "h-4 w-4": sm,
        "h-6 w-6": md,
        "h-8 w-8": lg,
        "h-10 w-10": xl,
        "h-16 w-16": xxl,
    });

    if (edit) {
        return <MdEdit className={classes} />;
    }
    if (back) {
        return <IoArrowBackCircleOutline className={classes} />;
    }
    if (wifi) {
        return <MdOutlineWifi className={classes} />;
    }
    if (pets) {
        return <MdOutlinePets className={classes} />;
    }
    if (breakfast) {
        return <MdOutlineRestaurantMenu className={classes} />;
    }
    if (refresh) {
        return <GoSync className={classes} />;
    }
    if (wave) {
        return <PiHandWavingLight className={classes} />;
    }
    if (luggage) {
        return <FaSuitcaseRolling className={classes} />;
    }
    if (search) {
        return <FaSearch className={classes} />;
    }
    if (user) {
        return <FaUserCircle className={classes} />;
    }
    if (parking) {
        return <LuParkingSquare className={classes} />;
    }
    if (plus) {
        return <CiCirclePlus className={classes} />;
    }
    if (minus) {
        return <CiCircleMinus className={classes} />;
    }
    if (home) {
        return <FaHouse className={classes} />;
    }
    if (searchlite) {
        return <GoSearch className={classes} />;
    }
    if (money) {
        return <GiReceiveMoney className={classes} />;
    }
    if (location) {
        return <FaMapLocationDot className={classes} />;
    }
    if (facebook) {
        return <FaFacebook className={classes} />;
    }
    if (instagram) {
        return <FaInstagram className={classes} />;
    }
    if (youtube) {
        return <FaYoutube className={classes} />;
    }
    if (twitter) {
        return <FaXTwitter className={classes} />;
    }
    if (forward) {
        return <IoArrowForwardCircleOutline className={classes} />;
    }
    if (receipt) {
        return <PiReceiptLight className={classes} />;
    }
    return null;
};

Icon.propTypes = {
    checkVariationValue: ({
        edit,
        back,
        wifi,
        pets,
        breakfast,
        refresh,
        wave,
        luggage,
        search,
        user,
        parking,
        plus,
        minus,
        home,
        money,
        location,
        facebook,
        instagram,
        youtube,
        twitter,
        forward,
        searchlite,
        receipt,
    }: IconProps) => {
        const count =
            Number(!!edit) +
            Number(!!back) +
            Number(!!wifi) +
            Number(!!pets) +
            Number(!!breakfast) +
            Number(!!refresh) +
            Number(!!wave) +
            Number(!!luggage) +
            Number(!!search) +
            Number(!!user) +
            Number(!!parking) +
            Number(!!plus) +
            Number(!!minus) +
            Number(!!home) +
            Number(!!money) +
            Number(!!location) +
            Number(!!facebook) +
            Number(!!instagram) +
            Number(!!youtube) +
            Number(!!twitter) +
            Number(!!forward) +
            Number(!!receipt) +
            Number(!!searchlite);

        if (count > 1) {
            return new Error(
                "Only one of primary, secondary, success, warning, danger can be true"
            );
        }
    },
};

export default Icon;
