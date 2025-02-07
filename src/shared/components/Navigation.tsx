import Grid3x3Icon from "./icons/Grid3x3Icon"
import UserIcon from "./icons/UserIcon"

type Props = {
  title: string
}

export default function Navigation({ title }: Props) {


  return (
    <>
      <nav className="bg-white/50 backdrop-blur-md border-b border-gray-200">
        <div className="py-4 max-w-7xl min-w-0 mx-auto flex justify-between">
          <h3 className="text-[#131313] font-semibold text-xl">{title}</h3>
          <div className="flex items-center gap-4">
            <Grid3x3Icon className="size-6 text-[#131313] cursor-pointer" />
            <UserIcon className="size-6 text-[#131313] cursor-pointer" />
          </div>
        </div>
      </nav>
    </>
  )
}
