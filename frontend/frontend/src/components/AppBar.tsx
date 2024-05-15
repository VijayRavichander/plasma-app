import { Link, useNavigate } from "react-router-dom"
import { Avatar } from "./BlogCard"


export const AppBar = ({sortBlogs}: {sortBlogs?: () => void  | null }) => {

    const navigate = useNavigate();

    const name = localStorage.getItem("name") || "Anonymous";

    const LogOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        navigate("/signin");
    }



    return <div className="flex justify-between border-b border-slate-200 bg-emerald-600 p-5">
        <div className="flex flex-col justify-center font-bold">
            PLASMA
        </div>
        <div className="flex justify-around">
            {
                sortBlogs ?  
                <div className="flex flex-col justify-center  h-full mx-3">
                    <button onClick={sortBlogs}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                        </svg>
                    </button>
                </div> : <></>
            }
            <Link to = "/publish">
                <div className="flex flex-col justify-center  h-full mx-5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="rgb(22 163 74)" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </div>
            </Link>
            <Link to = "/blogs">
            <div>   
                <Avatar name={name} size="big" />
            </div>
            </Link>
            <div>
                <button type="button" onClick = {LogOut} className="mx-5 text-white bg-zinc-700 hover:bg-zinc-950 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Logout</button>
            </div>
        </div>

    </div>
}