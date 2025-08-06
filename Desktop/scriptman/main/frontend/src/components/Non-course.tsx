export default function NonCourse() {
    return (
        <>
            <div className="max-w-md mx-auto bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-6 rounded-xl shadow-md flex flex-col items-center text-center">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/5957/5957810.png"
                    alt="Pending Assignment"
                    className="w-24 h-24 mb-4 opacity-90"
                />
                <h2 className="text-xl font-semibold mb-2">
                    Course Assignment Pending
                </h2>
                <p className="text-sm text-gray-700">
                    Please wait while a course is being assigned to you by the
                    responsible staff. You will be notified once it's available.
                </p>
            </div>
        </>
    );
}
