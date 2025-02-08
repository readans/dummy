import { Link } from "wouter"
import UserIcon from "./icons/UserIcon"
import MessageIcon from "./icons/MessageIcon"
import MessagesIcon from "./icons/MessagesIcon"

type Link = {
  name: string,
  href: string,
  icon: React.ReactNode
}

const links: Link[] = [
  {
    name: "Users",
    href: "/",
    icon: <UserIcon />
  },
  {
    name: "Posts",
    href: "/posts",
    icon: <MessageIcon />
  },
]

export default function Sidebar() {
  return (
    <aside className="fixed left-0 flex flex-col w-[300px] h-full bg-white dark:bg-[#161616] p-[10px] border-r border-gray-200 dark:border-[#262626]">
      <div className="flex flex-col gap-10 grow text-lg font-semibold text-gray-800 dark:text-white">
        <ul className="flex flex-col gap-1">
          {links.map(link => (
            <li key={link.name}>
              <Link className={(active) => {
                return `${active && 'active'} flex items-center select-none gap-6 py-3 px-6 [&.active]:bg-[#e9e9e9] [&:not(.active)]:hover:bg-[#f3f3f3] dark:[&.active]:bg-[#282828] dark:[&:not(.active)]:hover:bg-[#181818] cursor-pointer [&_*]:cursor-pointer rounded-md`
              }} href={link.href}>
                {link.icon}
                <label>{link.name}</label>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
