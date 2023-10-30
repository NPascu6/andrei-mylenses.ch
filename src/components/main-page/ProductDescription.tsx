import React from "react";
import Contact from "../common/Contact";
import ImageSlider from "../ImageSlider";
import CanvasExample from "../../assets/canvas/CanvasExample.jpg";
import CanvasExample1 from "../../assets/canvas/CanvasExample1.jpg";
import CanvasExample2 from "../../assets/canvas/CanvasExample2.jpg";
import CanvasExample3 from "../../assets/canvas/CanvasExample3.jpg";

const ProductDescription = () => {
    const images = [
        CanvasExample, CanvasExample1, CanvasExample2, CanvasExample3
    ];

    return (
        <div className="p-4 m-4 mt-1 rounded-md shadow-xl text-center card">
            <h1 className="text-xl font-semibold text-center mb-4">
                Giclee High-Quality Canvas Prints
            </h1>

            <div className="mb-4 text-center">
                <div className="flex flex-col space-y-2 pt-2  border-t-2">
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
            <hr className="border-t-2" />
            <Contact />
            <h2 className="text-xl font-semibold border-t-2 pt-2 border-b-2 pb-2">What Sets My Prints Apart</h2>
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
            <hr className="border-t-2 mt-4" />
            <p className="mt-4 font-bold text-xl mb-4">
                What's more, you can bring the beauty of my work into your home with canvas prints that can be
                delivered anywhere in Switzerland, thanks to Swiss Post's reliable service.
                <span className="flex justify-center m-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="74" height="74" viewBox="0 0 192.756 192.756"><g fillRule="evenodd" clipRule="evenodd"><path fill="#fff" d="M0 0h192.756v192.756H0V0z" /><path fill="#f6d330" d="M8.504 52.419h175.748v87.919H8.504V52.419z" /><path fill="#fff" d="M144.447 94.561l1.905-8.567H19.321l-1.904 8.567h127.03z" /><path fill="#cc2229" d="M153.1 61.419h14.019l-2.25 10.384h10.383l-2.682 12.98h-10.384l-2.077 9.778h-11.421l.691-3.375h7.961l1.99-9.691h10.471l1.299-6.404h-10.385l2.164-10.384h-7.01l-2.164 10.384h-3.547l2.942-13.672z" /><path d="M58.347 72.149H54.54v.087l-5.539 12.028-.086-11.942v-.173h-4.673l-.086.087-5.193 12.028-.432-11.942v-.173H34.81l.086.173 1.039 16.441v.173H40.261v-.086L45.8 76.303l.173 12.46v.173H50.386v-.086l7.874-16.441.087-.26zM63.02 72.149H59.212l-.087.173-3.46 16.441v.173H59.472v-.173l3.461-16.441.087-.173zM81.451 71.889c-2.942 0-6.317 1.298-6.317 5.105 0 2.51 1.817 3.461 3.288 4.327 1.298.692 2.336 1.298 2.336 2.596 0 1.644-1.471 2.336-2.942 2.336s-2.77-.519-3.98-1.125l-.173-.087-.086.26-.779 2.769-.086.173h.173c1.645.692 3.288.952 4.759.952 2.336 0 4.24-.605 5.452-1.817.952-.952 1.471-2.25 1.471-3.808 0-2.683-1.904-3.807-3.461-4.759-1.211-.692-2.164-1.298-2.164-2.336 0-.347.173-.692.433-.952.519-.52 1.471-.692 2.163-.692 1.039 0 2.336.26 3.288.779l.26.086v-.173l.779-2.683.086-.173-.173-.087c-1.212-.431-2.683-.691-4.327-.691zM74.096 72.668l-.173-.087c-1.211-.433-2.596-.692-4.327-.692-2.855 0-6.23 1.298-6.23 5.105 0 2.51 1.73 3.461 3.288 4.327 1.212.692 2.25 1.298 2.25 2.596 0 1.644-1.471 2.336-2.942 2.336-1.384 0-2.769-.519-3.894-1.125l-.173-.087-.087.26-.865 2.769v.173h.086c1.731.692 3.289.952 4.759.952 2.423 0 4.327-.605 5.538-1.817.952-.952 1.385-2.25 1.385-3.808 0-2.683-1.904-3.807-3.461-4.759-1.125-.692-2.163-1.298-2.163-2.336 0-.347.173-.692.432-.952.52-.52 1.472-.692 2.164-.692 1.125 0 2.336.26 3.375.779l.173.086.086-.173.779-2.683v-.172zM29.791 71.889c-2.855 0-6.317 1.298-6.317 5.105 0 2.51 1.817 3.461 3.375 4.327 1.211.692 2.25 1.298 2.25 2.596 0 1.644-1.472 2.336-2.942 2.336-1.471 0-2.769-.519-3.98-1.125l-.173-.087v.26l-.866 2.769-.086.173h.173c1.645.692 3.289.952 4.759.952 2.423 0 4.327-.605 5.452-1.817.952-.952 1.471-2.25 1.471-3.808 0-2.683-1.904-3.807-3.461-4.759-1.125-.692-2.163-1.298-2.163-2.336 0-.347.173-.692.433-.952.519-.52 1.471-.692 2.163-.692 1.125 0 2.337.26 3.375.779l.173.086v-.173l.779-2.683.086-.173-.173-.087c-1.213-.431-2.684-.691-4.328-.691zM96.508 72.149h-2.941v.173l-3.461 16.441v.087l-.086.086H93.653l.086-.173s1.125-5.019 1.125-5.365h1.817c2.163 0 4.241-.779 5.538-2.077 1.039-1.039 1.645-2.51 1.645-4.154 0-1.298-.434-2.423-1.211-3.202-1.473-1.47-4.155-1.816-6.145-1.816zm.086 2.942h.953c.691 0 1.385.259 1.902.692.434.433.693 1.038.693 1.73 0 1.904-1.904 2.942-3.635 2.942h-.952l1.039-5.364zM118.746 73.793c-1.211-1.211-2.941-1.904-5.191-1.904-2.855 0-4.932.952-6.836 3.115-1.73 1.99-2.682 4.586-2.682 7.269 0 2.077.691 3.894 1.99 5.192 1.211 1.212 2.768 1.817 4.672 1.817 3.029 0 5.451-.952 7.096-2.855a10.88 10.88 0 0 0 2.855-7.355c0-2.25-.691-4.068-1.904-5.279zm-7.613 12.547c-.865 0-1.645-.259-2.25-.865-.693-.692-1.039-1.73-1.039-3.029 0-2.336.951-4.759 2.336-6.144.953-.952 2.078-1.471 3.289-1.471.951 0 1.73.346 2.336.865.691.692 1.039 1.731 1.039 3.029 0 3.115-1.99 7.615-5.711 7.615zM133.111 72.668c-1.211-.52-2.682-.779-4.326-.779-2.943 0-6.318 1.385-6.318 5.192 0 2.509 1.732 3.461 3.289 4.327 1.211.692 2.336 1.298 2.336 2.509 0 1.644-1.471 2.423-2.941 2.423s-2.855-.605-3.98-1.125l-.174-.086v.086l-.086.087-.865 2.855v.172h.086c1.73.605 3.289.952 4.76.952 2.422 0 4.326-.605 5.539-1.817.951-.952 1.383-2.25 1.383-3.894 0-2.683-1.902-3.807-3.461-4.673-1.125-.692-2.076-1.298-2.076-2.336 0-.346.086-.692.346-1.038.691-.606 1.904-.692 2.25-.692 1.039 0 2.25.346 3.289.865l.172.087v-.087l.086-.086.779-2.769v-.172h-.088v-.001zM147.217 72.149h-12.981l-.086.173-.52 2.509v.173l-.086.087h4.672l-2.941 13.672v.087l-.088.086h3.809v-.173s2.855-13.066 3.027-13.672h4.586v-.087l.088-.086.52-2.596v-.173z" /></g></svg>
                </span>
            </p>
            <hr className="border-t-2 m-4" />
            <p className="text-xl  font-bold  mb-4 ">
                Also you can discover the world through the lens of a professional photographer. I offer high-quality digital copies of photos for sale online.
                <span className="flex justify-center m-3 pointer">
                    <a href="https://www.flickr.com/photos/andrei_ro/" rel="noreferrer" target="_blank" className="flex justify-center"><img className="  w-1/3" alt='flikr' src="https://logowik.com/content/uploads/images/330_flickr.jpg" /></a>
                </span>
            </p>
            <hr className="border-t-2" />
            <Contact />
        </div>
    );
};

export default ProductDescription;
