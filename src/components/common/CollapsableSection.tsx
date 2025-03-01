import React, {useState} from "react";
import {JsxElement} from "typescript";

const ChevronDown = React.lazy(() => import('../../assets/icons/ChevronDown'));
const ChevronUp = React.lazy(() => import('../../assets/icons/ChevronUp'));

interface CollapsibleSectionpProps {
    title?: string,
    children?: JsxElement | any
}

function CollapsibleSection({title, children}: CollapsibleSectionpProps) {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSection = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="select-none mt-1 " id='collapsable-section'>
            <div className="p-2 m-2 flex space-between cursor-pointer shadow-xl rounded-lg" onClick={toggleSection}>
                <div className='w-full text-sm font-bold alig-center'>
                    <div className={isOpen ? 'w-full' : 'w-full'}>{title}</div>
                </div>
                <div> {isOpen ? <ChevronUp/> : <ChevronDown/>}</div>
            </div>
            <div className="shadow-xl" id="collapsable-section-body" style={{marginTop: isOpen ? '-1em' : '-0.5em'}}>
                {isOpen && children}
            </div>
        </div>
    );
}

export default CollapsibleSection