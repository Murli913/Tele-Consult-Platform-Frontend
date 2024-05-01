import { MdDashboard } from "react-icons/md";
import { GoHistory } from "react-icons/go";
import { GoPlusCircle } from "react-icons/go";
import { BiLogOutCircle } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function PSidebar() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/");
        }
    }, []);

    function gotoclear() {
        // Clear the localStorage
        localStorage.clear();
    }

    return (
        <div className="side-content bg-gray-700 text-white rounded-lg w-60 h-screen fixed top-20 left-0 z-10 shadow-md flex flex-col">
            <div className="top-buttons flex flex-col mt-8">
                <Link to="/home" className='btn btn-home text-lg font-semibold flex items-center justify-center p-4 rounded-l-lg hover:bg-purple-600 transition duration-300'>
                    <MdDashboard className="text-2xl" />
                    <span className="ml-2">Dashboard</span>
                </Link>
                <Link to="/book" className='btn btn-bnow text-lg font-semibold flex items-center justify-center p-4 hover:bg-purple-600 transition duration-300'>
                    <GoPlusCircle className="text-2xl mr-3 " />
                    <span className="mr-3">Book Now</span>
                </Link>
                <Link to="/history" className='btn btn-history text-lg font-semibold flex items-center justify-center p-4 hover:bg-purple-600 transition duration-300'>
                    <GoHistory className="text-2xl mr-3" />
                    <span className=" mr-8">History</span>
                </Link>
            </div>
            <Link to="/" className='btn logout-btn text-lg font-semibold flex items-center justify-center p-4 rounded-b-lg hover:bg-purple-600 transition duration-300'>
                <BiLogOutCircle className="text-2xl mr-3 mt-100" />
                <span className="mr-8 mt-100" >Logout</span>
            </Link>
        </div>
    );
}

export default PSidebar;
