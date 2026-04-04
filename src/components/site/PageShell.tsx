import React from 'react';

interface PageShellProps {
    children: React.ReactNode;
    className?: string;
}

const PageShell: React.FC<PageShellProps> = ({
    children,
    className = '',
}) => (
    <main className={`mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 pb-16 pt-5 md:gap-6 md:px-6 ${className}`.trim()}>
        {children}
    </main>
);

export default PageShell;
