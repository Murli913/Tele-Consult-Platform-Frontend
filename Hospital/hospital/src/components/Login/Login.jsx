import React from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa"; // Import Google icon
import { AiOutlineGoogle } from "react-icons/ai"; // Import Google icon

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
                <form className="w-80 md:w-96 space-y-5 bg-white p-5 rounded-xl">
                    <h1 className="text-4xl font-semibold text-center text-backgroundColor">
                        Login In
                    </h1>

                    <div className="flex flex-col space-y-3">
                        {/* Button for Senior Doctor login */}
                        <button
                            className="bg-[#d5f2ec] text-black py-3 px-2 rounded-lg flex items-center gap-2"
                            onClick={gotoSD}
                        >
                            <FaGoogle size={24} />
                            <span>Login as Senior Doctor</span>
                        </button>

                        {/* Button for Patient login */}
                        <button
                            className="bg-[#d5f2ec] text-black py-3 px-2 rounded-lg flex items-center gap-2"
                            onClick={gotoP}
                        >
                            <AiOutlineGoogle size={24} />
                            <span>Login as Patient</span>
                        </button>

                        {/* Button for Doctor login */}
                        <button
                            className="bg-[#d5f2ec] text-black py-3 px-2 rounded-lg flex items-center gap-2"
                            onClick={gotoD}
                        >
                            <FaGoogle size={24} />
                            <span>Login as Doctor</span>
                        </button>
                    </div>

                    {/* Close button */}
                    <button
                        className="bg-backgroundColor text-white px-10 rounded-md active:bg-red-500"
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
