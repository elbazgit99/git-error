export default function CourseCard(props) {
    return (
        <>
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
                <img
                    className="w-full h-50 object-cover"
                    src={props.img}
                    alt="Course Image"
                />
                <div className="p-5">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                        {props.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4">
                        {props.description}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-700">
                        <span className="font-medium">Duration:</span>
                        <span>{props.duration} weeks</span>
                    </div>
                    <div className="mt-2 flex items-center">
                        <button className="ml-auto bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Program
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
