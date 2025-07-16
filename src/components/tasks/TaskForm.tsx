import { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { TaskFormData } from "../../types";

type TaskFormProps = {
    register: UseFormRegister<TaskFormData>
    errors: FieldErrors<TaskFormData>

}
const TaskForm = ({ register, errors }: TaskFormProps) => {
    return (
        <>
            <div className="mb-5">
                <label className="text-sm uppercase font-bold mb-1.5 block" htmlFor="name">Nombre</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre de la Tarea"
                    className="w-full p-3  border-gray-300 border"
                    {...register("name", {
                        required: "El nombre de la tarea es obligatorio",
                    })}
                />
                {errors.name && (
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5">
                <label className="text-sm uppercase font-bold mb-1.5 block" htmlFor="description">Descripción</label>
                <textarea
                    id="description"
                    placeholder="Descripción de la Tarea"
                    className="w-full p-3  border-gray-300 border"
                    {...register("description", {
                        required: "La descripción de la tarea es obligatoria"
                    })}
                />
                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}

export default TaskForm