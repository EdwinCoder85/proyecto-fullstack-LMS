"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { BackwardIcon, ForwardIcon } from "@heroicons/react/24/outline";
import {
  FaFastBackward,
  FaBackward,
  FaFastForward,
  FaForward,
} from "react-icons/fa";

interface Props {
  data: any;
  columns: any;
}

export function Table({ data, columns }: Props) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div>
        <table className="min-w-full divide-y divide-primary-500">
          <thead className="bg-primary-600">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    scope="col"
                    className="px-3 py-3.5 text-left text-base font-semibold text-white"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    className="whitespace-nowrap p-1 text-sm text-gray-500"
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {/* <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((footer) => (
                <th key={footer.id}>
                  {flexRender(
                    footer.column.columnDef.footer,
                    footer.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot> */}
        </table>
      </div>
      <div className="flex gap-x-4 bg-primary-600 p-3 text-left text-base font-semibold text-gray-500">
        <button
          className="bg-white rounded-md p-2"
          onClick={() => table.setPageIndex(0)}
        >
          <FaFastBackward className="text-primary-600" />
        </button>
        <button
          className="bg-white rounded-md  p-2"
          onClick={() => table.previousPage()}
        >
          <FaBackward className="text-primary-600" />
        </button>
        <button
          className="bg-white rounded-md p-2"
          onClick={() => table.nextPage()}
        >
          <FaForward className="text-primary-600" />
        </button>
        <button
          className="bg-white rounded-md p-2"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          <FaFastForward className="text-primary-600" />
        </button>
      </div>
    </>
  );
}
