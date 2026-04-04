import React, {useEffect, useMemo} from 'react';
import {Link, Navigate, useParams} from 'react-router-dom';
import GuidedInquiryPanel from '../components/common/GuidedInquiryPanel';
import ArtworkTile from '../components/site/ArtworkTile';
import SectionHeading from '../components/site/SectionHeading';
import {findPortfolioPhotoBySlug, getRelatedPortfolioPhotos} from '../content/portfolioLibrary';
import {instagramUrl} from '../config/site';
import {getPrintRecommendation} from '../utils/printRecommendations';
import {buildGuidedInquiryHref} from '../utils/inquiry';

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

        document.title = `${photo.title} | My Lenses`;
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
    const sizesLabel = photo.sizes.length > 0 ? photo.sizes.join(' / ') : recommendation.recommendedSize;
    const availabilityLabel = photo.availability || 'Available by inquiry';
    const editionLabel = photo.edition || 'Open edition by inquiry';

    return (
        <main className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 pb-16 pt-4 md:px-6">
            <section id="artwork-top" className="scroll-mt-24 grid gap-4 lg:grid-cols-[1.18fr_0.82fr] md:scroll-mt-28">
                <div className="surface-panel overflow-hidden rounded-[2rem] p-3 md:p-4">
                    <div className="overflow-hidden rounded-[1.5rem]">
                        <img
                            loading="eager"
                            src={photo.fullSrc || photo.src}
                            alt={photo.title}
                            className="h-full min-h-[25rem] w-full object-cover"
                        />
                    </div>
                </div>

                <aside className="surface-panel rounded-[2rem] p-6 md:p-8">
                    <p className="eyebrow-text text-[11px] uppercase tracking-[0.3em]">
                        {photo.category} {photo.location ? ` / ${photo.location}` : ''}
                    </p>
                    <h1 className="mt-3 font-display text-4xl text-appText md:text-5xl">{photo.title}</h1>
                    <p className="mt-4 text-base leading-8 text-muted-token">{photo.description}</p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <div className="surface-panel-soft rounded-[1.25rem] p-4">
                            <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Best format</p>
                            <p className="mt-2 text-appText">{recommendation.bestFit}</p>
                        </div>
                        <div className="surface-panel-soft rounded-[1.25rem] p-4">
                            <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Recommended size</p>
                            <p className="mt-2 text-appText">{sizesLabel}</p>
                        </div>
                        <div className="surface-panel-soft rounded-[1.25rem] p-4">
                            <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Availability</p>
                            <p className="mt-2 text-appText">{availabilityLabel}</p>
                        </div>
                        <div className="surface-panel-soft rounded-[1.25rem] p-4">
                            <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Edition</p>
                            <p className="mt-2 text-appText">{editionLabel}</p>
                        </div>
                    </div>

                    <div className="mt-6 rounded-[1.35rem] border p-4 text-sm leading-6 text-muted-token" style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface-soft)'}}>
                        <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Collector fit</p>
                        <p className="mt-2 text-appText">{photo.roomMood || recommendation.idealSetting}</p>
                        <p className="mt-3">{recommendation.collectorNote}</p>
                        {takenAtLabel ? <p className="mt-3 text-subtle-token">Captured {takenAtLabel}</p> : null}
                        {photo.priceFrom ? <p className="mt-1 text-subtle-token">Guidance from {photo.priceFrom}</p> : null}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
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
                </aside>
            </section>

            <GuidedInquiryPanel
                id="artwork-inquiry"
                eyebrow="Artwork inquiry"
                title={`Start the conversation around "${photo.title}".`}
                description="If this photograph speaks to you, use the guided form to make the first reply more specific around room, scale, and purchase intent."
                initialArtwork={photo.title}
            />

            {relatedPhotos.length > 0 ? (
                <section id="artwork-related" className="scroll-mt-24 space-y-5 pt-2 md:scroll-mt-28">
                    <SectionHeading
                        eyebrow="Related works"
                        title="Other photographs likely to resonate with the same collector intent."
                        description="Related by subject, place, or print character."
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
