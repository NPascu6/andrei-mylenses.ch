const Email = ({color, height = '24', width = '24'}: any) => {
    return <svg xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-mail" width={width}
                height={height} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill={color || "none"}
                strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path>
        <path d="M3 7l9 6l9 -6"></path>
    </svg>
}

export default Email;