import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "../ErrorMessage";
import { TeamMemberForm } from "../../types";
import { findUserByEmail } from "../../api/TeamAPI";
import Spinner from "../Spinner";
import SearchResult from "./SearchResult";

const AddMemberForm = () => {
    const params = useParams();
    const projectId = params.projectId!;

    const initialValues: TeamMemberForm = {
        email: ''
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const mutation = useMutation({
        mutationFn: findUserByEmail
    });

    const handleSearchUser = async (formData: TeamMemberForm) => {
        const data = {
            projectId,
            formData
        }

        mutation.mutate(data);
    }

    const resetData = () => {
        reset();
        mutation.reset();
    }

    return (
        <>

            <form
                className="mt-10"
                onSubmit={handleSubmit(handleSearchUser)}
                noValidate
            >

                <div className="mb-8">
                    <label htmlFor="email" className="text-sm uppercase font-bold mb-1.5 block">Email</label>
                    <input
                        id="email"
                        type="text"
                        placeholder="Email del usuario"
                        className="w-full p-3 border-gray-300 border"
                        {...register("email", {
                            required: "El email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "El email no es válido",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>
                <input
                    type="submit"
                    className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black text-xl cursor-pointer"
                    value='Buscar Usuario'
                />

                {mutation.isPending && (
                    <div className="mt-10 flex justify-center">
                        <Spinner />
                    </div>
                )}

                {mutation.error && (
                    <div className="mt-10 flex justify-center">
                        <p className="w-full text-center text-red-600 font-bold uppercase p-2.5 bg-red-100">{mutation.error.message}</p>
                    </div>
                )}


                {mutation.data && <SearchResult user={mutation.data} resetData={resetData} />}

            </form>
        </>
    )
}

export default AddMemberForm;