import React, {useEffect, useMemo, useState} from 'react';
import {portfolioPhotos} from '../../content/portfolioLibrary';
import {consultationExperienceContent} from '../../content/siteContent';
import {buildGuidedInquiryHref} from '../../utils/inquiry';

interface GuidedInquiryPanelProps {
    id?: string;
    eyebrow?: string;
    title?: string;
    description?: string;
    initialArtwork?: string;
}

const inquiryOptions = [
    {
        label: 'Print consultation',
        description: 'Help choosing the right work, size, and mood for a space.',
    },
    {
        label: 'Artwork availability',
        description: 'Ask specifically about one photograph and how it can be produced.',
    },
    {
        label: 'Curated selection',
        description: 'Receive a smaller recommendation based on atmosphere and room fit.',
    },
    {
        label: 'Gift guidance',
        description: 'Start with a calmer shortlist for a meaningful present.',
    },
    {
        label: 'Commission request',
        description: 'Discuss a more custom direction or project-led brief.',
    },
] as const;

const roomOptions = [
    'Living room',
    'Bedroom',
    'Office',
    'Hospitality space',
    'Gift',
    'Still deciding',
] as const;

const GuidedInquiryPanel: React.FC<GuidedInquiryPanelProps> = ({
    id,
    eyebrow = 'Guided inquiry',
    title = 'Shape a more complete print conversation before the first reply.',
    description = 'Share the artwork, the room, and the level of guidance you want so the conversation can begin with more clarity.',
    initialArtwork = '',
}) => {
    const [selectedArtwork, setSelectedArtwork] = useState(initialArtwork);
    const [roomType, setRoomType] = useState(initialArtwork ? 'Still deciding' : 'Living room');
    const [inquiryType, setInquiryType] = useState(initialArtwork ? 'Artwork availability' : 'Print consultation');
    const [location, setLocation] = useState('');
    const [notes, setNotes] = useState('');

    useEffect(() => {
        setSelectedArtwork(initialArtwork);
        if (initialArtwork) {
            setInquiryType('Artwork availability');
        }
    }, [initialArtwork]);

    const artworkOptions = useMemo(
        () => portfolioPhotos.map((photo) => photo.title),
        []
    );

    const budgetRange = useMemo(() => {
        if (inquiryType === 'Commission request') {
            return 'Custom project budget';
        }

        if (inquiryType === 'Gift guidance') {
            return 'Gift-led guidance';
        }

        return 'Open to guidance';
    }, [inquiryType]);

    const timeline = useMemo(() => {
        if (inquiryType === 'Gift guidance') {
            return 'For a gift or special date';
        }

        if (initialArtwork || inquiryType === 'Artwork availability') {
            return 'Within the next month';
        }

        return 'Just exploring';
    }, [initialArtwork, inquiryType]);

    const summaryArtwork = selectedArtwork || (inquiryType === 'Curated selection' ? 'Curated recommendation' : 'Still deciding');

    const guidedInquiryHref = useMemo(
        () =>
            buildGuidedInquiryHref({
                inquiryType,
                artwork: summaryArtwork === 'Still deciding' ? '' : summaryArtwork,
                roomType,
                budgetRange,
                timeline,
                location,
                notes,
            }),
        [budgetRange, inquiryType, location, notes, roomType, summaryArtwork, timeline]
    );

    return (
        <section id={id} className="surface-panel scroll-mt-24 rounded-[2rem] px-6 py-7 md:scroll-mt-28 md:px-8">
            <div className="grid gap-6 xl:grid-cols-[0.88fr_1.12fr]">
                <div className="space-y-4">
                    <p className="eyebrow-text text-sm uppercase tracking-[0.3em]">{eyebrow}</p>
                    <h2 className="font-display text-3xl text-appText md:text-4xl">{title}</h2>
                    <p className="max-w-2xl text-base leading-8 text-muted-token">{description}</p>

                    <div className="surface-panel-soft rounded-[1.5rem] p-5 md:p-6">
                        <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">
                            {consultationExperienceContent.assuranceTitle}
                        </p>
                        <div className="mt-4 grid gap-3">
                            {consultationExperienceContent.assurancePoints.map((point) => (
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
                                    <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">Choose the intent</p>
                                    <p className="mt-1 text-sm leading-6 text-muted-token">Start with the kind of conversation you want to have.</p>
                                </div>
                            </div>
                            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                                {inquiryOptions.map((option) => {
                                    const active = inquiryType === option.label;

                                    return (
                                        <button
                                            key={option.label}
                                            type="button"
                                            onClick={() => setInquiryType(option.label)}
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
                                    <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">Add room and artwork context</p>
                                    <p className="mt-1 text-sm leading-6 text-muted-token">Only the details that help the first reply feel more tailored.</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {roomOptions.map((option) => {
                                    const active = roomType === option;

                                    return (
                                        <button
                                            key={option}
                                            type="button"
                                            onClick={() => setRoomType(option)}
                                            className={`rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.2em] ${
                                                active ? 'theme-chip theme-chip-active text-appText' : 'theme-chip'
                                            }`}
                                        >
                                            {option}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <label className="grid gap-2 md:col-span-2">
                                    <span className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Artwork</span>
                                    <select
                                        value={selectedArtwork}
                                        onChange={(event) => setSelectedArtwork(event.target.value)}
                                        className="rounded-[1rem] border px-4 py-3 text-sm text-appText"
                                        style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}
                                    >
                                        <option value="">Still deciding</option>
                                        {artworkOptions.map((artworkTitle) => (
                                            <option key={artworkTitle} value={artworkTitle}>
                                                {artworkTitle}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label className="grid gap-2">
                                    <span className="text-nav-token text-[10px] uppercase tracking-[0.22em]">City or country</span>
                                    <input
                                        value={location}
                                        onChange={(event) => setLocation(event.target.value)}
                                        placeholder="Zurich, Switzerland"
                                        className="rounded-[1rem] border px-4 py-3 text-sm text-appText"
                                        style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}
                                    />
                                </label>

                                <div className="rounded-[1rem] border px-4 py-3" style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}>
                                    <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Conversation tempo</p>
                                    <p className="mt-2 text-sm text-appText">{timeline}</p>
                                    <p className="mt-1 text-sm text-muted-token">{budgetRange}</p>
                                </div>

                                <label className="grid gap-2 md:col-span-2">
                                    <span className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Notes</span>
                                    <textarea
                                        value={notes}
                                        onChange={(event) => setNotes(event.target.value)}
                                        rows={4}
                                        placeholder="Describe the mood, wall scale, or what you want the piece to do in the space."
                                        className="rounded-[1rem] border px-4 py-3 text-sm text-appText"
                                        style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 rounded-[1.35rem] border p-4 md:p-5" style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}>
                        <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Inquiry summary</p>
                        <div className="mt-3 grid gap-2 text-sm leading-6 text-muted-token">
                            <p><span className="text-appText">Intent:</span> {inquiryType}</p>
                            <p><span className="text-appText">Artwork:</span> {summaryArtwork}</p>
                            <p><span className="text-appText">Setting:</span> {roomType}</p>
                            {location ? <p><span className="text-appText">Location:</span> {location}</p> : null}
                        </div>

                        <div className="mt-5 flex flex-wrap gap-3">
                            <a
                                href={guidedInquiryHref}
                                className="theme-action inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.18em]"
                            >
                                Open private inquiry
                            </a>
                            <a
                                href="mailto:andrei.pascu86@yahoo.com?subject=Private%20Inquiry"
                                className="theme-action-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.18em]"
                            >
                                Email directly
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GuidedInquiryPanel;
