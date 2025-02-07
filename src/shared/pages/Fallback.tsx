import { Link } from "wouter"
import VercelIcon from "../components/icons/VercelIcon"

type Props = {
  title: string,
  description: string
}

export default function Fallback({ title, description }: Props) {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-10">
      <VercelIcon className="text-primary-700 size-[60px]" />
      <div className="text-center space-y-4">
        <h1 className="dark:text-white text-5xl font-bold">{title}</h1>
        <p className="dark:text-neutral-400">{description}</p>
      </div>
      <Link to="/" className="px-8 py-3 rounded-full font-semibold text-white dark:text-[#131313] bg-[#131313] dark:bg-white">
        Inicio
      </Link>
    </div>
  )
}
