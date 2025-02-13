import React from "react";
import PrintDetailCard from "./PrintDetailCard";

const PrintDetails: React.FC = () => (
    <div className="mb-4 text-center md:grid md:grid-cols-2 md:gap-6 lg:gap-8">
        <PrintDetailCard
            dimensions="90x60 cm"
            price="60 CHF"
            description={`Immerse yourself in the grandeur of these larger-than-life prints,
        measuring 90x60 centimeters. Perfect for creating a statement piece in your living
        room, bedroom, or office, these prints exude sophistication and visual impact.
        The larger canvas allows you to appreciate every intricate detail, making it an
        ideal choice for art enthusiasts.`}
        />
        <PrintDetailCard
            dimensions="50x30 cm"
            price="40 CHF"
            description={`If you prefer a more compact yet equally captivating piece, our 50x30 cm
        prints are the perfect choice. These prints are versatile and fit well in smaller
        spaces, making them suitable for your hallway, kitchen, or any nook that could use
        a touch of artistry.`}
        />
    </div>
);

export default PrintDetails;
