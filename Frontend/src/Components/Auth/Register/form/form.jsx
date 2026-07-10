import NameField from "./name.jsx";
import EmailField from "./email.jsx";
import GetOtp from './otpBtn.jsx';
import OtpField from './OtpVerify.jsx';
import PassField from './password.jsx';
import ConfPass from './confPass.jsx';
import FormSubmit from "./submitBtn.jsx";
import ServicePolicy from "./servicePolicy.jsx";

function RegisterForm() {

    return (
        <form className="flex flex-col gap-3 bg-transparent " action="" method="" onSubmit={(e) => {
            e.preventDefault()
        }}>

            <NameField />
            <EmailField />
            <GetOtp />
            <OtpField />
            <PassField />
            <ConfPass />
            <ServicePolicy />
            <FormSubmit />

        </form>
    )
}

export default RegisterForm