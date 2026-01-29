import React from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Label from "./ui/Label";

const FormTodo = ({
  todo,
  setTodo,
  senddata,
  description,
  setDescription,
  isSubmitting = false,
}) => {
  return (
    <div
      className=" rounded-lg p-6"
      style={{
        backgroundColor: "#FFFFFF",
        boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
      }}
    >
      <h1 className="font-bold mb-4" style={{ color: "#002333", fontSize: "1.5rem" }}>
        Lista de tareas
      </h1>
      <form onSubmit={senddata} className="space-y-4">
        <div>
          <Label style={{ color: "#002333", fontSize: "1rem" }}>Título</Label>
          <Input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Ingresa el título de la tarea"
            disabled={isSubmitting}
            required
          />
        </div>
        <div>
          <Label>Descripción</Label>
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ingresa la descripción (opcional)"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creando..." : "Enviar"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormTodo;
