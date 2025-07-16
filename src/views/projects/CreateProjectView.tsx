import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ProjectForm from "../../components/projects/ProjectForm";
import { ProjectFormData } from "../../types";
import { createProject } from "../../api/ProjectAPI";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

const CreateProjectView = () => {
  const navigate = useNavigate();

  const initialValues: ProjectFormData = {
    projectName: '',
    clientName: '',
    description: '',
  }

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate('/');
    }
  })

  const handleForm = (formData: ProjectFormData) => mutate(formData);

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Crear Proyecto</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">Rellena el siguiente formulario para crear el proyecto</p>

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
            value="Crear Proyecto"
            className="bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors font-bold cursor-pointer w-full p-3 text-white uppercase"
          />
        </form>
      </div>
    </>
  )
}

export default CreateProjectView;