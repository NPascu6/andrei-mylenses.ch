import React, {useMemo} from 'react';
import {Link} from 'react-router-dom';
import GuidedInquiryPanel from '../components/common/GuidedInquiryPanel';
import ArtworkTile from '../components/site/ArtworkTile';
import PageShell from '../components/site/PageShell';
import SectionHeading from '../components/site/SectionHeading';
import {canvasPreviewImages, printReadyPortfolioPhotos} from '../content/portfolioLibrary';
import {usePageTitle} from '../hooks/usePageTitle';
import {useI18n} from '../i18n/I18nProvider';
import {localizePortfolioPhoto} from '../i18n/portfolio';

const PrintsPage = () => {
    const {copy, locale} = useI18n();
    const printHighlights = useMemo(
        () => printReadyPortfolioPhotos.slice(0, 4).map((photo) => localizePortfolioPhoto(photo, locale)),
        [locale]
    );
    const canvasHero = canvasPreviewImages[0];

    usePageTitle(copy.printsPage.pageTitle);

    return (
        <PageShell>
            <section id="prints-intro" className="scroll-mt-24 grid gap-4 lg:grid-cols-[0.98fr_1.02fr] md:scroll-mt-28">
                <div className="surface-panel rounded-[2rem] p-6 md:p-8">
                    <p className="eyebrow-text text-[11px] uppercase tracking-[0.3em]">{copy.printsPage.eyebrow}</p>
                    <h1 className="mt-3 font-display text-4xl text-appText md:text-6xl">
                        {copy.printsPage.heroTitle}
                    </h1>
                    <p className="mt-4 max-w-2xl text-base leading-8 text-muted-token">
                        {copy.printsPage.heroDescription}
                    </p>
                    <div className="mt-6 grid gap-3 md:grid-cols-2">
                        {copy.printsPage.trustSignals.map((signal) => (
                            <div key={signal.label} className="surface-panel-soft rounded-[1.3rem] p-4">
                                <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">{signal.label}</p>
                                <p className="mt-2 text-appText">{signal.value}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                            to="/collection?filter=Best%20for%20large%20walls"
                            className="theme-action inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.2em]"
                        >
                            {copy.printsPage.primaryCta}
                        </Link>
                        <Link
                            to="/collection"
                            className="theme-action-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.2em]"
                        >
                            {copy.printsPage.secondaryCta}
                        </Link>
                    </div>
                </div>

                {canvasHero ? (
                    <div className="overflow-hidden rounded-[2rem]" style={{border: '1px solid var(--color-line)'}}>
                        <img
                            loading="lazy"
                            src={canvasHero.src}
                            alt={copy.printsPage.heroTitle}
                            className="h-full min-h-[28rem] w-full object-cover"
                            style={{objectPosition: 'center 56%'}}
                        />
                    </div>
                ) : null}
            </section>

            <section id="print-journey" className="scroll-mt-24 grid gap-4 md:scroll-mt-28 md:grid-cols-3">
                {copy.printsPage.journey.map((step) => (
                    <div key={step.step} className="surface-panel rounded-[1.8rem] p-5 md:p-6">
                        <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">{step.step}</p>
                        <h2 className="mt-3 font-display text-3xl text-appText">{step.title}</h2>
                        <p className="mt-3 text-base leading-7 text-muted-token">{step.description}</p>
                    </div>
                ))}
            </section>

            <section id="print-highlights" className="scroll-mt-24 space-y-5 pt-2 md:scroll-mt-28">
                <SectionHeading
                    eyebrow={copy.printsPage.highlights.eyebrow}
                    title={copy.printsPage.highlights.title}
                    description={copy.printsPage.highlights.description}
                />
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {printHighlights.map((photo) => (
                        <ArtworkTile
                            key={photo.slug}
                            photo={photo}
                            badge={copy.printsPage.highlights.badge}
                            showDescription={false}
                            imageClassName="h-[19rem] md:h-[21rem]"
                        />
                    ))}
                </div>
            </section>

            <GuidedInquiryPanel
                id="print-consultation"
                eyebrow={copy.printsPage.eyebrow}
                title={copy.printsPage.guidedTitle}
                description={copy.printsPage.guidedDescription}
            />
        </PageShell>
    );
};

export default PrintsPage;
