import React from "react";

import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/styles.css";
import Icon from "./Icon";

// ...

const Gallery = ({
    images,
}: {
    images: string[] | undefined;
    edit?: boolean;
}) => {
    const [open, setOpen] = React.useState(false);
    const [index, setIndex] = React.useState(0);

    if (!images || images.length === 0) {
        images = ["/assets/placeholders/Property-placeholder.jpg"];
    }
    const slides = images.map((url) => ({ src: url }));
    const toggleOpen = (state: boolean) => () => setOpen(state);

    const updateIndex = ({ index: current }: { index: number }) =>
        setIndex(current);

    const handleOpen = (index: number) => {
        if (slides.length < index + 1) {
            index = slides.length - 1;
        }

        updateIndex({ index });
        setOpen(true);
    };

    const ifOneImage = images.length < 2;
    return (
        <>
            <div
                className={`${
                    ifOneImage
                        ? ""
                        : "grid grid-rows-2  grid-cols-3 xl:grid-cols-4"
                } h-[32rem] xl:h-[36rem] gap-2 rounded-xl overflow-hidden hover:cursor-pointer`}>
                <div
                    className={`${
                        ifOneImage
                            ? "h-full"
                            : "col-span-2 row-span-2 xl:col-span-3"
                    } hover:opacity-90 transition`}
                    onClick={() => handleOpen(0)}>
                    <img
                        src={images[0]}
                        alt=""
                        className="object-cover w-full h-full"
                    />
                </div>
                <div onClick={() => handleOpen(1)} className="hover:opacity-90">
                    <img
                        src={
                            images[1]
                                ? images[1]
                                : `/assets/placeholders/property-placeholder.jpg`
                        }
                        alt=""
                        className="object-cover w-full h-full"
                    />
                </div>
                <div
                    className="relative hover:opacity-90"
                    onClick={() => handleOpen(2)}>
                    <img
                        src={
                            images[2]
                                ? images[2]
                                : `/assets/placeholders/property-placeholder.jpg`
                        }
                        alt=""
                        className="object-cover w-full h-full"
                    />
                    {images.length > 3 && (
                        <div className="absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center">
                            <p className="text-2xl text-gray-300">
                                +{images.length - 3}
                            </p>
                            <Icon photo xl className=" fill-gray-300"></Icon>
                        </div>
                    )}
                </div>
            </div>

            <Lightbox
                open={open}
                plugins={[Counter]}
                close={toggleOpen(false)}
                index={index}
                slides={slides}
                on={{ view: updateIndex }}
                animation={{ fade: 0 }}
                controller={{
                    closeOnPullDown: true,
                    closeOnBackdropClick: true,
                }}
                styles={{
                    container: {
                        backdropFilter: "blur(8px)",
                        backgroundColor: "rgba(0, 0, 0, 0.9)",
                        padding: "30px",
                    },
                }}
            />
        </>
    );
};

export default Gallery;
