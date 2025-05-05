import { useForm } from "react-hook-form";
import {  Project, ProjectFormData } from "../../types";
import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "../../api/ProjectApi";
import { toast } from "react-toastify";

type EditProjectFormProps={
    data: ProjectFormData, 
    projectId:Project['_id']
}



export default function EditProjectForm( {data, projectId}:EditProjectFormProps ) {

    const initialValues: ProjectFormData = {
        projectName: data.projectName,
        clientName: data.clientName,
        description: data.description
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
    const navigate= useNavigate()

    const queryClient = useQueryClient();

    const {mutate} = useMutation({
        mutationFn: updateProject,
        onError: (error)=>{
            toast.error(error.message)
        }, 
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey:['projects']})
            queryClient.invalidateQueries({queryKey:['editProject', projectId]})
            toast('Project updated')
            navigate('/')
        }
    })

    const handleForm = (formData: ProjectFormData) => {
        const data={
            formData,
            projectId
        }
        mutate(data)

    }




    return (
        <>

            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">
                    Edit Project
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
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >

                    <ProjectForm register={register} errors={errors} />

                    <input type="submit" value="Update project"
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 cursor-pointer transition-colors w-full p-3 text-white uppercase font-bold"
                    />
                </form>
            </div>


        </>
    )

}