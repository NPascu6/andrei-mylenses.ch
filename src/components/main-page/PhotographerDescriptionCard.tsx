import React, {useMemo, useState} from "react";
import {useSelector} from "react-redux";
import ExpandableImage from "../common/ExpandableImage";
import {RootState} from "../../store/store";
import SelectedPhoto from "./SelectedPhoto";

interface PhotographerDescriptionCardProps {
    artistImage: string;
}

const PhotographerDescriptionCard: React.FC<PhotographerDescriptionCardProps> = ({artistImage}) => {
    const photos = useSelector((state: RootState) => state.app.photos);
    const [selectedShowcaseIndex, setSelectedShowcaseIndex] = useState<number | null>(null);
    const featuredPhotos = photos.filter((photo: {featured?: boolean}) => photo.featured).slice(0, 5);
    const heroPhoto = featuredPhotos[0] || photos[0];
    const showcasePhotos = useMemo(() => featuredPhotos.slice(0, 5), [featuredPhotos]);
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
                    <div className="relative space-y-7 p-6 md:p-8">
                        <div className="grid gap-5 md:grid-cols-[auto_minmax(0,1fr)] md:items-center">
                            <div className="relative mx-auto md:mx-0">
                                <div className="absolute -inset-3 rounded-full blur-2xl" style={{backgroundColor: 'rgba(var(--accent-color), 0.16)'}}/>
                                <ExpandableImage
                                    src={artistImage}
                                    alt="Andrei Pascu portrait"
                                    containerClassName="relative h-32 w-32 overflow-hidden rounded-full md:h-36 md:w-36"
                                    containerStyle={{border: '1px solid var(--color-line)'}}
                                    imgClassName="relative h-32 w-32 rounded-full object-cover shadow-2xl shadow-black/20 md:h-36 md:w-36"
                                    buttonClassName="right-0 top-0 h-7 w-7 md:right-0 md:top-0"
                                    orderDetails={undefined}
                                />
                            </div>

                            <div className="min-w-0 space-y-4 text-center md:space-y-5 md:text-left">
                                <p className="text-[10px] uppercase tracking-[0.28em] md:text-xs" style={{color: 'var(--color-nav)'}}>
                                    Fine art and travel photography
                                </p>
                                <h1 className="font-display mx-auto max-w-[7.1ch] text-[clamp(2.35rem,12vw,4.65rem)] leading-[0.9] tracking-[-0.03em] text-appText [overflow-wrap:anywhere] [text-wrap:balance] sm:max-w-[7.8ch] md:mx-0 md:max-w-[8.3ch] md:text-[clamp(3.15rem,5.1vw,4.65rem)] xl:max-w-[8.8ch]">
                                    Capturing life&apos;s unforgettable moments with calm, depth, and presence.
                                </h1>
                                <p className="max-w-2xl text-base leading-8 md:text-[1.05rem]" style={{color: 'var(--color-muted)'}}>
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
                                    <p className={`font-display text-appText ${item.value.length > 12 ? 'text-[2.2rem] leading-[0.95] sm:text-[2.45rem]' : 'text-3xl'}`}>
                                        {item.value}
                                    </p>
                                    <p className="mt-2 text-xs uppercase tracking-[0.22em]" style={{color: 'var(--color-nav)'}}>
                                        {item.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </article>

                <button
                    type="button"
                    onClick={() => showcasePhotos.length > 0 && setSelectedShowcaseIndex(0)}
                    className="group relative min-h-[560px] overflow-hidden rounded-[2rem] border border-white/10 bg-black text-left shadow-2xl shadow-black/20"
                >
                    {heroPhoto && (
                        <>
                            <ExpandableImage
                                src={heroPhoto.fullSrc || heroPhoto.src}
                                modalSrc={heroPhoto.fullSrc || heroPhoto.src}
                                alt={heroPhoto.title}
                                containerClassName="absolute inset-0"
                                imgClassName="absolute inset-0 h-full w-full object-cover"
                                orderDetails={{
                                    title: heroPhoto.title,
                                    category: heroPhoto.category,
                                    location: heroPhoto.location,
                                    notes: heroPhoto.description,
                                    permalink: heroPhoto.permalink,
                                }}
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
                </button>
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
                {showcasePhotos.slice(1, 5).map((photo: any, index: number) => (
                    <button
                        type="button"
                        key={photo.title}
                        onClick={() => setSelectedShowcaseIndex(index + 1)}
                        className="group relative overflow-hidden rounded-[1.75rem] bg-black shadow-xl shadow-black/15"
                        style={{border: '1px solid var(--color-line)'}}
                    >
                        <ExpandableImage
                            src={photo.src}
                            modalSrc={photo.fullSrc || photo.src}
                            alt={photo.title}
                            imgClassName="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                            orderDetails={{
                                title: photo.title,
                                category: photo.category,
                                location: photo.location,
                                notes: photo.description,
                                permalink: photo.permalink,
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"/>
                        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                            <p className="text-[10px] uppercase tracking-[0.26em] text-white/60">
                                {photo.category} {photo.location ? ` / ${photo.location}` : ''}
                            </p>
                            <h3 className="mt-2 font-display text-2xl">{photo.title}</h3>
                        </div>
                    </button>
                ))}
            </aside>

            {selectedShowcaseIndex !== null && showcasePhotos.length > 0 && (
                <SelectedPhoto
                    images={showcasePhotos}
                    index={selectedShowcaseIndex}
                    setIndex={setSelectedShowcaseIndex}
                    onClose={() => setSelectedShowcaseIndex(null)}
                />
            )}
        </section>
    );
};

export default PhotographerDescriptionCard;
