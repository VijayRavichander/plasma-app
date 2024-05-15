
import { useState } from "react"
import { AppBar } from "../components/AppBar"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"
export const Publish = () => {

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const navigate = useNavigate()
    
    return <div>
        <AppBar />
        <div className="flex justify-center max-w-screen-xl w-screen">
            <div className="max-w-screen-lg w-full">
                <div className="w-full my-2">
                    <label className="block mb-2 text-md font-bold text-gray-900">Title</label>
                    <textarea onChange = {(e) => {
                        setTitle(e.target.value)
                    }}   
                    id="message" rows={1} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border" placeholder="Title....."></textarea>
                </div>
                <div>
                    <div className="bg-white rounded-b-lg w-full my-2">
                        <label  className="block mb-2 text-md font-bold text-gray-900">Your Story</label>
                        <textarea onChange = { (e) => {
                            setDesc(e.target.value)
                        }}
                        id="editor" rows={24} className="block w-full p-2.5 text-sm text-gray-800 bg-gray-50 border rounded-lg" placeholder="Write an article..." required ></textarea>
                    </div>
                </div>
                <button onClick = {
                    async () => {
                        const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                            title, 
                            content: desc
                        }, {
                            headers: 
                            {
                                Authorization: localStorage.getItem('token')
                            }
                        });
                    navigate(`/blog/${response.data.id}`)
                    }
                }
                type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Publish</button>
            </div>
            
        </div>

    </div>
    


}