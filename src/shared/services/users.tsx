import { List } from "../models/List";
import { UserFull, UserPreview } from "../models/User";
import { CreateUserDto, UpdateUserDto } from "../models/UserDto";

const getUserList: (params?: Record<string, any>) => Promise<List<UserPreview>> = async (params) => {

  const myHeaders = new Headers();
  myHeaders.append("app-id", import.meta.env.VITE_API_ID);

  const searchParams = (new URLSearchParams(params)).toString();
  const url = `${import.meta.env.VITE_API_URL}user${searchParams && '?' + searchParams}`

  const response = await fetch(url, {
    method: "GET",
    headers: myHeaders
  })
  const data: List<UserPreview> = await response.json();
  return data;
}

const getUserById: (id: string) => Promise<UserFull> = async (id) => {

  const myHeaders = new Headers();
  myHeaders.append("app-id", import.meta.env.VITE_API_ID);

  const url = `${import.meta.env.VITE_API_URL}user/${id}`

  const response = await fetch(url, {
    method: "GET",
    headers: myHeaders
  })

  const data: UserFull = await response.json();
  return data;
}

const createUser: (dto: CreateUserDto) => Promise<UserFull> = async (dto) => {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("app-id", import.meta.env.VITE_API_ID);

  const raw = JSON.stringify(dto);

  const response = await fetch(`${import.meta.env.VITE_API_URL}user/create`, {
    method: "POST",
    headers: myHeaders,
    body: raw
  })

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`${errorData.error} ${JSON.stringify(errorData.data)}`);
  }

  const data: UserFull = await response.json();
  return data;

}

const updateUser: (dto: UpdateUserDto, id: string) => Promise<UserFull> = async (dto, id) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("app-id", import.meta.env.VITE_API_ID);

  const raw = JSON.stringify(dto);

  const response = await fetch(`${import.meta.env.VITE_API_URL}user/${id}`, {
    method: "PUT",
    headers: myHeaders,
    body: raw
  })

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`${errorData.error} ${JSON.stringify(errorData.data)}`);
  }

  const data: UserFull = await response.json();
  return data;
}

const deleteUser: (id: string) => Promise<{ id: string }> = async (id) => {

  const myHeaders = new Headers();
  myHeaders.append("app-id", import.meta.env.VITE_API_ID);

  const response = await fetch(`${import.meta.env.VITE_API_URL}user/${id}`, {
    method: "DELETE",
    headers: myHeaders
  })

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`${errorData.error} ${JSON.stringify(errorData.data)}`);
  }

  const data: { id: string } = await response.json();
  return data;
}

export { getUserList, getUserById, createUser, updateUser, deleteUser }
