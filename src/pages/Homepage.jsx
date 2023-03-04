import React, { useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { getUser, postUser, delUser } from "../api/user";
import { ToastContainer, toast } from "react-toastify";
import { Table, Spinner } from "flowbite-react";
import UserList from "../components/UserList";

function Homepage() {
   document.title = "Table User";
   const [typePwd, setTypePwd] = useState("password");
   const [name, setName] = useState("");
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [status, setStatus] = useState("");
   const [search, setSearch] = useState("all");
   const [data, setData] = useState([]);
   const [id, setId] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   // showpassword
   const btnShowPwd = () => {
      typePwd === "password" ? setTypePwd("text") : setTypePwd("password");
   };
   //getInputValue
   const inputName = (e) => setName(e.target.value);
   const inputUsername = (e) => setUsername(e.target.value);
   const inputPassword = (e) => setPassword(e.target.value);
   const inputStatus = (e) => setStatus(e.target.value);

   const inputSearch = (e) => {
      if (e.key === "Enter") {
         getUser(search)
            .then((result) => {
               setData(result.data.data);
            })
            .catch((error) => {
               console.log(error);
            });
      }
      setSearch(e.target.value);
   };

   //handle
   const handleCancel = (e) => {
      e.preventDefault();
      setName("");
      setUsername("");
      setPassword("");
      setStatus("");
   };

   const handleSubmit = async (e) => {
      setIsLoading(true);
      try {
         e.preventDefault();
         if (!name || !username || !password || !status) {
            return toast.warn("data must be filled");
         }
         const response = await postUser({
            namalengkap: name,
            username: username,
            password: password,
            status: status,
         });
         toast.success(response.data.msg);
         getUser("all")
            .then((result) => {
               setData(result.data.data);
               setIsLoading(false);
            })
            .catch((error) => {
               console.log(error);
            });
         setName("");
         setUsername("");
         setPassword("");
         setStatus("");
         console.log(response);
      } catch (error) {
         console.log(error);
         setIsLoading(false);

         toast.error(error);
      }
   };

   const handleDelete = (id) => {
      setIsLoading(true);
      delUser(id)
         .then((response) => {
            toast.success(response.data.msg);
            setId(id);
            setIsLoading(false);
         })
         .catch((error) => {
            console.log(error);
            setIsLoading(false);
         });
   };
   useEffect(() => {
      setIsLoading(true);
      getUser("all")
         .then((result) => {
            setData(result.data.data);
            setIsLoading(false);
         })
         .catch((error) => {
            console.log(error);
         });
   }, [id]);

   return (
      <main className="max-w-[1440px] w-full h-full md:h-full bg-slate-200 mx-auto p-5 md:p-2 ">
         <div className="w-full mx-auto">
            <form className="mt-5 bg-red-200 w-full md:w-1/2 p-2 mx-auto shadow-md rounded-2xl">
               <h2 className="font-bold text-center text-2xl md:text-4xl ">
                  Create User
               </h2>
               <div className="flex flex-col mb-2 ">
                  <label htmlFor="namalengkap" className="font-bold my-2">
                     Nama Lengkap
                  </label>
                  <input
                     className="rounded-lg border-none"
                     type="text"
                     placeholder="Nama Lengkap"
                     required
                     value={name}
                     onChange={inputName}
                  />
               </div>
               <div className="flex flex-col mb-2 ">
                  <label htmlFor="namalengkap" className="font-bold my-2">
                     Username
                  </label>
                  <input
                     className="rounded-lg border-none"
                     type="text"
                     placeholder="Username"
                     required
                     value={username}
                     onChange={inputUsername}
                  />
               </div>
               <div className="flex flex-col mb-2 relative">
                  <label htmlFor="namalengkap" className="font-bold my-2">
                     Password
                  </label>
                  <input
                     className="rounded-lg border-none"
                     type={typePwd}
                     placeholder="Password"
                     required
                     value={password}
                     onChange={inputPassword}
                  />
                  <span
                     className="absolute top-[50px]  right-5"
                     onClick={btnShowPwd}
                  >
                     {typePwd === "text" ? (
                        <EyeIcon className="h-6 w-6 text-gray-500" />
                     ) : (
                        <EyeSlashIcon className="h-6 w-6 text-gray-500" />
                     )}
                  </span>
               </div>
               <div className="flex flex-col mb-2 ">
                  <label htmlFor="namalengkap" className="font-bold my-2">
                     Status
                  </label>
                  <input
                     className="rounded-lg border-none"
                     type="text"
                     placeholder="Status"
                     required
                     value={status}
                     onChange={inputStatus}
                  />
               </div>
               <div className="flex justify-center items-center ">
                  <button
                     className="px-5 mx-2 my-2 font-bold rounded-lg shadow-md py-3 border hover:bg-sky-300 hover:border-transparent transition-all duration-300  border-slate-600"
                     onClick={handleSubmit}
                  >
                     Submit
                  </button>
                  <button
                     className="px-5 mx-2 my-2 font-bold rounded-lg shadow-md py-3 border hover:bg-red-400 hover:border-transparent transition-all duration-300  border-slate-600"
                     onClick={handleCancel}
                  >
                     Cancel
                  </button>
               </div>
            </form>
         </div>
         {/* Data */}
         <section className="w-full md:px-10 px-2">
            <h3 className="text-2xl md:text-4xl text-center my-2 font-bold ">
               Table User
            </h3>
            <div className="flex flex-col">
               <label htmlFor="search" className="font-bold">
                  Search
               </label>
               <input
                  id="search"
                  className="rounded-lg mb-2 w-full sm:w-1/6 hover:ring-1 ring-pink-200"
                  type="text"
                  placeholder="Search User ID"
                  value={search}
                  onChange={(e) => inputSearch(e)}
                  onKeyDown={(e) => inputSearch(e)}
               />
            </div>
            <div className="w-full overflow-y-auto sm:h-64 h-40 mb-8 relative">
               <Table hoverable={true}>
                  <Table.Head>
                     <Table.HeadCell>User Id</Table.HeadCell>
                     <Table.HeadCell>Nama Lengkap</Table.HeadCell>
                     <Table.HeadCell>Username</Table.HeadCell>
                     <Table.HeadCell>Password</Table.HeadCell>
                     <Table.HeadCell>Status</Table.HeadCell>
                     <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                     </Table.HeadCell>
                  </Table.Head>
                  {/* data */}
                  {isLoading
                     ? null
                     : data &&
                       data.map((e, i) => {
                          return (
                             <UserList
                                key={e.userid}
                                id={e.userid}
                                namalengkap={e.namalengkap}
                                username={e.username}
                                password={e.password}
                                status={e.status}
                                handleDelete={() => handleDelete(e.userid)}
                             />
                          );
                       })}
               </Table>
               {isLoading ? (
                  <div className="flex justify-center items-center my-10">
                     <Spinner
                        aria-label="Extra large spinner example"
                        size="xl"
                     />
                  </div>
               ) : null}
            </div>
         </section>
         {/* toast */}
         <ToastContainer />
      </main>
   );
}

export default Homepage;
