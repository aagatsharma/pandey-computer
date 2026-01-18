import { ClipLoader } from "react-spinners"


const Loader = () => {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <ClipLoader color="var(--primary)" />
        </div>
    )
}

export default Loader