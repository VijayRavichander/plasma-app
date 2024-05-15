import { Link } from "react-router-dom"

interface BlogCardProps {
    name: string, 
    title: string,
    content:  string, 
    id: string, 
    createdAt: string
}

export function convertDate(date: string) {

    const curDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "long", year: "numeric" };
    const formattedDate = curDate.toLocaleDateString("en-US", options);
    console.log(formattedDate);
    return formattedDate;
}


export const BlogCard = ({id, name, createdAt, title, content}: BlogCardProps) => {

    return <Link to = {`/blog/${id}`}>
        <div className="border-b border-green-400 my-1 p-4 w-screen max-w-screen-md cursor-point ">
        <div className="flex">
            <div className="flex flex-col justify-center my-1">
                <Avatar name = {name} size = {"small"}/>
            </div>
            <div className="flex flex-col justify-center font-light mx-3">
                {name} | {convertDate(createdAt)}
            </div>
        </div>

        <div className="font-bold">
            {title}
        </div>

        <div className="font-extralight">
            {content.slice(0, 80) + "....."}
        </div>

        <div className="text-sm font-thin">
            {Math.floor(content.length / 1000) + 1 + " min(s) read"}
        </div>
    </div>
    </Link>
    
}


export function Avatar({name, size = "small"} : {name: string, size: "small" | "big"} ) {
    return <div className={`relative inline-flex items-center justify-center ${size === "small" ? "w-6 h-6" : "w-10 h-10"} overflow-hidden bg-gray-300 rounded-full`}>
        <span className={`${size === "small" ? "text-sm": "text-md"} text-gray-600 =`}>{name[0]}</span>
    </div>
    
}