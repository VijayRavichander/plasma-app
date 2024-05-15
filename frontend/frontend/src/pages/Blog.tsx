import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useBlog } from "../hooks"
import { EntireBlog } from "../components/EntireBlog";
import { AppBar } from "../components/AppBar";



export const Blog = () => {

    const {id} = useParams();

    const {loading, blog} = useBlog({
        id: id || "", 
    }); 

    if(loading || !blog){
        return <div>
        <AppBar/>
        <div className="grid grid-cols-12 gap-4 px-10 w-full my-2">
        {/* Left Section Skeleton */}
        <div className="col-span-8 animate-pulse">
            <div className="h-6 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
        </div>
    
        {/* Right Section Skeleton */}
        <div className="col-span-4 animate-pulse">
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="flex items-center">
                <div className="h-12 w-12 bg-gray-300 rounded-full mr-4"></div>
                <div className="flex flex-col justify-center">
                    <div className="h-4 w-24 bg-gray-300 rounded mb-1"></div>
                    <div className="h-4 w-20 bg-gray-300 rounded"></div>
                </div>
            </div>
        </div>
    </div>
    </div>
    }
    return <div className="">
            <EntireBlog blog = {blog}/>
    </div>
}