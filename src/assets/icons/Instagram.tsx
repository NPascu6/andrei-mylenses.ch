const Instagram = ({color, height = '24', width = '24'}: any) => {
    return <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-instagram"
                width={width} height={height}
                viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill={color || "none"} strokeLinecap="round"
                strokeLinejoin="round">
        <path stroke={"none"} d="M0 0h24v24H0z" fill="none"></path>
        <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z"></path>
        <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
        <path d="M16.5 7.5l0 .01"></path>
    </svg>


}

export default Instagram;