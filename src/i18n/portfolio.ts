import {messages} from './messages';
import {
    additionalCmsPhotoTranslations,
    additionalExactLocationTranslations,
    additionalGeneratedTitleReplacements,
    additionalLocationSegmentTranslations,
} from './portfolioAdditionalTranslations';
import type {AppLocale} from './types';
import type {
    LocalizedPortfolioPhoto,
    PortfolioCategory,
    PortfolioPhoto,
} from '../types/portfolio';

interface CmsPhotoTranslation {
    title: string;
    description: string;
    location?: string;
    availability?: string;
    edition?: string;
    priceFrom?: string;
    roomMood?: string;
}

const portfolioCategories: PortfolioCategory[] = [
    'Travel',
    'Nature',
    'Street',
    'Wildlife',
    'Canvas',
    'Instagram',
    'Portrait',
    'Architecture',
];

const cmsPhotoTranslations: Record<Exclude<AppLocale, 'en'>, Record<string, CmsPhotoTranslation>> = {
    de: {
        'Angel Frame': {
            title: 'Engelsrahmen',
            description:
                'Eine Szene eines wunderschoenen Sonnenuntergangs, den ich auf der schoenen Insel Phu Quoc in Vietnam erlebt habe.',
        },
        'Angels of Oradea': {
            title: 'Engel von Oradea',
            description:
                'Weihnachtsdekorationen in Oradea, Rumaenien, aufgenommen waehrend eines Mitternachtsshootings in der Stadt - ohne Menschen, nur Farben und Schatten.',
            roomMood:
                'Eingangshallen, urbane Interiors und Raeume, die einen kraeftigeren abendlichen Stadtakzent tragen koennen.',
        },
        'Busy Winter in Zurich': {
            title: 'Geschaeftiger Winter in Zuerich',
            description:
                'Menschen eilen vor Tram 13 vorbei, mitten im weihnachtlichen Einkaufsrummel.',
            roomMood:
                'Moderne urbane Interiors, Bueros und Sammler, die ein schweizerisch geerdetes Stadtbild suchen.',
        },
        'Croce Domini': {
            title: 'Croce Domini',
            description:
                'Aufgenommen auf dem Gipfel des Croce-Domini-Passes, rund 1900 Meter ueber dem Meeresspiegel in der Lombardei, waehrend einer Motorradtour. Der Pass bietet weite Kurven und schoene, friedliche Ausblicke auf die Alpen.',
        },
        'Cubanito Fat Bob': {
            title: 'Cubanito Fat Bob',
            description:
                'Eine Mischung aus einem alten kantonalen Haus und den rauen Linien einer Harley Davidson Fat Bob mit dem Spitznamen "Don Diego", aufgenommen auf dem Stilfserjoch.',
        },
        'Fisherman Preparing': {
            title: 'Fischer bei der Vorbereitung',
            description:
                'Ein vietnamesischer Fischer reinigt sein Netz, nachdem die Faenge der Nacht eingeholt wurden. Das Foto entstand in einem kleinen schwimmenden Fischerdorf in der Halong-Bucht.',
        },
        'Fisherman Silhouette': {
            title: 'Silhouette eines Fischers',
            description: 'Silhouette eines Fischers in Vietnam.',
        },
        'Fishing Village': {
            title: 'Fischerdorf',
            description:
                'Eine vietnamesische Frau aus einem schwimmenden Fischerdorf in der Halong-Bucht beobachtet unser Vorbeifahren mit dem Boot. Sie leerte gerade einen Korb voller Fische aus.',
        },
        'Gulf of Poets': {
            title: 'Golf der Poeten',
            description:
                'Eine Kuestenstudie aus Ligurien, die sich in groesserem Format besonders schoen oeffnet, wo Atmosphaere und Distanz atmen koennen.',
            roomMood:
                'Ruhige Interiors, hellere Wohnraeume und Zimmer, die einen horizontgetragenen Sinn fuer Ruhe brauchen.',
        },
        'Halong Bay Rock': {
            title: 'Fels in der Halong-Bucht',
            description:
                'Eine gewaltige Felsformation, die in Vietnam ein eindrucksvolles Erlebnis bietet. Die Halong-Bucht ist beruehmt fuer die einzigartige Formation von fast 2.000 Kalksteininseln und -felsen auf smaragdgruener See.',
        },
        'Kid Over Sunset': {
            title: 'Kind vor dem Sonnenuntergang',
            description:
                'Sonnenuntergang auf Phu Quoc, vom Strand aus gesehen, mit einem vorbeilaufenden Kind im Vordergrund. Schoene Farben spielen zwischen den Zweigen in einer friedlichen Szene ueber ruhigem Wasser.',
        },
        'Lonely Boat': {
            title: 'Einsames Boot',
            description:
                'Ein stuermischer und wolkiger Morgen am Strand nahe der Kaiserstadt Hue in Vietnam, wo ich die Schoenheit dieses alten Fischerbootes entdeckte.',
            roomMood:
                'Gesammelte Wohnraeume, Arbeitszimmer und Raeume, die zu einer weicheren Reiseerzaehlung passen.',
        },
        'Lonely Stork': {
            title: 'Einsamer Storch',
            description:
                'Die Silhouette eines einsamen Storches vor blauem Abendhimmel. Stoerche sind besondere Voegel, weil sie jedes Jahr in dasselbe Brutnest zurueckkehren. Dieses Foto entstand in Uznach in der Schweiz, einem kleinen Ort mit mehr als 100 Stoerchen pro Jahr.',
        },
        'Aerial City Block': {
            title: 'Aerialer Stadtblock',
            description:
                'Eine vertikale New-York-Studie mit starkem architektonischem Rhythmus und tonalischer Tiefe, besonders wirkungsvoll als Statement-Leinwand.',
            roomMood:
                'Designorientierte Interiors, Bueros und hoehere Waende mit architektonischem Rhythmus.',
        },
        'One-Legged Bird': {
            title: 'Einbeiniger Vogel',
            description:
                'Ein kalter Wintertag an der Limmat, festgehalten mit einer Moewe. Auf einem Bein zu stehen ist ein typisches Ruheverhalten bei Voegeln: Bei Kaelte ziehen sie ein Bein ins Gefieder und wechseln spaeter.',
        },
        'Palm Tree Sunset II': {
            title: 'Palmen-Sonnenuntergang II',
            description:
                'Sonnenuntergang auf der Insel Phu Quoc, einem friedlichen und versteckten Schatz Vietnams. Lange Sandstraende und hohe Palmen praegen die Insel.',
        },
        'Palm Tree Sunset': {
            title: 'Palmen-Sonnenuntergang',
            description:
                'Sonnenuntergang auf der Insel Phu Quoc, einem friedlichen und versteckten Schatz Vietnams. Lange Sandstraende und hohe Palmen praegen die Insel.',
            roomMood:
                'Ruhige Schlafzimmer, entspannte Hospitality-Raeume und waermere Interiors mit Abendtinten.',
        },
        'Passing Life': {
            title: 'Vorbeiziehendes Leben',
            description:
                'Im Hintergrund raucht ein alter Mann ruhig, waehrend im Vordergrund eine hektische Strasse von Hunderten Rollern ueberquert wird. Das Leben in Vietnam entfaltet sich ohne Pause, und doch entstehen Momente stiller Schoenheit.',
        },
        'Stelvio Pass II': {
            title: 'Stilfserjoch II',
            description:
                'Das Stilfserjoch ist ein spektakulaerer Einschnitt in den Raetischen Alpen auf schwindelerregenden 2.758 Metern Hoehe. Es ist beruehmt als hoechster Strassenpass Italiens und zweit hoechster Europas. Heute verbindet es das Veltlin mit dem Vinschgau entlang einer Strasse mit 88 Kehren - ein unvergessliches Erlebnis auf dem Motorrad.',
        },
        'Stelvio Pass': {
            title: 'Stilfserjoch',
            description:
                'Das Stilfserjoch ist ein spektakulaerer Einschnitt in den Raetischen Alpen auf schwindelerregenden 2.758 Metern Hoehe. Es ist beruehmt als hoechster Strassenpass Italiens und zweit hoechster Europas. Heute verbindet es das Veltlin mit dem Vinschgau entlang einer Strasse mit 88 Kehren - ein unvergessliches Erlebnis auf dem Motorrad.',
        },
        'Stork Family': {
            title: 'Storchenfamilie',
            description:
                'Stoerche bauen ihre Nester gerne auf Hausdaechern, weil sie dort Schutz vor Raubtieren und einen guten Ausblick haben. Dieses Foto entstand in Uznach in der Schweiz, einem kleinen Ort mit mehr als 100 Stoerchen pro Jahr.',
        },
        'Stork Over Houses': {
            title: 'Storch ueber den Haeusern',
            description:
                'Stoerche sind besondere Voegel, weil sie jedes Jahr in dasselbe Brutnest zurueckkehren. Dieses Foto entstand in Uznach in der Schweiz, einem kleinen Ort mit mehr als 100 Stoerchen pro Jahr.',
        },
        'Street Artist I': {
            title: 'Strassenkuenstler I',
            description:
                'Ein Kuenstler bei der Arbeit auf den Strassen von Hoi An in Vietnam. Eine schoene Aufnahme von Fokus und Konzentration, waehrend er unbeirrt auf der Strasse arbeitet.',
        },
        'Street Artist II': {
            title: 'Strassenkuenstler II',
            description:
                'Ein Kuenstler bei der Arbeit auf den Strassen von Hoi An in Vietnam. Eine schoene Aufnahme von Fokus und Konzentration, waehrend er auf der Strasse arbeitet und Menschen im Vordergrund vorbeiziehen.',
        },
        'Sunset Between Trees': {
            title: 'Sonnenuntergang zwischen Baeumen',
            description:
                'Ein wunderschoener Sonnenuntergang an der ligurischen Kueste. Die Aufnahme entstand nach einem langen Strandtag, kurz bevor ich den Huegel ueber dem Golf der Poeten hinaufstieg.',
        },
    },
    fr: {
        'Angel Frame': {
            title: "Cadre d'ange",
            description:
                "Une scene de coucher de soleil que j'ai vecue sur la belle ile de Phu Quoc, au Vietnam.",
        },
        'Angels of Oradea': {
            title: "Les anges d'Oradea",
            description:
                "Decorations de Noel a Oradea, en Roumanie, photographies lors d'une seance de nuit en ville, sans personnes, seulement des couleurs et des ombres.",
            roomMood:
                "Halls d'entree, interieurs urbains et pieces capables d'accueillir un accent de ville en soiree plus marque.",
        },
        'Busy Winter in Zurich': {
            title: 'Hiver anime a Zurich',
            description:
                'Des passants presses devant le tram 13, en pleine periode de courses de Noel.',
            roomMood:
                'Interieurs urbains contemporains, bureaux et collectionneurs en recherche d’une piece de ville ancree en Suisse.',
        },
        'Croce Domini': {
            title: 'Croce Domini',
            description:
                'Photographie prise au sommet du col de Croce Domini, a environ 1900 metres d’altitude, en Lombardie, lors d’un voyage a moto. Le col offre de grandes courbes et de superbes vues paisibles sur les Alpes.',
        },
        'Cubanito Fat Bob': {
            title: 'Cubanito Fat Bob',
            description:
                'Un melange entre une ancienne maison cantonale et les lignes brutes d’une Harley Davidson Fat Bob surnommee "Don Diego", photographiee au sommet du Stelvio.',
        },
        'Fisherman Preparing': {
            title: 'Pecheur en preparation',
            description:
                'Un pecheur vietnamien nettoie son filet apres les prises de la nuit. La photo a ete realisee dans un petit village flottant de la baie d’Halong.',
        },
        'Fisherman Silhouette': {
            title: 'Silhouette de pecheur',
            description: "Silhouette d'un pecheur au Vietnam.",
        },
        'Fishing Village': {
            title: 'Village de peche',
            description:
                'Une femme vietnamienne d’un village flottant de la baie d’Halong nous regarde passer en bateau. Elle etait en train de vider un panier plein de poissons.',
        },
        'Gulf of Poets': {
            title: 'Golfe des Poetes',
            description:
                'Une etude cotiere de Ligurie qui s’ouvre magnifiquement en grand format, la ou l’atmosphere et la distance peuvent respirer.',
            roomMood:
                'Interieurs calmes, espaces de vie plus lumineux et pieces qui ont besoin d’un horizon apaisant.',
        },
        'Halong Bay Rock': {
            title: "Rocher de la baie d'Halong",
            description:
                'Une enorme formation rocheuse qui offre une experience saisissante au Vietnam. La baie d’Halong est celebre pour ses presque 2.000 iles et ilots calcaires sur une mer emeraude.',
        },
        'Kid Over Sunset': {
            title: 'Enfant devant le coucher de soleil',
            description:
                'Coucher de soleil a Phu Quoc, vu depuis la plage, avec un enfant passant au premier plan. De belles couleurs jouent entre les branches dans un decor paisible au-dessus d’une mer calme.',
        },
        'Lonely Boat': {
            title: 'Bateau solitaire',
            description:
                'Un matin venteux et charge de nuages sur la plage voisine de la cite imperiale de Hue, au Vietnam, ou la beaute de ce vieux bateau de peche rendait le detour indispensable.',
            roomMood:
                'Espaces de vie composes, bureaux et pieces qui se pretent a un recit de voyage plus doux.',
        },
        'Lonely Stork': {
            title: 'Cigogne solitaire',
            description:
                'La silhouette d’une cigogne solitaire dans le ciel bleu du soir. Les cigognes sont des oiseaux particuliers car elles reviennent chaque annee au meme nid. Cette photo a ete prise a Uznach, en Suisse, un petit village qui accueille plus de 100 cigognes chaque annee.',
        },
        'Aerial City Block': {
            title: 'Bloc urbain aerien',
            description:
                'Une etude verticale de New York avec un fort rythme architectural et une grande profondeur tonale, particulierement efficace en toile statement.',
            roomMood:
                'Interieurs guides par le design, bureaux et murs plus hauts avec un rythme architectural.',
        },
        'One-Legged Bird': {
            title: 'Oiseau sur une patte',
            description:
                'Une froide journee d’hiver au bord de la Limmat, avec une mouette captee dans le cadre. Se tenir sur une patte est un comportement de repos classique chez les oiseaux, surtout par temps froid.',
        },
        'Palm Tree Sunset II': {
            title: 'Coucher de soleil aux palmiers II',
            description:
                'Coucher de soleil sur l’ile de Phu Quoc, l’un des tresors paisibles et caches du Vietnam. De longues plages de sable et de grands palmiers traversent toute l’ile.',
        },
        'Palm Tree Sunset': {
            title: 'Coucher de soleil aux palmiers',
            description:
                'Coucher de soleil sur l’ile de Phu Quoc, l’un des tresors paisibles et caches du Vietnam. De longues plages de sable et de grands palmiers traversent toute l’ile.',
            roomMood:
                'Chambres calmes, espaces hospitality apaises et interieurs plus chaleureux aux teintes de coucher de soleil.',
        },
        'Passing Life': {
            title: 'Vie qui passe',
            description:
                'Un vieil homme fume paisiblement a l’arriere-plan tandis qu’au premier plan une route animee est traversee par des centaines de scooters. Au Vietnam, la vie se deploie sans s’arreter, tout en laissant surgir des instants de calme.',
        },
        'Stelvio Pass II': {
            title: 'Col du Stelvio II',
            description:
                'Le col du Stelvio est une depression spectaculaire des Alpes rhetiques, a 2.758 metres d’altitude. C’est le plus haut col routier d’Italie et le deuxieme plus haut d’Europe. Aujourd’hui, il relie la Valteline au Val Venosta par une route de 88 lacets - une experience memorable a moto.',
        },
        'Stelvio Pass': {
            title: 'Col du Stelvio',
            description:
                'Le col du Stelvio est une depression spectaculaire des Alpes rhetiques, a 2.758 metres d’altitude. C’est le plus haut col routier d’Italie et le deuxieme plus haut d’Europe. Aujourd’hui, il relie la Valteline au Val Venosta par une route de 88 lacets - une experience memorable a moto.',
        },
        'Stork Family': {
            title: 'Famille de cigognes',
            description:
                'Les cigognes aiment construire leurs nids sur les toits pour se proteger des predateurs et beneficier de points de vue eleves. Cette photo a ete prise a Uznach, en Suisse, un petit village qui accueille plus de 100 cigognes chaque annee.',
        },
        'Stork Over Houses': {
            title: 'Cigogne au-dessus des maisons',
            description:
                'Les cigognes sont des oiseaux particuliers car elles reviennent chaque annee au meme nid. Cette photo a ete prise a Uznach, en Suisse, un petit village qui accueille plus de 100 cigognes chaque annee.',
        },
        'Street Artist I': {
            title: 'Artiste de rue I',
            description:
                'Un artiste au travail dans les rues de Hoi An, au Vietnam. Une belle image de concentration et de focus, alors qu’il travaille sans interruption dans la rue.',
        },
        'Street Artist II': {
            title: 'Artiste de rue II',
            description:
                'Un artiste au travail dans les rues de Hoi An, au Vietnam. Une belle image de concentration, avec des passants qui traversent le premier plan.',
        },
        'Sunset Between Trees': {
            title: 'Coucher de soleil entre les arbres',
            description:
                'Magnifique coucher de soleil sur la cote ligurienne. La photo a ete prise apres une longue journee a la plage, avant de remonter la colline au-dessus du Golfe des Poetes.',
        },
    },
    ...additionalCmsPhotoTranslations,
} as const;

const locationSegmentTranslations = {
    de: {
        Switzerland: 'Schweiz',
        Romania: 'Rumänien',
        Italy: 'Italien',
        Turkey: 'Türkei',
        Europe: 'Europa',
        USA: 'USA',
        Old: 'Alt',
        Town: 'Stadt',
        Coastline: 'Küstenlinie',
        Market: 'Markt',
        Street: 'Straßen',
        Liguria: 'Ligurien',
    },
    fr: {
        Switzerland: 'Suisse',
        Romania: 'Roumanie',
        Italy: 'Italie',
        Turkey: 'Turquie',
        Europe: 'Europe',
        USA: 'Etats-Unis',
        Coastline: 'Cote',
        Liguria: 'Ligurie',
    },
    ...additionalLocationSegmentTranslations,
} as const;

const exactLocationTranslations = {
    de: {
        'Old Town': 'Altstadt',
        'Street Market': 'Straßenmarkt',
        'Ligurian Coast, Italy': 'Ligurische Küste, Italien',
        'Zurich, Switzerland': 'Zürich, Schweiz',
        'Romania': 'Rumänien',
        'Switzerland': 'Schweiz',
        'Italy': 'Italien',
        'Europe': 'Europa',
    },
    fr: {
        'Old Town': 'Vieille ville',
        'Street Market': 'Marche de rue',
        'Ligurian Coast, Italy': 'Cote ligurienne, Italie',
        'Zurich, Switzerland': 'Zurich, Suisse',
        'Romania': 'Roumanie',
        'Switzerland': 'Suisse',
        'Italy': 'Italie',
        'Europe': 'Europe',
    },
    ...additionalExactLocationTranslations,
} as const;

const generatedTitleReplacements = {
    de: [
        ['October City Diary', 'Oktober-Stadttagebuch'],
        ['Window Light Portrait', 'Fensterlicht-Porträt'],
        ['Low Key Portrait', 'Low-Key-Porträt'],
        ['Color Portrait', 'Farbporträt'],
        ['Border Collie Portrait', 'Border-Collie-Porträt'],
        ['Mask Shadow Portrait', 'Maskenschatten-Porträt'],
        ['Painted Face Portrait', 'Bemaltes-Gesicht-Porträt'],
        ['Blue Tit On Branch', 'Blaumeise auf einem Ast'],
        ['Bird In Flight', 'Vogel im Flug'],
        ['Kite In Flight', 'Milan im Flug'],
        ['Butterfly On Leaf', 'Schmetterling auf einem Blatt'],
        ['Leaf On Moss Closeup', 'Blatt auf Moos Nahaufnahme'],
        ['Fallen Leaf On Moss', 'Gefallenes Blatt auf Moos'],
        ['Blue Hour', 'Blaue Stunde'],
        ['At Dusk', 'in der Dämmerung'],
        ['At Sea', 'auf See'],
        ['At Shore', 'am Ufer'],
        ['At Market', 'auf dem Markt'],
        ['On Branch', 'auf einem Ast'],
        ['On Ridge', 'auf dem Grat'],
        ['On Leaf', 'auf einem Blatt'],
        ['On Moss', 'auf Moos'],
        ['By Canal', 'am Kanal'],
        ['By Sea', 'am Meer'],
        ['Under Arch', 'unter dem Bogen'],
        ['Through Leaves', 'durch Blätter'],
        ['Through Glasses', 'durch Gläser'],
        ['Through Hedge', 'durch die Hecke'],
        ['And Fountain', 'und Brunnen'],
        ['And Plant', 'und Pflanze'],
        ['And Vines', 'und Reben'],
        ['And One World Trade', 'und One World Trade'],
        ['Balloon Sunrise', 'Ballon-Sonnenaufgang'],
        ['Balloon', 'Ballon'],
        ['Sunrise', 'Sonnenaufgang'],
        ['Sunset', 'Sonnenuntergang'],
        ['Silhouettes', 'Silhouetten'],
        ['Silhouette', 'Silhouette'],
        ['Glow', 'Leuchten'],
        ['Craftsmen', 'Handwerker'],
        ['Snowy Country Road', 'Verschneite Landstraße'],
        ['Manor', 'Herrenhaus'],
        ['Fountain', 'Brunnen'],
        ['Collage', 'Collage'],
        ['Moody Cafe Interior', 'Stimmungsvolles Café-Interieur'],
        ['Lantern Street', 'Laternenstraße'],
        ['Riverfront', 'Uferpromenade'],
        ['Lakeside Observers', 'Beobachter am See'],
        ['Shuttered Window', 'Fensterläden'],
        ['Matterhorn Observatory Dusk', 'Matterhorn-Sternwarte in der Dämmerung'],
        ['Hilltop Chapel', 'Kapelle auf dem Hügel'],
        ['Alpine Valley Overlook', 'Blick über das Alptal'],
        ['Village Dance', 'Dorftanz'],
        ['Village Band', 'Dorfkapelle'],
        ['Children At Market', 'Kinder auf dem Markt'],
        ['Horse Cart In Rain', 'Pferdewagen im Regen'],
        ['Riverside Tower', 'Turm am Fluss'],
        ['Reflections Through Glasses', 'Reflexionen durch Gläser'],
        ['Street View', 'Straßenansicht'],
        ['Spiral Staircase', 'Wendeltreppe'],
        ['Palace Garden', 'Palastgarten'],
        ['Gothic Window', 'Gotisches Fenster'],
        ['Sunset Viewpoint', 'Aussichtspunkt zum Sonnenuntergang'],
        ['Clocktower Courtyard', 'Uhrturm-Innenhof'],
        ['Lone Tree Sunset', 'Sonnenuntergang mit einsamem Baum'],
        ['Zurich Station Platforms', 'Bahnsteige am Zürcher Bahnhof'],
        ['Ginger Cat Meadow', 'Roter Kater auf der Wiese'],
        ['Ginger Cat', 'Roter Kater'],
        ['Lagoon Boats At Dusk', 'Lagunenboote in der Dämmerung'],
        ['Ridge Silhouette', 'Grat-Silhouette'],
        ['Hilltop Bench', 'Bank auf dem Hügel'],
        ['Riders At Dusk', 'Reiter in der Dämmerung'],
        ['Market Stall Display', 'Marktstand-Auslage'],
        ['Poster Wall Corner', 'Plakatwand an der Ecke'],
        ['Modernist Office Block', 'Modernistischer Büroblock'],
        ['Hanging Glass Reflections', 'Hängende Glasreflexionen'],
        ['Red Car By Canal', 'Rotes Auto am Kanal'],
        ['Lakeside Villa', 'Villa am See'],
        ['Green Shutters Shadow', 'Grüne Fensterläden im Schatten'],
        ['Ivy Stairway', 'Efeu-Treppe'],
        ['Clifftop Village', 'Dorf auf der Klippe'],
        ['Fishing Boats Bay', 'Bucht mit Fischerbooten'],
        ['Harbor Under Arch', 'Hafen unter dem Bogen'],
        ['Canal Promenade', 'Promenade am Kanal'],
        ['Harbor Overlook', 'Blick über den Hafen'],
        ['Marina Sunset', 'Sonnenuntergang in der Marina'],
        ['Waterfront Facades', 'Fassaden an der Uferfront'],
        ['Alley Chapel', 'Kapelle in der Gasse'],
        ['Hilltown Rooftops', 'Dächer der Bergstadt'],
        ['Red Heart Wall', 'Mauer mit rotem Herz'],
        ['Cactus Coastline', 'Küstenlinie mit Kakteen'],
        ['Hilltop Monastery Dusk', 'Kloster auf dem Hügel in der Dämmerung'],
        ['Manhattan Bridge Frame', 'Rahmung der Manhattan Bridge'],
        ['Sea Arch Sunset', 'Sonnenuntergang am Meeresbogen'],
        ['Ruined Arch Sunstar', 'Sonnenstern durch Ruinenbogen'],
        ['Coastline Study', 'Küstenstudie'],
        ['Open Sea Sunrise', 'Sonnenaufgang auf offenem Meer'],
        ['Cafe And Plant Diptych', 'Diptychon aus Café und Pflanze'],
        ['Stone Staircase', 'Steintreppe'],
        ['Street Level Taxis', 'Taxis auf Straßenniveau'],
        ['Atlas Sculpture', 'Atlas-Skulptur'],
        ['Cliff Swimmer', 'Schwimmer an der Klippe'],
        ['Fire Escape Facade', 'Feuertreppen-Fassade'],
        ['Glass Reflections', 'Glasreflexionen'],
        ['Lower Manhattan Spire', 'Spitze in Lower Manhattan'],
        ['Central Park Frame', 'Rahmung im Central Park'],
        ['East River Bridge', 'Brücke am East River'],
        ['Midtown Avenue', 'Midtown-Avenue'],
        ['Quiet Conversation', 'Ruhiges Gespräch'],
        ['Gothic Facade', 'Gotische Fassade'],
        ['Rooftop Grid', 'Dachraster'],
        ['Museum Minimal', 'Minimalistisches Museum'],
        ['Graffiti And Shadow', 'Graffiti und Schatten'],
        ['Elderly Couple', 'Älteres Paar'],
        ['Street Art Crossing', 'Street-Art-Übergang'],
        ['Hot Dog Stand', 'Hot-Dog-Stand'],
        ['Dancing Couple', 'Tanzendes Paar'],
        ['Street Banner', 'Straßenbanner'],
        ['Belgian Fries Sign', 'Schild für belgische Pommes'],
        ['Superman Walker', 'Superman-Passant'],
        ['Hudson Skyline Prelude', 'Vorspiel zur Hudson-Skyline'],
        ['Hudson Skyline', 'Hudson-Skyline'],
        ['Street Canyon', 'Straßenschlucht'],
        ['Flag And One World Trade', 'Flagge und One World Trade'],
        ['Night Construction', 'Baustelle bei Nacht'],
        ['City Cyclists', 'Radfahrer der Stadt'],
        ['Arched Passage', 'Gewölbter Durchgang'],
        ['Rainy Street Corner', 'Regnerische Straßenecke'],
        ['Park Through Trees', 'Park durch die Bäume'],
        ['Red Bollard', 'Roter Poller'],
        ['Lakeside Buoys', 'Bojen am See'],
        ['Misty Pasture', 'Neblige Weide'],
        ['Canal Tower', 'Turm am Kanal'],
        ['Cathedral Nave', 'Mittelschiff der Kathedrale'],
        ['Stained Glass', 'Buntglas'],
        ['Flower Window', 'Blumenfenster'],
        ['Flower Bridge', 'Blumenbrücke'],
        ['Bicycle Line', 'Fahrradlinie'],
        ['Fortress Wall', 'Festungsmauer'],
        ['Riverside Break', 'Pause am Fluss'],
        ['Square Musician', 'Musiker auf dem Platz'],
        ['Young Guard BW', 'Junge Garde SW'],
        ['Festival Embrace', 'Festival-Umarmung'],
        ['Dance Circle', 'Tanzkreis'],
        ['Aerial City Block', 'Aerialer Stadtblock'],
        ['Bicycle Geometry', 'Fahrrad-Geometrie'],
        ['Lakeshore Solitude', 'Einsamkeit am Seeufer'],
        ['Sun Through Leaves', 'Sonne durch Blätter'],
        ['Angler At Sea', 'Angler auf See'],
        ['Golf Through Hedge', 'Golf durch die Hecke'],
        ['Quiet Shoreline', 'Ruhige Uferlinie'],
        ['Foam Line Beach', 'Schaumlinie am Strand'],
        ['Vintage Van Promenade', 'Promenade mit Vintage-Van'],
        ['Coastal Moments Collage', 'Collage mit Küstenmomenten'],
        ['Brooklyn Bridge Tower', 'Turm der Brooklyn Bridge'],
        ['Manhattan Canyon', 'Manhattan-Schlucht'],
        ['Empire State View', 'Blick auf das Empire State Building'],
        ['Skyline Silhouette', 'Skyline-Silhouette'],
        ['Skyline Monochrome', 'Skyline in Monochrom'],
        ['Three Figures Breakwater', 'Drei Figuren am Wellenbrecher'],
        ['Family Under Columns', 'Familie unter Säulen'],
        ['Horses On Ridge', 'Pferde auf dem Grat'],
        ['Garden Through Leaves', 'Garten durch Blätter'],
        ['Ferry In Fog', 'Fähre im Nebel'],
        ['Red Sail Minimal', 'Rotes Segel minimal'],
        ['Pier Silhouette', 'Pier-Silhouette'],
        ['Rocky Tidepools', 'Felsige Gezeitenbecken'],
        ['Heron Portrait', 'Reiher-Porträt'],
        ['Child At Shore', 'Kind am Ufer'],
        ['Fisherman Returning', 'Zurückkehrender Fischer'],
        ['Doorway Play', 'Spiel im Türrahmen'],
        ['Cloister Courtyard', 'Klosterinnenhof'],
        ['Arched Corridor', 'Gewölbter Korridor'],
        ['Florence Rainy Alley', 'Regnerische Gasse in Florenz'],
        ['Pastel Window', 'Pastellfarbenes Fenster'],
        ['Beach Sunset Silhouette', 'Strand-Sonnenuntergang-Silhouette'],
        ['Fisherwoman At Market', 'Fischerin auf dem Markt'],
        ['Cappadocia', 'Kappadokien'],
        ['Nuremberg', 'Nürnberg'],
        ['Observatory', 'Sternwarte'],
        ['Gallery', 'Galerie'],
        ['Museum', 'Museum'],
        ['Portrait', 'Porträt'],
        ['Bridge', 'Brücke'],
        ['Street', 'Straße'],
        ['Window', 'Fenster'],
        ['City', 'Stadt'],
        ['Diary', 'Tagebuch'],
    ],
    fr: [
        ['October City Diary', "Journal urbain d'octobre"],
        ['Window Light Portrait', 'Portrait a la lumiere de fenetre'],
        ['Low Key Portrait', 'Portrait low key'],
        ['Color Portrait', 'Portrait en couleur'],
        ['Border Collie Portrait', 'Portrait de border collie'],
        ['Mask Shadow Portrait', "Portrait masque et ombre"],
        ['Painted Face Portrait', 'Portrait au visage peint'],
        ['Blue Tit On Branch', 'Mesange bleue sur une branche'],
        ['Bird In Flight', 'Oiseau en vol'],
        ['Kite In Flight', 'Milan en vol'],
        ['Butterfly On Leaf', 'Papillon sur une feuille'],
        ['Leaf On Moss Closeup', 'Feuille sur mousse en gros plan'],
        ['Fallen Leaf On Moss', 'Feuille tombee sur la mousse'],
        ['Blue Hour', 'Heure bleue'],
        ['At Dusk', 'au crepuscule'],
        ['At Sea', 'en mer'],
        ['At Shore', 'au rivage'],
        ['At Market', 'au marche'],
        ['On Branch', 'sur une branche'],
        ['On Ridge', 'sur la crete'],
        ['On Leaf', 'sur une feuille'],
        ['On Moss', 'sur la mousse'],
        ['By Canal', 'au bord du canal'],
        ['By Sea', 'au bord de la mer'],
        ['Under Arch', "sous l'arche"],
        ['Through Leaves', 'a travers les feuilles'],
        ['Through Glasses', 'a travers les verres'],
        ['Through Hedge', 'a travers la haie'],
        ['And Fountain', 'et fontaine'],
        ['And Plant', 'et plante'],
        ['And Vines', 'et vigne'],
        ['And One World Trade', 'et One World Trade'],
        ['Balloon Sunrise', 'lever de soleil en ballon'],
        ['Balloon', 'ballon'],
        ['Sunrise', 'lever de soleil'],
        ['Sunset', 'coucher de soleil'],
        ['Silhouettes', 'silhouettes'],
        ['Silhouette', 'silhouette'],
        ['Glow', 'lueur'],
        ['Craftsmen', 'artisans'],
        ['Snowy Country Road', 'route de campagne enneigee'],
        ['Manor', 'manoir'],
        ['Fountain', 'fontaine'],
        ['Collage', 'collage'],
        ['Moody Cafe Interior', 'interieur de cafe feutre'],
        ['Lantern Street', 'rue aux lanternes'],
        ['Riverfront', 'rive'],
        ['Lakeside Observers', 'observateurs au bord du lac'],
        ['Shuttered Window', 'fenetre a volets'],
        ['Matterhorn Observatory Dusk', 'observatoire du Cervin au crepuscule'],
        ['Hilltop Chapel', 'chapelle sur la colline'],
        ['Alpine Valley Overlook', 'vue sur la vallee alpine'],
        ['Village Dance', 'danse du village'],
        ['Village Band', 'fanfare du village'],
        ['Children At Market', 'enfants au marche'],
        ['Horse Cart In Rain', 'charrette sous la pluie'],
        ['Riverside Tower', 'tour au bord de la riviere'],
        ['Reflections Through Glasses', 'reflets a travers les verres'],
        ['Street View', 'vue de rue'],
        ['Spiral Staircase', 'escalier en spirale'],
        ['Palace Garden', 'jardin du palais'],
        ['Gothic Window', 'fenetre gothique'],
        ['Sunset Viewpoint', 'point de vue au coucher de soleil'],
        ['Clocktower Courtyard', 'cour du clocher'],
        ['Lone Tree Sunset', 'coucher de soleil avec arbre solitaire'],
        ['Zurich Station Platforms', 'quais de la gare de Zurich'],
        ['Ginger Cat Meadow', 'chat roux dans la prairie'],
        ['Ginger Cat', 'chat roux'],
        ['Lagoon Boats At Dusk', 'bateaux de lagune au crepuscule'],
        ['Ridge Silhouette', 'silhouette de crete'],
        ['Hilltop Bench', 'banc sur la colline'],
        ['Riders At Dusk', 'cavaliers au crepuscule'],
        ['Market Stall Display', "etal d'un marche"],
        ['Poster Wall Corner', "coin de mur d'affiches"],
        ['Modernist Office Block', 'bloc de bureaux moderniste'],
        ['Hanging Glass Reflections', 'reflets de verre suspendu'],
        ['Red Car By Canal', 'voiture rouge au bord du canal'],
        ['Lakeside Villa', 'villa au bord du lac'],
        ['Green Shutters Shadow', 'volets verts dans l’ombre'],
        ['Ivy Stairway', 'escalier au lierre'],
        ['Clifftop Village', 'village au bord de la falaise'],
        ['Fishing Boats Bay', 'baie aux bateaux de peche'],
        ['Harbor Under Arch', "port sous l'arche"],
        ['Canal Promenade', 'promenade du canal'],
        ['Harbor Overlook', 'vue sur le port'],
        ['Marina Sunset', 'marina au coucher du soleil'],
        ['Waterfront Facades', 'facades du front de mer'],
        ['Alley Chapel', 'chapelle dans la ruelle'],
        ['Hilltown Rooftops', 'toits du village en hauteur'],
        ['Red Heart Wall', 'mur au coeur rouge'],
        ['Cactus Coastline', 'cote aux cactus'],
        ['Hilltop Monastery Dusk', 'monastere sur la colline au crepuscule'],
        ['Manhattan Bridge Frame', 'cadrage du pont de Manhattan'],
        ['Sea Arch Sunset', "coucher de soleil sur l'arche marine"],
        ['Ruined Arch Sunstar', 'rayon solaire dans arche en ruine'],
        ['Coastline Study', 'etude de cote'],
        ['Open Sea Sunrise', 'lever de soleil en pleine mer'],
        ['Cafe And Plant Diptych', 'diptyque cafe et plante'],
        ['Stone Staircase', 'escalier de pierre'],
        ['Street Level Taxis', 'taxis au niveau de la rue'],
        ['Atlas Sculpture', 'sculpture Atlas'],
        ['Cliff Swimmer', 'nageur au pied de la falaise'],
        ['Fire Escape Facade', "facade a escalier de secours"],
        ['Glass Reflections', 'reflets de verre'],
        ['Lower Manhattan Spire', 'fleche de Lower Manhattan'],
        ['Central Park Frame', 'cadrage de Central Park'],
        ['East River Bridge', "pont de l'East River"],
        ['Midtown Avenue', 'avenue de Midtown'],
        ['Quiet Conversation', 'conversation tranquille'],
        ['Gothic Facade', 'facade gothique'],
        ['Rooftop Grid', 'grille de toits'],
        ['Museum Minimal', 'musee minimal'],
        ['Graffiti And Shadow', 'graffiti et ombre'],
        ['Elderly Couple', 'couple age'],
        ['Street Art Crossing', 'passage street art'],
        ['Hot Dog Stand', 'stand de hot-dogs'],
        ['Dancing Couple', 'couple dansant'],
        ['Street Banner', 'banniere de rue'],
        ['Belgian Fries Sign', 'enseigne de frites belges'],
        ['Superman Walker', 'passant Superman'],
        ['Hudson Skyline Prelude', 'prelude a la skyline de l’Hudson'],
        ['Hudson Skyline', "skyline de l'Hudson"],
        ['Street Canyon', 'canyon de rue'],
        ['Flag And One World Trade', 'drapeau et One World Trade'],
        ['Night Construction', 'chantier de nuit'],
        ['City Cyclists', 'cyclistes urbains'],
        ['Arched Passage', 'passage voute'],
        ['Rainy Street Corner', 'coin de rue pluvieux'],
        ['Park Through Trees', 'parc a travers les arbres'],
        ['Red Bollard', 'bollard rouge'],
        ['Lakeside Buoys', 'bouees au bord du lac'],
        ['Misty Pasture', 'prairie brumeuse'],
        ['Canal Tower', 'tour du canal'],
        ['Cathedral Nave', 'nef de la cathedrale'],
        ['Stained Glass', 'vitrail'],
        ['Flower Window', 'fenetre fleurie'],
        ['Flower Bridge', 'pont fleuri'],
        ['Bicycle Line', 'ligne de velo'],
        ['Fortress Wall', 'mur de forteresse'],
        ['Riverside Break', 'pause au bord de la riviere'],
        ['Square Musician', 'musicien sur la place'],
        ['Young Guard BW', 'jeune garde NB'],
        ['Festival Embrace', 'etreinte de festival'],
        ['Dance Circle', 'cercle de danse'],
        ['Aerial City Block', 'bloc urbain aerien'],
        ['Bicycle Geometry', 'geometrie de velo'],
        ['Lakeshore Solitude', 'solitude au bord du lac'],
        ['Sun Through Leaves', 'soleil a travers les feuilles'],
        ['Angler At Sea', 'pecheur en mer'],
        ['Golf Through Hedge', 'golf a travers la haie'],
        ['Quiet Shoreline', 'rive tranquille'],
        ['Foam Line Beach', "plage a ligne d'ecume"],
        ['Vintage Van Promenade', 'promenade au van vintage'],
        ['Coastal Moments Collage', 'collage de moments cotiers'],
        ['Brooklyn Bridge Tower', 'tour du pont de Brooklyn'],
        ['Manhattan Canyon', 'canyon de Manhattan'],
        ['Empire State View', "vue sur l'Empire State"],
        ['Skyline Silhouette', 'silhouette de skyline'],
        ['Skyline Monochrome', 'skyline monochrome'],
        ['Three Figures Breakwater', 'trois figures sur le brise-lames'],
        ['Family Under Columns', 'famille sous les colonnes'],
        ['Horses On Ridge', 'chevaux sur la crete'],
        ['Garden Through Leaves', 'jardin a travers les feuilles'],
        ['Ferry In Fog', 'ferry dans le brouillard'],
        ['Red Sail Minimal', 'voile rouge minimaliste'],
        ['Pier Silhouette', 'silhouette de jetee'],
        ['Rocky Tidepools', 'mares rocheuses'],
        ['Heron Portrait', 'portrait de heron'],
        ['Child At Shore', 'enfant au rivage'],
        ['Fisherman Returning', 'pecheur de retour'],
        ['Doorway Play', 'jeu dans l’encadrement'],
        ['Cloister Courtyard', 'cour du cloitre'],
        ['Arched Corridor', 'corridor voute'],
        ['Florence Rainy Alley', 'ruelle pluvieuse de Florence'],
        ['Pastel Window', 'fenetre pastel'],
        ['Beach Sunset Silhouette', 'silhouette de plage au coucher du soleil'],
        ['Fisherwoman At Market', 'poissonniere au marche'],
        ['Cappadocia', 'Cappadoce'],
        ['Nuremberg', 'Nuremberg'],
        ['Observatory', 'observatoire'],
        ['Gallery', 'galerie'],
        ['Museum', 'musee'],
        ['Portrait', 'portrait'],
        ['Bridge', 'pont'],
        ['Street', 'rue'],
        ['Window', 'fenetre'],
        ['City', 'ville'],
        ['Diary', 'journal'],
    ],
    ...additionalGeneratedTitleReplacements,
} as const;

const escapeRegExp = (value: string) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const replaceAll = (value: string, replacements: readonly (readonly [string, string])[]) =>
    replacements.reduce(
        (next, [pattern, replacement]) => next.replace(new RegExp(escapeRegExp(pattern), 'g'), replacement),
        value
    );

const normalizeSpacing = (value: string) =>
    value.replace(/\s{2,}/g, ' ').replace(/\s+([.,])/g, '$1').trim();

const translateGeneratedTitle = (title: string, locale: Exclude<AppLocale, 'en'>) =>
    normalizeSpacing(replaceAll(title, generatedTitleReplacements[locale]));

const translateLocation = (location: string, locale: AppLocale) => {
    if (!location || locale === 'en') {
        return location;
    }

    const exactTranslation = exactLocationTranslations[locale][location as keyof typeof exactLocationTranslations[typeof locale]];
    if (exactTranslation) {
        return exactTranslation;
    }

    return location
        .split(', ')
        .map((segment) => locationSegmentTranslations[locale][segment as keyof typeof locationSegmentTranslations[typeof locale]] || segment)
        .join(', ');
};

const translateAvailability = (availability: string | undefined, locale: AppLocale) => {
    if (!availability || locale === 'en') {
        return availability;
    }

    if (availability === 'Available by inquiry') {
        return messages[locale].artworkPage.availabilityFallback;
    }

    if (availability === 'Selected sizes available') {
        return messages[locale].artworkPage.selectedSizesAvailable;
    }

    return availability;
};

const translateEdition = (edition: string | undefined, locale: AppLocale) => {
    if (!edition || locale === 'en') {
        return edition;
    }

    if (edition === 'Open edition') {
        switch (locale) {
        case 'de':
            return 'Offene Edition';
        case 'fr':
            return 'Edition ouverte';
        case 'it':
            return 'Edizione aperta';
        case 'ro':
            return 'Editie deschisa';
        case 'hu':
            return 'Nyitott kiadas';
        default:
            return edition;
        }
    }

    const editionMatch = edition.match(/^Edition of (\d+)$/);
    if (!editionMatch) {
        return edition;
    }

    switch (locale) {
    case 'de':
        return `Auflage von ${editionMatch[1]}`;
    case 'fr':
        return `Edition de ${editionMatch[1]}`;
    case 'it':
        return `Edizione di ${editionMatch[1]}`;
    case 'ro':
        return `Editie de ${editionMatch[1]}`;
    case 'hu':
        return `${editionMatch[1]} darabos kiadas`;
    default:
        return edition;
    }
};

const translatePriceFrom = (priceFrom: string | undefined, locale: AppLocale) => {
    if (!priceFrom || locale === 'en') {
        return priceFrom;
    }

    const priceMatch = priceFrom.match(/^From (.+)$/);
    if (!priceMatch) {
        return priceFrom;
    }

    switch (locale) {
    case 'de':
        return `Ab ${priceMatch[1]}`;
    case 'fr':
        return `A partir de ${priceMatch[1]}`;
    case 'it':
        return `Da ${priceMatch[1]}`;
    case 'ro':
        return `De la ${priceMatch[1]}`;
    case 'hu':
        return `Indulo ar ${priceMatch[1]}`;
    default:
        return priceFrom;
    }
};

const isFormulaicInstagramDescription = (photo: PortfolioPhoto) =>
    photo.description === `${photo.title} photographed in ${photo.location}.`;

const translateGeneratedDescription = (
    photo: PortfolioPhoto,
    translatedTitle: string,
    translatedLocation: string,
    locale: Exclude<AppLocale, 'en'>
) => {
    if (!isFormulaicInstagramDescription(photo)) {
        return photo.description;
    }

    switch (locale) {
    case 'de':
        return `${translatedTitle} aufgenommen in ${translatedLocation}.`;
    case 'fr':
        return `${translatedTitle} photographie a ${translatedLocation}.`;
    case 'it':
        return `${translatedTitle} fotografata a ${translatedLocation}.`;
    case 'ro':
        return `${translatedTitle} fotografiata in ${translatedLocation}.`;
    case 'hu':
        return `${translatedTitle} itt keszult: ${translatedLocation}.`;
    default:
        return photo.description;
    }
};

export const isPortfolioCategory = (value: string): value is PortfolioCategory =>
    portfolioCategories.includes(value as PortfolioCategory);

export const translatePortfolioCategory = (
    category: PortfolioCategory,
    locale: AppLocale
) => messages[locale].categories[category];

export const translateCollectionLabel = (label: string, locale: AppLocale) => {
    const localizedCollection = messages[locale].collectionViews[label as keyof typeof messages[typeof locale]['collectionViews']];
    if (localizedCollection) {
        return localizedCollection.label;
    }

    if (isPortfolioCategory(label)) {
        return translatePortfolioCategory(label, locale);
    }

    const localizedFilter = messages[locale].filters[label as keyof typeof messages[typeof locale]['filters']];
    return localizedFilter || label;
};

export const translateCollectionDescription = (
    label: string,
    fallback: string,
    locale: AppLocale
) =>
    messages[locale].collectionViews[label as keyof typeof messages[typeof locale]['collectionViews']]?.description ||
    fallback;

export const localizePortfolioPhoto = (
    photo: PortfolioPhoto,
    locale: AppLocale
): LocalizedPortfolioPhoto => {
    if (locale === 'en') {
        return photo;
    }

    const cmsTranslation = cmsPhotoTranslations[locale][photo.title as keyof typeof cmsPhotoTranslations[typeof locale]];
    const translatedTitle = cmsTranslation?.title || translateGeneratedTitle(photo.title, locale);
    const translatedLocation = cmsTranslation?.location || translateLocation(photo.location, locale);

    return {
        ...photo,
        title: translatedTitle,
        description:
            cmsTranslation?.description ||
            translateGeneratedDescription(photo, translatedTitle, translatedLocation, locale),
        location: translatedLocation,
        category: translatePortfolioCategory(photo.category, locale),
        availability: cmsTranslation?.availability || translateAvailability(photo.availability, locale),
        edition: cmsTranslation?.edition || translateEdition(photo.edition, locale),
        priceFrom: cmsTranslation?.priceFrom || translatePriceFrom(photo.priceFrom, locale),
        roomMood: cmsTranslation?.roomMood || photo.roomMood,
    };
};
