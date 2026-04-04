import React from "react";
import {Link} from 'react-router-dom';
import {
    contactEmailHref,
    instagramUrl,
    siteTitle,
    whatsappHref,
} from "../../config/site";
import {useI18n} from '../../i18n/I18nProvider';

const BottomBar = () => {
    const {copy} = useI18n();

    return (
        <footer id="contact" className="relative mt-2 scroll-mt-24 px-4 pb-10 pt-0 md:scroll-mt-28 md:px-6">
            <div className="mx-auto max-w-7xl">
                <div className="surface-panel rounded-[2rem] px-6 py-7 md:px-8">
                    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
                        <div className="space-y-4">
                            <p className="eyebrow-text text-sm uppercase tracking-[0.32em]">{copy.bottomBar.eyebrow}</p>
                            <h2 className="font-display text-3xl text-appText md:text-4xl">
                                {copy.bottomBar.title}
                            </h2>
                            <p className="max-w-2xl text-base leading-7 text-muted-token">
                                {copy.bottomBar.description.replace('My Lenses', siteTitle)}
                            </p>
                            <p className="text-sm uppercase tracking-[0.22em] text-nav-token">
                                {copy.bottomBar.artistBase}
                            </p>
                            <p className="max-w-2xl text-sm leading-6 text-muted-token">
                                {copy.bottomBar.artistShortBio}
                            </p>
                        </div>

                        <div className="grid gap-3">
                            <div className="surface-panel-soft rounded-[1.35rem] p-4">
                                <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">{copy.bottomBar.nextStepLabel}</p>
                                <p className="mt-2 text-appText">{copy.bottomBar.nextStepDescription}</p>
                            </div>
                            <div className="grid gap-3 md:grid-cols-2">
                                <div className="rounded-[1.2rem] border px-4 py-4 text-sm leading-6 text-muted-token" style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}>
                                    {copy.bottomBar.supportCards[0]}
                                </div>
                                <div className="rounded-[1.2rem] border px-4 py-4 text-sm leading-6 text-muted-token" style={{borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)'}}>
                                    {copy.bottomBar.supportCards[1]}
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <Link
                                    to="/prints"
                                    className="theme-action inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.18em]"
                                >
                                    {copy.bottomBar.primaryCta}
                                </Link>
                                <Link
                                    to="/collection?filter=Collector%20starters"
                                    className="theme-action-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.18em]"
                                >
                                    {copy.bottomBar.secondaryCta}
                                </Link>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <a href={contactEmailHref} className="theme-chip rounded-full px-4 py-3 text-sm uppercase tracking-[0.18em]">
                                    {copy.bottomBar.email}
                                </a>
                                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="theme-chip rounded-full px-4 py-3 text-sm uppercase tracking-[0.18em]">
                                    {copy.bottomBar.whatsapp}
                                </a>
                                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="theme-chip rounded-full px-4 py-3 text-sm uppercase tracking-[0.18em]">
                                    {copy.bottomBar.instagram}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default BottomBar;
