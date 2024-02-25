import * as React from "react";

import Lightbox from "yet-another-react-lightbox";
import Inline from "yet-another-react-lightbox/plugins/inline";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/styles.css";

interface CarouselProps {
    images?: string[];
    carouselControls?: boolean | "false";
    className?: string;
}

export default function Carousel({
    images,
    carouselControls,
    ...rest
}: CarouselProps) {
    const [open, setOpen] = React.useState(false);
    const [index, setIndex] = React.useState(0);

    if (!images || images.length === 0) {
        images = ["/assets/placeholders/Property-placeholder.jpg"];
    }

    const slides = images.map((url) => ({ src: url }));
    const toggleOpen = (state: boolean) => () => setOpen(state);

    const updateIndex = ({ index: current }: { index: number }) =>
        setIndex(current);

    return (
        <div className={rest.className}>
            <Lightbox
                index={index}
                slides={slides}
                plugins={[Inline, Counter]}
                on={{
                    view: updateIndex,
                    click: toggleOpen(true),
                }}
                carousel={{
                    padding: 0,
                    spacing: 0,
                    imageFit: "cover",
                    finite: true,
                }}
                inline={{
                    style: {
                        width: "100%",
                        maxWidth: "900px",
                        aspectRatio: "3 / 2",
                        margin: "0 auto",
                    },
                }}
                styles={{
                    container: { height: "320px", borderRadius: "10px" },
                    root: { height: "320px" },
                }}
                counter={{
                    container: { style: { top: "unset", bottom: 0 } },
                }}
            />

            <Lightbox
                open={open}
                plugins={[Counter]}
                close={toggleOpen(false)}
                index={index}
                slides={slides}
                carousel={{
                    finite: true,
                }}
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
        </div>
    );
}
