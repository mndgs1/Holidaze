import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ ...rest }) => {
    return (
        <Link {...rest} to={"/"}>
            <svg
                width="100"
                height="33"
                viewBox="0 0 100 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M15.6985 8.424V24H10.8145V17.928H6.17248V24H1.28848V8.424H6.17248V14.034H10.8145V8.424H15.6985ZM23.7919 24.154C22.5452 24.154 21.4232 23.8973 20.4259 23.384C19.4286 22.8707 18.6439 22.1373 18.0719 21.184C17.5146 20.216 17.2359 19.0867 17.2359 17.796C17.2359 16.5053 17.5146 15.3833 18.0719 14.43C18.6439 13.462 19.4286 12.7213 20.4259 12.208C21.4232 11.6947 22.5452 11.438 23.7919 11.438C25.0386 11.438 26.1606 11.6947 27.1579 12.208C28.1552 12.7213 28.9326 13.462 29.4899 14.43C30.0619 15.3833 30.3479 16.5053 30.3479 17.796C30.3479 19.0867 30.0619 20.216 29.4899 21.184C28.9326 22.1373 28.1552 22.8707 27.1579 23.384C26.1606 23.8973 25.0386 24.154 23.7919 24.154ZM23.7919 19.93C24.2466 19.93 24.6279 19.754 24.9359 19.402C25.2439 19.0353 25.3979 18.5 25.3979 17.796C25.3979 17.092 25.2439 16.564 24.9359 16.212C24.6279 15.8453 24.2466 15.662 23.7919 15.662C23.3372 15.662 22.9559 15.8453 22.6479 16.212C22.3399 16.564 22.1859 17.092 22.1859 17.796C22.1859 18.5 22.3326 19.0353 22.6259 19.402C22.9339 19.754 23.3226 19.93 23.7919 19.93ZM36.7662 7.72V24H31.8822V7.72H36.7662ZM41.4361 10.602C40.5854 10.602 39.9034 10.3747 39.3901 9.92C38.8767 9.46533 38.6201 8.89333 38.6201 8.204C38.6201 7.5 38.8767 6.92067 39.3901 6.466C39.9034 5.99667 40.5854 5.762 41.4361 5.762C42.2721 5.762 42.9467 5.99667 43.4601 6.466C43.9734 6.92067 44.2301 7.5 44.2301 8.204C44.2301 8.89333 43.9734 9.46533 43.4601 9.92C42.9467 10.3747 42.2721 10.602 41.4361 10.602ZM43.8561 11.592V24H38.9721V11.592H43.8561ZM45.4019 17.796C45.4019 16.4907 45.6219 15.3613 46.0619 14.408C46.5166 13.44 47.1326 12.7067 47.9099 12.208C48.6872 11.6947 49.5599 11.438 50.5279 11.438C51.3346 11.438 52.0239 11.6067 52.5959 11.944C53.1826 12.2667 53.6299 12.714 53.9379 13.286V7.72H58.8219V24H53.9379V22.306C53.6299 22.878 53.1826 23.3327 52.5959 23.67C52.0239 23.9927 51.3346 24.154 50.5279 24.154C49.5599 24.154 48.6872 23.9047 47.9099 23.406C47.1326 22.8927 46.5166 22.1593 46.0619 21.206C45.6219 20.238 45.4019 19.1013 45.4019 17.796ZM53.9599 17.796C53.9599 17.136 53.7912 16.6227 53.4539 16.256C53.1166 15.8893 52.6839 15.706 52.1559 15.706C51.6279 15.706 51.1952 15.8893 50.8579 16.256C50.5206 16.6227 50.3519 17.136 50.3519 17.796C50.3519 18.456 50.5206 18.9693 50.8579 19.336C51.1952 19.7027 51.6279 19.886 52.1559 19.886C52.6839 19.886 53.1166 19.7027 53.4539 19.336C53.7912 18.9693 53.9599 18.456 53.9599 17.796Z"
                    fill="#2D333A"
                />
                <path
                    d="M60.355 17.796C60.355 16.4907 60.575 15.3613 61.015 14.408C61.4697 13.44 62.0857 12.7067 62.863 12.208C63.6404 11.6947 64.513 11.438 65.481 11.438C66.2877 11.438 66.9844 11.6067 67.571 11.944C68.1577 12.2667 68.605 12.714 68.913 13.286V11.592H73.775V24H68.913V22.306C68.605 22.878 68.1577 23.3327 67.571 23.67C66.9844 23.9927 66.2877 24.154 65.481 24.154C64.513 24.154 63.6404 23.9047 62.863 23.406C62.0857 22.8927 61.4697 22.1593 61.015 21.206C60.575 20.238 60.355 19.1013 60.355 17.796ZM68.913 17.796C68.913 17.136 68.7444 16.6227 68.407 16.256C68.0697 15.8893 67.637 15.706 67.109 15.706C66.581 15.706 66.1484 15.8893 65.811 16.256C65.4737 16.6227 65.305 17.136 65.305 17.796C65.305 18.456 65.4737 18.9693 65.811 19.336C66.1484 19.7027 66.581 19.886 67.109 19.886C67.637 19.886 68.0697 19.7027 68.407 19.336C68.7444 18.9693 68.913 18.456 68.913 17.796ZM80.6542 19.952H85.8242V24H75.3082V20.172L80.0382 15.64H75.3742V11.592H85.6042V15.42L80.6542 19.952ZM99.3669 17.686C99.3669 18.0233 99.3449 18.346 99.3009 18.654H91.4469C91.5202 19.7247 91.9675 20.26 92.7889 20.26C93.3169 20.26 93.6982 20.018 93.9329 19.534H99.1029C98.9269 20.414 98.5529 21.206 97.9809 21.91C97.4236 22.5993 96.7122 23.1493 95.8469 23.56C94.9962 23.956 94.0575 24.154 93.0309 24.154C91.7989 24.154 90.6989 23.8973 89.7309 23.384C88.7775 22.8707 88.0295 22.1373 87.4869 21.184C86.9589 20.216 86.6949 19.0867 86.6949 17.796C86.6949 16.5053 86.9589 15.3833 87.4869 14.43C88.0295 13.462 88.7775 12.7213 89.7309 12.208C90.6989 11.6947 91.7989 11.438 93.0309 11.438C94.2629 11.438 95.3555 11.6947 96.3089 12.208C97.2769 12.7067 98.0249 13.4253 98.5529 14.364C99.0955 15.3027 99.3669 16.41 99.3669 17.686ZM94.4169 16.52C94.4169 16.1093 94.2849 15.8013 94.0209 15.596C93.7569 15.376 93.4269 15.266 93.0309 15.266C92.1655 15.266 91.6595 15.684 91.5129 16.52H94.4169Z"
                    fill="#10A37F"
                />
            </svg>
        </Link>
    );
};

export default Logo;
