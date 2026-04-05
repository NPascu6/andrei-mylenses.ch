import React, {useMemo} from 'react';
import {Link, useSearchParams} from 'react-router-dom';
import ArtworkTile from '../components/site/ArtworkTile';
import PageShell from '../components/site/PageShell';
import SectionHeading from '../components/site/SectionHeading';
import {
    curatedCollectionViews,
    heroPortfolioPhoto,
} from '../content/portfolioLibrary';
import {usePageTitle} from '../hooks/usePageTitle';
import {useI18n} from '../i18n/I18nProvider';
import {
    translateCollectionDescription,
    translateCollectionLabel,
} from '../i18n/portfolio';
import {getSelectableSurfaceStyle} from '../styles/surfaces';
import {
    buildCollectionArchiveBlocks,
    getCollectionArchiveResponsiveSizes,
    getCollectionArchiveTileImageClassName,
} from '../utils/collectionArchive';
import {localizeOptionalPortfolioPhoto, localizePortfolioPhotos} from '../utils/localizedPortfolio';
import {resolvePageTitle} from '../utils/pageMetadata';
import {
    availableCollectionFilters,
    getActiveCollectionFilter,
    getCollectionView,
    getVisiblePortfolioPhotos,
} from '../utils/collectionFilters';

const CollectionPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const {copy, locale} = useI18n();
    usePageTitle(resolvePageTitle(copy.collectionPage.pageTitle));

    const requestedFilter = searchParams.get('filter') || 'All';
    const activeFilter = getActiveCollectionFilter(requestedFilter);
    const activeCollectionView = getCollectionView(activeFilter);
    const visiblePhotos = useMemo(
        () => localizePortfolioPhotos(getVisiblePortfolioPhotos(activeFilter, activeCollectionView), locale),
        [activeCollectionView, activeFilter, locale]
    );
    const archiveBlocks = useMemo(
        () => buildCollectionArchiveBlocks(visiblePhotos),
        [visiblePhotos],
    );
    const localizedHeroPhoto = useMemo(
        () => localizeOptionalPortfolioPhoto(heroPortfolioPhoto, locale),
        [locale]
    );

    const setActiveFilter = (filter: string) => {
        if (filter === 'All') {
            setSearchParams({});
            return;
        }

        setSearchParams({filter});
    };

    return (
        <PageShell>
            <section id="collection-intro" className="surface-panel scroll-mt-24 rounded-4xl p-6 md:scroll-mt-28 md:p-8">
                <SectionHeading
                    eyebrow={copy.collectionPage.eyebrow}
                    title={copy.collectionPage.title}
                    description={copy.collectionPage.description}
                    action={(
                        <Link
                            to="/prints"
                            className="theme-action inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.2em]"
                        >
                            {copy.collectionPage.action}
                        </Link>
                    )}
                />

                {localizedHeroPhoto ? (
                    <div className="mt-6 grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
                        <ArtworkTile
                            photo={localizedHeroPhoto}
                            badge={copy.collectionPage.featuredEntryBadge}
                            variant="feature"
                            imageClassName="h-[24rem] md:h-[30rem]"
                            responsiveSizes="(min-width: 1280px) 44vw, 100vw"
                        />
                        <div className="surface-panel-soft rounded-[1.75rem] p-5 md:p-6">
                            <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">
                                {copy.collectionPage.curatedRoutesLabel}
                            </p>
                            <div className="mt-4 grid gap-3">
                                {curatedCollectionViews.slice(0, 4).map((view) => (
                                    <button
                                        key={view.slug}
                                        type="button"
                                        onClick={() => setActiveFilter(view.label)}
                                        className={`rounded-[1.2rem] border px-4 py-4 text-left transition-all duration-300 ${
                                            activeFilter === view.label ? 'theme-chip theme-chip-active text-appText' : ''
                                        }`}
                                        style={getSelectableSurfaceStyle(activeFilter === view.label)}
                                    >
                                        <p className="text-[10px] uppercase tracking-[0.22em] text-nav-token">
                                            {view.photos.length} {copy.collectionPage.worksLabel}
                                        </p>
                                        <p className="mt-2 text-appText">
                                            {translateCollectionLabel(view.label, locale)}
                                        </p>
                                        <p className="mt-2 text-sm leading-6 text-muted-token">
                                            {translateCollectionDescription(view.label, view.description, locale)}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : null}
            </section>

            <section id="collection-archive" className="scroll-mt-24 space-y-4 md:scroll-mt-28">
                <div className="flex flex-wrap gap-3">
                    {availableCollectionFilters.map((filter) => (
                        <button
                            key={filter}
                            type="button"
                            onClick={() => setActiveFilter(filter)}
                            className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.24em] transition-all duration-300 ${
                                activeFilter === filter ? 'theme-chip theme-chip-active text-appText' : 'theme-chip'
                            }`}
                        >
                            {translateCollectionLabel(filter, locale)}
                        </button>
                    ))}
                </div>

                <div className="surface-panel rounded-4xl px-4 py-5 md:px-5 md:py-6">
                    <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div className="space-y-2">
                            <p className="eyebrow-text text-[11px] uppercase">
                                {translateCollectionLabel(activeFilter, locale)}
                            </p>
                            <h2 className="font-display text-3xl text-appText md:text-4xl">
                                {visiblePhotos.length} {copy.collectionPage.worksInView}
                            </h2>
                        </div>
                        <p className="max-w-xl text-sm leading-6 text-muted-token">
                            {activeCollectionView
                                ? translateCollectionDescription(activeCollectionView.label, activeCollectionView.description, locale)
                                : copy.collectionPage.fallbackDescription}
                        </p>
                    </div>

                    <div className="grid gap-5">
                        {archiveBlocks.map((block) => (
                            <div
                                key={block.lead.slug}
                                className={`grid gap-4 ${block.supporting.length > 0 ? 'xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] xl:items-start' : ''}`}
                            >
                                <div className={block.reverse ? 'xl:order-2' : ''}>
                                    <ArtworkTile
                                        photo={block.lead}
                                        variant="feature"
                                        imageClassName={getCollectionArchiveTileImageClassName(block.lead, 'feature')}
                                        responsiveSizes={getCollectionArchiveResponsiveSizes('feature')}
                                    />
                                </div>

                                {block.supporting.length > 0 ? (
                                    <div className={`grid gap-4 sm:grid-cols-2 ${block.reverse ? 'xl:order-1' : ''}`}>
                                        {block.supporting.map((photo) => (
                                            <ArtworkTile
                                                key={photo.slug}
                                                photo={photo}
                                                variant="compact"
                                                showDescription={false}
                                                imageClassName={getCollectionArchiveTileImageClassName(photo, 'compact')}
                                                responsiveSizes={getCollectionArchiveResponsiveSizes('compact')}
                                            />
                                        ))}
                                    </div>
                                ) : null}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </PageShell>
    );
};

export default CollectionPage;
