import event from "../assets/event.jpg";
export default function EventCard() {
    return (
        <>
            <div className="border-l-4 border-yellow-400 text-black p-2 rounded-xl shadow-lg w-full mx-auto">
                <img
                    src={event}
                    alt="event"
                    className="w-full h-50 object-cover"
                />
                <div className="p-4">
                    <div className="py-3 mb-4 md:mb-0">
                        <h2 className="text-2xl text-yellow-900 font-bold mb-2">
                            Tech Workshop: Student Groups' Project Presentation
                        </h2>
                        <p className="mt-1 text-sm ">
                            Explore a range of projects presented by student
                            groups, reflecting teamwork, innovation, and
                            practical learning.
                        </p>
                    </div>
                    <div className="text-sm">
                        <p className="mb-1">
                            <span className="font-semibold">Place:</span> Souss
                            Massa Tech Academy
                        </p>
                        <p>
                            <span className="font-semibold">Date:</span> June 2,
                            2025
                        </p>
                        <p>
                            <span className="font-semibold">Time:</span> 11h00
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
