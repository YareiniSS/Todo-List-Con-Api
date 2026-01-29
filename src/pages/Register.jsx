import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import Label from "../components/ui/Label";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword) {
      setError("Por favor, completa todos los campos");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/signup", {
        username,
        password,
      });

      // Si el registro es exitoso, redirigir al login
      navigate("/", { replace: true });
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Error al registrar usuario.");
      } else {
        setError("No se pudo conectar al servidor");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#DEEFE7" }}
    >
      <div
        className="w-full max-w-md p-8 rounded-lg shadow-lg"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <h2
          className="text-2xl font-bold mb-6 text-center"
          style={{ color: "#002333" }}
        >
          Registrarse
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <Label>Usuario</Label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu email"
            />
          </div>
          <div>
            <Label>Contraseña</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
            />
          </div>
          <div>
            <Label>Confirmar Contraseña</Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirma tu contraseña"
            />
          </div>
          {error && (
            <p className="text-sm mt-2" style={{ color: "#dc2626" }}>
              {error}
            </p>
          )}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Registrando..." : "Registrarse"}
          </Button>
        </form>
        <p className="text-center mt-4 text-sm" style={{ color: "#002333" }}>
          ¿Ya tienes una cuenta?{" "}
          <Link
            to="/"
            className="font-semibold hover:underline"
            style={{ color: "#159A9C" }}
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
