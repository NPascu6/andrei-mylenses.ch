import React from "react";

interface PrintDetailCardProps {
    dimensions: string;
    price: string;
    description: string;
}

const PrintDetailCard: React.FC<PrintDetailCardProps> = ({
                                                             dimensions,
                                                             price,
                                                             description,
                                                         }) => (
    <div className="flex flex-col space-y-2 pt-2 border-2">
        <div className="flex items-center">
            <div className="w-32 font-bold">{dimensions}</div>
            <div className="flex-1 font-bold">Price: {price}</div>
        </div>
        <p className="text-center">{description}</p>

    </div>
);

export default PrintDetailCard;
