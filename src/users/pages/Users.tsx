import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, useEffect, useState } from "react"
import AppLayout from "../../shared/layouts/AppLayout";
import TrashIcon from "../../shared/components/icons/TrashIcon";
import EditIcon from "../../shared/components/icons/EditIcon";
import ClipboardTextIcon from "../../shared/components/icons/ClipboardTextIcon";
import Modal from "../../shared/components/Modal";
import SearchIcon from "../../shared/components/icons/SearchIcon";
import CirclePlusIcon from "../../shared/components/icons/CirclePlusIcon";
import { useToast } from "../../shared/hooks/useToast";
import { createUser, deleteUser, getUserList, updateUser } from "../../shared/services/users";
import { List } from "../../shared/models/List";
import { CreateUserDto, UpdateUserDto } from "../../shared/models/UserDto";
import UserForm from "../components/UserForm";
import { UserPreview } from "../../shared/models/User";
import ConfirmModal from "../../shared/components/ConfirmModal";
import PencilIcon from "../../shared/components/icons/PencilIcon";
import { motion } from 'framer-motion'
import DetailedForm from "../components/DetailedForm";
import TableSkeleton from "../components/TableSkeleton";
import Pagination from "../../shared/components/Pagination";

type ParamsQuery = {
  limit: number,
  page: number,
}

type UserFormType = Record<string, any>;

type AvailableModals = "create" | "edit" | "detail" | "confirm";

const initialState: UserPreview = {
  id: "",
  title: "",
  firstName: "",
  lastName: "",
  picture: "",
}

export default function Users() {

  const [modals, setModals] = useState<AvailableModals[]>([])
  const [userForm, setUserForm] = useState<UserFormType>(initialState);
  const [searchId, setSearchId] = useState("");
  const [selectedUser, setSelectedUser] = useState({} as UserPreview);
  const [paramsQuery, setParamsQuery] = useState<ParamsQuery>({ limit: 10, page: 0 })

  const { addToast } = useToast();

  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery<List<UserPreview>>({
    queryKey: ["getUsers"],
    queryFn: () => getUserList(paramsQuery),
    select: (data) => searchId == "" ? data : ({ ...data, data: data.data.filter(u => u.id.startsWith(searchId)) }),
  })

  useEffect(() => {
    refetch()
  }, [paramsQuery])

  const createMutation = useMutation({
    mutationFn: (dto: CreateUserDto) => {
      return createUser(dto)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getUsers'] })
      addToast("Usuario creado exitósamente", "success")
    },
    onError: (e: Error) => {
      addToast(e.message, "error")
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ dto, id }: { dto: UpdateUserDto, id: string }) => {
      return updateUser(dto, id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getUsers'] })
      addToast("Usuario actualizado exitósamente", "success")
    },
    onError: (e: Error) => {
      addToast(e.message, "error")
    }
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      return deleteUser(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getUsers'] })
      addToast("Usuario eliminado exitósamente", "success")
    },
    onError: (e: Error) => {
      addToast(e.message, "error")
    }
  })

  const handleCreate = () => {
    const dto: CreateUserDto = {
      title: userForm.title,
      email: userForm.email as string,
      firstName: userForm.firstName as string,
      lastName: userForm.lastName as string
    }
    createMutation.mutate(dto)
    setModals([])
  }

  const handleUpdate = () => {
    const dto: UpdateUserDto = {
      title: userForm.title,
      firstName: userForm.firstName,
      lastName: userForm.lastName,
    }
    updateMutation.mutate({ dto, id: userForm.id })
    setModals([])
  }

  const handleDelete = () => {
    deleteMutation.mutate(selectedUser.id)
    setModals([])
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
              setModals(["create"])
            }}>
              <span>Crear</span>
              <CirclePlusIcon />
            </button>
          </div>

          {!isLoading ? (
            <>
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

                    {data?.data.map(user => (

                      <tr key={user.id} className="bg-white border-b dark:bg-[#161616] dark:border-neutral-800 border-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-800/20 last:border-none">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.id}</th>
                        <td className="px-6 py-4">{`${user.firstName} ${user.lastName}`}</td>
                        <td className="px-6 py-4">
                          <div className="">
                            {/* <img className="" src={user.picture} alt="" /> */}
                            <motion.img
                              src={user.picture}
                              alt="Thumbnail"
                              layoutId={`image-transition-${user.id}`}
                              className="size-10 rounded-full"
                            />

                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="inline-flex items-center gap-4">
                            <TrashIcon className="size-5 cursor-pointer" onClick={() => {
                              setSelectedUser(user)
                              setModals(['confirm'])
                            }} />
                            <EditIcon className="size-5 cursor-pointer" onClick={() => {
                              setUserForm(user)
                              setModals(["edit"])
                            }} />
                            <ClipboardTextIcon className="size-5 cursor-pointer" onClick={() => {
                              setUserForm(user)
                              setModals(["detail"])
                            }} />
                          </div>
                        </td>
                      </tr>
                    )
                    )}

                  </tbody>
                </table>
              </div>
              <div className="flex justify-end">
                {data && (
                  <Pagination total={data.total} page={paramsQuery.page} limit={paramsQuery.limit} onPageChange={(num) => {
                    setParamsQuery(value => ({ ...value, page: num }))
                  }} />
                )}
              </div>
            </>
          ) : (
            <TableSkeleton />
          )}


        </div>

        <Modal isOpen={modals.includes('create')}>
          <UserForm
            title="Crear Usuario"
            icon={<CirclePlusIcon />}
            form={userForm}
            onChange={handleChange}
            onConfirm={handleCreate} onCancel={() => setModals([])}
          />
        </Modal>

        <Modal isOpen={modals.includes("edit")}>
          <UserForm
            title="Editar Usuario"
            icon={<PencilIcon />}
            form={userForm}
            onChange={handleChange}
            onConfirm={handleUpdate} onCancel={() => setModals([])}
          />
        </Modal>

        <Modal isOpen={modals.includes("detail")}>
          <DetailedForm title="Detalle Usuario" form={userForm} onCancel={() => setModals([])} />
        </Modal>

        <ConfirmModal isOpen={modals.includes("confirm")} title="Eliminar Usuario" description="¿Estás seguro que quieres eliminar el usuario?" onConfirm={handleDelete} onCancel={() => setModals([])} />

      </>
    </AppLayout>
  )
}
