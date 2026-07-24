function StrengthMeter(props) {
    return (
        <div className="strength-meter w-full rounded-md mt-1">
            <div className={`strength-meter bg-[#fe6602]  ${props.passMsg === "Strong Password" ? "w-[100%]" : "w-[0%]"}  h-[2px] rounded-md transition-width duration-700`}></div>
            <div className={`passMsg text-xs font-semibold m-0 `}>
                {props.passMsg}
            </div>
        </div>
    )
}

export default StrengthMeter