import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { User, UserProfileForm } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateProfile } from "../../api/ProfileAPI";

type ProfileFormProps = {
  data: User
}

const ProfileForm = ({ data }: ProfileFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: data })

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ['user'] })
    }
  });

  const handleEditProfile = (formData: UserProfileForm) => mutate(formData);

  return (
    <>
      <div className="mx-auto max-w-3xl g">
        <h1 className="text-5xl font-black ">Mi Perfil</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">Aquí puedes actualizar tu información</p>

        <form
          onSubmit={handleSubmit(handleEditProfile)}
          className=" mt-14 space-y-5 bg-white shadow-lg p-10 rounded-l"
          noValidate
        >
          <div className="mb-5">
            <label htmlFor="name" className="text-sm uppercase font-bold mb-1.5 block">Nombre</label>
            <input
              id="name"
              type="text"
              placeholder="Nombre"
              className="w-full p-3 border border-gray-200"
              {...register("name", {
                required: "El nombre es obligatorio",
              })}
            />
            {errors.name && (
              <ErrorMessage>{errors.name.message}</ErrorMessage>
            )}
          </div>

          <div className="mb-8">
            <label htmlFor="email" className="text-sm uppercase font-bold mb-1.5 block">Email</label>
            <input
              id="text"
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-200"
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
            value='Guardar Cambios'
            className="bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors font-bold cursor-pointer w-full p-3 text-white uppercase"
          />
        </form>
      </div>
    </>
  )
}

export default ProfileForm;