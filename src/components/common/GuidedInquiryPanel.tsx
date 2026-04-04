import React, {useEffect, useMemo, useState} from 'react';
import {portfolioPhotos} from '../../content/portfolioLibrary';
import {buildGuidedInquiryHref} from '../../utils/inquiry';

interface GuidedInquiryPanelProps {
    id?: string;
    eyebrow?: string;
    title?: string;
    description?: string;
    initialArtwork?: string;
}

const GuidedInquiryPanel: React.FC<GuidedInquiryPanelProps> = ({
    id,
    eyebrow = 'Guided inquiry',
    title = 'Shape a more complete print conversation before the first reply.',
    description = 'Share the artwork, the room, and the level of guidance you want so the conversation can begin with more clarity.',
    initialArtwork = '',
}) => {
    const [selectedArtwork, setSelectedArtwork] = useState(initialArtwork);
    const [roomType, setRoomType] = useState('Living room');
    const [inquiryType, setInquiryType] = useState(initialArtwork ? 'Artwork availability' : 'Print consultation');
    const [budgetRange, setBudgetRange] = useState('Open to guidance');
    const [timeline, setTimeline] = useState('Within the next month');
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

    const guidedInquiryHref = useMemo(
        () =>
            buildGuidedInquiryHref({
                inquiryType,
                artwork: selectedArtwork,
                roomType,
                budgetRange,
                timeline,
                location,
                notes,
            }),
        [budgetRange, inquiryType, location, notes, roomType, selectedArtwork, timeline]
    );

    return (
        <section id={id} className="surface-panel scroll-mt-24 rounded-[2rem] px-6 py-7 md:scroll-mt-28 md:px-8">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="space-y-4">
                    <p className="eyebrow-text text-sm uppercase tracking-[0.3em]">{eyebrow}</p>
                    <h2 className="font-display text-3xl text-appText md:text-4xl">{title}</h2>
                    <p className="max-w-2xl text-base leading-8 text-muted-token">{description}</p>

                    <div className="grid gap-3 md:grid-cols-3">
                        <div className="surface-panel-soft rounded-[1.25rem] p-4">
                            <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">Print consultation</p>
                            <p className="mt-2 text-sm leading-6 text-muted-token">Image selection, scale guidance, and wall presence.</p>
                        </div>
                        <div className="surface-panel-soft rounded-[1.25rem] p-4">
                            <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">Gift or interior fit</p>
                            <p className="mt-2 text-sm leading-6 text-muted-token">A better starting point for meaningful purchases.</p>
                        </div>
                        <div className="surface-panel-soft rounded-[1.25rem] p-4">
                            <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">Direct artist reply</p>
                            <p className="mt-2 text-sm leading-6 text-muted-token">No marketplace friction and no generic upsell.</p>
                        </div>
                    </div>
                </div>

                <div className="surface-panel-soft rounded-[1.5rem] p-5 md:p-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <label className="grid gap-2">
                            <span className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Inquiry type</span>
                            <select
                                value={inquiryType}
                                onChange={(event) => setInquiryType(event.target.value)}
                                className="rounded-[1rem] border px-4 py-3 text-sm text-appText"
                                style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}
                            >
                                <option>Print consultation</option>
                                <option>Artwork availability</option>
                                <option>Curated selection</option>
                                <option>Gift guidance</option>
                                <option>Commission request</option>
                            </select>
                        </label>

                        <label className="grid gap-2">
                            <span className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Room or setting</span>
                            <select
                                value={roomType}
                                onChange={(event) => setRoomType(event.target.value)}
                                className="rounded-[1rem] border px-4 py-3 text-sm text-appText"
                                style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}
                            >
                                <option>Living room</option>
                                <option>Bedroom</option>
                                <option>Office</option>
                                <option>Hospitality space</option>
                                <option>Gift</option>
                                <option>Still deciding</option>
                            </select>
                        </label>

                        <label className="grid gap-2">
                            <span className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Budget comfort</span>
                            <select
                                value={budgetRange}
                                onChange={(event) => setBudgetRange(event.target.value)}
                                className="rounded-[1rem] border px-4 py-3 text-sm text-appText"
                                style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}
                            >
                                <option>Open to guidance</option>
                                <option>Under 150 CHF</option>
                                <option>150-350 CHF</option>
                                <option>350-700 CHF</option>
                                <option>700 CHF+</option>
                            </select>
                        </label>

                        <label className="grid gap-2">
                            <span className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Timeline</span>
                            <select
                                value={timeline}
                                onChange={(event) => setTimeline(event.target.value)}
                                className="rounded-[1rem] border px-4 py-3 text-sm text-appText"
                                style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}
                            >
                                <option>Within the next month</option>
                                <option>Within the next three months</option>
                                <option>For a gift or special date</option>
                                <option>Just exploring</option>
                            </select>
                        </label>

                        <label className="grid gap-2 md:col-span-2">
                            <span className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Artwork</span>
                            <select
                                value={selectedArtwork}
                                onChange={(event) => setSelectedArtwork(event.target.value)}
                                className="rounded-[1rem] border px-4 py-3 text-sm text-appText"
                                style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}
                            >
                                <option value="">Still deciding</option>
                                {artworkOptions.map((title) => (
                                    <option key={title} value={title}>
                                        {title}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="grid gap-2 md:col-span-2">
                            <span className="text-nav-token text-[10px] uppercase tracking-[0.22em]">City or country</span>
                            <input
                                value={location}
                                onChange={(event) => setLocation(event.target.value)}
                                placeholder="Zurich, Switzerland"
                                className="rounded-[1rem] border px-4 py-3 text-sm text-appText"
                                style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}
                            />
                        </label>

                        <label className="grid gap-2 md:col-span-2">
                            <span className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Notes</span>
                            <textarea
                                value={notes}
                                onChange={(event) => setNotes(event.target.value)}
                                rows={4}
                                placeholder="Describe the mood, wall size, or what kind of presence you want the piece to have."
                                className="rounded-[1rem] border px-4 py-3 text-sm text-appText"
                                style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}
                            />
                        </label>
                    </div>

                    <div className="mt-5 rounded-[1.35rem] border p-4 text-sm leading-6 text-muted-token" style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}>
                        <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Conversation summary</p>
                        <p className="mt-2 text-appText">{selectedArtwork || 'A curated recommendation'}</p>
                        <p className="mt-1">{roomType} · {budgetRange} · {timeline}</p>
                        {location ? <p className="mt-1">For {location}</p> : null}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                        <a
                            href={guidedInquiryHref}
                            className="theme-action inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.18em]"
                        >
                            Open guided email
                        </a>
                        <a
                            href="mailto:andrei.pascu86@yahoo.com?subject=Curated%20Selection"
                            className="theme-action-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.18em]"
                        >
                            Quick curated request
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GuidedInquiryPanel;
