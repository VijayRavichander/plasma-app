
import { useNavigate, useParams } from "react-router-dom"
import { Blog } from "../hooks"
import { AppBar } from "./AppBar"
import { Avatar, convertDate } from "./BlogCard"
export const EntireBlog = ({blog}: {blog : Blog}) => {

    const navigate = useNavigate();
    const params = useParams();

    const username = localStorage.getItem("name") || "";

    return <div className="">
        <AppBar />
     <div className="grid grid-cols-12 px-10 w-full my-2">
            <div className="col-span-8 px-2">
                <div className="text-2xl font-bold">
                    {blog.title}
                </div>
                <div className="text-sm font-light">
                    {convertDate(blog.createdAt)}
                </div>
                <div className="text-base text-justify">
                    {blog.content}
                </div>
            </div>
            <div className="col-span-4 px-2">
                <div className="text-base font-bold">
                    Author
                </div>
                <div className="flex w-full">
                    <div className="pr-4">
                        <Avatar name = {blog.author.name || "Anonymous"} size = "big" />
                    </div>
                    <div className="flex flex-col justify-center">
                        {blog.author.name || "Anonymous"}
                    </div>

                </div> 
                <div>
                {   username == blog.author.name ? 
                    <div>
                        <button onClick = {() => {navigate(`/edit/${params.id}`)}}className="my-5 text-black bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Edit Your Blog</button>
                    </div> : <></>
                }
                </div>
            </div>
        </div>
    </div>

}