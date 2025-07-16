import { useForm } from "react-hook-form";
import { UpdateCurrentUserPassword } from "../../types";
import { changePassword } from "../../api/ProfileAPI";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ErrorMessage from "../../components/ErrorMessage";

const ChangePasswordView = () => {
  const initialValues: UpdateCurrentUserPassword = {
    current_password: '',
    password: '',
    password_confirmation: ''
  }

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({ defaultValues: initialValues })

  const password = watch('password');

  const { mutate } = useMutation({
    mutationFn: changePassword,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
    }
  });

  const handleChangePassword = (formData: UpdateCurrentUserPassword) => mutate(formData);

  return (
    <>
      <div className="mx-auto max-w-3xl">

        <h1 className="text-5xl font-black ">Cambiar Contraseña</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">Utiliza este formulario para cambiar tu contraseña</p>

        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className=" mt-14 bg-white shadow-lg p-10 rounded-lg"
          noValidate
        >
          <div className="mb-5">
            <label htmlFor="current_password" className="text-sm uppercase font-bold mb-1.5 block">Contraseña Actual</label>
            <input
              id="current_password"
              type="password"
              placeholder="Contraseña Actual"
              className="w-full p-3  border border-gray-200"
              {...register("current_password", {
                required: "La contraseña actual es obligatoria",
              })}
            />
            {errors.current_password && (
              <ErrorMessage>{errors.current_password.message}</ErrorMessage>
            )}
          </div>

          <div className="mb-5">
            <label htmlFor="password" className="text-sm uppercase font-bold mb-1.5 block">Contraseña Nueva</label>
            <input
              id="password"
              type="password"
              placeholder="Contraseña Nueva"
              className="w-full p-3  border border-gray-200"
              {...register("password", {
                required: "La nueva contraseña es obligatoria",
                minLength: {
                  value: 8,
                  message: 'La contraseña debe tener al menos 8 caracteres'
                }
              })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>
          <div className="mb-8">
            <label
              htmlFor="password_confirmation"
              className="text-sm uppercase font-bold mb-1.5 block"
            >Repetir Contraseña</label>

            <input
              id="password_confirmation"
              type="password"
              placeholder="Repetir Contraseña"
              className="w-full p-3  border border-gray-200"
              {...register("password_confirmation", {
                required: "Repetir la contraseña es obligatorio",
                validate: value => value === password || 'Las contraseñas no coinciden'
              })}
            />
            {errors.password_confirmation && (
              <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
            )}
          </div>

          <input
            type="submit"
            value='Cambiar Contraseña'
            className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  )
}

export default ChangePasswordView;