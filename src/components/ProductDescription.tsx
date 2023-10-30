import React from "react";
import Contact from "./common/Contact";
import ImageSlider from "./ImageSlider";
import CanvasExample from "../assets/canvas/CanvasExample.jpg";
import CanvasExample1 from "../assets/canvas/CanvasExample1.jpg";
import CanvasExample2 from "../assets/canvas/CanvasExample2.jpg";
import CanvasExample3 from "../assets/canvas/CanvasExample3.jpg";

const ProductDescription = () => {
    const images = [
        CanvasExample, CanvasExample1, CanvasExample2, CanvasExample3
    ];

    return (
        <div className="p-4 m-4 mt-1 rounded-md shadow-xl text-center card">
            <h1 className="text-3xl font-semibold text-center mb-4">
                Giclee High-Quality Canvas Prints
            </h1>

            <div className="mb-4 text-center">
                <h2 className="text-xl font-semibold mb-2">Available Sizes</h2>
                <div className="flex flex-col space-y-2">
                    <div className="flex items-center">
                        <div className="w-32 font-bold">90x60 cm</div>
                        <div className="flex-1 font-bold">Price: 60 CHF</div>
                    </div>
                    <p className="text-center">
                        Immerse yourself in the grandeur of these larger-than-life prints,
                        measuring 90x60 centimeters. Perfect for creating a statement piece in
                        your living room, bedroom, or office, these prints exude
                        sophistication and visual impact. The larger canvas allows you to
                        appreciate every intricate detail, making it an ideal choice for art
                        enthusiasts.
                    </p>
                </div>
                <div className="flex flex-col space-y-2 mt-4 pt-2 border-t-2">
                    <div className="flex items-center">
                        <div className="w-32 font-bold">50x30 cm</div>
                        <div className="flex-1 font-bold">Price: 40 CHF</div>
                    </div>
                    <p className="text-center">
                        If you prefer a more compact yet equally captivating piece, our 50x30
                        cm prints are the perfect choice. These prints are versatile and fit
                        well in smaller spaces, making them suitable for your hallway,
                        kitchen, or any nook that could use a touch of artistry.
                    </p>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <ImageSlider images={images} />
            </div>
            <h2 className="text-xl font-semibold border-t-2 pt-2">What Sets My Prints Apart</h2>
            <ul className="list-disc ml-6 mt-2 text-left">
                <li>
                    <strong>Giclee Printing:</strong> Our prints are produced using the
                    Giclee printing technique, renowned for its exceptional color
                    accuracy, sharpness, and longevity. Each print is a true reproduction
                    of the original photograph, capturing every nuance and detail.
                </li>
                <li>
                    <strong>Canvas Quality:</strong> We use high-quality canvas material to
                    give your prints a genuine and artistic feel. The canvas texture adds
                    depth and dimension to the image, enhancing its overall appeal.
                </li>
                <li>
                    <strong>Vibrant Colors:</strong> The prints are known for their vivid
                    and true-to-life colors. Every photograph pops with brilliance, making
                    it feel like the moment is right in front of you.
                </li>
                <li>
                    <strong>Handcrafted with Precision:</strong> Each print is
                    meticulously crafted, inspected, and handled with utmost care to
                    ensure that you receive a product of the highest quality.
                </li>
            </ul>

            <p className="mt-4 border-t-2 pt-2">
                <strong>Select Your Size:</strong> Choose between the 90x60 cm and 50x30 cm
                sizes to suit your space and style preferences.
            </p>

            <p className="mt-4">
                Giclee High-Quality Canvas Prints are the perfect way to
                infuse your surroundings with the beauty of nature and the art of
                photography. Whether you're a seasoned art collector or simply looking to
                enhance your home decor, our prints will leave a lasting impression and
                inspire endless conversations.
            </p>

            <p className="mt-4">
                Embrace the opportunity to own a piece of art that captures the essence of
                unique moments. Elevate your space with Andrei Pascu's photography today!
            </p>
            <p className="mt-3">
                Whether it's a picturesque landscape, a mesmerizing portrait, or a captivating abstract, our canvas prints are carefully crafted to elevate your space. Experience the fusion of art and technology, as we transform each photograph into a timeless piece of decor that will leave a lasting impression. Join us on this artistic journey, and let our canvas prints inspire your world.
            </p>
            <Contact />
        </div>
    );
};

export default ProductDescription;
