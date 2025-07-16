import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TeamMember } from "../../types";
import { addUserToProject } from "../../api/TeamAPI";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

type SearchResultProps = {
    user: TeamMember,
    resetData: () => void
}

const SearchResult = ({ user, resetData }: SearchResultProps) => {
    const params = useParams();
    const projectId  = params.projectId!;

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: addUserToProject,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            resetData();
            queryClient.invalidateQueries({queryKey: ['projectTeam', projectId]});
        }
    });

    const handleAddUserToProject = () => {
        const data = {
            projectId,
            id: user._id
        }

        mutate(data);
    }

    return (
        <>
            <p className="mt-10 text-center font-bold">Resultados de Búsqueda: </p>
            <div className="flex justify-between items-center">
                <p>{user.name}</p>
                <button onClick={handleAddUserToProject} className="text-purple-600 hover:text-purple-700 px-10 py-3 font-bold cursor-pointer">
                    Agregar al Proyecto
                </button>
            </div>
        </>
    )
}

export default SearchResult;