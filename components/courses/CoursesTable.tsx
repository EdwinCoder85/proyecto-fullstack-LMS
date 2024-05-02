"use client";

import { Course } from "@prisma/client";
import { Avatar, Badge, Button, Modal, Table } from "../ui";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  courses: Course[];
}

function ProductTable({ courses }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const router = useRouter();

  async function handleDeleteCourse(id: number) {
    const res = await fetch(`/api/courses/${id}`, {
      method: "DELETE",
    });

    if (res.status === 204) {
      toast.success("Curso eliminado satisfactoriamente");
      router.refresh();
    }

    if (res.status === 404) {
      toast.error("Curso no encontrado");
    } else if (res.status === 500) {
      toast.error("Error eliminando curso");
    }

    setOpen(false);
  }

  const columns = [
    {
      header: "Nombre",
      accessorKey: "title",
    },
    {
      header: "Descripción",
      accessorKey: "description",
    },
    {
      header: "Imagen",
      accessorKey: "imageUrl",
      cell: (info: any) => {
        const { imageUrl } = info.row.original;
        return <Avatar src={imageUrl} alt="imagen" />;
      },
    },
    // {
    //   header: "Precio",
    //   accessorKey: "price",
    // },
    {
      header: "Categoria",
      accessorKey: "categoryName",
    },
    {
      header: "Acciones",
      cell: (info: any) => {
        const { id } = info.row.original;
        return (
          <div className="flex gap-x-2">
            <Button href={`/dashboard/courses/edit/${id}`}>Editar</Button>
            <Button
              className="bg-red-600 hover:bg-red-700 rounded-xl"
              onClick={() => {
                setSelectedProductId(id);
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
      <Table data={courses} columns={columns} />
      <Modal open={open} setOpen={setOpen}>
        <h3 className="text-primary-600 font-bold h3">
          Estas Seguro de querer eliminar?
        </h3>
        <p className="text-gray-500">
          Esta accion no se puede deshacer y se perdera toda la informacion del
          producto
        </p>
        <div className="flex gap-x-2 justify-end mt-2">
          <Button
            className="bg-red-500 hover:bg-red-600"
            onClick={() => {
              if (!selectedProductId) return;
              handleDeleteCourse(selectedProductId);
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

export default ProductTable;
