import React from 'react';

interface SectionHeadingProps {
    eyebrow?: string;
    title: string;
    description?: string;
    action?: React.ReactNode;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
    eyebrow,
    title,
    description,
    action,
}) => (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl space-y-3">
            {eyebrow ? (
                <p className="eyebrow-text text-[11px] uppercase tracking-[0.3em]">
                    {eyebrow}
                </p>
            ) : null}
            <h2 className="font-display text-3xl text-appText md:text-5xl">{title}</h2>
            {description ? (
                <p className="max-w-2xl text-base leading-8 text-muted-token">{description}</p>
            ) : null}
        </div>
        {action ? <div className="flex shrink-0 flex-wrap gap-3">{action}</div> : null}
    </div>
);

export default SectionHeading;
