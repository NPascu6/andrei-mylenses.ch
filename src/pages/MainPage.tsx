


import React, { useEffect, useState } from 'react';
import PhotoGallery from '../components/PhotoGallery';
import artistImage from '../assets/portrait.jpg';

const images = [
    import('../assets/photos/Angel frame.jpg'),
    import('../assets/photos/Angels of Oradea.jpg'),
    import('../assets/photos/Artist on street v1.jpg'),
    import('../assets/photos/Artist on street v2.jpg'),
    import('../assets/photos/Busy winter in Zurich.jpg'),
    import('../assets/photos/Croix domini.jpg'),
    import('../assets/photos/Cubanito Fat Bob.jpg'),
    import('../assets/photos/Fisherman preparing.jpg'),
    import('../assets/photos/Fisherman sillhouette.jpg'),
    import('../assets/photos/Fishing village.jpg'),
    import('../assets/photos/Gulf of Poets.jpg'),
    import('../assets/photos/Halong Bay Rock.jpg'),
    import('../assets/photos/Kid over sunset.jpg'),
    import('../assets/photos/Lonely boat.jpg'),
    import('../assets/photos/Lonely stork.jpg'),
    import('../assets/photos/One legged bird.jpg'),
    import('../assets/photos/Palm tree sunset.jpg'),
    import('../assets/photos/Palm tree sunset2.jpg'),
    import('../assets/photos/Passing life.jpg'),
    import('../assets/photos/Stelvio pass v2.jpg'),
    import('../assets/photos/Stelvio pass.jpg'),
    import('../assets/photos/Stork over houses.jpg'),
    import('../assets/photos/Story family.jpg'),
    import('../assets/photos/Sunset between trees.jpg'),
];

const imageDescriptions = [
    { title: 'Angel frame', description: 'An artistic angelic frame.' },
    { title: 'Angels of Oradea', description: 'Angelic figures in Oradea.' },
    { title: 'Artist on street v1', description: 'Street artist creating art.' },
    { title: 'Artist on street v2', description: 'Another street artist at work.' },
    { title: 'Busy winter in Zurich', description: `'Zurich's bustling winter scene.'` },
    { title: 'Croix domini', description: 'A peaceful cross in nature.' },
    { title: 'Cubanito Fat Bob', description: 'Cubanito Fat Bob motorcycle.' },
    { title: 'Fisherman preparing', description: 'A fisherman getting ready.' },
    { title: 'Fisherman sillhouette', description: 'Silhouetted fisherman.' },
    { title: 'Fishing village', description: 'Charming fishing village.' },
    { title: 'Gulf of Poets', description: 'Scenic Gulf of Poets.' },
    { title: 'Halong Bay Rock', description: 'Iconic rock formations in Halong Bay.' },
    { title: 'Kid over sunset', description: 'A kid enjoying the sunset.' },
    { title: 'Lonely boat', description: 'A solitary boat on the water.' },
    { title: 'Lonely stork', description: 'A lone stork in the wild.' },
    { title: 'One legged bird', description: 'A one-legged bird in nature.' },
    { title: 'Palm tree sunset', description: 'Palm trees during a stunning sunset.' },
    { title: 'Palm tree sunset2', description: 'Another beautiful palm tree sunset.' },
    { title: 'Passing life', description: 'Capturing the passage of life.' },
    { title: 'Stelvio pass v2', description: 'Stunning Stelvio mountain pass.' },
    { title: 'Stelvio pass', description: 'Scenic drive on the Stelvio pass.' },
    { title: 'Stork over houses', description: 'A stork flying over houses.' },
    { title: 'Story family', description: `'A family's heartwarming story.'` },
    { title: 'Sunset between trees', description: 'A tranquil sunset scene.' },
];

const BusinessDescriptionCard = () => {
    return (
        <div className="p-4 border rounded-md shadow-lg m-4">
            <h2 className="text-2xl font-semibold mb-3 text-center">
                Where Art Meets Canvas!
            </h2>
            <p className="">
                We are your one-stop destination for exquisite canvas prints that bring the beauty of photography to life. Our passion is capturing the world's wonders through the lens, and we're excited to share these stunning moments with you. With a wide range of canvas sizes and styles to choose from, you can bring the magic of photography into your home or office.
            </p>
            <p className="mt-3">
                Whether it's a picturesque landscape, a mesmerizing portrait, or a captivating abstract, our canvas prints are carefully crafted to elevate your space. Experience the fusion of art and technology, as we transform each photograph into a timeless piece of decor that will leave a lasting impression. Join us on this artistic journey, and let our canvas prints inspire your world.
            </p>
        </div>
    );
};

const PhotographerDescriptionCard = () => {
    return (
        <div className="p-4 border rounded-md shadow-lg m-4 flex items-center">
            <div>
                <h2 className="text-2xl font-semibold mb-3 text-center">
                    Andrei Pascu - The Creative Genius
                    <div className="m-8 flex justify-center">
                        <img
                            src={artistImage}
                            alt="Artist's Face"
                            className="w-50 h-30 rounded-full"
                        />
                    </div>
                </h2>
                <p>
                    Andrei is the creative genius behind My Lenses. With a deep passion for photography, an artist's eye for detail, and years of experience capturing life's extraordinary moments, Andrei has curated a portfolio that showcases the world's natural beauty.
                </p>
                <p className="mt-3">
                    Their commitment to artistry and their unique approach to photography result in breathtaking compositions that evoke emotion and wonder. As a dedicated photographer, Andrei has transformed their love for photography into a business that allows others to enjoy and share the magic of their artistry. Join us in celebrating the world's beauty through Andrei's lens.
                </p>
            </div>
        </div>
    );
};

const MainPage = () => {
    const [loadedImages, setLoadedImages] = useState<any>([]);

    useEffect(() => {
        if (loadedImages.length > 0) return;

        Promise.all(images)
            .then((loadedImages) => setLoadedImages(loadedImages))
            .catch((error) => console.error('Error loading images', error))
            .finally(() => console.log('Images loaded'));
    }, [loadedImages]);

    return (
        <div>
            {loadedImages.length === 0 && <div>Loading...</div>}
            <div className='flex flex-col md:flex-row'>
                <PhotographerDescriptionCard />
                <BusinessDescriptionCard />
            </div>
            <PhotoGallery images={loadedImages} imageDescriptions={imageDescriptions} />
        </div>
    );
}

export default MainPage;