import { useMemo } from "react"
import { useAuth } from "../../hooks/useAuth"
import { Note } from "../../types"
import { formatDate } from "../../utils"
import Spinner from "../Spinner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteNote } from "../../api/NoteAPI"
import { toast } from "react-toastify"
import { useLocation, useParams } from "react-router-dom"

type NoteDetailProps = {
    note: Note
}

const NoteDetail = ({ note }: NoteDetailProps) => {
    const params = useParams();
    const projectId = params.projectId!;

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get('viewTask')!;

    const { data, isLoading } = useAuth();
    const canDelete = useMemo(() => note.createdBy._id === data?._id, [data]);

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['task', taskId] });
        }
    })
    if (isLoading) return <Spinner />

    return (
        <div className="p-3 flex justify-between items-center">
            <div>
                <p>
                    {note.content} - <span className="font-bold">{note.createdBy.name}</span>
                </p>

                <p className="textxs text-slate-500">
                    {formatDate(note.createdAt)}
                </p>
            </div>

            {canDelete &&
                <button
                    type="button"
                    onClick={() => mutate({ projectId, taskId, noteId: note._id })}
                    className="bg-red-600 hover:bg-red-700 transition-colors p-2 text-xs text-white font-bold cursor-pointer">Eliminar</button>}
        </div>
    )
}

export default NoteDetail