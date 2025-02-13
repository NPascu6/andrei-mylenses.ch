// config/images.ts

// Use Vite’s import.meta.glob with eager loading so that each module is imported immediately.
// This returns an object whose keys are the file paths and whose values are the module objects.
export const images = Object.values(
    import.meta.glob('../assets/photos/*.jpg', {eager: true})
) as { default: string }[];

export const canvaseImages = Object.values(
    import.meta.glob('../assets/canvas/*.jpg', {eager: true})
) as { default: string }[];

export const imageDescriptions = [
    {
        title: 'Angel frame',
        description: 'Representing a beautiful sunset I witnessed on the beautiful island of Phu Quoc, Vietnam.'
    },
    {
        title: 'Angels of Oradea',
        description: 'Decorations for Christmas in Oradea, Romania, taken during a midnight photoshooting in the city, with no people, just colors and shadows.'
    },
    {
        title: 'Artist on street v1',
        description: 'An artist working its craft on the streets of Hoi Ann, Vietnam. A beautiful shot of the focus and concentration of the artist, working uninterupted, while laying on the street.'
    },
    {
        title: 'Artist on street v2',
        description: 'An artist working its craft on the streets of Hoi Ann, Vietnam. A beautiful shot of the focus and concentration of the artist, working uninterupted, while laying on the street, with people passing by in the foreground.'
    },
    {
        title: 'Busy winter in Zurich',
        description: 'People are in a hurry in front of Tram 13, during Christmas shopping spree.'
    },
    {
        title: 'Croix domini',
        description: 'Caption take on the top of Croce Domini Pass, around 1900m above sea level, in the Lombardy area during a motorcycle trip. The Pass has large curves with beautiful and peaceful views of the Alps.'
    },
    {
        title: 'Cubanito Fat Bob',
        description: 'A mixture of an old Cantonal House and the rough lines of a Harley Davidson, model Fat Bob, with the nickname ``Don Diego``, taken on top of Stelvio Pass.'
    },
    {
        title: 'Fisherman preparing',
        description: 'Vietnamese fisherman cleaning his fishing net after the overnight fishing captures have been taken in. Photo is taken in a small floating fishing village in Halong Bay.'
    },
    {title: 'Fisherman sillhouette', description: 'Silhouette of a fisherman in Vietnam.'},
    {
        title: 'Fishing village',
        description: 'Vietnamesse woman from a floating fishing village in Halong Bay, watching us pass by with the boat. She was emptiying the basket full of fish.'
    },
    {
        title: 'Gulf of Poets',
        description: 'Immersing yourself in the charm of the Ligurian coast also means immersing yourself in the enchanting charm of the Gulf of Poets (Golfo dei Poeti). A beautiful view of the gulf that inspired poets and writers through history.'
    },
    {
        title: 'Halong Bay Rock',
        description: 'Huge rock formation, which makes an interesting experience to visit in Vietnam. Halong Bay is famous for the unique formation of nearly 2,000 thousand limestone islands and islets on the emerald ocean.'
    },
    {
        title: 'Kid over sunset',
        description: 'Phu Quoc sunset from the beach, with a passing by kid in the foreground. Beautiful colors are playing among the tree branches, in a peaceful setting of calm ocean.'
    },
    {
        title: 'Lonely boat',
        description: 'Stormy and cloudy morning on the beach next to the Imperial city of Hue, Vietnam, where I found the beauty of this old fishing boat making the trip to the beach worthwhile.'
    },
    {
        title: 'Lonely stork',
        description: 'The silhouette of a lonely stork, over blue skies, during an evening sunset. Storks are special birds, as every year they return to the same breeding nest. In this case, the photo was taken in Uznach, Switzerland, a small village that hosts more than 100 storks every year.'
    },
    {
        title: 'One legged bird',
        description: 'Cold winter day next to the Limmat, with the caption of a seagull. Standing on one leg is typical resting behavior for birds. In cold weather, they’ll tuck one leg up under their feathers, then switch legs after a while to let the "standing" leg get warm.'
    },
    {
        title: 'Palm tree sunset',
        description: 'Sunset in Phu Quoc island, one of the peaceful and hidden treasures of Vietnam. Long and sandy beaches, with towering palm trees can be seen throug-out the island.'
    },
    {
        title: 'Palm tree sunset2',
        description: 'Sunset in Phu Quoc island, one of the peaceful and hidden treasures of Vietnam. Long and sandy beaches, with towering palm trees can be seen throug-out the island.'
    },
    {
        title: 'Passing life',
        description: 'Caption of an old man smokes peacefully in the background, while in the foreground a busy road is crossed by hundreds of scooters. Life in Vietnam unfolds in front of your eyes without stopping, and yet something you find a caption that brings together continous movement with the beauty of the stilness.'
    },
    {
        title: 'Stelvio pass v2',
        description: 'The Stelvio Pass is a spectacular depression in the Rhaetian Alps, at a dizzying 2,758 metres above sea level. It is famous for being the highest car pass in Italy and the second highest in Europe. It once connected Milan and Vienna, the two great cities of the Habsburg Empire. Today, however, it joins the Valtellina to the Val Venosta, along a road that features 88 hairpin bends, which made it an amazing experience for a motorcycle ride.'
    },
    {
        title: 'Stelvio pass',
        description: 'The Stelvio Pass is a spectacular depression in the Rhaetian Alps, at a dizzying 2,758 metres above sea level. It is famous for being the highest car pass in Italy and the second highest in Europe. It once connected Milan and Vienna, the two great cities of the Habsburg Empire. Today, however, it joins the Valtellina to the Val Venosta, along a road that features 88 hairpin bends, which made it an amazing experience for a motorcycle ride.'
    },
    {
        title: 'Stork over houses',
        description: 'Storks are special birds, as every year they return to the same breeding nest. In this case, the photo was taken in Uznach, Switzerland, a small village that hosts more than 100 storks every year.'
    },
    {
        title: 'Story family',
        description: 'Stork families like to build their nests on top of houses, as it protects them predators as well as give them vantage points. Storks are special birds, as every year they return to the same breeding nest. In this case, the photo was taken in Uznach, Switzerland, a small village that hosts more than 100 storks every year.'
    },
    {
        title: 'Sunset between trees',
        description: 'Beautiful sunset on the Ligurian coast. Caption was taken after a long day at the beach, before climbing the hill over the Gulf of Poets.'
    },
    {
        title: 'Sunset in Halong bay',
        description: 'Amazing colorful sunset surprised during my trip in Halong Bay. The bay is famous for the unique formation of nearly 2,000 thousand limestone islands and islets on the emerald ocean.'
    },
    {
        title: 'Sunset trees',
        description: 'Beach sunset captured among 2 trees on the coast of Phu Quoc. The island is famous for its long and sandy beaches, with towering palm trees.'
    },
    {
        title: 'Vineyard traby',
        description: 'A dear picture of mine, showing my good old friend, Traby, waiting in the vineyard for summer. The beautiful contrast of the leaves, the color of the car, as well as the memories it brings back, makes this caption a special one.'
    },
    {
        title: 'Winter over Zurich',
        description: 'Zurich during winter shows one of the few days where the city is covered with snow. A beautiful sky unfolds in this caption taken from one of the hills in Zurich.'
    },
];
