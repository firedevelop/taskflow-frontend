import { useForm } from "react-hook-form";
import { UserLoginForm } from "../../types";
import ErrorMessage from "../../components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/AuthAPI";
import { toast } from "react-toastify";

const LoginView = () => {
    const navigate = useNavigate();

    const initialValues: UserLoginForm = {
        email: '',
        password: '',
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const { mutate } = useMutation({
        mutationFn: login,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            navigate('/');
        }
    })
    const handleLogin = (formData: UserLoginForm) => mutate(formData)

    return (
        <>
            <h1 className="text-5xl font-black text-white">Iniciar Sesión</h1>
            <p className="text-2xl font-light text-white mt-5">
                Comienza a planear {''}
                <span className=" text-fuchsia-500 font-bold">tus proyectos</span>
            </p>

            <form
                onSubmit={handleSubmit(handleLogin)}
                className="space-y-7 p-10 bg-white mt-10"
                noValidate
            >
                <div className="flex flex-col gap-3">
                    <label htmlFor="email" className="font-normal text-2xl">Email</label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
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

                <div className="flex flex-col gap-3">
                    <label htmlFor="password" className="font-normal text-2xl">Contraseña</label>

                    <input
                        id="password"
                        type="password"
                        placeholder="Contraseña"
                        className="w-full p-3 border-gray-300 border"
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
                    value='Iniciar Sesión'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link to="/auth/register" className="text-center text-gray-300 font-normal">¿No tienes una cuenta? Crear Cuenta</Link>
                <Link to="/auth/forgot-password" className="text-center text-gray-300 font-normal">¿Olvidaste tu contraseña? Reestablecer</Link>
            </nav>
        </>
    )
}

export default LoginView