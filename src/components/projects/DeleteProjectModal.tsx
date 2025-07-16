import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { CheckPasswordForm } from '../../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checkPassword } from '../../api/AuthAPI';
import { toast } from 'react-toastify';
import { deleteProject } from '../../api/ProjectAPI';

const DeleteProjectModal = () => {
    const initialValues: CheckPasswordForm = {
        password: ''
    }
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const deleteProjectId = queryParams.get('deleteProject')!;
    const show = deleteProjectId ? true : false;

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: initialValues })

    const checkUserPasswordMutation = useMutation({
        mutationFn: checkPassword,
        onError: (error) => toast.error(error.message)
    });

    const queryClient = useQueryClient();
    const deleteProjectMutation = useMutation({
        mutationFn: deleteProject,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            navigate(location.pathname, { replace: true });
            reset();
        }
    });

    const handleForm = async (formData: CheckPasswordForm) => {
        await checkUserPasswordMutation.mutateAsync(formData);
        await deleteProjectMutation.mutateAsync(deleteProjectId)
    }

    return (
        <Transition appear show={show} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-12">

                                <Dialog.Title
                                    as="h3"
                                    className="font-black text-4xl my-5"
                                >Eliminar Proyecto </Dialog.Title>

                                <p className="text-xl font-bold">Confirma la eliminación del proyecto {''}
                                    <span className="text-fuchsia-600">colocando tu contraseña</span>
                                </p>

                                <form
                                    className="mt-10"
                                    onSubmit={handleSubmit(handleForm)}
                                    noValidate
                                >

                                    <div className="flex flex-col mb-8">
                                        <label htmlFor="password" className="text-sm uppercase font-bold mb-1.5 block">Contraseña</label>
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="Contraseña"
                                            className="w-full p-3  border-gray-300 border"
                                            {...register("password", {
                                                required: "La contraseña es obligatoria",
                                            })}
                                        />
                                        {errors.password && (
                                            <ErrorMessage>{errors.password.message}</ErrorMessage>
                                        )}
                                    </div>

                                    <input
                                        type="submit"
                                        className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                                        value='Eliminar Proyecto'
                                    />
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default DeleteProjectModal;
