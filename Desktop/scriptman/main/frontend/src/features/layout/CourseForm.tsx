import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import axios from "axios";
import type { Course } from "./CoursePage";

type Props = {
    onCourseCreated: () => void;
    initialData?: Course | null;
};

export default function CourseForm({ onCourseCreated, initialData }: Props) {
    const [formData, setFormData] = useState({
        title: "",
        code: "",
        description: "",
        duration: "",
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title,
                code: initialData.code,
                description: initialData.description,
                duration: String(initialData.duration),
            });
        } else {
            setFormData({
                title: "",
                code: "",
                description: "",
                duration: "",
            });
        }
    }, [initialData]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (initialData?._id) {
                // Edit mode
                const { data } = await axios.patch(
                    `http://localhost:5000/api/courses/${initialData._id}`,
                    { ...formData, duration: Number(formData.duration) }
                );
                toast.success(`${data.title} updated successfully!`);
            } else {
                // Create mode
                const { data } = await axios.post(
                    "http://localhost:5000/api/courses",
                    {
                        ...formData,
                        duration: Number(formData.duration),
                    }
                );
                toast.success(`${data.title} created successfully!`);
            }

            onCourseCreated();
            setFormData({ title: "", code: "", description: "", duration: "" });
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.error ||
                error.message ||
                "Failed to save course";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const isEditing = !!initialData?._id;

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">
                {isEditing ? "Edit Course" : "Create New Course"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="code">Code</Label>
                    <Input
                        id="code"
                        name="code"
                        value={formData.code}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <Label htmlFor="duration">Duration (weeks)</Label>
                    <Input
                        id="duration"
                        name="duration"
                        type="number"
                        value={formData.duration}
                        onChange={handleChange}
                    />
                </div>
                <Button type="submit" disabled={loading} className="w-full">
                    {loading
                        ? isEditing
                            ? "Updating..."
                            : "Creating..."
                        : isEditing
                        ? "Update Course"
                        : "Create Course"}
                </Button>
            </form>
        </div>
    );
}
