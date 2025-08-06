import type { Course } from "./CoursePage";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

type Props = {
    courses: Course[];
    loading: boolean;
    onDelete: (id: string) => void;
    onEdit: (course: Course) => void;
};

export default function CourseTable({
    courses,
    loading,
    onDelete,
    onEdit,
}: Props) {
    if (loading) return <p>Loading...</p>;
    if (courses.length === 0) return <p>No courses available.</p>;

    return (
        <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 rounded-md text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 text-left">Title</th>
                        <th className="p-2 text-left">Description</th>
                        <th className="p-2 text-left">Code</th>
                        <th className="p-2 text-left">Duration</th>
                        <th className="p-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course._id} className="border-t">
                            <td className="p-2">{course.title}</td>
                            <td className="p-2">{course.description}</td>
                            <td className="p-2">{course.code}</td>
                            <td className="p-2">{course.duration} weeks</td>
                            <td className="p-2 flex space-x-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => onEdit(course)}
                                >
                                    <Pencil className="w-4 h-4" />
                                </Button>
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => onDelete(course._id)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
