import React from "react";
import Instagram from "../../assets/icons/Instagram";
import WhatsApp from "../../assets/icons/WhatsApp";
import Email from "../../assets/icons/Email";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

const BottomBar = () => {
    const isDarkTheme = useSelector((state: RootState) => state.app.isDarkTheme);

    return <div className="flex justify-evenly space-x-4 items-center" style={{height: "3em"}}>
        <a href="https://www.instagram.com/andrei_mylenses/" target="_blank" rel="noopener noreferrer">
            <Instagram color={isDarkTheme ? 'black' : 'white'} width='30' height='30'/>
        </a>
        <a href="tel:+41795718784" target="_blank" rel="noopener noreferrer">
            <WhatsApp color={isDarkTheme ? 'green' : 'green'} width='30' height='30'/>
        </a>
        <a href="mailto:andrei.pascu86@yahoo.com">
            <Email color={isDarkTheme ? 'black' : 'white'} width='30' height='30'/>
        </a>
    </div>
}

export default BottomBar;