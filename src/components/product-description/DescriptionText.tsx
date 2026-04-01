import React from "react";
import SVGIcon from "./SVGIcon";

const DescriptionText: React.FC = () => {
    return (
        <div>
            <p className="text-muted-token mt-4 mb-4 text-xs font-bold">
                Enjoy hassle-free delivery across Switzerland with Swiss Post’s reliable service, ensuring your
                selected
                masterpiece arrives safely at your doorstep.</p>
            <div className={"items-center justify-center flex mb-2"}>
                <SVGIcon/>
            </div>
        </div>
    );
};

export default DescriptionText;
