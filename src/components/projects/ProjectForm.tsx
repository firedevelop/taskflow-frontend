import { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { ProjectFormData } from "../../types";

type ProjectFormProps = {
    register: UseFormRegister<ProjectFormData>,
    errors: FieldErrors<ProjectFormData>,
}
const ProjectForm = ({register, errors} : ProjectFormProps) => {
    return (
        <>
            <div className="mb-5">
                <label htmlFor="projectName" className="text-sm uppercase font-bold mb-1.5 block">
                    Nombre
                </label>
                <input
                    id="projectName"
                    className="w-full p-3 border border-gray-200"
                    type="text"
                    placeholder="Nombre del Proyecto"
                    {...register("projectName", {
                        required: "El nombre del proyecto es obligatorio",
                    })}
                />

                {errors.projectName && (
                    <ErrorMessage>{errors.projectName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5">
                <label htmlFor="clientName" className="text-sm uppercase font-bold mb-1.5 block">
                    Cliente
                </label>
                <input
                    id="clientName"
                    className="w-full p-3 border border-gray-200"
                    type="text"
                    placeholder="Nombre del Cliente"
                    {...register("clientName", {
                        required: "El nombre del cliente es obligatorio",
                    })}
                />

                {errors.clientName && (
                    <ErrorMessage>{errors.clientName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5">
                <label htmlFor="description" className="text-sm uppercase font-bold mb-1.5 block">
                    Descripción
                </label>
                <textarea
                    id="description"
                    className="w-full p-3  border border-gray-200"
                    placeholder="Descripción del Proyecto"
                    {...register("description", {
                        required: "La descripción del proyecto es obligatoria"
                    })}
                />

                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}

export default ProjectForm;