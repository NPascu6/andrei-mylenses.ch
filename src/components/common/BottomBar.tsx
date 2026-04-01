import React from "react";
import Instagram from "../../assets/icons/Instagram";
import WhatsApp from "../../assets/icons/WhatsApp";
import Email from "../../assets/icons/Email";

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
    return (
        <footer id="contact" className="relative mt-2 scroll-mt-24 px-4 pb-10 pt-0 md:scroll-mt-28 md:px-6">
            <div className="surface-panel mx-auto grid max-w-7xl gap-6 rounded-[2rem] px-6 py-7 md:grid-cols-[1.2fr_0.8fr] md:px-8">
                <div className="space-y-5">
                    <p className="eyebrow-text text-sm uppercase tracking-[0.32em]">Let&apos;s place something timeless</p>
                    <h2 className="font-display text-3xl text-appText md:text-4xl">
                        Fine art photographs available as Giclee canvas pieces, private inquiries, and selected commissioned work.
                    </h2>
                    <p className="max-w-2xl text-base leading-7" style={{color: 'var(--color-muted)'}}>
                        If a work speaks to you, reach out and we can discuss the image, the right scale for your space, and whether a custom direction makes more sense for your wall.
                    </p>

                    <div className="grid gap-3 md:grid-cols-3">
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

                <div className="flex flex-col justify-between gap-5">
                    <div>
                        <p className="text-xs uppercase tracking-[0.26em]" style={{color: 'var(--color-nav)'}}>Collector inquiries</p>
                        <p className="mt-2 text-lg text-appText">Based in Switzerland, with photographs gathered across the globe.</p>
                        <p className="mt-3 text-sm leading-6 text-muted-token">
                            Reach out for available works, print guidance, collaborations, or a shortlist of images that suit your interior.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <a
                            href="mailto:andrei.pascu86@yahoo.com?subject=Print%20Consultation"
                            className="theme-action inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.18em]"
                        >
                            Request a print consultation
                        </a>
                        <a
                            href="mailto:andrei.pascu86@yahoo.com?subject=Curated%20Selection"
                            className="theme-action-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.18em]"
                        >
                            Ask for a curated selection
                        </a>
                    </div>

                    <div className="flex flex-wrap gap-3">
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
        </footer>
    );
};

export default BottomBar;
