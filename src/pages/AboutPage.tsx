import React, {useMemo} from 'react';
import {Link} from 'react-router-dom';
import portraitImage from '../assets/portrait.jpg';
import ArtworkTile from '../components/site/ArtworkTile';
import PageShell from '../components/site/PageShell';
import SectionHeading from '../components/site/SectionHeading';
import {artistName} from '../config/site';
import {featuredPortfolioPhotos, recentPortfolioPhotos} from '../content/portfolioLibrary';
import {usePageTitle} from '../hooks/usePageTitle';
import {useI18n} from '../i18n/I18nProvider';
import {localizePortfolioPhoto} from '../i18n/portfolio';

const AboutPage = () => {
    const {copy, locale} = useI18n();
    const aboutHighlights = useMemo(
        () => [...featuredPortfolioPhotos.slice(0, 2), ...recentPortfolioPhotos.slice(0, 2)]
            .slice(0, 4)
            .map((photo) => localizePortfolioPhoto(photo, locale)),
        [locale]
    );

    usePageTitle(copy.aboutPage.pageTitle);

    return (
        <PageShell>
            <section id="about-intro" className="scroll-mt-24 grid gap-4 lg:grid-cols-[0.82fr_1.18fr] md:scroll-mt-28">
                <div className="surface-panel overflow-hidden rounded-[2rem] p-3 md:p-4">
                    <img
                        loading="lazy"
                        src={portraitImage}
                        alt={artistName}
                        className="h-full min-h-[26rem] w-full rounded-[1.5rem] object-cover"
                        style={{objectPosition: 'center 22%'}}
                    />
                </div>

                <div className="surface-panel rounded-[2rem] p-6 md:p-8">
                    <p className="eyebrow-text text-[11px] uppercase tracking-[0.3em]">{copy.aboutPage.eyebrow}</p>
                    <h1 className="mt-3 font-display text-4xl text-appText md:text-6xl">
                        {copy.aboutPage.title}
                    </h1>
                    <div className="mt-5 grid gap-4 text-base leading-8 text-muted-token">
                        {copy.aboutPage.paragraphs.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                        {copy.aboutPage.chips.map((chip) => (
                            <div
                                key={chip}
                                className="surface-panel-soft rounded-full px-4 py-3 text-sm uppercase tracking-[0.18em] text-appText"
                            >
                                {chip}
                            </div>
                        ))}
                    </div>

                    <div className="mt-6">
                        <Link
                            to="/collection"
                            className="theme-action inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.2em]"
                        >
                            {copy.aboutPage.action}
                        </Link>
                    </div>
                </div>
            </section>

            <section id="about-selected-works" className="scroll-mt-24 space-y-5 pt-2 md:scroll-mt-28">
                <SectionHeading
                    eyebrow={copy.aboutPage.selectedWorks.eyebrow}
                    title={copy.aboutPage.selectedWorks.title}
                    description={copy.aboutPage.selectedWorks.description}
                />
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {aboutHighlights.map((photo) => (
                        <ArtworkTile
                            key={photo.slug}
                            photo={photo}
                            showDescription={false}
                            imageClassName="h-[19rem] md:h-[21rem]"
                        />
                    ))}
                </div>
            </section>
        </PageShell>
    );
};

export default AboutPage;
