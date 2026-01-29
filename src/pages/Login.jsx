import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import Label from "../components/ui/Label";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Por favor, Ingresa tu email y contraseña");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await api.post("/auth/login", { username, password });
      const { accessToken } = response.data;
      localStorage.setItem("authToken", accessToken);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Error de autenticación.");
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
          Iniciar Sesión
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
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
          {error && (
            <p className="text-sm mt-2" style={{ color: "#dc2626" }}>
              {error}
            </p>
          )}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Cargando..." : "Entrar"}
          </Button>
        </form>
        <p className="text-center mt-4 text-sm" style={{ color: "#002333" }}>
          ¿No tienes una cuenta?{" "}
          <Link
            to="/register"
            className="font-semibold hover:underline"
            style={{ color: "#159A9C" }}
          >
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
