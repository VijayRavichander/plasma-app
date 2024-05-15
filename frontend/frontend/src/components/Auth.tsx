import { SignupInput} from "@100xdevs/medium-common"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios  from "axios"
import {BACKEND_URL} from "../config"

export const Auth = ({type} : {type: "signup" | "signin"}) => {

    const navigate = useNavigate();
    const [err, setErr] = useState(false)

    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "", 
        username: "", 
        password: ""
    })


    async function sendRequest() {

        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type == "signin" ? "signin" : "signup"}`, postInputs);
            const jwt = response.data.jwt;
            const name = response.data.name;

            localStorage.setItem("token", `Bearer ${jwt}`);
            localStorage.setItem("name", `${name ? name: ""}`);
            setErr(false)
            navigate("/blogs")
            
        }catch(e){
            setErr(true)
            setTimeout(() => {
                setErr(false)
            }, 5000)
        }

    }



    return <div className="h-screen flex flex-col justify-center">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                    <div className="text-3xl font-extrabold">
                        {type === "signin" ? "Log into an account" : "Create an account"}
                    </div>
                    <div className="text-slate-500">
                    {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                        <Link className = "pl-2 underline text-slate-500" to = {type === "signup" ? "/signin" : "/signup"}>
                            {type === "signup" ? "Login" : "Signup"}</Link>
                    </div>
                </div>
                <div className="pt-5">
                   {type == "signup" ? <LabelledInput label = "Userame" placeholder="Vijay..."  onChange={(e) => {
                                setPostInputs(c => ({
                                ...c, 
                                name: e.target.value
                            }))
                        }} />: null} 

                    <LabelledInput label = "Email" placeholder="vijay@gmail.com"  onChange={(e) => {
                                setPostInputs(c => ({
                                    ...c, 
                                    username: e.target.value
                                }))
                            }} />

                    <LabelledInput label = "Password" type = "password" placeholder="qwerty"  onChange={(e) => {
                                setPostInputs(c => ({
                                    ...c, 
                                    password: e.target.value
                                }))
                            }} />
                    
                    <button type="button" onClick = {sendRequest} className="mt-5 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 
                    focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{type === "signup" ? "Sign Up" : "Sign In"}</button>
                </div>
                <div>
                    {type === "signin" && err === true ? <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Wrong Credentials</span>: <></>}
                    {type === "signup" && err === true ? <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Something Went Wrong!</span>: <></>}

                </div>
            </div>

        </div>

    </div>
}


interface LabelledInputType {
    label: string,
    placeholder: string, 
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type? : string
}

function LabelledInput({label, placeholder, onChange, type} : LabelledInputType){

    return <div className="mt-1">
    <label className="block mb-1 text-sm font-semibold">{label}</label>
    <input onChange={onChange} type={type || "text"} id={label} className="border border-gray-300 text-sm rounded-lg block w-full p-2.5" placeholder={placeholder} required />
</div>
}