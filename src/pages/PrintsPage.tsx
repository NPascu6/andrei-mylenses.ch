import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import GuidedInquiryPanel from '../components/common/GuidedInquiryPanel';
import ArtworkTile from '../components/site/ArtworkTile';
import SectionHeading from '../components/site/SectionHeading';
import {canvasPreviewImages, printReadyPortfolioPhotos} from '../content/portfolioLibrary';

const PrintsPage = () => {
    const printHighlights = printReadyPortfolioPhotos.slice(0, 4);
    const canvasHero = canvasPreviewImages[0];

    useEffect(() => {
        document.title = 'Prints | My Lenses';
    }, []);

    return (
        <main className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 pb-16 pt-5 md:gap-6 md:px-6">
            <section id="prints-intro" className="scroll-mt-24 grid gap-4 lg:grid-cols-[0.98fr_1.02fr] md:scroll-mt-28">
                <div className="surface-panel rounded-[2rem] p-6 md:p-8">
                    <p className="eyebrow-text text-[11px] uppercase tracking-[0.3em]">Prints</p>
                    <h1 className="mt-3 font-display text-4xl text-appText md:text-6xl">
                        A more credible print page for real collector conversations.
                    </h1>
                    <p className="mt-4 max-w-2xl text-base leading-8 text-muted-token">
                        The site now treats prints as a guided decision: archival canvas, stronger wall-fit language, and a direct artist conversation around scale, mood, and placement.
                    </p>
                    <div className="mt-6 grid gap-3 md:grid-cols-3">
                        <div className="surface-panel-soft rounded-[1.3rem] p-4">
                            <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Material</p>
                            <p className="mt-2 text-appText">Archival Giclee canvas</p>
                        </div>
                        <div className="surface-panel-soft rounded-[1.3rem] p-4">
                            <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Direction</p>
                            <p className="mt-2 text-appText">Room-aware recommendations</p>
                        </div>
                        <div className="surface-panel-soft rounded-[1.3rem] p-4">
                            <p className="text-nav-token text-[10px] uppercase tracking-[0.22em]">Pricing</p>
                            <p className="mt-2 text-appText">From 40 CHF and up by fit</p>
                        </div>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                            to="/collection"
                            className="theme-action-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm uppercase tracking-[0.2em]"
                        >
                            Browse collection first
                        </Link>
                    </div>
                </div>

                {canvasHero ? (
                    <div className="overflow-hidden rounded-[2rem]" style={{border: '1px solid var(--color-line)'}}>
                        <img
                            loading="lazy"
                            src={canvasHero.src}
                            alt={canvasHero.title}
                            className="h-full min-h-[28rem] w-full object-cover"
                            style={{objectPosition: 'center 56%'}}
                        />
                    </div>
                ) : null}
            </section>

            <section id="print-journey" className="scroll-mt-24 grid gap-4 md:scroll-mt-28 md:grid-cols-3">
                <div className="surface-panel rounded-[1.8rem] p-5 md:p-6">
                    <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">1. Shortlist the work</p>
                    <h2 className="mt-3 font-display text-3xl text-appText">Begin with a calmer edit.</h2>
                    <p className="mt-3 text-base leading-7 text-muted-token">Lead with the photographs that already feel right for walls, atmosphere, and presentation.</p>
                </div>
                <div className="surface-panel rounded-[1.8rem] p-5 md:p-6">
                    <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">2. Match the room</p>
                    <h2 className="mt-3 font-display text-3xl text-appText">Talk in mood, scale, and light.</h2>
                    <p className="mt-3 text-base leading-7 text-muted-token">The commercial frame shifts from generic sizes to how the image will actually live inside a space.</p>
                </div>
                <div className="surface-panel rounded-[1.8rem] p-5 md:p-6">
                    <p className="text-nav-token text-[10px] uppercase tracking-[0.24em]">3. Inquire directly</p>
                    <h2 className="mt-3 font-display text-3xl text-appText">Move into a real conversation.</h2>
                    <p className="mt-3 text-base leading-7 text-muted-token">No checkout theater. Just a guided first message that already carries intent and context.</p>
                </div>
            </section>

            <section id="print-highlights" className="scroll-mt-24 space-y-5 pt-2 md:scroll-mt-28">
                <SectionHeading
                    eyebrow="Print-forward works"
                    title="A stronger starting point for prints, gifts, and interior-led selections."
                    description="These works are already framed to support the print flow."
                />
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {printHighlights.map((photo) => (
                        <ArtworkTile
                            key={photo.slug}
                            photo={photo}
                            badge="Print-ready"
                            showDescription={false}
                            imageClassName="h-[19rem] md:h-[21rem]"
                        />
                    ))}
                </div>
            </section>

            <GuidedInquiryPanel
                id="print-consultation"
                eyebrow="Print consultation"
                title="Build a stronger first inquiry for prints, interiors, or gifts."
                description="This is now the primary commercial action in the app. It gives Andrei the context needed to reply with a tighter, more confident recommendation."
            />
        </main>
    );
};

export default PrintsPage;
