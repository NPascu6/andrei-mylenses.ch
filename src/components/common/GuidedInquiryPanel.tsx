import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {portfolioPhotos} from '../../content/portfolioLibrary';
import {useI18n} from '../../i18n/I18nProvider';
import {localizePortfolioPhoto} from '../../i18n/portfolio';
import {surfaceSoftStyle, surfaceStyle} from '../../styles/surfaces';
import {
    createGuidedInquiryFormState,
    getGuidedInquiryDerivedValues,
    inquiryOptionIds,
    roomOptionIds,
    syncGuidedInquiryFormState,
    type GuidedInquiryFormState,
} from '../../utils/guidedInquiry';

interface GuidedInquiryPanelProps {
    id?: string;
    eyebrow?: string;
    title?: string;
    description?: string;
    initialArtworkSlug?: string;
}

const GuidedInquiryField = ({
    label,
    children,
    className = 'grid gap-2',
}: {
    label: string;
    children: React.ReactNode;
    className?: string;
}) => (
    <label className={className}>
        <span className="text-nav-token text-[10px] uppercase tracking-[0.22em]">{label}</span>
        {children}
    </label>
);

const GuidedInquiryStepHeader = ({
    index,
    title,
    description,
}: {
    index: string;
    title: string;
    description: string;
}) => (
    <div className="flex items-start gap-3">
        <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[11px] uppercase tracking-[0.22em] text-appText"
            style={surfaceStyle}
        >
            {index}
        </span>
        <div>
            <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">{title}</p>
            <p className="mt-1 text-sm leading-6 text-muted-token">{description}</p>
        </div>
    </div>
);

const GuidedInquiryPanel: React.FC<GuidedInquiryPanelProps> = ({
    id,
    eyebrow,
    title,
    description,
    initialArtworkSlug = '',
}) => {
    const {copy, locale} = useI18n();
    const [form, setForm] = useState<GuidedInquiryFormState>(() => createGuidedInquiryFormState(initialArtworkSlug));

    const setField = useCallback(
        <K extends keyof GuidedInquiryFormState,>(field: K, value: GuidedInquiryFormState[K]) => {
            setForm((currentForm) => ({
                ...currentForm,
                [field]: value,
            }));
        },
        [],
    );

    const resolvedEyebrow = eyebrow || copy.guidedInquiry.defaultEyebrow;
    const resolvedTitle = title || copy.guidedInquiry.defaultTitle;
    const resolvedDescription = description || copy.guidedInquiry.defaultDescription;

    useEffect(() => {
        setForm((currentForm) => syncGuidedInquiryFormState(currentForm, initialArtworkSlug));
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

    const selectedArtworkTitle = artworkOptions.find((photo) => photo.slug === form.selectedArtworkSlug)?.title || '';
    const {
        budgetRange,
        timeline,
        summaryArtwork,
        draft,
        guidedInquiryHref,
        directEmailHref,
    } = useMemo(
        () =>
            getGuidedInquiryDerivedValues({
                guidedInquiry: copy.guidedInquiry,
                inquiryEmail: copy.inquiryEmail,
                form,
                selectedArtworkTitle,
                hasArtworkFocus: Boolean(initialArtworkSlug),
            }),
        [copy.guidedInquiry, copy.inquiryEmail, form, initialArtworkSlug, selectedArtworkTitle],
    );
    const trimmedNotes = form.notes.trim();

    return (
        <section id={id} className="surface-panel relative scroll-mt-24 overflow-hidden rounded-4xl px-6 py-7 md:scroll-mt-28 md:px-8 md:py-8">
            <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(var(--accent-color),0.14),transparent_68%)]"/>
            <div className="relative grid gap-6 xl:grid-cols-[0.78fr_1.22fr] xl:items-stretch">
                <div className="order-2 flex h-full flex-col gap-4 xl:order-1">
                    <div className="surface-panel-soft rounded-[1.85rem] p-6 md:p-7">
                        <p className="eyebrow-text text-sm uppercase tracking-[0.3em]">{resolvedEyebrow}</p>
                        <h2 className="mt-4 font-display text-3xl text-appText md:text-[3.1rem] md:leading-[0.96]">
                            {resolvedTitle}
                        </h2>
                        <p className="mt-4 max-w-2xl text-base leading-8 text-muted-token">{resolvedDescription}</p>

                        <div className="mt-6 grid gap-3 md:grid-cols-2">
                            <div className="rounded-[1.2rem] border px-4 py-4" style={surfaceStyle}>
                                <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">
                                    {copy.guidedInquiry.intentLabel}
                                </p>
                                <p className="mt-2 text-appText">{draft.inquiryType}</p>
                            </div>
                            <div className="rounded-[1.2rem] border px-4 py-4" style={surfaceStyle}>
                                <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">
                                    {copy.guidedInquiry.tempoLabel}
                                </p>
                                <p className="mt-2 text-appText">{timeline}</p>
                                <p className="mt-1 text-sm text-muted-token">{budgetRange}</p>
                            </div>
                        </div>
                    </div>

                    <div className="surface-panel-soft rounded-[1.85rem] p-5 md:p-6">
                        <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">
                            {copy.guidedInquiry.assuranceTitle}
                        </p>
                        <div className="mt-4 grid gap-3">
                            {copy.guidedInquiry.assurancePoints.map((point: string, index) => (
                                <div
                                    key={point}
                                    className="flex items-start gap-3 rounded-[1.15rem] border px-4 py-3 text-sm leading-6 text-muted-token"
                                    style={surfaceStyle}
                                >
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[10px] uppercase tracking-[0.18em] text-appText" style={surfaceSoftStyle}>
                                        {index + 1}
                                    </span>
                                    <span>{point}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-auto rounded-[1.85rem] border p-5 md:p-6" style={surfaceStyle}>
                        <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">{copy.guidedInquiry.summaryLabel}</p>
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            <div className="rounded-[1.15rem] border px-4 py-3" style={surfaceSoftStyle}>
                                <p className="text-nav-token text-[10px] uppercase tracking-[0.2em]">{copy.guidedInquiry.artworkLabel}</p>
                                <p className="mt-2 text-sm leading-6 text-appText">{summaryArtwork}</p>
                            </div>
                            <div className="rounded-[1.15rem] border px-4 py-3" style={surfaceSoftStyle}>
                                <p className="text-nav-token text-[10px] uppercase tracking-[0.2em]">{copy.guidedInquiry.settingLabel}</p>
                                <p className="mt-2 text-sm leading-6 text-appText">{draft.roomType}</p>
                            </div>
                            {form.location ? (
                                <div className="rounded-[1.15rem] border px-4 py-3 sm:col-span-2" style={surfaceSoftStyle}>
                                    <p className="text-nav-token text-[10px] uppercase tracking-[0.2em]">{copy.guidedInquiry.locationLabel}</p>
                                    <p className="mt-2 text-sm leading-6 text-appText">{form.location}</p>
                                </div>
                            ) : null}
                            {trimmedNotes ? (
                                <div className="rounded-[1.15rem] border px-4 py-3 sm:col-span-2" style={surfaceSoftStyle}>
                                    <p className="text-nav-token text-[10px] uppercase tracking-[0.2em]">{copy.guidedInquiry.notesLabel}</p>
                                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-token">{trimmedNotes}</p>
                                </div>
                            ) : null}
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

                <div className="order-1 surface-panel-soft rounded-[1.85rem] p-5 md:p-6 xl:order-2">
                    <div className="grid gap-4">
                        <div className="rounded-[1.55rem] border p-4 md:p-5" style={surfaceStyle}>
                            <GuidedInquiryStepHeader
                                index="1"
                                title={copy.guidedInquiry.chooseIntentTitle}
                                description={copy.guidedInquiry.chooseIntentDescription}
                            />
                            <div className="mt-4 grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
                                {inquiryOptionIds.map((optionId) => {
                                    const option = copy.guidedInquiry.inquiryOptions[optionId];
                                    const active = form.inquiryType === optionId;

                                    return (
                                        <button
                                            key={optionId}
                                            type="button"
                                            onClick={() => setField('inquiryType', optionId)}
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

                        <div className="rounded-[1.55rem] border p-4 md:p-5" style={surfaceStyle}>
                            <GuidedInquiryStepHeader
                                index="2"
                                title={copy.guidedInquiry.addContextTitle}
                                description={copy.guidedInquiry.addContextDescription}
                            />
                            <div className="mt-4 flex flex-wrap gap-2">
                                {roomOptionIds.map((optionId) => {
                                    const active = form.roomType === optionId;

                                    return (
                                        <button
                                            key={optionId}
                                            type="button"
                                            onClick={() => setField('roomType', optionId)}
                                            className={`rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.2em] ${
                                                active ? 'theme-chip theme-chip-active text-appText' : 'theme-chip'
                                            }`}
                                        >
                                            {copy.guidedInquiry.roomOptions[optionId]}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="mt-5 grid gap-4 md:grid-cols-2">
                                <GuidedInquiryField label={copy.guidedInquiry.artworkLabel} className="grid gap-2 md:col-span-2">
                                    <select
                                        value={form.selectedArtworkSlug}
                                        onChange={(event) => setField('selectedArtworkSlug', event.target.value)}
                                        className="rounded-2xl border px-4 py-3 text-sm text-appText"
                                        style={surfaceStyle}
                                    >
                                        <option value="">{copy.guidedInquiry.artworkPlaceholder}</option>
                                        {artworkOptions.map((artworkOption) => (
                                            <option key={artworkOption.slug} value={artworkOption.slug}>
                                                {artworkOption.title}
                                            </option>
                                        ))}
                                    </select>
                                </GuidedInquiryField>

                                <GuidedInquiryField label={copy.guidedInquiry.cityLabel}>
                                    <input
                                        value={form.location}
                                        onChange={(event) => setField('location', event.target.value)}
                                        placeholder={copy.guidedInquiry.cityPlaceholder}
                                        className="rounded-2xl border px-4 py-3 text-sm text-appText"
                                        style={surfaceStyle}
                                    />
                                </GuidedInquiryField>

                                <div className="rounded-2xl border px-4 py-3" style={surfaceStyle}>
                                    <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">{copy.guidedInquiry.tempoLabel}</p>
                                    <p className="mt-2 text-sm text-appText">{timeline}</p>
                                    <p className="mt-1 text-sm text-muted-token">{budgetRange}</p>
                                </div>

                                <GuidedInquiryField label={copy.guidedInquiry.notesLabel} className="grid gap-2 md:col-span-2">
                                    <textarea
                                        value={form.notes}
                                        onChange={(event) => setField('notes', event.target.value)}
                                        rows={4}
                                        placeholder={copy.guidedInquiry.notesPlaceholder}
                                        className="rounded-2xl border px-4 py-3 text-sm text-appText"
                                        style={surfaceStyle}
                                    />
                                </GuidedInquiryField>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GuidedInquiryPanel;
