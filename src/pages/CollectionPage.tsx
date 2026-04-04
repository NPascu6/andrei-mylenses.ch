import React, {useEffect, useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import ArtworkTile from '../components/site/ArtworkTile';
import SectionHeading from '../components/site/SectionHeading';
import {
    featuredPortfolioPhotos,
    heroPortfolioPhoto,
    portfolioCategories,
    portfolioPhotos,
    printReadyPortfolioPhotos,
    recentPortfolioPhotos,
} from '../content/portfolioLibrary';

const filters = ['All', 'Collector picks', 'Print-ready', 'Recent'] as const;

const CollectionPage = () => {
    const [activeFilter, setActiveFilter] = useState<string>('All');

    useEffect(() => {
        document.title = 'Collection | My Lenses';
    }, []);

    const visiblePhotos = useMemo(() => {
        if (activeFilter === 'Collector picks') {
            return featuredPortfolioPhotos;
        }

        if (activeFilter === 'Print-ready') {
            return printReadyPortfolioPhotos;
        }

        if (activeFilter === 'Recent') {
            return recentPortfolioPhotos;
        }

        if (activeFilter !== 'All') {
            return portfolioPhotos.filter((photo) => photo.category === activeFilter);
        }

        return portfolioPhotos;
    }, [activeFilter]);

    return (
        <main className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 pb-16 pt-5 md:gap-6 md:px-6">
            <section id="collection-intro" className="surface-panel scroll-mt-24 rounded-[2rem] p-6 md:scroll-mt-28 md:p-8">
                <SectionHeading
                    eyebrow="Collection"
                    title="The full archive, reorganized to feel curated before it feels large."
                    description="Use the filtered views to move by collector intent, print readiness, or subject matter. Every card now leads into a dedicated artwork page instead of a dead-end modal."
                    action={(
                        <Link
                            to="/prints"
                            className="theme-action inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.2em]"
                        >
                            Start with prints
                        </Link>
                    )}
                />

                {heroPortfolioPhoto ? (
                    <div className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                        <ArtworkTile
                            photo={heroPortfolioPhoto}
                            badge="Featured entry"
                            imageClassName="h-[24rem] md:h-[30rem]"
                            imageStyle={{objectPosition: 'center 44%'}}
                        />
                        <div className="surface-panel-soft rounded-[1.75rem] p-5 md:p-6">
                            <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">How to browse</p>
                            <div className="mt-4 grid gap-3">
                                <div className="rounded-[1.2rem] border p-4" style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}>
                                    <p className="text-appText">Collector picks</p>
                                    <p className="mt-2 text-sm leading-6 text-muted-token">The strongest commercial shortlist for walls, gifts, and first purchases.</p>
                                </div>
                                <div className="rounded-[1.2rem] border p-4" style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}>
                                    <p className="text-appText">Print-ready</p>
                                    <p className="mt-2 text-sm leading-6 text-muted-token">Works already suited for the print inquiry flow and stronger wall presence.</p>
                                </div>
                                <div className="rounded-[1.2rem] border p-4" style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}>
                                    <p className="text-appText">Recent</p>
                                    <p className="mt-2 text-sm leading-6 text-muted-token">Newer image groups, useful when freshness matters more than the full archive.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </section>

            <section id="collection-archive" className="scroll-mt-24 space-y-4 md:scroll-mt-28">
                <div className="flex flex-wrap gap-3">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            type="button"
                            onClick={() => setActiveFilter(filter)}
                            className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.24em] transition-all duration-300 ${
                                activeFilter === filter ? 'theme-chip theme-chip-active text-appText' : 'theme-chip'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                    {portfolioCategories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            onClick={() => setActiveFilter(category)}
                            className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.24em] transition-all duration-300 ${
                                activeFilter === category ? 'theme-chip theme-chip-active text-appText' : 'theme-chip'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="surface-panel rounded-[2rem] px-4 py-5 md:px-5 md:py-6">
                    <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div className="space-y-2">
                            <p className="eyebrow-text text-[11px] uppercase">{activeFilter}</p>
                            <h2 className="font-display text-3xl text-appText md:text-4xl">
                                {visiblePhotos.length} works in this view
                            </h2>
                        </div>
                        <p className="max-w-xl text-sm leading-6 text-muted-token">
                            Click any photograph to enter a dedicated artwork page with print fit, collector notes, and a guided inquiry path.
                        </p>
                    </div>

                    <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
                        {visiblePhotos.map((photo) => (
                            <div key={photo.slug} className="mb-4 break-inside-avoid">
                                <ArtworkTile
                                    photo={photo}
                                    showDescription={false}
                                    imageClassName="h-auto max-h-[36rem] min-h-[19rem]"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default CollectionPage;
