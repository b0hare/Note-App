import { MdMailOutline } from "react-icons/md";
import { handleOTP } from "../../../../Utils/form";

function GetOtp({ email, setOtp }) {
    return(
        <button type="button" className="bg-[#faeddc] flex justify-center items-center gap-2 text-[#FE6C24] text-sm font-semibold p-2 rounded-md cursor-pointer transition-all duration-300 active:scale-95 " onClick={() => {
            handleOTP(setOtp, email)
        }}><MdMailOutline size={20} /> Get Verification Code</button>
        
    )
}

export default GetOtp
