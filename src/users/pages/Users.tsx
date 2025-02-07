import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, useEffect, useMemo, useState } from "react"
import { Title, User } from "../../shared/models/User";
import { createUser, deleteUser, fetchUsers, updateUser } from "../../shared/services/api";
import { CreateUser } from "../../shared/models/CreateUser";
import { UpdateUser } from "../../shared/models/UpdateUser";
import AppLayout from "../../shared/layouts/AppLayout";
import TrashIcon from "../../shared/components/icons/TrashIcon";
import EditIcon from "../../shared/components/icons/EditIcon";
import ClipboardTextIcon from "../../shared/components/icons/ClipboardTextIcon";
import Modal from "../../shared/components/Modal";
import SearchIcon from "../../shared/components/icons/SearchIcon";
import CirclePlusIcon from "../../shared/components/icons/CirclePlusIcon";
import { useToast } from "../../shared/hooks/useToast";

const initialState: User = {
  id: "",
  title: "",
  firstName: "",
  lastName: "",
  picture: "",
}

type UserFormType = Record<string, any>;
export default function Users() {

  const [modals, setModals] = useState({
    create: false,
    detail: false,
    edit: false,
  })

  const [userForm, setUserForm] = useState<UserFormType>(initialState);

  const [searchId, setSearchId] = useState("");

  const { addToast } = useToast();

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["getUsers"],
    queryFn: fetchUsers,
    select: (data) => searchId == "" ? data : data.filter(u => u.id.startsWith(searchId))
  })

  const mutation = useMutation({
    mutationFn: (id: string) => {
      return deleteUser(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getUsers'] })
    },
  })

  const createMutation = useMutation({
    mutationFn: (dto: CreateUser) => {
      return createUser(dto)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getUsers'] })
      addToast("Usuario creado exitósamente", "success")
    },
    onError: () => {
      addToast("Error al crear el usuario", "error")
    }
  })

  const updateMutation = useMutation({
    mutationFn: (user: User) => {
      const dto: UpdateUser = {
        title: user.title,
        firstName: user.firstName,
        lastName: user.lastName
      }
      return updateUser(user.id, dto)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getUsers'] })
    }
  })

  const handleCreate = () => {
    const dto: CreateUser = {
      title: userForm.title as Title,
      email: userForm.email as string,
      firstName: userForm.firstName as string,
      lastName: userForm.lastName as string
    }
    console.log("dto: ", dto)
    createMutation.mutate(dto)
    setModals(value => ({ ...value, create: false }))
  }

  const handleUpdate = () => {
    const user: User = {
      id: userForm.id,
      title: userForm.title,
      firstName: userForm.firstName,
      lastName: userForm.lastName,
      picture: userForm.picture
    }
    updateMutation.mutate(user)
    setModals(value => ({ ...value, edit: false }))
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setUserForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <AppLayout>
      <>
        <div className="px-4 border-b border-gray-200 dark:border-[#262626] flex items-center gap-4">
          <SearchIcon className="text-neutral-400" />
          <input className="outline-none py-3 flex-1 text-lg dark:text-white" type="text" placeholder="Search Id..." name="" onChange={(e) => setSearchId(e.target.value)} id="" />
        </div>
        <div className="pt-6 px-6">
          <div className="flex justify-end gap-4 mb-6">
            <button className="px-6 py-3 flex items-center gap-4 bg-[#262626] text-white rounded-md hover:cursor-pointer hover:bg-[#222222]" onClick={() => {
              setUserForm(initialState);
              setModals(prev => ({ ...prev, create: true }))
            }}>
              <span>Crear</span>
              <CirclePlusIcon />
            </button>
          </div>

          {!isLoading ? (

            <div className="relative overflow-x-auto shadow-md">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-neutral-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#222222] dark:text-white">
                  <tr>
                    <th scope="col" className="px-6 py-3">Id</th>
                    <th scope="col" className="px-6 py-3">Nombres y apellidos</th>
                    <th scope="col" className="px-6 py-3">Foto</th>
                    <th scope="col" className="px-6 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>

                  {data?.map(user => (

                    <tr key={user.id} className="bg-white border-b dark:bg-[#282828] dark:border-neutral-400 border-gray-200 hover:bg-gray-50 dark:hover:bg-[#222222] last:border-none">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.id}</th>
                      <td className="px-6 py-4">{`${user.firstName} ${user.lastName}`}</td>
                      <td className="px-6 py-4">
                        <div className="">
                          <img className="size-10 rounded-full" src={user.picture} alt="" />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="inline-flex items-center gap-4">
                          <TrashIcon className="size-5 cursor-pointer" onClick={() => mutation.mutate(user.id)} />
                          <EditIcon className="size-5 cursor-pointer" onClick={() => {
                            setUserForm(user)
                            setModals(prev => ({ ...prev, edit: true }))
                          }} />
                          <ClipboardTextIcon className="size-5 cursor-pointer" onClick={() => {
                            setUserForm(user)
                            setModals(prev => ({ ...prev, detail: true }))
                          }} />
                        </div>
                      </td>
                    </tr>
                  )
                  )}

                </tbody>
              </table>
            </div>
          ) : (
            <>
              Loading...
            </>
          )}


        </div>

        <Modal isOpen={modals.create}>
          <div className="px-10 py-10">
            <h4 className="mb-6 text-2xl font-semibold text-center">Crear Usuario</h4>
            <div className="grid grid-cols-2 gap-4">
              <span>Title:</span>
              <input className="px-4 py-2 outline-none border border-neutral-400 rounded-md disabled:bg-gray-100" value={userForm.title} onChange={handleChange} type="text" name="title" id="" />
              <span>FirstName:</span>
              <input className="px-4 py-2 outline-none border border-neutral-400 rounded-md disabled:bg-gray-100" value={userForm.firstName} onChange={handleChange} type="text" name="firstName" id="" />
              <span>LastName:</span>
              <input className="px-4 py-2 outline-none border border-neutral-400 rounded-md disabled:bg-gray-100" value={userForm.lastName} onChange={handleChange} type="text" name="lastName" id="" />
              <span>Email:</span>
              <input className="px-4 py-2 outline-none border border-neutral-400 rounded-md disabled:bg-gray-100" value={userForm.email} onChange={handleChange} type="text" name="email" id="" />
              <div className=""></div>
              <div className="flex gap-4 items-center">
                <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:cursor-pointer hover:bg-blue-600 disabled:bg-blue-400 disabled:hover:bg-blue-400 disabled:cursor-default" onClick={handleCreate}>Guardar</button>
                <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:cursor-pointer hover:bg-blue-600" onClick={() => setModals(prev => ({ ...prev, create: false }))}>Cancelar</button>
              </div>
            </div>
          </div>
        </Modal>

        <Modal isOpen={modals.detail}>
          <div className="px-10 py-10">
            <h4 className="mb-6 text-2xl font-semibold text-center">Detalle Usuario</h4>
            <div className="grid grid-cols-2 gap-4">
              <span>Id:</span>
              <input className="px-4 py-2 outline-none border border-neutral-400 rounded-md disabled:bg-gray-100" value={userForm.id} disabled type="text" name="" id="" />
              <span>Title:</span>
              <input className="px-4 py-2 outline-none border border-neutral-400 rounded-md disabled:bg-gray-100" value={userForm.title} disabled type="text" name="" id="" />
              <span>FirstName:</span>
              <input className="px-4 py-2 outline-none border border-neutral-400 rounded-md disabled:bg-gray-100" value={userForm.firstName} disabled type="text" name="" id="" />
              <span>LastName:</span>
              <input className="px-4 py-2 outline-none border border-neutral-400 rounded-md disabled:bg-gray-100" value={userForm.lastName} disabled type="text" name="" id="" />
              <div className=""></div>
              <div className="flex gap-4 items-center">
                <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:cursor-pointer hover:bg-blue-600 disabled:bg-blue-400 disabled:hover:bg-blue-400 disabled:cursor-default" disabled>Guardar</button>
                <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:cursor-pointer hover:bg-blue-600" onClick={() => setModals(prev => ({ ...prev, detail: false }))}>Cancelar</button>
              </div>
            </div>
          </div>
        </Modal>

        <Modal isOpen={modals.edit}>
          <div className="px-10 py-10">
            <h4 className="mb-6 text-2xl font-semibold text-center">Editar Usuario</h4>
            <div className="grid grid-cols-2 gap-4">
              <span>Title:</span>
              <input className="px-4 py-2 outline-none border border-neutral-400 rounded-md disabled:bg-gray-100" value={userForm.title} onChange={handleChange} type="text" name="title" id="" />
              <span>FirstName:</span>
              <input className="px-4 py-2 outline-none border border-neutral-400 rounded-md disabled:bg-gray-100" value={userForm.firstName} onChange={handleChange} type="text" name="firstName" id="" />
              <span>LastName:</span>
              <input className="px-4 py-2 outline-none border border-neutral-400 rounded-md disabled:bg-gray-100" value={userForm.lastName} onChange={handleChange} type="text" name="lastName" id="" />
              <div className=""></div>
              <div className="flex gap-4 items-center">
                <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:cursor-pointer hover:bg-blue-600 disabled:bg-blue-400 disabled:hover:bg-blue-400 disabled:cursor-default" onClick={handleUpdate}>Guardar</button>
                <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:cursor-pointer hover:bg-blue-600" onClick={() => setModals(prev => ({ ...prev, edit: false }))}>Cancelar</button>
              </div>
            </div>
          </div>
        </Modal>

      </>
    </AppLayout>
  )
}
