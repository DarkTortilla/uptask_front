import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ProjectForm from "../../components/projects/ProjectForm";
import { ProjectFormData } from "../../types";
import { createProject } from "../../api/ProjectApi";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
export default function CreateProjectView() {
    const navigate = useNavigate()

    const initialValues = {
        projectName: "",
        clientName: "",
        description: ""
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const mutation = useMutation({
        mutationFn: createProject,
        onError: (error) => {
            toast.error(error.message.toString())
        },
        onSuccess: (data) => {
            toast.success(data)
            navigate('/')
        }
    })

    const handleFrom = async (formData: ProjectFormData) => {
        await mutation.mutateAsync(formData)
    }
    return (
        <>

            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">
                    Create new Project
                </h1>
                <p>Manage and administer your projects</p>

                <nav className="my-5">
                    <Link className="bg-purple-400 hover:bg-purple-500
      px-10 py-3 text-white text-xl
      font-bold cursor-pointer transition-colors
    "
                        to='/'
                    >My Projects</Link>
                </nav>

                <form className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                    onSubmit={handleSubmit(handleFrom)}
                    noValidate
                >

                    <ProjectForm register={register} errors={errors} />

                    <input type="submit" value="Create project"
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 cursor-pointer transition-colors w-full p-3 text-white uppercase font-bold"
                    />
                </form>
            </div>


        </>
    )
}
