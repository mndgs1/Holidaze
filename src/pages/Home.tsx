import { Link } from "react-router-dom";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";
import Button from "../components/common/Button";

export default function Home() {
    return (
        <>
            <div className="h-screen flex flex-col">
                <div className="h-screen w-full absolute top-0 right-0">
                    <img
                        className="object-cover h-full w-full"
                        src="/assets/Images/portrait/jason-briscoe--T0La6F_WrE-unsplash.jpg"
                        alt="beach house"
                    />
                </div>
                <div className="h-screen w-full absolute top-0 right-0 backdrop-blur-sm"></div>
                <div className="z-10 py-10 mt-56 flex flex-col items-end">
                    <Heading h1 className="mb-2">
                        Not sure where to go?
                    </Heading>
                    <Text
                        primary
                        className="text-lg text-semibold mb-4 text-black">
                        Find your next holiday stay with us.
                    </Text>
                    <div className="flex items-center justify-center gap-x-4">
                        <Link to="/login">
                            <Button danger md>
                                Login
                            </Button>
                        </Link>
                        <Link to={"/register"}>
                            <Button
                                md
                                className="text-sm font-semibold leading-6 border-black text-black">
                                Register <span aria-hidden="true">→</span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <section className="mt-8"></section>
        </>
    );
}
