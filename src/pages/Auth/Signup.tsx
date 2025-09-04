import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../../services/firebase";
import { usePopup } from "../../hooks/usePopup";

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { showPopup } = usePopup();

  const onSubmit = async (data: FormValues) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      showPopup("🎉 ¡Registro exitoso!");
      navigate("/home");
    } catch (error) {
      if (error instanceof FirebaseError) {
        showPopup("❌ Error al registrarse: " + error.message);
      } else {
        showPopup("❌ Ocurrió un error inesperado");
      }
    }
  };

  return (
    <div className="h-full flex flex-col justify-center items-center bg-background p-6">
      <h1 className="text-2xl font-bold text-primary mb-6">🏰 Crear cuenta</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-4"
      >
        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Correo electrónico"
            {...register("email", {
              required: "El correo es obligatorio",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Correo inválido",
              },
            })}
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary"
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 6,
                message: "Debe tener al menos 6 caracteres",
              },
            })}
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirmar contraseña"
            {...register("confirmPassword", {
              required: "Debes confirmar la contraseña",
              validate: (value) =>
                value === watch("password") || "Las contraseñas no coinciden",
            })}
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-blue-600 transition"
        >
          Registrarme
        </button>
      </form>

      {/* Link a login */}
      <p className="mt-4 text-sm text-gray-600">
        ¿Ya tienes cuenta?{" "}
        <Link
          to="/login"
          className="text-primary font-semibold hover:underline"
        >
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}

export default Signup;
