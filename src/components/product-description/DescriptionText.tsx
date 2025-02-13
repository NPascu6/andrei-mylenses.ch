import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import SVGIcon from "./SVGIcon";

const DescriptionText: React.FC = () => {
    const isDarkTheme = useSelector((state: RootState) => state.app.isDarkTheme);
    const textColorClass = isDarkTheme ? "text-gray-300" : "text-gray-700";

    return (
        <div>
            <p className={`${textColorClass} mt-4 font-bold text-xs mb-4`}>
                Enjoy hassle-free delivery across Switzerland with Swiss Post’s reliable service, ensuring your
                selected
                masterpiece arrives safely at your doorstep.</p>
            <div className={"items-center justify-center flex mb-2"}>
                <SVGIcon/>
            </div>
        </div>
    )
        ;
};

export default DescriptionText;
