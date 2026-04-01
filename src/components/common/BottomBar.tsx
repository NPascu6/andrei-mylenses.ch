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
                <div className="space-y-3">
                    <p className="eyebrow-text text-sm uppercase tracking-[0.32em]">Let&apos;s create something timeless</p>
                    <h2 className="font-display text-3xl text-appText md:text-4xl">
                        Available for print inquiries, collaborations, and selected commissioned work.
                    </h2>
                    <p className="max-w-2xl text-base leading-7" style={{color: 'var(--color-muted)'}}>
                        Feel free to contact me for any questions or inquiries on any of the available options.
                    </p>
                </div>

                <div className="flex flex-col justify-between gap-5">
                    <div>
                        <p className="text-xs uppercase tracking-[0.26em]" style={{color: 'var(--color-nav)'}}>Based in</p>
                        <p className="mt-2 text-lg text-appText">Switzerland, shooting across Europe and beyond.</p>
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
