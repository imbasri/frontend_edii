import React from "react";
import { Table } from "flowbite-react";
import { delUser } from "../api/user.js";
import { ToastContainer, toast } from "react-toastify";
function UserList({
   id,
   namalengkap,
   username,
   password,
   status,
   handleDelete,
}) {
   return (
      <>
         <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
               <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {id}
               </Table.Cell>
               <Table.Cell>{namalengkap}</Table.Cell>
               <Table.Cell>{username}</Table.Cell>
               <Table.Cell>{password}</Table.Cell>
               <Table.Cell>{status}</Table.Cell>
               <Table.Cell>
                  <button
                     className="px-5 py-3 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transit durat ease-in-out"
                     onClick={handleDelete}
                  >
                     Delete
                  </button>
               </Table.Cell>
            </Table.Row>
         </Table.Body>
         <ToastContainer />
      </>
   );
}

export default UserList;
