import React, {useEffect, useMemo} from 'react';
import {Link, useSearchParams} from 'react-router-dom';
import ArtworkTile from '../components/site/ArtworkTile';
import SectionHeading from '../components/site/SectionHeading';
import {
    curatedCollectionViews,
    featuredPortfolioPhotos,
    findCuratedCollectionView,
    heroPortfolioPhoto,
    portfolioCategories,
    portfolioPhotos,
    printReadyPortfolioPhotos,
    recentPortfolioPhotos,
} from '../content/portfolioLibrary';

const defaultFilters = ['All', 'Collector starters', 'Print-ready', 'Recent'] as const;

const CollectionPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        document.title = 'Collection | My Lenses';
    }, []);

    const availableFilters = useMemo(
        () => [
            ...defaultFilters,
            ...curatedCollectionViews.map((view) => view.label).filter((label) => !defaultFilters.includes(label as typeof defaultFilters[number])),
            ...portfolioCategories,
        ],
        []
    );

    const requestedFilter = searchParams.get('filter') || 'All';
    const activeFilter = availableFilters.includes(requestedFilter) ? requestedFilter : 'All';
    const activeCollectionView = findCuratedCollectionView(activeFilter);

    const visiblePhotos = useMemo(() => {
        if (activeFilter === 'Collector starters') {
            return featuredPortfolioPhotos;
        }

        if (activeFilter === 'Print-ready') {
            return printReadyPortfolioPhotos;
        }

        if (activeFilter === 'Recent') {
            return recentPortfolioPhotos;
        }

        if (activeCollectionView) {
            return activeCollectionView.photos;
        }

        if (activeFilter !== 'All') {
            return portfolioPhotos.filter((photo) => photo.category === activeFilter);
        }

        return portfolioPhotos;
    }, [activeCollectionView, activeFilter]);

    const setActiveFilter = (filter: string) => {
        if (filter === 'All') {
            setSearchParams({});
            return;
        }

        setSearchParams({filter});
    };

    return (
        <main className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 pb-16 pt-5 md:gap-6 md:px-6">
            <section id="collection-intro" className="surface-panel scroll-mt-24 rounded-[2rem] p-6 md:scroll-mt-28 md:p-8">
                <SectionHeading
                    eyebrow="Collection"
                    title="The full archive, with clearer entry points for walls, moods, and collector intent."
                    description="Move by curated collection first, then by category if you want a wider browse. Every photograph now leads into a dedicated artwork page with print fit, presentation guidance, and direct inquiry."
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
                    <div className="mt-6 grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
                        <ArtworkTile
                            photo={heroPortfolioPhoto}
                            badge="Featured entry"
                            imageClassName="h-[24rem] md:h-[30rem]"
                            responsiveSizes="(min-width: 1280px) 44vw, 100vw"
                        />
                        <div className="surface-panel-soft rounded-[1.75rem] p-5 md:p-6">
                            <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">Curated routes</p>
                            <div className="mt-4 grid gap-3">
                                {curatedCollectionViews.slice(0, 4).map((view) => (
                                    <button
                                        key={view.slug}
                                        type="button"
                                        onClick={() => setActiveFilter(view.label)}
                                        className={`rounded-[1.2rem] border px-4 py-4 text-left transition-all duration-300 ${
                                            activeFilter === view.label ? 'theme-chip theme-chip-active text-appText' : ''
                                        }`}
                                        style={{
                                            borderColor: 'var(--color-line)',
                                            backgroundColor: activeFilter === view.label ? 'var(--color-surface-strong)' : 'var(--color-surface)',
                                        }}
                                    >
                                        <p className="text-[10px] uppercase tracking-[0.22em] text-nav-token">{view.photos.length} works</p>
                                        <p className="mt-2 text-appText">{view.label}</p>
                                        <p className="mt-2 text-sm leading-6 text-muted-token">{view.description}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : null}
            </section>

            <section id="collection-archive" className="scroll-mt-24 space-y-4 md:scroll-mt-28">
                <div className="flex flex-wrap gap-3">
                    {availableFilters.map((filter) => (
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
                            {activeCollectionView
                                ? activeCollectionView.description
                                : 'Click any photograph to enter a dedicated artwork page with print fit, collector notes, and a guided inquiry path.'}
                        </p>
                    </div>

                    <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
                        {visiblePhotos.map((photo) => (
                            <div key={photo.slug} className="mb-4 break-inside-avoid">
                                <ArtworkTile
                                    photo={photo}
                                    showDescription={false}
                                    imageClassName="h-auto max-h-[36rem] min-h-[19rem]"
                                    responsiveSizes="(min-width: 1536px) 22vw, (min-width: 1280px) 28vw, (min-width: 640px) 44vw, 100vw"
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
