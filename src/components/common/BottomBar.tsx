import React, {useMemo, useState} from "react";
import {useSelector} from "react-redux";
import Instagram from "../../assets/icons/Instagram";
import WhatsApp from "../../assets/icons/WhatsApp";
import Email from "../../assets/icons/Email";
import {RootState} from "../../store/store";
import {
    consultationExperienceContent,
    inquiryGuideContent,
} from "../../content/siteContent";

const contactLinks = [
    {
        href: "https://www.instagram.com/andrei_mylenses/",
        label: "Instagram",
        icon: Instagram,
    },
    {
        href: "https://wa.me/41795718784",
        label: "WhatsApp",
        icon: WhatsApp,
    },
    {
        href: "mailto:andrei.pascu86@yahoo.com",
        label: "Email",
        icon: Email,
    },
];

const BottomBar = () => {
    const photos = useSelector((state: RootState) => state.app.photos);
    const [selectedArtwork, setSelectedArtwork] = useState<string>('');
    const [roomType, setRoomType] = useState<string>('Living room');
    const [inquiryType, setInquiryType] = useState<string>('Print consultation');
    const [budgetRange, setBudgetRange] = useState<string>('Open to guidance');
    const [timeline, setTimeline] = useState<string>('Within the next month');
    const [city, setCity] = useState<string>('');
    const [details, setDetails] = useState<string>('');

    const artworkOptions = useMemo(
        () => photos.slice(0, 60).map((photo) => photo.title),
        [photos]
    );

    const guidedInquiryHref = useMemo(() => {
        const subject = selectedArtwork
            ? `${inquiryType} - ${selectedArtwork}`
            : inquiryType;

        const lines = [
            `Inquiry type: ${inquiryType}`,
            `Artwork: ${selectedArtwork || 'Still deciding'}`,
            `Room or setting: ${roomType}`,
            `Budget comfort: ${budgetRange}`,
            `Timeline: ${timeline}`,
            city ? `Location: ${city}` : '',
            details ? `Notes: ${details}` : '',
            '',
            'Hello Andrei,',
            'I would like to discuss a possible piece for my space.',
        ].filter(Boolean);

        return `mailto:andrei.pascu86@yahoo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
    }, [budgetRange, city, details, inquiryType, roomType, selectedArtwork, timeline]);

    return (
        <footer id="contact" className="relative mt-2 scroll-mt-24 px-4 pb-10 pt-0 md:scroll-mt-28 md:px-6">
            <div className="mx-auto grid max-w-7xl gap-6">
                <div className="surface-panel rounded-[2rem] px-6 py-7 md:px-8">
                    <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
                        <div className="max-w-3xl space-y-4">
                            <p className="eyebrow-text text-sm uppercase tracking-[0.32em]">{consultationExperienceContent.eyebrow}</p>
                            <h2 className="font-display text-3xl text-appText md:text-4xl">
                                {consultationExperienceContent.title}
                            </h2>
                            <p className="max-w-2xl text-base leading-7 text-muted-token">
                                {consultationExperienceContent.description}
                            </p>
                        </div>

                        <div className="surface-panel-soft rounded-[1.5rem] p-5">
                            <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Why this feels more premium</p>
                            <div className="mt-4 grid gap-3">
                                {consultationExperienceContent.assurancePoints.map((point) => (
                                    <div
                                        key={point}
                                        className="rounded-[1.1rem] border px-4 py-3 text-sm leading-6 text-muted-token"
                                        style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}
                                    >
                                        <span className="text-appText">{point}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 grid gap-3 md:grid-cols-3">
                        <div className="surface-panel-soft rounded-[1.35rem] p-4">
                            <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Print consultation</p>
                            <p className="mt-2 text-sm leading-6 text-muted-token">Talk through image choice, room mood, likely scale, and which piece will hold the strongest presence.</p>
                        </div>
                        <div className="surface-panel-soft rounded-[1.35rem] p-4">
                            <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Interior-led guidance</p>
                            <p className="mt-2 text-sm leading-6 text-muted-token">Helpful when you already know the room and want a more confident recommendation instead of browsing endlessly.</p>
                        </div>
                        <div className="surface-panel-soft rounded-[1.35rem] p-4">
                            <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Direct artist contact</p>
                            <p className="mt-2 text-sm leading-6 text-muted-token">A personal conversation around the work, the atmosphere you want, and whether a custom direction makes sense.</p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="surface-panel rounded-[2rem] px-6 py-7 md:px-8">
                        <p className="eyebrow-text text-sm uppercase tracking-[0.32em]">{consultationExperienceContent.guidedTitle}</p>
                        <h3 className="mt-3 font-display text-3xl text-appText md:text-4xl">
                            Build a more complete print inquiry in under a minute.
                        </h3>
                        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-token">
                            {consultationExperienceContent.guidedDescription}
                        </p>

                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            <label className="grid gap-2">
                                <span className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Inquiry type</span>
                                <select
                                    value={inquiryType}
                                    onChange={(event) => setInquiryType(event.target.value)}
                                    className="rounded-[1rem] border px-4 py-3 text-sm text-appText"
                                    style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}
                                >
                                    <option>Print consultation</option>
                                    <option>Curated selection</option>
                                    <option>Commission request</option>
                                    <option>Artwork availability</option>
                                    <option>Gift guidance</option>
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
                                    <option>Just exploring</option>
                                    <option>For a gift or special date</option>
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
                                    value={city}
                                    onChange={(event) => setCity(event.target.value)}
                                    placeholder="Zurich, Switzerland"
                                    className="rounded-[1rem] border px-4 py-3 text-sm text-appText"
                                    style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}
                                />
                            </label>

                            <label className="grid gap-2 md:col-span-2">
                                <span className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Notes</span>
                                <textarea
                                    value={details}
                                    onChange={(event) => setDetails(event.target.value)}
                                    rows={4}
                                    placeholder="Describe the mood, wall size, or what kind of piece you are looking for."
                                    className="rounded-[1rem] border px-4 py-3 text-sm text-appText"
                                    style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}
                                />
                            </label>
                        </div>

                        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
                            <div className="rounded-[1.35rem] border p-4 text-sm leading-6 text-muted-token" style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}>
                                <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">{consultationExperienceContent.assuranceTitle}</p>
                                <p className="mt-2 text-appText">
                                    {selectedArtwork || 'A curated recommendation'}
                                </p>
                                <p className="mt-1">
                                    {roomType} · {budgetRange} · {timeline}
                                </p>
                                {city && <p className="mt-1">For {city}</p>}
                            </div>

                            <div className="flex flex-wrap gap-3">
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

                    <div className="surface-panel rounded-[2rem] px-6 py-7 md:px-8">
                        <div>
                            <p className="text-xs uppercase tracking-[0.26em]" style={{color: 'var(--color-nav)'}}>Direct contact</p>
                            <p className="mt-2 text-lg text-appText">{inquiryGuideContent.title}</p>
                            <p className="mt-3 text-sm leading-6 text-muted-token">
                                {inquiryGuideContent.description}
                            </p>
                        </div>

                        <div className="mt-6 rounded-[1.35rem] border p-4" style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}>
                            <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Based in Switzerland</p>
                            <p className="mt-2 text-appText">
                                Available for curated print guidance, room-fit recommendations, and selected commissioned work.
                            </p>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                            {contactLinks.map(({href, label, icon: Icon}) => (
                                <a
                                    key={label}
                                    href={href}
                                    target={href.startsWith('http') ? '_blank' : undefined}
                                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className="theme-chip inline-flex items-center gap-3 rounded-full px-4 py-3 text-sm uppercase tracking-[0.18em] hover:-translate-y-0.5"
                                    aria-label={label}
                                >
                                    <Icon color="currentColor" width="18" height="18"/>
                                    {label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default BottomBar;
