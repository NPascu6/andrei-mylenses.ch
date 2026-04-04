import React from 'react';
import {Link} from 'react-router-dom';
import Favicon32 from '../../assets/favicon-32x32.png';
import {artistName, siteTitle} from '../../config/site';

const TopBar = () => {
    return (
        <header className="sticky top-0 z-50 border-b backdrop-blur-2xl" style={{borderColor: 'var(--color-line)', backgroundColor: 'color-mix(in srgb, var(--color-bg) 76%, transparent)'}}>
            <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-6 md:py-4">
                <Link to="/" className="flex min-w-0 flex-1 items-center gap-4 text-left">
                    <img
                        loading="eager"
                        className="h-12 w-12 rounded-full object-cover shadow-lg shadow-black/10 md:h-14 md:w-14"
                        style={{border: '1px solid var(--color-line)'}}
                        src={Favicon32}
                        alt={siteTitle}
                    />
                    <div className="min-w-0">
                        <p className="font-display text-[1.15rem] uppercase tracking-[0.22em] text-appText md:text-[1.7rem]">
                            {siteTitle}
                        </p>
                        <p className="text-[9px] uppercase tracking-[0.26em] md:text-[0.72rem]" style={{color: 'var(--color-nav)'}}>
                            Fine art photography by {artistName}
                        </p>
                    </div>
                </Link>
            </div>
        </header>
    );
};

export default TopBar;
