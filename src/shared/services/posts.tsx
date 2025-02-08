import { List } from "../models/List";
import { Post, PostPreview } from "../models/Post";

const getPostList: (params?: Record<string, any>) => Promise<List<PostPreview>> = async (params) => {

  const myHeaders = new Headers();
  myHeaders.append("app-id", import.meta.env.VITE_API_ID);

  const searchParams = (new URLSearchParams(params)).toString();
  const url = `${import.meta.env.VITE_API_URL}post${searchParams && '?' + searchParams}`

  const response = await fetch(url, {
    method: "GET",
    headers: myHeaders
  })
  const data: List<PostPreview> = await response.json();
  return data;
}

const getPostById: (id: string) => Promise<Post> = async (id) => {

  const myHeaders = new Headers();
  myHeaders.append("app-id", import.meta.env.VITE_API_ID);

  const url = `${import.meta.env.VITE_API_URL}post/${id}`

  const response = await fetch(url, {
    method: "GET",
    headers: myHeaders
  })

  const data: Post = await response.json();
  return data;
}

export { getPostList, getPostById }
