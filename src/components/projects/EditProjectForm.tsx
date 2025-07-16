import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ProjectFormData } from "../../types";
import ProjectForm from "./ProjectForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "../../api/ProjectAPI";
import { toast } from "react-toastify";

type EditProjectFormProps = {
    data: ProjectFormData
}

const EditProjectForm = ({ data }: EditProjectFormProps) => {
    const navigate = useNavigate();
    const params = useParams();
    const projectId = params.projectId!;


    const initialValues: ProjectFormData = {
        projectName: data.projectName,
        clientName: data.clientName,
        description: data.description,
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: updateProject,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['projects']});
            queryClient.invalidateQueries({queryKey: ['project', projectId]});
            navigate('/');
            toast.success(data);
        }
    })
    const handleForm = (formData: ProjectFormData) => {
        const data = {
            formData,
            projectId
        }

        mutate(data);
    }

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Editar Proyecto</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Rellena el siguiente formulario para editar el proyecto</p>

                <nav className="py-8">
                    <Link to='/' className="bg-purple-600 hover:bg-purple-700 transition-colors px-10 py-3 text-white text-xl font-bold cursor-pointer">Volver a Proyectos</Link>
                </nav>

                <form onSubmit={handleSubmit(handleForm)} noValidate className="mt-10 bg-white shadow-lg p-10 rounded-lg">
                    <ProjectForm
                        register={register}
                        errors={errors}
                    />
                    <input
                        type="submit"
                        value="Guardar Cambios"
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors font-bold cursor-pointer w-full p-3 text-white uppercase"
                    />
                </form>
            </div>
        </>
    )
}

export default EditProjectForm;