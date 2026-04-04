interface ExpandIconProps {
    className?: string;
}

const ExpandIcon = ({className = 'h-4 w-4'}: ExpandIconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className={className}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3.75H3.75v4.5"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 3.75h4.5v4.5"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 15.75v4.5h-4.5"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 20.25h-4.5v-4.5"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75 3.75 3.75"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.25 9.75 6-6"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.25 14.25 6 6"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 14.25-6 6"/>
        </svg>
    );
};

export default ExpandIcon
