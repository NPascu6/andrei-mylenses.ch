import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import portraitImage from '../assets/portrait.jpg';
import ArtworkTile from '../components/site/ArtworkTile';
import SectionHeading from '../components/site/SectionHeading';
import {featuredPortfolioPhotos, recentPortfolioPhotos} from '../content/portfolioLibrary';

const AboutPage = () => {
    const aboutHighlights = [...featuredPortfolioPhotos.slice(0, 2), ...recentPortfolioPhotos.slice(0, 2)].slice(0, 4);

    useEffect(() => {
        document.title = 'About | My Lenses';
    }, []);

    return (
        <main className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 pb-16 pt-5 md:gap-6 md:px-6">
            <section id="about-intro" className="scroll-mt-24 grid gap-4 lg:grid-cols-[0.82fr_1.18fr] md:scroll-mt-28">
                <div className="surface-panel overflow-hidden rounded-[2rem] p-3 md:p-4">
                    <img
                        loading="lazy"
                        src={portraitImage}
                        alt="Andrei Pascu portrait"
                        className="h-full min-h-[26rem] w-full rounded-[1.5rem] object-cover"
                        style={{objectPosition: 'center 22%'}}
                    />
                </div>

                <div className="surface-panel rounded-[2rem] p-6 md:p-8">
                    <p className="eyebrow-text text-[11px] uppercase tracking-[0.3em]">About Andrei Pascu</p>
                    <h1 className="mt-3 font-display text-4xl text-appText md:text-6xl">
                        A photographer drawn to stillness, atmosphere, and the emotional weight of ordinary moments.
                    </h1>
                    <div className="mt-5 grid gap-4 text-base leading-8 text-muted-token">
                        <p>
                            Andrei&apos;s visual language began in the fog, folklore, and forests of Transylvania. That early sensitivity to atmosphere still runs through the work, whether the image was made in Switzerland, New York, Romania, or along quieter coastlines.
                        </p>
                        <p>
                            After decades across professional sport, leadership, and life lived across places and rhythms, photography became the medium that held onto what would otherwise disappear too quickly: light on a wall, a gesture on a street, a landscape before it closes.
                        </p>
                        <p>
                            The portfolio now presents that work in a more mature frame, not only as images to scroll, but as pieces meant to live inside rooms and accompany people over time.
                        </p>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <div className="surface-panel-soft rounded-full px-4 py-3 text-sm uppercase tracking-[0.18em] text-appText">
                            Switzerland based
                        </div>
                        <div className="surface-panel-soft rounded-full px-4 py-3 text-sm uppercase tracking-[0.18em] text-appText">
                            Fine art and travel photography
                        </div>
                        <div className="surface-panel-soft rounded-full px-4 py-3 text-sm uppercase tracking-[0.18em] text-appText">
                            Collector and interior inquiries
                        </div>
                    </div>

                    <div className="mt-6">
                        <Link
                            to="/collection"
                            className="theme-action inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.2em]"
                        >
                            Enter the collection
                        </Link>
                    </div>
                </div>
            </section>

            <section id="about-selected-works" className="scroll-mt-24 space-y-5 pt-2 md:scroll-mt-28">
                <SectionHeading
                    eyebrow="Selected works"
                    title="A small cross-section of the visual range behind the portfolio."
                    description="Street, travel, stillness, and the quieter emotional moments that translate beyond the screen."
                />
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {aboutHighlights.map((photo) => (
                        <ArtworkTile
                            key={photo.slug}
                            photo={photo}
                            showDescription={false}
                            imageClassName="h-[19rem] md:h-[21rem]"
                        />
                    ))}
                </div>
            </section>
        </main>
    );
};

export default AboutPage;
