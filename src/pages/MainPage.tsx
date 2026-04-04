import React, {useMemo} from 'react';
import {Link} from 'react-router-dom';
import artistImage from '../assets/portrait.jpg';
import ExpandableImage from '../components/common/ExpandableImage';
import ArtworkTile from '../components/site/ArtworkTile';
import PageShell from '../components/site/PageShell';
import SectionHeading from '../components/site/SectionHeading';
import {artistName} from '../config/site';
import {
    canvasPreviewImages,
    curatedCollectionViews,
    featuredPortfolioPhotos,
    heroPortfolioPhoto,
    portfolioStats,
    printReadyPortfolioPhotos,
    recentPortfolioPhotos,
} from '../content/portfolioLibrary';
import {usePageTitle} from '../hooks/usePageTitle';
import {useI18n} from '../i18n/I18nProvider';
import {
    localizePortfolioPhoto,
    translateCollectionDescription,
    translateCollectionLabel,
} from '../i18n/portfolio';

const MainPage = () => {
    const {copy, locale} = useI18n();
    const heroPhoto = useMemo(
        () => (heroPortfolioPhoto ? localizePortfolioPhoto(heroPortfolioPhoto, locale) : null),
        [locale]
    );
    const collectorPicks = useMemo(
        () => featuredPortfolioPhotos.slice(0, 3).map((photo) => localizePortfolioPhoto(photo, locale)),
        [locale]
    );
    const recentPicks = useMemo(
        () => recentPortfolioPhotos.slice(0, 3).map((photo) => localizePortfolioPhoto(photo, locale)),
        [locale]
    );
    const printHighlights = useMemo(
        () => printReadyPortfolioPhotos.slice(0, 3).map((photo) => localizePortfolioPhoto(photo, locale)),
        [locale]
    );
    const collectionStarts = curatedCollectionViews.slice(0, 6);
    const canvasHero = canvasPreviewImages[0];

    usePageTitle(copy.mainPage.pageTitle);

    return (
        <PageShell>
            {heroPhoto ? (
                <section id="top" className="surface-panel relative scroll-mt-24 overflow-hidden rounded-[2.25rem] p-6 md:scroll-mt-28 md:p-8 lg:p-10">
                    <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top_left,_rgba(var(--accent-color),0.24),_transparent_62%)]"/>
                    <div className="relative grid gap-7 lg:grid-cols-[0.86fr_1.14fr] lg:items-start lg:gap-8">
                        <div className="space-y-6">
                            <p className="eyebrow-text text-[11px] uppercase tracking-[0.34em]">
                                {copy.mainPage.heroEyebrow}
                            </p>
                            <h1 className="font-display max-w-[10.8ch] text-[clamp(3rem,6.6vw,5.8rem)] leading-[0.88] tracking-[-0.04em] text-appText">
                                {copy.mainPage.heroTitle}
                            </h1>
                            <p className="max-w-xl text-base leading-8 text-muted-token md:text-[1.02rem]">
                                {copy.mainPage.heroDescription}
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Link
                                    to="/collection?filter=Collector%20starters"
                                    className="theme-action inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.2em]"
                                >
                                    {copy.mainPage.heroPrimaryCta}
                                </Link>
                                <Link
                                    to="/prints"
                                    className="theme-action-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.2em]"
                                >
                                    {copy.mainPage.heroSecondaryCta}
                                </Link>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-2">
                                <div className="surface-panel-soft rounded-[1.35rem] p-4">
                                    <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">
                                        {copy.mainPage.stats.collectionLabel}
                                    </p>
                                    <p className="mt-2 font-display text-3xl text-appText">{portfolioStats.total}+</p>
                                    <p className="mt-2 text-sm leading-6 text-muted-token">
                                        {copy.mainPage.stats.collectionDescription}
                                    </p>
                                </div>
                                <div className="surface-panel-soft rounded-[1.35rem] p-4">
                                    <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">
                                        {copy.mainPage.stats.printReadyLabel}
                                    </p>
                                    <p className="mt-2 font-display text-3xl text-appText">{portfolioStats.printReady}+</p>
                                    <p className="mt-2 text-sm leading-6 text-muted-token">
                                        {copy.mainPage.stats.printReadyDescription}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {collectionStarts.map((view) => (
                                    <Link
                                        key={view.slug}
                                        to={`/collection?filter=${encodeURIComponent(view.label)}`}
                                        className="theme-chip rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.18em]"
                                    >
                                        {translateCollectionLabel(view.label, locale)}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <ArtworkTile
                            photo={heroPhoto}
                            priority
                            badge={copy.mainPage.featuredBadge}
                            className="min-h-[34rem]"
                            imageClassName="h-[34rem] md:h-[46rem]"
                            responsiveSizes="(min-width: 1280px) 52vw, 100vw"
                        />
                    </div>
                </section>
            ) : null}

            <section id="collector-selection" className="scroll-mt-24 space-y-5 pt-1 md:scroll-mt-28">
                <SectionHeading
                    eyebrow={copy.mainPage.collectorSelection.eyebrow}
                    title={copy.mainPage.collectorSelection.title}
                    description={copy.mainPage.collectorSelection.description}
                    action={(
                        <Link
                            to="/collection"
                            className="theme-action-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.2em]"
                        >
                            {copy.mainPage.collectorSelection.action}
                        </Link>
                    )}
                />

                <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
                    {collectorPicks[0] ? (
                        <ArtworkTile
                            photo={collectorPicks[0]}
                            badge={copy.mainPage.collectorSelection.collectorFavoriteBadge}
                            className="min-h-[30rem]"
                            imageClassName="h-[30rem] md:h-[38rem]"
                            responsiveSizes="(min-width: 1280px) 44vw, 100vw"
                        />
                    ) : null}

                    <div className="grid gap-4">
                        <div className="surface-panel-soft rounded-[1.75rem] p-5 md:p-6">
                            <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">
                                {copy.mainPage.collectorSelection.routesLabel}
                            </p>
                            <div className="mt-4 grid gap-3 md:grid-cols-2">
                                {collectionStarts.slice(0, 4).map((view) => (
                                    <Link
                                        key={view.slug}
                                        to={`/collection?filter=${encodeURIComponent(view.label)}`}
                                        className="rounded-[1.2rem] border px-4 py-4 transition-all duration-300 hover:-translate-y-0.5"
                                        style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}
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
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            {collectorPicks.slice(1, 3).map((photo) => (
                                <ArtworkTile
                                    key={photo.slug}
                                    photo={photo}
                                    showDescription={false}
                                    imageClassName="h-[17rem] md:h-[18rem]"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id="print-experience" className="scroll-mt-24 grid gap-4 lg:grid-cols-[0.95fr_1.05fr] md:scroll-mt-28">
                <div className="surface-panel rounded-[2rem] p-6 md:p-8">
                    <p className="eyebrow-text text-[11px] uppercase tracking-[0.3em]">
                        {copy.mainPage.printExperience.eyebrow}
                    </p>
                    <h2 className="mt-3 font-display text-3xl text-appText md:text-5xl">
                        {copy.mainPage.printExperience.title}
                    </h2>
                    <p className="mt-4 max-w-2xl text-base leading-8 text-muted-token">
                        {copy.mainPage.printExperience.description}
                    </p>
                    <div className="mt-6 grid gap-3 md:grid-cols-3">
                        {copy.mainPage.printExperience.cards.map((card: {label: string; value: string}) => (
                            <div
                                key={card.label}
                                className="rounded-[1.25rem] border p-4"
                                style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface-soft)'}}
                            >
                                <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">
                                    {card.label}
                                </p>
                                <p className="mt-2 text-appText">{card.value}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6">
                        <Link
                            to="/prints"
                            className="theme-action inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.2em]"
                        >
                            {copy.mainPage.printExperience.action}
                        </Link>
                    </div>
                </div>

                {canvasHero ? (
                    <div className="overflow-hidden rounded-[2rem]" style={{border: '1px solid var(--color-line)'}}>
                        <ExpandableImage
                            loading="lazy"
                            src={canvasHero.src}
                            modalSrc={canvasHero.fullSrc || canvasHero.src}
                            alt={copy.mainPage.printExperience.title}
                            containerClassName="h-full"
                            imgClassName="h-full min-h-[26rem] w-full object-cover"
                            imgStyle={{objectPosition: 'center 58%'}}
                            orderDetails={{
                                title: copy.mainPage.printExperience.title,
                                category: 'Canvas',
                                location: artistName,
                                notes: copy.mainPage.printExperience.description,
                            }}
                        />
                    </div>
                ) : null}
            </section>

            <section id="artist-story" className="scroll-mt-24 grid gap-4 lg:grid-cols-[0.72fr_1.28fr] md:scroll-mt-28">
                <div className="surface-panel rounded-[2rem] p-6 md:p-8">
                    <p className="eyebrow-text text-[11px] uppercase tracking-[0.3em]">
                        {copy.mainPage.artistStory.eyebrow}
                    </p>
                    <h2 className="mt-3 font-display text-3xl text-appText md:text-4xl">
                        {copy.mainPage.artistStory.title}
                    </h2>
                    <p className="mt-4 text-base leading-8 text-muted-token">
                        {copy.mainPage.artistStory.description}
                    </p>
                    <div className="mt-6 flex items-center gap-4">
                        <ExpandableImage
                            src={artistImage}
                            alt={artistName}
                            containerClassName="h-20 w-20 overflow-hidden rounded-full"
                            containerStyle={{border: '1px solid var(--color-line)'}}
                            imgClassName="h-20 w-20 rounded-full object-cover"
                            buttonClassName="right-0 top-0 h-7 w-7 md:right-0 md:top-0"
                            orderDetails={undefined}
                        />
                        <div>
                            <p className="text-appText">{artistName}</p>
                            <p className="mt-1 text-sm uppercase tracking-[0.22em] text-nav-token">
                                {copy.mainPage.artistStory.role}
                            </p>
                        </div>
                    </div>
                    <div className="mt-6">
                        <Link
                            to="/about"
                            className="theme-action-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.2em]"
                        >
                            {copy.mainPage.artistStory.action}
                        </Link>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {recentPicks.map((photo, index) => (
                        <ArtworkTile
                            key={photo.slug}
                            photo={photo}
                            badge={index === 0 ? copy.mainPage.newerWorkBadge : undefined}
                            showDescription={false}
                            imageClassName="h-[19rem] md:h-[23rem]"
                        />
                    ))}
                </div>
            </section>

            <section className="space-y-5 pt-2">
                <SectionHeading
                    eyebrow={copy.mainPage.printForward.eyebrow}
                    title={copy.mainPage.printForward.title}
                    description={copy.mainPage.printForward.description}
                />
                <div className="grid gap-4 md:grid-cols-3">
                    {printHighlights.map((photo) => (
                        <ArtworkTile
                            key={photo.slug}
                            photo={photo}
                            badge={copy.mainPage.printForward.badge}
                            imageClassName="h-[19rem] md:h-[22rem]"
                        />
                    ))}
                </div>
            </section>
        </PageShell>
    );
};

export default MainPage;
