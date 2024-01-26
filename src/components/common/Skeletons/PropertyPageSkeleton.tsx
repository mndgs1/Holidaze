import React from "react";

const PropertyPageSkeleton = () => {
    return (
        <>
            <section className="pb-3.5 mb-3.5 border-b border-secondary-100 animate-pulse">
                <div className="w-full h-84 mb-3.5 bg-gray-300 rounded-lg"></div>
                <div className="w-2/3 h-6 bg-gray-300 rounded-lg mb-1"></div>
                <div className="w-1/5 h-4 bg-gray-300 rounded-lg mb-1"></div>
                <div className="w-1/4 h-4 bg-gray-300 rounded-lg mb-1"></div>
                <div className="w-1/3 h-4 bg-gray-300 rounded-lg mb-1"></div>
            </section>
            <section className="pb-3.5 mb-3.5 border-b border-secondary-100 animate-pulse">
                <div className="w-1/3 h-6 bg-gray-300 rounded-lg mb-1"></div>
                <div className="w-full h-4 bg-gray-300 rounded-lg mb-1"></div>
                <div className="w-4/6 h-4 bg-gray-300 rounded-lg mb-1"></div>
                <div className="w-5/6 h-4 bg-gray-300 rounded-lg mb-1"></div>
                <div className="w-1/3 h-4 bg-gray-300 rounded-lg mb-1"></div>
            </section>
            <section className="pb-3.5 mb-3.5 border-b border-secondary-100 animate-pulse">
                <div className="w-1/3 h-6 bg-gray-300 rounded-lg mb-1"></div>
                <div className="w-1/4 h-4 bg-gray-300 rounded-lg mb-1"></div>
                <div className="w-2/5 h-4 bg-gray-300 rounded-lg mb-1"></div>
                <div className="w-3/5 h-4 bg-gray-300 rounded-lg mb-1"></div>
            </section>
            {/* <section className="pb-3.5 mb-3.5 border-b border-secondary-100 animate-pulse">
                <div className="w-1/3 h-6 bg-gray-300 rounded-lg mb-1"></div>
                <div className="w-1/4 h-6 bg-gray-300 rounded-lg mb-1"></div>
                <div className="w-1/3 h-4 bg-gray-300 rounded-lg mb-1"></div>
                <div className="w-1/2 h-4 bg-gray-300 rounded-lg mb-1"></div>
                <div className="w-1/3 h-4 bg-gray-300 rounded-lg mb-1"></div>
            </section> */}
            {/* <section className="pb-3.5 mb-3.5 border-b border-secondary-100 animate-pulse">
                <div className="w-1/3 h-6 bg-gray-300 rounded-lg mb-1"></div>
                <div className="flex items-end gap-2">
                    <div className="w-16 h-16 rounded-full bg-gray-300 mb-1"></div>
                    <div>
                        <div className="w-16 h-4 bg-gray-300 rounded-lg mb-1"></div>
                        <div className="w-1/3 h-4 bg-gray-300 rounded-lg mb-1"></div>
                    </div>
                </div>
            </section> */}
        </>
    );
};

export default PropertyPageSkeleton;
