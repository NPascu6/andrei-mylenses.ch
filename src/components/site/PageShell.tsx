import React from 'react';

interface PageShellProps {
    children: React.ReactNode;
    className?: string;
}

const PageShell: React.FC<PageShellProps> = ({
    children,
    className = '',
}) => (
    <main
        className={`mx-auto flex w-full max-w-[96rem] flex-col gap-5 px-4 pb-16 pt-5 md:gap-6 md:px-6 xl:px-[15.5rem] 2xl:px-[16.5rem] ${className}`.trim()}
    >
        {children}
    </main>
);

export default PageShell;
