import { Navigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "../../api/ProjectApi";
import EditProjectForm from "../../components/projects/EditProjectForm";

export default function EditProjectView() {

  const params = useParams();
  const projectId = params.projectId!

  const {data, isLoading, isError} = useQuery({
      queryKey: ['editProject', projectId],
      queryFn: ()=> getProjectById(projectId),
      retry: false
  })
  console.log(data);
  console.log(isLoading)


  if (isLoading) return 'Loading...'
  if (isError) return <Navigate to='/404'></Navigate>


 if (data) return (
    <EditProjectForm data={data} projectId={projectId}/>
  )
}
