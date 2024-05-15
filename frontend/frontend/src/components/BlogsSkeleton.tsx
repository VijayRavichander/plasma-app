export const BlogsSkeleton = () => {
    return <div className="flex justify-center">
    <div className="border-b border-red-200 my-1 p-4 w-screen max-w-screen-md cursor-point animate-pulse">
    <div className="flex">

        <div className="flex flex-col justify-center my-1">
            <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
        </div>

        <div className="flex flex-col justify-center font-light mx-3">
            <div className="h-4 w-20 bg-gray-300 rounded mb-1"></div>
            <div className="h-4 w-10 bg-gray-300 rounded"></div>
        </div>
    </div>

    <div className="font-bold h-6 bg-gray-300 rounded mb-2"></div>
    <div className="font-extralight h-20 bg-gray-300 rounded mb-2"></div>
    <div className="text-sm font-thin h-4 w-20 bg-gray-300 rounded"></div>
</div>
</div>
}