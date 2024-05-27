import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export interface Blog{
    "content": string, 
    "contentHTML": string,
    "title": string, 
    "id": string, 
    "createdAt": string, 
    "author": {
        "name": string
    }
}

export const useBlog = ({id}: {id: string}) => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {

        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then( response => {
                setBlog(response.data.blog);
                setLoading(false);
            }
        )
        .catch( () => {
            navigate("/signin")
        })

    }, [id])

    return {
        loading, 
        blog, 
    }
}


export const useBlogs = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/all`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then( response => {

                setBlogs(response.data.blogs);
                setLoading(false);
            }
        )
        .catch(() => {
            navigate("/signin")
        })  

    }, [])

    const sortBlogs = () => {
        setLoading(true);
        if(new Date(blogs[0].createdAt) < new Date(blogs[1].createdAt)){
            const sortedBlogs = [...blogs].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setBlogs(sortedBlogs);
        }else{
            const sortedBlogs = [...blogs].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            setBlogs(sortedBlogs);
        }
        setLoading(false);
      };
      

    return {
        loading, 
        blogs, 
        sortBlogs
    }
}