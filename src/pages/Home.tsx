import Heading from "../components/common/Heading";
import Text from "../components/common/Text";
import Button from "../components/common/Button";
import Icon from "../components/common/Icon";
import Link from "../components/common/Link";
import { Link as RouterLink } from "react-router-dom";

export default function Home() {
    return (
        <>
            <div className="h-screen flex flex-col justify-center">
                <div className="h-screen w-full absolute top-0 right-0 drop-shadow-lg ">
                    <img
                        className="w-full h-full drop-shadow-lg object-cover"
                        src="/assets/Images/durian-bullet-JCMQo028t3Q-unsplash.jpg"
                        alt="Durian property"
                    />
                </div>
                <div className="z-10 py-10 mb-32 flex flex-col items-center">
                    <Heading h1 className="mb-2">
                        Not sure where to go?
                    </Heading>
                    <Text className="text-lg text-semibold mb-4 ">
                        Find your next holiday stay with us.
                    </Text>
                    <div className="flex items-center justify-center gap-x-4">
                        <RouterLink to="/login">
                            <Button primary md>
                                Login
                            </Button>
                        </RouterLink>
                        <RouterLink to={"/register"}>
                            <Button secondary md>
                                Register
                            </Button>
                        </RouterLink>
                    </div>
                </div>
            </div>
            <section className="mt-8">
                <Heading h2>Why choose us?</Heading>
                <div className="flex flex-col sm:flex-row justify-between mt-4 gap-4">
                    <div className="flex flex-col text-center items-center basis-1/3 rounded-full p-8 border drop-shadow-lg">
                        <Icon money xxl className="fill-secondary" />
                        <Text primary bold xl className="mt-2">
                            Low fees
                        </Text>
                        <Text secondary lg>
                            We have the lowest fees in the market
                        </Text>
                    </div>
                    <div className="flex flex-col text-center items-center basis-1/3 rounded-full p-8 border drop-shadow-lg">
                        <Icon location xxl className="fill-secondary" />
                        <Text primary bold xl className="mt-2">
                            Great Locations
                        </Text>
                        <Text secondary lg>
                            We have a large variety of properties with prime
                            locations
                        </Text>
                    </div>
                    <div className="flex flex-col text-center items-center basis-1/3 rounded-full p-8 border drop-shadow-lg">
                        <Icon home xxl className="fill-secondary" />
                        <Text primary bold xl className="mt-2">
                            Properties
                        </Text>
                        <Text secondary lg>
                            Many properties to choose from
                        </Text>
                    </div>
                </div>
            </section>
            <section className="mt-8">
                <Heading h2>About Project</Heading>
                <Text primary>
                    Holidaze is a fictional project created by me Mindaugas
                    Bankauskas for my final exam in Noroff Front-end development
                    course. The project is using Noroff API and is built with
                    React, Typescript & Tailwind.{" "}
                    <span>
                        <Link to="/about">{"Read more >"}</Link>
                    </span>
                </Text>
            </section>
        </>
    );
}
