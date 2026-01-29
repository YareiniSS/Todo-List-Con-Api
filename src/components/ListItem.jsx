import React, { useState } from "react";
import Input from "./ui/Input";
import Label from "./ui/Label";
import Button from "./ui/Button";

const ListItem = ({ item, clearItem, updateItem, isDeleting = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(item.title || "");
  const [editDescription, setEditDescription] = useState(
    item.description || ""
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(item.title || "");
    setEditDescription(item.description || "");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(item.title || "");
    setEditDescription(item.description || "");
  };

  const handleSave = async () => {
    if (!editTitle.trim()) {
      return;
    }
    setIsUpdating(true);
    const itemId = item.id || item._id;
    const success = await updateItem(itemId, {
      title: editTitle.trim(),
      description: editDescription.trim(),
    });
    if (success) {
      setIsEditing(false);
    }
    setIsUpdating(false);
  };

  if (isEditing) {
    return (
      <div
        className="border rounded-lg p-4 transition-all"
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#159A9C",
          borderWidth: "2px",
        }}
      >
        <div className="space-y-3">
          <div>
            <Label>Título</Label>
            <Input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Título de la tarea"
            />
          </div>
          <div>
            <Label>Descripción</Label>
            <Input
              type="text"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Descripción de la tarea"
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              disabled={isUpdating || !editTitle.trim()}
              className="flex-1"
            >
              {isUpdating ? "Guardando..." : "Guardar"}
            </Button>
            <Button
              onClick={handleCancel}
              disabled={isUpdating}
              className="flex-1"
              style={{
                backgroundColor: "#B4BEC9",
              }}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.backgroundColor = "#002333";
                }
              }}
              onMouseLeave={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.backgroundColor = "#B4BEC9";
                }
              }}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-lg p-4 flex justify-between items-start transition-all"
      style={{
        backgroundColor: "#FFFFFF",
        boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
        marginTop: "1rem",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
        e.currentTarget.style.borderColor = "#159A9C";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "#B4BEC9";
      }}
    >
      <div className="flex-1">
        <h3 className="font-semibold mb-1" style={{ color: "#002333", fontSize: "1.2rem" }}>
          {item.title}
        </h3>
        {item.description && (
          <p className="text-sm" style={{ color: "#159A9C" }}>
            {item.description}
          </p>
        )}
      </div>
      <div className="ml-4 flex gap-2">
        <Button
          onClick={handleEdit}
          className="px-3 py-1 text-white text-sm rounded-md transition-colors"
          style={{ backgroundColor: "#159A9C" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#002333")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#159A9C")
          }
        >
          Editar
        </Button>
        <Button
          onClick={() => clearItem(item.id || item._id)}
          className="px-3 py-1 text-white text-sm rounded-md transition-colors"
          style={{ backgroundColor: "#dc2626" }}
          disabled={isDeleting || isUpdating}
          onMouseEnter={(e) => {
            if (!e.currentTarget.disabled) {
              e.currentTarget.style.backgroundColor = "#991b1b";
            }
          }}
          onMouseLeave={(e) => {
            if (!e.currentTarget.disabled) {
              e.currentTarget.style.backgroundColor = "#dc2626";
            }
          }}
        >
          {isDeleting ? "Eliminando..." : "Eliminar"}
        </Button>
      </div>
    </div>
  );
};

export default ListItem;
