import React, {useMemo} from 'react';
import {Link, Navigate, useParams} from 'react-router-dom';
import GuidedInquiryPanel from '../components/common/GuidedInquiryPanel';
import ArtworkTile from '../components/site/ArtworkTile';
import PageShell from '../components/site/PageShell';
import SectionHeading from '../components/site/SectionHeading';
import {
    findPortfolioPhotoBySlug,
    getPhotoObjectPosition,
    getRelatedPortfolioPhotos,
} from '../content/portfolioLibrary';
import {instagramUrl} from '../config/site';
import {usePageTitle} from '../hooks/usePageTitle';
import {useI18n} from '../i18n/I18nProvider';
import {localizePortfolioPhoto} from '../i18n/portfolio';
import {
    buildArtworkSizeGuidance,
    formatTakenAt,
    getPresentationGuidance,
} from '../utils/artworkDetails';
import {buildGuidedInquiryHref} from '../utils/inquiry';
import {getPrintRecommendation} from '../utils/printRecommendations';

const ArtworkPage = () => {
    const {slug} = useParams();
    const {copy, locale} = useI18n();
    const photo = findPortfolioPhotoBySlug(slug);
    const localizedPhoto = useMemo(
        () => (photo ? localizePortfolioPhoto(photo, locale) : null),
        [locale, photo]
    );

    const recommendation = useMemo(
        () =>
            photo
                ? getPrintRecommendation({
                    title: photo.title,
                    category: photo.category,
                    location: photo.location,
                    locale,
                })
                : null,
        [locale, photo]
    );

    const relatedPhotos = useMemo(
        () => (photo ? getRelatedPortfolioPhotos(photo, 4).map((entry) => localizePortfolioPhoto(entry, locale)) : []),
        [locale, photo]
    );

    usePageTitle(localizedPhoto ? `${localizedPhoto.title} | My Lenses` : undefined);

    if (!photo || !localizedPhoto || !recommendation) {
        return <Navigate to="/collection" replace/>;
    }

    const inquiryHref = buildGuidedInquiryHref(
        {
            inquiryType: copy.guidedInquiry.inquiryOptions.artworkAvailability.label,
            artwork: localizedPhoto.title,
            roomType: copy.guidedInquiry.roomOptions.stillDeciding,
            budgetRange: localizedPhoto.priceFrom || copy.guidedInquiry.budget.openToGuidance,
            timeline: copy.guidedInquiry.timeline.nextMonth,
            location: localizedPhoto.location,
            notes: localizedPhoto.description,
        },
        copy.inquiryEmail
    );

    const takenAtLabel = formatTakenAt(photo.takenAt, locale);
    const availabilityLabel = localizedPhoto.availability || copy.artworkPage.availabilityFallback;
    const editionLabel = localizedPhoto.edition || copy.artworkPage.editionFallback;
    const priceLabel = localizedPhoto.priceFrom || copy.artworkPage.priceFallback;
    const presentationGuidance = getPresentationGuidance(photo.category, photo.orientation, locale);
    const sizeGuidance = buildArtworkSizeGuidance(photo.sizes, recommendation.recommendedSize, priceLabel, locale);
    const collectorMood = localizedPhoto.roomMood || recommendation.idealSetting;

    return (
        <PageShell className="gap-4 pt-4">
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
                                alt={localizedPhoto.title}
                                className="h-full min-h-[26rem] w-full object-cover"
                                style={{objectPosition: getPhotoObjectPosition(photo)}}
                            />
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        {sizeGuidance.map((entry) => (
                            <div key={entry.size} className="surface-panel rounded-[1.6rem] p-5">
                                <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">
                                    {copy.artworkPage.labels.suggestedSize}
                                </p>
                                <h2 className="mt-3 font-display text-3xl text-appText">{entry.size}</h2>
                                <p className="mt-3 text-sm leading-6 text-muted-token">{entry.note}</p>
                                <p className="mt-4 text-sm uppercase tracking-[0.18em] text-appText">{entry.priceLabel}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="surface-panel rounded-[1.75rem] p-6">
                            <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">
                                {copy.artworkPage.labels.collectorFit}
                            </p>
                            <h2 className="mt-3 font-display text-3xl text-appText">{collectorMood}</h2>
                            <p className="mt-4 text-base leading-7 text-muted-token">{recommendation.collectorNote}</p>
                            {takenAtLabel ? (
                                <p className="mt-4 text-sm uppercase tracking-[0.18em] text-subtle-token">
                                    {copy.artworkPage.capturedPrefix} {takenAtLabel}
                                </p>
                            ) : null}
                        </div>

                        <div className="surface-panel rounded-[1.75rem] p-6">
                            <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">
                                {copy.artworkPage.labels.presentation}
                            </p>
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
                            {localizedPhoto.category} {localizedPhoto.location ? ` / ${localizedPhoto.location}` : ''}
                        </p>
                        <h1 className="mt-3 font-display text-4xl text-appText md:text-5xl">{localizedPhoto.title}</h1>
                        <p className="mt-4 text-base leading-8 text-muted-token">{localizedPhoto.description}</p>

                        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                            <div className="surface-panel-soft rounded-[1.25rem] p-4">
                                <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">
                                    {copy.artworkPage.labels.availability}
                                </p>
                                <p className="mt-2 text-appText">{availabilityLabel}</p>
                            </div>
                            <div className="surface-panel-soft rounded-[1.25rem] p-4">
                                <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">
                                    {copy.artworkPage.labels.edition}
                                </p>
                                <p className="mt-2 text-appText">{editionLabel}</p>
                            </div>
                            <div className="surface-panel-soft rounded-[1.25rem] p-4">
                                <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">
                                    {copy.artworkPage.labels.bestFormat}
                                </p>
                                <p className="mt-2 text-appText">{recommendation.bestFit}</p>
                            </div>
                            <div className="surface-panel-soft rounded-[1.25rem] p-4">
                                <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">
                                    {copy.artworkPage.labels.priceGuidance}
                                </p>
                                <p className="mt-2 text-appText">{priceLabel}</p>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col gap-3">
                            <a
                                href={inquiryHref}
                                className="theme-action inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.2em]"
                            >
                                {copy.artworkPage.ctas.askAbout}
                            </a>
                            <Link
                                to="/prints"
                                className="theme-action-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.2em]"
                            >
                                {copy.artworkPage.ctas.printGuidance}
                            </Link>
                            {photo.permalink ? (
                                <a
                                    href={photo.permalink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="theme-action-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.2em]"
                                >
                                    {copy.artworkPage.ctas.originalPost}
                                </a>
                            ) : (
                                <a
                                    href={instagramUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="theme-action-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.2em]"
                                >
                                    {copy.artworkPage.ctas.instagram}
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="surface-panel-soft rounded-[1.75rem] p-5 md:p-6">
                        <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">
                            {copy.artworkPage.labels.privateInquiryNotes}
                        </p>
                        <div className="mt-4 grid gap-3">
                            {copy.artworkPage.privateInquiryNotes.map((note) => (
                                <div
                                    key={note}
                                    className="rounded-[1.15rem] border px-4 py-3 text-sm leading-6 text-muted-token"
                                    style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}
                                >
                                    {note}
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </section>

            <GuidedInquiryPanel
                id="artwork-inquiry"
                eyebrow={copy.artworkPage.inquiry.eyebrow}
                title={`${copy.artworkPage.inquiry.titlePrefix} "${localizedPhoto.title}".`}
                description={copy.artworkPage.inquiry.description}
                initialArtworkSlug={photo.slug}
            />

            {relatedPhotos.length > 0 ? (
                <section id="artwork-related" className="scroll-mt-24 space-y-5 pt-2 md:scroll-mt-28">
                    <SectionHeading
                        eyebrow={copy.artworkPage.related.eyebrow}
                        title={copy.artworkPage.related.title}
                        description={copy.artworkPage.related.description}
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
        </PageShell>
    );
};

export default ArtworkPage;
