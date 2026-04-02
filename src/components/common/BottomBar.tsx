import React, {useMemo, useState} from "react";
import {useSelector} from "react-redux";
import Instagram from "../../assets/icons/Instagram";
import WhatsApp from "../../assets/icons/WhatsApp";
import Email from "../../assets/icons/Email";
import {RootState} from "../../store/store";
import {inquiryGuideContent} from "../../content/siteContent";

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
    const [details, setDetails] = useState<string>('');

    const artworkOptions = useMemo(
        () => photos.slice(0, 40).map((photo) => photo.title),
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
            details ? `Notes: ${details}` : '',
            '',
            'Hello Andrei,',
            'I would like to discuss a possible piece for my space.',
        ].filter(Boolean);

        return `mailto:andrei.pascu86@yahoo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
    }, [details, inquiryType, roomType, selectedArtwork]);

    return (
        <footer id="contact" className="relative mt-2 scroll-mt-24 px-4 pb-10 pt-0 md:scroll-mt-28 md:px-6">
            <div className="mx-auto grid max-w-7xl gap-6">
                <div className="surface-panel rounded-[2rem] px-6 py-7 md:px-8">
                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div className="max-w-3xl space-y-4">
                            <p className="eyebrow-text text-sm uppercase tracking-[0.32em]">{inquiryGuideContent.eyebrow}</p>
                            <h2 className="font-display text-3xl text-appText md:text-4xl">
                                {inquiryGuideContent.title}
                            </h2>
                            <p className="max-w-2xl text-base leading-7" style={{color: 'var(--color-muted)'}}>
                                {inquiryGuideContent.description}
                            </p>
                        </div>

                        <div className="surface-panel-soft rounded-[1.35rem] px-4 py-3 text-sm leading-6 text-muted-token">
                            <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Based in Switzerland</p>
                            <p className="mt-2 text-appText">
                                Available for curated print guidance, room-fit recommendations, and selected commissioned work.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 grid gap-3 md:grid-cols-3">
                        <div className="surface-panel-soft rounded-[1.35rem] p-4">
                            <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Print consultation</p>
                            <p className="mt-2 text-sm leading-6 text-muted-token">Talk through image choice, room mood, and the format that will carry the work best.</p>
                        </div>
                        <div className="surface-panel-soft rounded-[1.35rem] p-4">
                            <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Custom direction</p>
                            <p className="mt-2 text-sm leading-6 text-muted-token">Ideal when you want a more personal piece, a travel memory, or a commissioned conversation.</p>
                        </div>
                        <div className="surface-panel-soft rounded-[1.35rem] p-4">
                            <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Direct artist contact</p>
                            <p className="mt-2 text-sm leading-6 text-muted-token">No marketplace noise, just a clear and personal discussion about the work and your space.</p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                    <div className="surface-panel rounded-[2rem] px-6 py-7 md:px-8">
                        <p className="eyebrow-text text-sm uppercase tracking-[0.32em]">{inquiryGuideContent.guidedTitle}</p>
                        <h3 className="mt-3 font-display text-3xl text-appText md:text-4xl">
                            Build a more thoughtful inquiry in under a minute.
                        </h3>
                        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-token">
                            {inquiryGuideContent.guidedDescription}
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

                        <div className="mt-6 flex flex-wrap gap-3">
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

                    <div className="surface-panel rounded-[2rem] px-6 py-7 md:px-8">
                        <div>
                            <p className="text-xs uppercase tracking-[0.26em]" style={{color: 'var(--color-nav)'}}>Direct contact</p>
                            <p className="mt-2 text-lg text-appText">Reach out for available works, print guidance, collaborations, or a shortlist that fits your interior.</p>
                            <p className="mt-3 text-sm leading-6 text-muted-token">
                                The guided inquiry helps structure the first message, but you can also contact directly through Instagram, WhatsApp, or email.
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
