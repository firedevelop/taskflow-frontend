import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useParams } from "react-router-dom"
import { getTaskById } from "../../api/TaskAPI";
import EditTaskModal from "./EditTaskModal";

const EditTaskData = () => {
    const params = useParams();
    const projectId = params.projectId!;

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get('editTask')!;

    const { data, isError, isSuccess } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({ projectId, taskId }),
        enabled: !!taskId,
        retry: 1
    });

    if (isError) return <Navigate to={`/projects/${projectId}`} />
    if (isSuccess && data) return <EditTaskModal data={data} taskId={taskId} />
}

export default EditTaskData