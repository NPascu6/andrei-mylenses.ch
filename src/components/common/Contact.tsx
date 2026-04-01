import React from 'react';

const Instagram = React.lazy(() => import('../../assets/icons/Instagram'));
const WhatsApp = React.lazy(() => import('../../assets/icons/WhatsApp'));
const Email = React.lazy(() => import('../../assets/icons/Email'));

const Contact = ({showTitle = true}) => {
    return <>
        {showTitle && <h1 className='p-3 m-2 text-center font-bold text-appText'>
            Feel free to contact me for any questions or inquiries on any of the available options.
        </h1>}
        <div className="flex justify-evenly space-x-4 mt-4 pt-3 mb-3 ">
            <a className="theme-link" href="https://www.instagram.com/andrei_mylenses/" target="_blank" rel="noopener noreferrer">
                <Instagram color='currentColor' width='30' height='30'/>
            </a>
            <a className="theme-link" href="tel:+41795718784" target="_blank" rel="noopener noreferrer">
                <WhatsApp color='currentColor' width='30' height='30'/>
            </a>
            <a className="theme-link" href="mailto:andrei.pascu86@yahoo.com">
                <Email color='currentColor' width='30' height='30'/>
            </a>
        </div>
    </>

}

export default Contact
