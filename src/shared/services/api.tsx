import { CreatedUser } from "../models/CreatedUser";
import { CreateUser } from "../models/CreateUser";
import { Pagination } from "../models/Pagination"
import { UpdatedUser } from "../models/UpdatedUser";
import { UpdateUser } from "../models/UpdateUser";
import { User } from "../models/User"

const fetchUsers: () => Promise<User[]> = async () => {

  const myHeaders = new Headers();
  myHeaders.append("app-id", import.meta.env.VITE_API_ID);

  const response = await fetch(`${import.meta.env.VITE_API_URL}user`, {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  })
  const data: Pagination<User> = await response.json();
  return data.data;
}

const createUser: (createUser: CreateUser) => Promise<User> = async (createUser) => {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("app-id", import.meta.env.VITE_API_ID);

  const raw = JSON.stringify(createUser);

  const response = await fetch(`${import.meta.env.VITE_API_URL}user/create`, {
    method: "POST",
    headers: myHeaders,
    body: raw
  })
  const data: CreatedUser = await response.json();
  return {
    id: data.id,
    title: data.title,
    firstName: data.firstName,
    lastName: data.lastName,
    picture: ""
  };
}

const updateUser: (id: string, updateUser: UpdateUser) => Promise<User> = async (id, updateUser) => {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("app-id", import.meta.env.VITE_API_ID);

  const raw = JSON.stringify(updateUser);

  const response = await fetch(`${import.meta.env.VITE_API_URL}user/${id}`, {
    method: "PUT",
    headers: myHeaders,
    body: raw
  })
  const data: UpdatedUser = await response.json();
  return {
    id: data.id,
    title: data.title,
    firstName: data.firstName,
    lastName: data.lastName,
    picture: ""
  };
}

const deleteUser: (id: string) => Promise<{ id: string }> = async (id) => {

  const myHeaders = new Headers();
  myHeaders.append("app-id", import.meta.env.VITE_API_ID);

  const response = await fetch(`${import.meta.env.VITE_API_URL}user/${id}`, {
    method: "DELETE",
    headers: myHeaders
  })
  const data: { id: string } = await response.json();
  return data;
}

export { fetchUsers, createUser, updateUser, deleteUser }
