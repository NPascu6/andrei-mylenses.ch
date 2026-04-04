import React, {useEffect, useMemo} from 'react';
import {Link, Navigate, useParams} from 'react-router-dom';
import GuidedInquiryPanel from '../components/common/GuidedInquiryPanel';
import ArtworkTile from '../components/site/ArtworkTile';
import SectionHeading from '../components/site/SectionHeading';
import {
    findPortfolioPhotoBySlug,
    getPhotoObjectPosition,
    getRelatedPortfolioPhotos,
} from '../content/portfolioLibrary';
import {instagramUrl} from '../config/site';
import {buildGuidedInquiryHref} from '../utils/inquiry';
import {getPrintRecommendation} from '../utils/printRecommendations';

const formatTakenAt = (takenAt?: string) => {
    if (!takenAt) {
        return null;
    }

    const next = new Date(takenAt);
    if (Number.isNaN(next.getTime())) {
        return null;
    }

    return new Intl.DateTimeFormat('en', {year: 'numeric', month: 'long'}).format(next);
};

const getPresentationGuidance = (category: string, orientation?: string) => {
    if (orientation === 'portrait') {
        return {
            title: 'Slim float frame or clean canvas wrap',
            note: 'Portrait-led works usually benefit from a little more breathing room and a restrained frame profile.',
        };
    }

    if (category === 'Architecture') {
        return {
            title: 'Black or natural oak float frame',
            note: 'Architectural images feel strongest with sharper edges and a cleaner presentation language.',
        };
    }

    if (category === 'Nature') {
        return {
            title: 'Warm oak float frame or gallery wrap',
            note: 'Nature work often opens beautifully when the presentation stays warm, simple, and unobtrusive.',
        };
    }

    return {
        title: 'Framed or unframed by room fit',
        note: 'The right presentation depends on wall scale, surrounding materials, and how calm or graphic the room already is.',
    };
};

const buildSizeGuidance = (sizes: string[], recommendedSize: string, priceFrom?: string) => {
    const inferredSizes = recommendedSize.includes(' or ')
        ? recommendedSize.split(' or ').map((entry) => entry.trim())
        : [recommendedSize];
    const uniqueSizes = Array.from(new Set([...sizes, ...inferredSizes, 'Custom consultation'])).slice(0, 3);

    return uniqueSizes.map((size, index) => ({
        size,
        note:
            index === 0
                ? 'A versatile starting point for most homes and studies.'
                : index === 1
                    ? 'Best when the work needs more wall presence or distance.'
                    : 'Use the room and wall dimensions to tailor the final format.',
        priceLabel: index === 0 ? priceFrom || 'From 140 CHF' : 'Price on request',
    }));
};

const ArtworkPage = () => {
    const {slug} = useParams();
    const photo = findPortfolioPhotoBySlug(slug);

    const recommendation = useMemo(
        () =>
            photo
                ? getPrintRecommendation({
                    title: photo.title,
                    category: photo.category,
                    location: photo.location,
                })
                : null,
        [photo]
    );

    const relatedPhotos = useMemo(
        () => (photo ? getRelatedPortfolioPhotos(photo, 4) : []),
        [photo]
    );

    useEffect(() => {
        if (!photo) {
            return;
        }

        document.title = `${photo.seoTitle || photo.title} | My Lenses`;
    }, [photo]);

    if (!photo || !recommendation) {
        return <Navigate to="/collection" replace/>;
    }

    const inquiryHref = buildGuidedInquiryHref({
        inquiryType: 'Artwork availability',
        artwork: photo.title,
        roomType: 'Still deciding',
        budgetRange: photo.priceFrom ? `Starting around ${photo.priceFrom}` : 'Open to guidance',
        timeline: 'Within the next month',
        location: photo.location,
        notes: photo.description,
    });

    const takenAtLabel = formatTakenAt(photo.takenAt);
    const availabilityLabel = photo.availability || 'Available by inquiry';
    const editionLabel = photo.edition || 'Open edition by inquiry';
    const presentationGuidance = getPresentationGuidance(photo.category, photo.orientation);
    const sizeGuidance = buildSizeGuidance(photo.sizes, recommendation.recommendedSize, photo.priceFrom);
    const collectorMood = photo.roomMood || recommendation.idealSetting;

    return (
        <main className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 pb-16 pt-4 md:px-6">
            <section id="artwork-top" className="scroll-mt-24 grid gap-4 xl:grid-cols-[minmax(0,1.08fr)_24rem] md:scroll-mt-28">
                <div className="grid gap-4">
                    <div className="surface-panel overflow-hidden rounded-[2rem] p-3 md:p-4">
                        <div className="overflow-hidden rounded-[1.5rem]">
                            <img
                                loading="eager"
                                decoding="async"
                                src={photo.mediumSrc}
                                srcSet={photo.srcSet}
                                sizes="(min-width: 1280px) 58vw, 100vw"
                                alt={photo.title}
                                className="h-full min-h-[26rem] w-full object-cover"
                                style={{objectPosition: getPhotoObjectPosition(photo)}}
                            />
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        {sizeGuidance.map((entry) => (
                            <div key={entry.size} className="surface-panel rounded-[1.6rem] p-5">
                                <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">Suggested size</p>
                                <h2 className="mt-3 font-display text-3xl text-appText">{entry.size}</h2>
                                <p className="mt-3 text-sm leading-6 text-muted-token">{entry.note}</p>
                                <p className="mt-4 text-sm uppercase tracking-[0.18em] text-appText">{entry.priceLabel}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="surface-panel rounded-[1.75rem] p-6">
                            <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">Collector fit</p>
                            <h2 className="mt-3 font-display text-3xl text-appText">{collectorMood}</h2>
                            <p className="mt-4 text-base leading-7 text-muted-token">{recommendation.collectorNote}</p>
                            {takenAtLabel ? <p className="mt-4 text-sm uppercase tracking-[0.18em] text-subtle-token">Captured {takenAtLabel}</p> : null}
                        </div>

                        <div className="surface-panel rounded-[1.75rem] p-6">
                            <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">Presentation</p>
                            <h2 className="mt-3 font-display text-3xl text-appText">{presentationGuidance.title}</h2>
                            <p className="mt-4 text-base leading-7 text-muted-token">{presentationGuidance.note}</p>
                            <div className="mt-5 flex flex-wrap gap-2">
                                <div className="theme-chip rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.18em]">
                                    {recommendation.bestFit}
                                </div>
                                <div className="theme-chip rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.18em]">
                                    {availabilityLabel}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <aside className="space-y-4 xl:sticky xl:top-28 xl:h-fit">
                    <div className="surface-panel rounded-[2rem] p-6 md:p-8">
                        <p className="eyebrow-text text-[11px] uppercase tracking-[0.3em]">
                            {photo.category} {photo.location ? ` / ${photo.location}` : ''}
                        </p>
                        <h1 className="mt-3 font-display text-4xl text-appText md:text-5xl">{photo.title}</h1>
                        <p className="mt-4 text-base leading-8 text-muted-token">{photo.description}</p>

                        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                            <div className="surface-panel-soft rounded-[1.25rem] p-4">
                                <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Availability</p>
                                <p className="mt-2 text-appText">{availabilityLabel}</p>
                            </div>
                            <div className="surface-panel-soft rounded-[1.25rem] p-4">
                                <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Edition</p>
                                <p className="mt-2 text-appText">{editionLabel}</p>
                            </div>
                            <div className="surface-panel-soft rounded-[1.25rem] p-4">
                                <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Best format</p>
                                <p className="mt-2 text-appText">{recommendation.bestFit}</p>
                            </div>
                            <div className="surface-panel-soft rounded-[1.25rem] p-4">
                                <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Price guidance</p>
                                <p className="mt-2 text-appText">{photo.priceFrom || 'On request by size'}</p>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col gap-3">
                            <a
                                href={inquiryHref}
                                className="theme-action inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.2em]"
                            >
                                Ask about this work
                            </a>
                            <Link
                                to="/prints"
                                className="theme-action-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.2em]"
                            >
                                View print guidance
                            </Link>
                            {photo.permalink ? (
                                <a
                                    href={photo.permalink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="theme-action-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.2em]"
                                >
                                    Original post
                                </a>
                            ) : (
                                <a
                                    href={instagramUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="theme-action-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.2em]"
                                >
                                    Instagram
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="surface-panel-soft rounded-[1.75rem] p-5 md:p-6">
                        <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Private inquiry notes</p>
                        <div className="mt-4 grid gap-3">
                            <div className="rounded-[1.15rem] border px-4 py-3 text-sm leading-6 text-muted-token" style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}>
                                Made to order with room, scale, and presentation discussed directly.
                            </div>
                            <div className="rounded-[1.15rem] border px-4 py-3 text-sm leading-6 text-muted-token" style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}>
                                Archival canvas output designed to keep tonal depth and atmosphere intact.
                            </div>
                            <div className="rounded-[1.15rem] border px-4 py-3 text-sm leading-6 text-muted-token" style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}>
                                Framed or unframed guidance can be tailored to the wall and surrounding materials.
                            </div>
                        </div>
                    </div>
                </aside>
            </section>

            <GuidedInquiryPanel
                id="artwork-inquiry"
                eyebrow="Artwork inquiry"
                title={`Start the conversation around "${photo.title}".`}
                description="If this photograph speaks to you, use the guided inquiry to make the first reply more specific around room, scale, and collector intent."
                initialArtwork={photo.title}
            />

            {relatedPhotos.length > 0 ? (
                <section id="artwork-related" className="scroll-mt-24 space-y-5 pt-2 md:scroll-mt-28">
                    <SectionHeading
                        eyebrow="Related works"
                        title="Other photographs likely to resonate with the same collector intent."
                        description="Related by subject, place, atmosphere, or print character."
                    />
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {relatedPhotos.map((relatedPhoto) => (
                            <ArtworkTile
                                key={relatedPhoto.slug}
                                photo={relatedPhoto}
                                showDescription={false}
                                imageClassName="h-[18rem] md:h-[20rem]"
                            />
                        ))}
                    </div>
                </section>
            ) : null}
        </main>
    );
};

export default ArtworkPage;
