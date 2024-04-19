import React from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa"; // Import Google icon
import { AiOutlineGoogle } from "react-icons/ai"; // Import Google icon
import { GrLogin } from "react-icons/gr";

const Login = () => {
    const navigate = useNavigate();

    const gotoSD = () => {
        // Navigate to senior doctor page
        navigate("/loginsd");
    };

    const gotoP = () => {
        // Navigate to patient page
        navigate("/patient");
    };

    const gotoD = () => {
        // Navigate to login doctor page
        navigate("/logind");
    };

    const gotomaindash = () => {
        // Navigate to main dashboard
        navigate("/");
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="popup-form absolute mt-12 text-black">
                <form className="w-80 md:w-96 h-97 mt-0 mb-6 space-y-5 bg-white p-8 rounded-xl shadow-lg">
                    <img
                        src="https://assets-v2.lottiefiles.com/a/7635dd88-116a-11ee-b318-ffcf40e06a51/IGkyaw4lBV.gif"
                        alt="Hospital"
                        className="w-full h-60 mb-4 rounded-lg object-cover"
                    />
                    <h1 className="text-4xl font-semibold text-center text-backgroundColor">
                        Login In
                    </h1>

                    <div className="flex flex-col space-y-4">
                        {/* Button for Senior Doctor login */}
                        <button
                            className="bg-[#d5f2ec] text-black py-3 px-4 rounded-lg flex items-left justify-center gap-2 hover:bg-[#9fe6d7]"
                            onClick={gotoSD}
                        >
                            <GrLogin size={24} />
                            <span>Login as Senior Doctor</span>
                        </button>

                        {/* Button for Patient login */}
                        <button
    className="bg-[#d5f2ec] text-black py-3 px-4 rounded-lg flex items-center gap-2 justify-left hover:bg-[#9fe6d7]"
    onClick={gotoP}
>
    <GrLogin size={24} className="flex-shrink-0" />
    <span className="flex-shrink">Login as Patient</span>
</button>


                        {/* Button for Doctor login */}
                        <button
                            className="bg-[#d5f2ec] text-black py-3 px-4 rounded-lg flex items-center justify-leftr gap-2 hover:bg-[#9fe6d7]"
                            onClick={gotoD}
                        >
                            <GrLogin size={24}  className="flex-shrink-0"/>
                            <span className="flex-shrink">Login as Doctor</span>
                        </button>
                    </div>

                    {/* Close button with increased size and different styling */}
                    <button
                        className="bg-backgroundColor text-white px-10 py-3 rounded-lg hover:bg-red-600 transition duration-300 w-full"
                        onClick={gotomaindash}
                    >
                        Close
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
