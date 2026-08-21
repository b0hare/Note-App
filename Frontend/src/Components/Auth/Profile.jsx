import { useContext } from "react";
import { ThemeData, UserData } from "../../Utils/NotesFunctionalities";
import { FaRegUser } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { IoExitOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { Pencil } from 'lucide-react';


function UserProfile() {
    const { user } = useContext(UserData)
    const { theme } = useContext(ThemeData)
    return (
        <div className={`p-2 ${theme === "dark" ? "text-white" : "text-black"}`}>
            <h2 className="text-xl font-semibold">Profile</h2>
            <p className="text-xs text-gray-400">View and manage your account information.</p>

            <div className="border-solid border-1 border-gray-900 flex gap-10 p-7 my-3 rounded-md">

                <img src="https://i.ibb.co/39c0G01W/Copilot-20260819-224945.png" alt="profile image" className="w-[100px] h-[100px] rounded-full object-cover" />

                <div className="flex flex-col gap-2 w-full">

                    <div className="flex items-center justify-between border-b border-gray-800 py-2">
                        <div className="flex items-center justify-center gap-2">
                            <FaRegUser className="text-blue-500" />
                            <div className="flex flex-col">
                                <label className="text-xs text-gray-400" htmlFor="Name">Name</label>
                                <input type="text" name="Name" id="Name" value={user?.name || "Profile"} readOnly />
                            </div>
                        </div>

                        <button className={`cursor-pointer p-2 rounded-md ${theme === 'light' ? 'bg-[#efeaff]' : 'bg-[#161629]'} self-end`} >
                            <Pencil color="#a855f7" size={16} />
                        </button>
                    </div>

                    <div className="flex items-center justify-between border-b border-gray-800 py-2">
                        <div className="flex items-center justify-center gap-2">
                            <CiMail className="text-blue-500 text-xl" />
                            <div className="flex flex-col">
                                <label className="text-xs text-gray-400" htmlFor="Email">Email</label>
                                <input type="text" name="Email" id="Email" value={`${user?.name || "Profile"}@gmail.com`} readOnly />
                            </div>
                        </div>

                        <button className={`cursor-pointer p-2 rounded-md ${theme === 'light' ? 'bg-[#efeaff]' : 'bg-[#161629]'} self-end`} >
                            <Pencil color="#a855f7" size={16} />
                        </button>
                    </div>

                    <div className="flex items-center justify-between border-b border-gray-800 py-2">
                        <div className="flex items-center justify-center gap-2">
                            <SlCalender className="text-blue-500 text-xl" />
                            <div className="flex flex-col">
                                <label className="text-xs text-gray-400" htmlFor="Member">Member Since</label>
                                <input type="text" name="Member" id="Member" value={"12-Aug-2026"} readOnly />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="flex items-center justify-between border-solid border-1 border-gray-900 flex gap-10 p-7 my-3 rounded-md">
                <div>
                    <h2 className="font-semibold">Account</h2>
                    <p className="text-xs text-gray-400">Manage Your Account</p>
                </div>

                <button className="text-red-500 flex items-center gap-3 border-1 rounded p-2 w-[150px] justify-center">
                    <IoExitOutline className="text-red-500 text-xl" />
                    <p>Logout</p>
                </button>

                <button className="text-red-700 flex items-center gap-3 border-1 rounded p-2 justify-center">
                    <MdDeleteOutline className="text-red-500 text-xl" />
                    <p className="font-semibold">Delete Account</p>
                </button>
            </div>
        </div>
    )
}

export default UserProfile;