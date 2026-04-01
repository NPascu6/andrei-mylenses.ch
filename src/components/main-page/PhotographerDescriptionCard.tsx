import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

interface PhotographerDescriptionCardProps {
    artistImage: string;
}

const PhotographerDescriptionCard: React.FC<PhotographerDescriptionCardProps> = ({artistImage}) => {
    const photos = useSelector((state: RootState) => state.app.photos);
    const featuredPhotos = photos.filter((photo: {featured?: boolean}) => photo.featured).slice(0, 5);
    const heroPhoto = featuredPhotos[0] || photos[0];
    const highlights = [
        {value: `${photos.length}+`, label: 'curated images'},
        {value: '25+', label: 'years of lived perspective'},
        {value: 'Across the globe', label: 'stories from every horizon'},
    ];

    return (
        <section id="top" className="mx-auto flex max-w-7xl scroll-mt-24 flex-col gap-2 px-4 pb-4 pt-1 md:px-6 md:scroll-mt-28">
            <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                <article className="surface-panel relative overflow-hidden rounded-[2rem]">
                    <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top_left,_rgba(var(--accent-color),0.22),_transparent_60%)]"/>
                    <div className="relative space-y-6">
                        <div className="theme-chip inline-flex items-center gap-3 rounded-full px-4 py-2 text-xs uppercase tracking-[0.28em]">
                            Fine art and travel photography
                        </div>

                        <div className="grid gap-5 md:grid-cols-[auto_1fr] md:items-center">
                            <div className="relative mx-auto md:mx-0">
                                <div className="absolute -inset-3 rounded-full blur-2xl" style={{backgroundColor: 'rgba(var(--accent-color), 0.16)'}}/>
                                <img
                                    loading="lazy"
                                    src={artistImage}
                                    alt="Andrei Pascu portrait"
                                    className="relative h-32 w-32 rounded-full object-cover shadow-2xl shadow-black/20 md:h-40 md:w-40"
                                    style={{border: '1px solid var(--color-line)'}}
                                />
                            </div>

                            <div className="space-y-4 text-center md:text-left">
                                <p className="text-sm uppercase tracking-[0.28em]" style={{color: 'var(--color-nav)'}}>
                                    My Lenses / Andrei Pascu
                                </p>
                                <h1 className="font-display text-4xl leading-none text-appText sm:text-5xl lg:text-[4.25rem]">
                                    Capturing life&apos;s unforgettable moments with calm, depth, and presence.
                                </h1>
                                <p className="max-w-2xl text-lg leading-8" style={{color: 'var(--color-muted)'}}>
                                    "Fueled by an insatiable curiosity to capture every fleeting detail, I believe each second holds the potential to become a masterpiece."
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-3">
                            {highlights.map((item) => (
                                <div
                                    key={item.label}
                                    className="surface-panel-soft rounded-[1.5rem] p-4"
                                >
                                    <p className="font-display text-3xl text-appText">{item.value}</p>
                                    <p className="mt-2 text-xs uppercase tracking-[0.22em]" style={{color: 'var(--color-nav)'}}>
                                        {item.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </article>

                <article className="relative min-h-[560px] overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-2xl shadow-black/20">
                    {heroPhoto && (
                        <>
                            <img
                                loading="eager"
                                src={heroPhoto.src}
                                alt={heroPhoto.title}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/10"/>
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.18),_transparent_30%)]"/>
                            <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
                                <p className="text-xs uppercase tracking-[0.28em] text-white/60">
                                    Featured work
                                </p>
                                <h2 className="mt-3 font-display text-4xl">{heroPhoto.title}</h2>
                                <p className="mt-3 max-w-xl text-sm uppercase tracking-[0.2em] text-white/60">
                                    {heroPhoto.location}
                                </p>
                                <p className="mt-4 max-w-2xl text-base leading-7 text-white/80">
                                    {heroPhoto.description}
                                </p>
                            </div>
                        </>
                    )}
                </article>
            </div>

            <article
                id="story"
                className="surface-panel scroll-mt-24 rounded-[2rem] p-6 md:scroll-mt-28 md:p-8"
            >
                <div className="flex items-center gap-4">
                    <div
                        className="h-px flex-1"
                        style={{backgroundImage: 'linear-gradient(90deg, transparent, rgba(var(--accent-color), 0.35), transparent)'}}
                    />
                    <p className="text-xs uppercase tracking-[0.34em]" style={{color: 'var(--color-nav)'}}>My journey</p>
                    <div
                        className="h-px flex-1"
                        style={{backgroundImage: 'linear-gradient(90deg, transparent, rgba(var(--accent-color), 0.35), transparent)'}}
                    />
                </div>

                <div className="mt-7 grid gap-6 md:grid-cols-2">
                    <div className="space-y-5 text-base leading-8" style={{color: 'var(--color-muted)'}}>
                        <p>
                            My journey began in the <span className="text-appText">mystical heart of Transylvania</span>, Romania, a land of foggy forests and ancient castles where myth meets reality. It was there that my passion for capturing nature&apos;s raw beauty was born.
                        </p>
                        <p>
                            After dedicating over 25 years to professional basketball as both a player and a coach, and nearly a decade navigating the dynamic corporate world, I realized that life is fleeting and every moment deserves to be immortalized.
                        </p>
                    </div>

                    <div className="space-y-5 border-t pt-6 text-base leading-8 md:border-l md:border-t-0 md:pl-6 md:pt-0" style={{color: 'var(--color-muted)', borderColor: 'var(--color-line)'}}>
                        <p>
                            <span className="text-appText">Photography</span> became my gateway to freeze time, capturing the spirit and emotion of life&apos;s most candid moments.
                        </p>
                        <p>
                            Every frame tells a story, whether it&apos;s the subtle smile of a stranger, the grandeur of nature, or the vibrant pulse of urban life. My goal is to preserve these moments, inviting you to pause and savor the beauty of the present.
                        </p>
                    </div>
                </div>
            </article>

            <aside className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {featuredPhotos.slice(1, 5).map((photo: any) => (
                    <article
                        key={photo.title}
                        className="group relative overflow-hidden rounded-[1.75rem] bg-black shadow-xl shadow-black/15"
                        style={{border: '1px solid var(--color-line)'}}
                    >
                        <img
                            loading="lazy"
                            src={photo.src}
                            alt={photo.title}
                            className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"/>
                        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                            <p className="text-[10px] uppercase tracking-[0.26em] text-white/60">
                                {photo.category} {photo.location ? ` / ${photo.location}` : ''}
                            </p>
                            <h3 className="mt-2 font-display text-2xl">{photo.title}</h3>
                        </div>
                    </article>
                ))}
            </aside>
        </section>
    );
};

export default PhotographerDescriptionCard;
