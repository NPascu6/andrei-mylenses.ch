


import React, { useEffect, useState } from 'react';
import PhotoGallery from '../components/PhotoGallery';

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



const MainPage = () => {

    const [loadedImages, setLoadedImages] = useState<any>([]);

    useEffect(() => {
        Promise.all(images)
            .then((loadedImages) => setLoadedImages(loadedImages))
            .catch((error) => console.error('Error loading images', error));
    }, []);

    return (
        <div>
            <PhotoGallery images={loadedImages} />
        </div>
    );
}

export default MainPage;