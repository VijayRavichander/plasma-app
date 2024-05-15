import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { BlogsSkeleton } from "../components/BlogsSkeleton"
import { useBlogs } from "../hooks"


export const Blogs = () => {
    const {loading , blogs,sortBlogs} = useBlogs();

    if(loading){
        return <div>
            <AppBar/>
        <div className="flex justify-center">
            <div className="h-full flex flex-col justify-center">
                <BlogsSkeleton />
                <BlogsSkeleton />
                <BlogsSkeleton />
                <BlogsSkeleton />
            </div>
        </div>
    </div>
    }

    return <div>
        <AppBar sortBlogs = {sortBlogs}/>
    <div className="flex justify-center">
        <div className="">
            {blogs.map(blog => 
            <BlogCard 
            id = {blog.id}
            name={blog.author.name || "Anonymous"} 
            title={blog.title} content={blog.content}
            createdAt={blog.createdAt} />)}
        </div>
    </div>  
</div>
}