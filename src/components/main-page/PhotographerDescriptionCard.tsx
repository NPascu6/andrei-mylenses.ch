const PhotographerDescriptionCard = ({ artistImage }: any) => {
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
}

export default PhotographerDescriptionCard;