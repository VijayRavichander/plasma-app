import { Auth } from "../components/Auth"
import { Testimonial } from "../components/Testimonial"

export const Signup = () => {

return <div>
    <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
            <Auth type = "signup"/>
        </div>
        <div className="invisible lg:visible">
            <Testimonial />
        </div>
    </div>
</div>
}