import { useForm } from "react-hook-form";
import { NoteFormData } from "../../types";
import ErrorMessage from "../ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../api/NoteAPI";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";

const AddNoteForm = () => {
    const params = useParams();
    const projectId = params.projectId!;

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get('viewTask')!;

    const initialValues: NoteFormData = {
        content: ''
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: initialValues });

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: createNote,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            reset();
            queryClient.invalidateQueries({ queryKey: ['task', taskId] });
        }
    });

    const handleAddNote = (formData: NoteFormData) => {
        mutate({ formData, projectId, taskId });
    }

    return (
        <form
            onSubmit={handleSubmit(handleAddNote)}
            noValidate
        >
            <div className="mb-8">
                <label htmlFor="content" className="text-sm uppercase font-bold mb-1.5 block">Contenido</label>
                <input
                    id="content"
                    type="text"
                    placeholder="Contenido de la Nota"
                    className="w-full p-3 border-gray-300 border"
                    {...register('content', {
                        required: 'El contenido de la nota es obligatorio'
                    })}
                />
                {errors.content && (
                    <ErrorMessage>{errors.content?.message}</ErrorMessage>
                )}
            </div>

            <input
                type="submit"
                value="Crear Nota"
                className="bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors font-bold cursor-pointer w-full p-3 text-white uppercase"
            />

        </form>
    )
}

export default AddNoteForm;