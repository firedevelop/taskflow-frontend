import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFullProject } from "../../api/ProjectAPI";
import Spinner from "../../components/Spinner";
import EditProjectForm from "../../components/projects/EditProjectForm";
const EditProjectView = () => {
    const params = useParams();
    const projectId = params.projectId!;

    const { data, isLoading, isError } = useQuery({
        queryKey: ['project', projectId],
        queryFn: () => getFullProject(projectId),
        retry: false
    });

    if (isLoading) return (
        <div className="flex items-center justify-center">
            <Spinner />
        </div>
    );
    if (isError) return <Navigate to="/404" />
    if(data) return <EditProjectForm data={data} />
}

export default EditProjectView;