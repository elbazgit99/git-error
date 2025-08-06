import { Button } from "./ui/button";

export default function DeleteConforme(props) {
    return (
        <>
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm text-center">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Are you sure?
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button
                            onClick={props.annule}
                            className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={props.conforme}
                            className="bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Confirm
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
// translate-x-[-50]  left-[50%]
