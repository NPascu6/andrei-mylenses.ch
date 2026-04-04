import React, {useEffect, useMemo, useState} from 'react';
import {portfolioPhotos} from '../../content/portfolioLibrary';
import {contactEmail} from '../../config/site';
import {useI18n} from '../../i18n/I18nProvider';
import {localizePortfolioPhoto} from '../../i18n/portfolio';
import {buildGuidedInquiryHref} from '../../utils/inquiry';

interface GuidedInquiryPanelProps {
    id?: string;
    eyebrow?: string;
    title?: string;
    description?: string;
    initialArtworkSlug?: string;
}

const inquiryOptionIds = [
    'printConsultation',
    'artworkAvailability',
    'curatedSelection',
    'giftGuidance',
    'commissionRequest',
] as const;

const roomOptionIds = [
    'livingRoom',
    'bedroom',
    'office',
    'hospitality',
    'gift',
    'stillDeciding',
] as const;

type InquiryOptionId = typeof inquiryOptionIds[number];
type RoomOptionId = typeof roomOptionIds[number];

const GuidedInquiryPanel: React.FC<GuidedInquiryPanelProps> = ({
    id,
    eyebrow,
    title,
    description,
    initialArtworkSlug = '',
}) => {
    const {copy, locale} = useI18n();
    const [selectedArtworkSlug, setSelectedArtworkSlug] = useState(initialArtworkSlug);
    const [roomType, setRoomType] = useState<RoomOptionId>(initialArtworkSlug ? 'stillDeciding' : 'livingRoom');
    const [inquiryType, setInquiryType] = useState<InquiryOptionId>(initialArtworkSlug ? 'artworkAvailability' : 'printConsultation');
    const [location, setLocation] = useState('');
    const [notes, setNotes] = useState('');

    const resolvedEyebrow = eyebrow || copy.guidedInquiry.defaultEyebrow;
    const resolvedTitle = title || copy.guidedInquiry.defaultTitle;
    const resolvedDescription = description || copy.guidedInquiry.defaultDescription;

    useEffect(() => {
        setSelectedArtworkSlug(initialArtworkSlug);
        if (initialArtworkSlug) {
            setInquiryType('artworkAvailability');
            setRoomType('stillDeciding');
        }
    }, [initialArtworkSlug]);

    const artworkOptions = useMemo(
        () => portfolioPhotos.map((photo) => {
            const localizedPhoto = localizePortfolioPhoto(photo, locale);
            return {
                slug: photo.slug,
                title: localizedPhoto.title,
            };
        }),
        [locale]
    );

    const selectedArtworkTitle = artworkOptions.find((photo) => photo.slug === selectedArtworkSlug)?.title || '';

    const budgetRange = useMemo(() => {
        if (inquiryType === 'commissionRequest') {
            return copy.guidedInquiry.budget.customProject;
        }

        if (inquiryType === 'giftGuidance') {
            return copy.guidedInquiry.budget.giftGuidance;
        }

        return copy.guidedInquiry.budget.openToGuidance;
    }, [copy.guidedInquiry.budget, inquiryType]);

    const timeline = useMemo(() => {
        if (inquiryType === 'giftGuidance') {
            return copy.guidedInquiry.timeline.gift;
        }

        if (initialArtworkSlug || inquiryType === 'artworkAvailability') {
            return copy.guidedInquiry.timeline.nextMonth;
        }

        return copy.guidedInquiry.timeline.exploring;
    }, [copy.guidedInquiry.timeline, initialArtworkSlug, inquiryType]);

    const summaryArtwork = selectedArtworkTitle || (
        inquiryType === 'curatedSelection'
            ? copy.guidedInquiry.curatedRecommendation
            : copy.guidedInquiry.artworkPlaceholder
    );

    const guidedInquiryHref = useMemo(
        () =>
            buildGuidedInquiryHref({
                inquiryType: copy.guidedInquiry.inquiryOptions[inquiryType].label,
                artwork: selectedArtworkTitle || '',
                roomType: copy.guidedInquiry.roomOptions[roomType],
                budgetRange,
                timeline,
                location,
                notes,
            }, copy.inquiryEmail),
        [
            budgetRange,
            copy.guidedInquiry.inquiryOptions,
            copy.guidedInquiry.roomOptions,
            copy.inquiryEmail,
            inquiryType,
            location,
            notes,
            roomType,
            selectedArtworkTitle,
            timeline,
        ]
    );

    const directEmailHref = `mailto:${contactEmail}?subject=${encodeURIComponent(copy.guidedInquiry.directEmailSubject)}`;

    return (
        <section id={id} className="surface-panel scroll-mt-24 rounded-[2rem] px-6 py-7 md:scroll-mt-28 md:px-8">
            <div className="grid gap-6 xl:grid-cols-[0.88fr_1.12fr]">
                <div className="space-y-4">
                    <p className="eyebrow-text text-sm uppercase tracking-[0.3em]">{resolvedEyebrow}</p>
                    <h2 className="font-display text-3xl text-appText md:text-4xl">{resolvedTitle}</h2>
                    <p className="max-w-2xl text-base leading-8 text-muted-token">{resolvedDescription}</p>

                    <div className="surface-panel-soft rounded-[1.5rem] p-5 md:p-6">
                        <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">
                            {copy.guidedInquiry.assuranceTitle}
                        </p>
                        <div className="mt-4 grid gap-3">
                            {copy.guidedInquiry.assurancePoints.map((point) => (
                                <div
                                    key={point}
                                    className="rounded-[1.15rem] border px-4 py-3 text-sm leading-6 text-muted-token"
                                    style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}
                                >
                                    {point}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="surface-panel-soft rounded-[1.6rem] p-5 md:p-6">
                    <div className="grid gap-6">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full border text-[11px] uppercase tracking-[0.22em] text-appText" style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}>
                                    1
                                </span>
                                <div>
                                    <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">{copy.guidedInquiry.chooseIntentTitle}</p>
                                    <p className="mt-1 text-sm leading-6 text-muted-token">{copy.guidedInquiry.chooseIntentDescription}</p>
                                </div>
                            </div>
                            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                                {inquiryOptionIds.map((optionId) => {
                                    const option = copy.guidedInquiry.inquiryOptions[optionId];
                                    const active = inquiryType === optionId;

                                    return (
                                        <button
                                            key={optionId}
                                            type="button"
                                            onClick={() => setInquiryType(optionId)}
                                            className={`rounded-[1.25rem] border px-4 py-4 text-left transition-all duration-300 ${
                                                active ? 'theme-chip-active' : 'theme-chip'
                                            }`}
                                        >
                                            <p className="text-[11px] uppercase tracking-[0.18em] text-appText">
                                                {option.label}
                                            </p>
                                            <p className="mt-2 text-sm leading-6 text-muted-token">
                                                {option.description}
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full border text-[11px] uppercase tracking-[0.22em] text-appText" style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}>
                                    2
                                </span>
                                <div>
                                    <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">{copy.guidedInquiry.addContextTitle}</p>
                                    <p className="mt-1 text-sm leading-6 text-muted-token">{copy.guidedInquiry.addContextDescription}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {roomOptionIds.map((optionId) => {
                                    const active = roomType === optionId;

                                    return (
                                        <button
                                            key={optionId}
                                            type="button"
                                            onClick={() => setRoomType(optionId)}
                                            className={`rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.2em] ${
                                                active ? 'theme-chip theme-chip-active text-appText' : 'theme-chip'
                                            }`}
                                        >
                                            {copy.guidedInquiry.roomOptions[optionId]}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <label className="grid gap-2 md:col-span-2">
                                    <span className="text-nav-token text-[10px] uppercase tracking-[0.22em]">{copy.guidedInquiry.artworkLabel}</span>
                                    <select
                                        value={selectedArtworkSlug}
                                        onChange={(event) => setSelectedArtworkSlug(event.target.value)}
                                        className="rounded-[1rem] border px-4 py-3 text-sm text-appText"
                                        style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}
                                    >
                                        <option value="">{copy.guidedInquiry.artworkPlaceholder}</option>
                                        {artworkOptions.map((artworkOption) => (
                                            <option key={artworkOption.slug} value={artworkOption.slug}>
                                                {artworkOption.title}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label className="grid gap-2">
                                    <span className="text-nav-token text-[10px] uppercase tracking-[0.22em]">{copy.guidedInquiry.cityLabel}</span>
                                    <input
                                        value={location}
                                        onChange={(event) => setLocation(event.target.value)}
                                        placeholder={copy.guidedInquiry.cityPlaceholder}
                                        className="rounded-[1rem] border px-4 py-3 text-sm text-appText"
                                        style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}
                                    />
                                </label>

                                <div className="rounded-[1rem] border px-4 py-3" style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}>
                                    <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">{copy.guidedInquiry.tempoLabel}</p>
                                    <p className="mt-2 text-sm text-appText">{timeline}</p>
                                    <p className="mt-1 text-sm text-muted-token">{budgetRange}</p>
                                </div>

                                <label className="grid gap-2 md:col-span-2">
                                    <span className="text-nav-token text-[10px] uppercase tracking-[0.22em]">{copy.guidedInquiry.notesLabel}</span>
                                    <textarea
                                        value={notes}
                                        onChange={(event) => setNotes(event.target.value)}
                                        rows={4}
                                        placeholder={copy.guidedInquiry.notesPlaceholder}
                                        className="rounded-[1rem] border px-4 py-3 text-sm text-appText"
                                        style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 rounded-[1.35rem] border p-4 md:p-5" style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}>
                        <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">{copy.guidedInquiry.summaryLabel}</p>
                        <div className="mt-3 grid gap-2 text-sm leading-6 text-muted-token">
                            <p><span className="text-appText">{copy.guidedInquiry.intentLabel}:</span> {copy.guidedInquiry.inquiryOptions[inquiryType].label}</p>
                            <p><span className="text-appText">{copy.guidedInquiry.artworkLabel}:</span> {summaryArtwork}</p>
                            <p><span className="text-appText">{copy.guidedInquiry.settingLabel}:</span> {copy.guidedInquiry.roomOptions[roomType]}</p>
                            {location ? <p><span className="text-appText">{copy.guidedInquiry.locationLabel}:</span> {location}</p> : null}
                        </div>

                        <div className="mt-5 flex flex-wrap gap-3">
                            <a
                                href={guidedInquiryHref}
                                className="theme-action inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.18em]"
                            >
                                {copy.guidedInquiry.openAction}
                            </a>
                            <a
                                href={directEmailHref}
                                className="theme-action-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.18em]"
                            >
                                {copy.guidedInquiry.emailDirectlyAction}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GuidedInquiryPanel;
