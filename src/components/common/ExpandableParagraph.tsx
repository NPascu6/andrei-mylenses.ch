import {useState} from "react";

/**
 * ExpandableParagraph renders text that is initially clamped to one line with ellipsis.
 * When clicked, it toggles between showing the truncated text and the full text.
 */
const ExpandableParagraph: React.FC<{ children: React.ReactNode }> = ({
                                                                          children,
                                                                      }) => {
    const [expanded, setExpanded] = useState<boolean>(false);

    const toggleExpand = () => setExpanded((prev) => !prev);

    return (
        <div className="relative mt-1 cursor-pointer" onClick={toggleExpand}>
            <div className={`transition-all duration-300 ${!expanded ? "line-clamp-2" : ""}`}>
                {children}
            </div>
        </div>
    );
};

export default ExpandableParagraph;