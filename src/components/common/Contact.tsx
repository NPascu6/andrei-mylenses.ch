import Instagram from '../../assets/icons/Instagram';
import WhatsApp from '../../assets/icons/WhatsApp';
import Email from '../../assets/icons/Email';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const Contact = () => {
    const isDarkTheme = useSelector((state: RootState) => state.app.isDarkTheme)

    return <>
        <h1 className='font-bold text-center p-3 m-2'>
            Feel free to contact me for any questions or inquiries on any of the available options.
        </h1>
        <div className="flex justify-evenly space-x-4 mt-4 pt-3 mb-3 ">
            <a href="https://www.instagram.com/andrei_mylenses/" target="_blank" rel="noopener noreferrer">
                <Instagram color={isDarkTheme ? 'black' : 'white'} width='30' height='30' />
            </a>
            <a href="tel:+41795718784" target="_blank" rel="noopener noreferrer">
                <WhatsApp color={isDarkTheme ? 'green' : 'green'} width='30' height='30' />
            </a>
            <a href="mailto:andrei.pascu86@yahoo.com">
                <Email color={isDarkTheme ? 'black' : 'white'} width='30' height='30' />
            </a>
        </div>
    </>

}

export default Contact