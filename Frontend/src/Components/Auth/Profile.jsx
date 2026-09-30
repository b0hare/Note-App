import { useContext, useEffect, useState } from "react";
import { ThemeData, UserData } from "../../Utils/NotesFunctionalities";
import { FaRegUser } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { IoExitOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { Check, Pencil, X } from 'lucide-react';
import dateFormate from "../../Utils/formateDate";
import { handleOTP, updateName, updateEmail } from "../../Utils/form";
import EmailField from "./Register/form/email";
import { MdMailOutline } from "react-icons/md";
import OtpField from "./Register/form/OtpVerify";

function UserProfile() {
    const { user } = useContext(UserData)
    const { theme } = useContext(ThemeData)

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        editName: false,
        editEmail: false,
        otp: -1,
        enteredOtp: "",
        otpRequested: false,
        isSendingOtp: false,
        verifyStatus: false,
    });

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            name: user?.name ?? "",
            email: user?.email ?? ""
        }));
    }, [user]);

    const [isHidden, setIsHidden] = useState(false)

    useEffect(() => {
        if (formData.verifyStatus) {
            setIsHidden(false)
            updateEmail(formData.email, user.userId)
            setFormData(prev => ({
                ...prev,
                otp: -1,
                otpRequested: false,
                verifyStatus: false,
                editEmail: false
            }));
        }
    }, [formData.verifyStatus])

    const sendOtp = async () => {
        const sent = await handleOTP(
            (otp) => {
                setFormData(prev => ({
                    ...prev,
                    otp
                }));
            },
            formData.email
        );

        if (sent) {
            setFormData(prev => ({
                ...prev,
                otpRequested: true
            }));
        }
    };

    return (
        <div className={`p-5 ${theme === "dark" ? "text-white" : "text-black"} relative flex flex-col`}>

            {/* Email update form  */}

            <div className={`${!isHidden ? "hidden" : "flex flex-col gap-3"} min-w-[50%] mx-auto absolute z-99 p-6 rounded-2xl bg-white/70 dark:bg-black/60 backdrop-blur-xl border border-white/30 shadow-2xl self-center`}>

                <X className="self-end absolute top-2 cursor-pointer" onClick={() => {
                    setIsHidden(false)
                    setFormData(prev => ({
                        ...prev,
                        editEmail: false
                    }));
                }} />
                <p className="font-semibold text-lg text-center">Enter new Email to update</p>

                <EmailField email={formData.email} setEmail={(email) => {
                    setFormData(prev => ({
                        ...prev,
                        email
                    }))
                }} />

                <button type="button" disabled={formData.otpRequested} className={`bg-[#faeddc] flex justify-center items-center gap-2 text-[#FE6C24] text-sm font-semibold p-2 rounded-md cursor-pointer transition-all duration-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60`} onClick={sendOtp}>
                    <MdMailOutline size={20} /> {formData.otpRequested ? "Verification Code Sent" : "Get Verification Code"}
                </button>

                {formData.otpRequested && (
                    <OtpField
                        otp={formData.otp}
                        setVerifyStatus={(verifyStatus) => {
                            setFormData(prev => ({
                                ...prev,
                                verifyStatus
                            }));
                        }}
                    />
                )}

            </div>


            {/* Page content  */}

            <div className={`${isHidden ? "blur-sm pointer-events-none select-none" : ""}`}>
                <h2 className="text-xl font-semibold">Profile</h2>
                <p className="text-xs text-gray-400">View and manage your account information.</p>

                <div className="border-solid border-1 border-gray-900 flex max-[500px]:flex-wrap gap-10 max-[500px]:gap-5 sm:p-7 p-3 my-5 rounded-md">

                    <div className="relative">
                        <img src="https://i.ibb.co/39c0G01W/Copilot-20260819-224945.png" alt="profile image" className="w-[100px] h-[100px] rounded-full object-cover" />
                        <button className={`cursor-pointer p-2 rounded-full absolute right-0 top-18 ${theme === 'light' ? 'bg-[#efeaff]' : 'bg-[#161629]'} self-end`} >
                            <Pencil color="#a855f7" size={16} />
                        </button>
                    </div>


                    <div className="flex flex-col gap-2 w-full">

                        <div className="flex items-center justify-between border-b border-gray-800 py-2">
                            <div className="flex items-center justify-center gap-2">
                                <FaRegUser className="text-blue-500" />
                                <div className="flex flex-col">
                                    <label className="text-xs text-gray-400" htmlFor="Name">Name</label>
                                    <input type="text" name="Name" id="Name" value={formData.name} onChange={(e) => {
                                        setFormData(prev => ({
                                            ...prev,
                                            name: e.target.value
                                        }));
                                    }} readOnly={!formData.editName} className={`px-2 py-1 outline-none transition-all ${formData.editName
                                        ? "border-b border-purple-500"
                                        : "border-b border-transparent"
                                        }`} />
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    if (formData.editName) {
                                        updateName(formData.name, user.userId);
                                    }

                                    setFormData(prev => ({
                                        ...prev,
                                        editName: !prev.editName
                                    }));
                                }}
                                className={`cursor-pointer p-2 rounded-md ${theme === "light" ? "bg-[#efeaff]" : "bg-[#161629]"
                                    } self-end`}
                            >
                                {formData.editName ? (
                                    <Check color="#a855f7" size={16} />
                                ) : (
                                    <Pencil color="#a855f7" size={16} />
                                )}
                            </button>
                        </div>

                        <div className="flex items-center justify-between border-b border-gray-800 py-2">
                            <div className="flex items-center justify-center gap-2">
                                <CiMail className="text-blue-500 text-xl" />
                                <div className="flex flex-col min-w-0">
                                    <label className="text-xs text-gray-400" htmlFor="Email">Email</label>
                                    {formData.editEmail ? (
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    email: e.target.value
                                                }));
                                            }}
                                            className="px-2 py-1 outline-none border-b border-purple-500"
                                        />
                                    ) : (
                                        <p className="break-all">
                                            {formData.email}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    if (formData.editEmail) {
                                        setIsHidden(true);
                                        return;
                                    }

                                    setFormData(prev => ({
                                        ...prev,
                                        editEmail: true
                                    }));
                                }} className={`cursor-pointer p-2 rounded-md ${theme === "light" ? "bg-[#efeaff]" : "bg-[#161629]"
                                    } self-end`}
                            >
                                {formData.editEmail ? (
                                    <Check color="#a855f7" size={16} />
                                ) : (
                                    <Pencil color="#a855f7" size={16} />
                                )}
                            </button>
                        </div>

                        <div className="flex items-center justify-between border-b border-gray-800 py-2">
                            <div className="flex items-center justify-center gap-2">
                                <SlCalender className="text-blue-500 text-xl" />
                                <div className="flex flex-col">
                                    <label className="text-xs text-gray-400" htmlFor="Member">Member Since</label>
                                    <p>{`${dateFormate(user?.member_since || "")}`}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="flex items-center justify-between border-solid border-1 border-gray-900 flex max-[500px]:flex-wrap gap-10 sm:p-7 p-3 my-3 rounded-md">
                    <div>
                        <h2 className="font-semibold">Account</h2>
                        <p className="text-xs text-gray-400">Manage Your Account</p>
                    </div>

                    <div className="flex gap-2 max-[500px]:flex-wrap ">
                        <button className="text-red-500 flex items-center gap-3 border-1 rounded p-2 w-[160px] justify-center" onClick={() => {
                            console.log("Logged Out");

                        }}>
                            <IoExitOutline className="text-red-500 text-xl" />
                            <p>Logout</p>
                        </button>

                        <button className="text-red-700 flex items-center gap-3 border-1 rounded p-2 justify-center">
                            <MdDeleteOutline className="text-red-500 text-xl" />
                            <p className="font-semibold">Delete Account</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;