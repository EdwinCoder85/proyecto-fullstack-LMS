"use client";

import { User } from "@prisma/client";
import { Button, Modal, Table } from "../ui";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  users: User[];
}

function UserTable({ users }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const router = useRouter();

  async function handleDeleteUser(id: number) {
    const res = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });

    if (res.status === 204) {
      toast.success("Usuario eliminado satisfactoriamente");
      router.refresh();
    }

    if (res.status === 404) {
      toast.error("Usuario no encontrado");
    } else if (res.status === 500) {
      toast.error("Error eliminando usuario");
    }

    setOpen(false);
  }

  const columns = [
    {
      header: "Usuario",
      accessorKey: "username",
    },
    {
      header: "Correo",
      accessorKey: "email",
    },
    {
      header: "Correo confirmado",
      accessorKey: "emailVerified",
    },
    {
      header: "Rol",
      accessorKey: "role",
    },
    {
      header: "Contraseña",
      accessorKey: "password",
    },
    {
      header: "Creado",
      accessorKey: "formattedCreatedAt",
    },
    {
      header: "Acciones",
      cell: (info: any) => {
        const { id } = info.row.original;
        return (
          <div className="flex gap-x-2">
            <Button href={`/dashboard/users/edit/${id}`}>Editar</Button>
            <Button
              className="bg-red-600 hover:bg-red-700 rounded-xl"
              onClick={() => {
                setSelectedUserId(id);
                setOpen(true);
              }}
            >
              Eliminar
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Table data={users} columns={columns} />
      <Modal open={open} setOpen={setOpen}>
        <h3 className="text-primary-600 font-bold h3">
          Estas Seguro de querer eliminar?
        </h3>
        <p className="text-gray-500">
          Esta accion no se puede deshacer y se perdera toda la informacion del
          usuario
        </p>
        <div className="flex gap-x-2 justify-end mt-2">
          <Button
            className="bg-red-500 hover:bg-red-600"
            onClick={() => {
              if (!selectedUserId) return;
              handleDeleteUser(selectedUserId);
            }}
          >
            Si, Eliminar
          </Button>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
        </div>
      </Modal>
    </>
  );
}
export default UserTable;
