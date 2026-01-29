import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import FormTodo from "../components/FormTodo";
import ListItem from "../components/ListItem";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [todo, setTodo] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingIds, setDeletingIds] = useState(new Set());
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Función auxiliar para manejar errores de autenticación
  const handleAuthError = () => {
    localStorage.removeItem("authToken");
    navigate("/", { replace: true });
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get("/todo");
      setData(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      if (err.response?.status === 401) {
        handleAuthError();
      } else {
        setError("No se pudo obtener la información");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const senddata = async (e) => {
    e?.preventDefault();
    if (!todo.trim()) return;

    setIsSubmitting(true);
    setError("");
    try {
      const response = await api.post("/todo", {
        title: todo.trim(),
        description: description.trim(),
      });
      fetchData();
      setTodo("");
      setDescription("");
    } catch (err) {
      if (err.response?.status === 401) {
        handleAuthError();
      } else {
        setError("No se pudo crear la tarea");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearItem = async (id) => {
    if (!id) return;
    setDeletingIds((prev) => new Set(prev).add(id));
    setError("");
    try {
      await api.delete(`/todo/${id}`);
      fetchData();
    } catch (err) {
      console.error("Error al eliminar tarea:", err);

      if (err.response?.status === 401) {
        handleAuthError();
      } else {
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "No se pudo eliminar la tarea. Por favor, intenta nuevamente.";
        setError(errorMessage);
      }
    } finally {
      setDeletingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };
  const updateItem = async (id, updatedData) => {
    if (!id) return false;

    if (!updatedData.title?.trim()) {
      setError("El título de la tarea es obligatorio");
      return false;
    }

    setError("");

    try {
      const response = await api.put(`/todo/${id}`, {
        title: updatedData.title.trim(),
        description: updatedData.description?.trim() || "",
      });
      fetchData();
      return true;
    } catch (err) {
      console.error("Error al actualizar tarea:", err);
      if (err.response?.status === 401) {
        handleAuthError();
      } else {
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "No se pudo actualizar la tarea. Por favor, intenta nuevamente.";
        setError(errorMessage);
      }
      return false;
    }
  };

  if (loading) {
    return (
      <div
        className="container mx-auto px-4 py-8 max-w-4xl min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#DEEFE7" }}
      >
        <p className="text-center text-lg" style={{ color: "#002333" }}>
          Cargando datos...
        </p>
      </div>
    );
  }

  return (
    <div
      className="container mx-auto px-4 py-8 mt-4 mb-4 max-w-4xl min-h-fit-content rounded-lg"
      style={{ backgroundColor: "#DEEFE7" }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold" style={{ color: "#002333" }}>
          Panel de Control de Tareas
        </h1>
        <button
          onClick={logout}
          className="px-4 py-2 text-white rounded-md transition-colors"
          style={{ backgroundColor: "#159A9C" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#002333")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#159A9C")
          }
        >
          Cerrar Sesión
        </button>
      </div>
      <div className="mb-8">
        <FormTodo
          todo={todo}
          setTodo={setTodo}
          senddata={senddata}
          description={description}
          setDescription={setDescription}
          isSubmitting={isSubmitting}
        />
      </div>
      {error && (
        <div
          className="mb-4 p-3 rounded-md animate-fade-in"
          style={{
            backgroundColor: "#ffebee",
            borderColor: "#dc2626",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
        >
          <p className="text-sm text-center" style={{ color: "#dc2626" }}>
            {error}
          </p>
        </div>
      )}
      <div>
        {data.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg" style={{ color: "#159A9C" }}>
              No hay tareas aún. ¡Crea tu primera tarea!
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {data.map((item) => {
              const itemId = item;
              return (
                <li key={itemId}>
                  <ListItem
                    item={item}
                    clearItem={clearItem}
                    updateItem={updateItem}
                    isDeleting={deletingIds.has(itemId)}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
