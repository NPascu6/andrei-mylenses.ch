export type PortfolioCategory =
    | 'Travel'
    | 'Nature'
    | 'Street'
    | 'Wildlife'
    | 'Canvas'
    | 'Instagram'
    | 'Portrait'
    | 'Architecture';

export type PortfolioOrientation = 'landscape' | 'portrait' | 'square' | 'panoramic';

export interface PortfolioPhoto {
    id: string;
    baseName: string;
    src: string;
    fullSrc: string;
    title: string;
    slug: string;
    description: string;
    location: string;
    category: PortfolioCategory;
    featured: boolean;
    printReady: boolean;
    permalink: string;
    takenAt: string;
    series?: string;
    orientation?: PortfolioOrientation;
    aspectRatio?: string;
    sizes: string[];
    priceFrom?: string;
    edition?: string;
    availability?: string;
    roomMood?: string;
    hero?: boolean;
    seoTitle?: string;
    seoDescription?: string;
}

export interface CanvasPreviewImage {
    fileName: string;
    title: string;
    src: string;
    fullSrc?: string;
}
