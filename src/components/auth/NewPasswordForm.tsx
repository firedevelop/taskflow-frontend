import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import type { ConfirmToken, NewPasswordForm } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updatePasswordWithToken } from "../../api/AuthAPI";

type NewPasswordFormProps = {
  token: ConfirmToken['token'],
}

const NewPasswordForm = ({ token }: NewPasswordFormProps) => {
  const navigate = useNavigate();

  const initialValues: NewPasswordForm = {
    password: '',
    password_confirmation: '',
  }
  const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: updatePasswordWithToken,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate('/auth/login');
    }
  })

  const handleNewPassword = (formData: NewPasswordForm) => {
    const data = {
      formData,
      token
    }

    mutate(data);
  }

  const password = watch('password');

  return (
    <>
      <form
        onSubmit={handleSubmit(handleNewPassword)}
        className="space-y-8 p-10  bg-white mt-10"
        noValidate
      >

        <div className="flex flex-col gap-5">
          <label htmlFor="password" className="font-normal text-2xl">Contraseña</label>

          <input
            id="password"
            type="password"
            placeholder="Contraseña"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "La contraseña es obligatoria",
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

        <div className="flex flex-col gap-5">
          <label htmlFor="password_confirmation" className="font-normal text-2xl">Repetir Contraseña</label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Repetir Contraseña"
            className="w-full p-3  border-gray-300 border"
            {...register("password_confirmation", {
              required: "La contraseña repetida es obligatoria",
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
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>
    </>
  );
}

export default NewPasswordForm;