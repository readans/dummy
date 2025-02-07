import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import AppLayout from "./shared/layouts/AppLayout"
import { createUser, deleteUser, fetchUsers, updateUser } from "./shared/services/api"
import TrashIcon from "./shared/components/icons/TrashIcon"
import EditIcon from "./shared/components/icons/EditIcon"
import ClipboardTextIcon from "./shared/components/icons/ClipboardTextIcon"
import { Title, User } from "./shared/models/User"
import Modal from "./shared/components/Modal"
import { ChangeEvent, useState } from "react"
import { CreateUser } from "./shared/models/CreateUser"
import { UpdateUser } from "./shared/models/UpdateUser"
import { UpdatedUser } from "./shared/models/UpdatedUser"

const initialState: User = {
  id: "",
  title: "",
  firstName: "",
  lastName: "",
  picture: "",
}

type UserFormType = Record<string, any>;

function App() {

  const [modals, setModals] = useState({
    create: false,
    detail: false,
    edit: false,
  })

  const [userForm, setUserForm] = useState<UserFormType>(initialState);

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["getUsers"],
    queryFn: fetchUsers
  })

  const mutation = useMutation({
    mutationFn: (id: string) => {
      return deleteUser(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getUsers'] })
    },
  })

  const searchMutation = useMutation({
    mutationFn: (id: string) => {
      return new Promise((resolve, reject) => {
        resolve(id)
      });
    },
    onSuccess: (data) => {
      if (data == "") {
        queryClient.invalidateQueries({ queryKey: ['getUsers'] })
        return
      }
      queryClient.setQueryData(['getUsers'], (old: User[]) => {
        return old.filter(u => u.id.startsWith(data as string))
      })
    }
  })

  const createMutation = useMutation({
    mutationFn: (dto: CreateUser) => {
      return createUser(dto)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getUsers'] })
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

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const id = e.target.value;
    console.log("id: ", id)
    searchMutation.mutate(id)
  }

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
    <>
      <div className="relative -z-10 bg-white"><div className="absolute h-screen w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div></div>

      <AppLayout title="Módulo de consulta y registro de Usuario al Sistema">
        <>
          <div className="py-10">
            <div className="flex justify-end gap-4 mb-6">
              <input className="px-4 py-2 outline-none border border-neutral-400 rounded-md" type="text" placeholder="Id a buscar" name="" onChange={handleSearch} id="" />
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:cursor-pointer hover:bg-blue-600" onClick={() => {
                setUserForm(initialState);
                setModals(prev => ({ ...prev, create: true }))
              }}>Crear usuario</button>
            </div>

            {!isLoading ? (

              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">Id</th>
                      <th scope="col" className="px-6 py-3">Nombres y apellidos</th>
                      <th scope="col" className="px-6 py-3">Foto</th>
                      <th scope="col" className="px-6 py-3">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>

                    {data?.map(user => (

                      <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.id}</th>
                        <td className="px-6 py-4">{`${user.firstName} ${user.lastName}`}</td>
                        <td className="px-6 py-4">
                          <div className="grid place-items-center">
                            <img className="size-10 rounded-full" src={user.picture} alt="" />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="inline-flex items-center gap-4">
                            <TrashIcon className="cursor-pointer" onClick={() => mutation.mutate(user.id)} />
                            <EditIcon className="cursor-pointer" onClick={() => {
                              setUserForm(user)
                              setModals(prev => ({ ...prev, edit: true }))
                            }} />
                            <ClipboardTextIcon className="cursor-pointer" onClick={() => {
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
    </>
  )
}

export default App
