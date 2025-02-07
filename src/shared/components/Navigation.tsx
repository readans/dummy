import { useTheme } from "../hooks/useTheme"
import GitHubIcon from "./icons/GitHubIcon"
import MoonIcon from "./icons/MoonIcon";
import SunIcon from "./icons/SunIcon";
import VercelIcon from "./icons/VercelIcon"

export default function Navigation() {

  const { theme, changeTheme } = useTheme();

  return (
    <>
      <nav className="bg-white/50 dark:bg-[#161616] sticky top-0 left-0 backdrop-blur-md border-b border-gray-200 dark:border-[#262626] h-16 px-[34px] flex items-center justify-between">
        <a className="flex items-center gap-4" href={import.meta.env.BASE_URL}>
          <VercelIcon className="size-6 dark:text-white" />
          <h3 className="text-[#131313] dark:text-white font-semibold text-xl">Dummy</h3>
        </a>
        <div className="flex items-center gap-4">
          <a className="hover:bg-[#ececec] dark:hover:bg-[#222222] p-2 rounded-full text-[#222222] dark:text-neutral-400 cursor-pointer" href="https://github.com/readans" target="_blank">
            <GitHubIcon />
          </a>
          <button className="hover:bg-[#ececec] dark:hover:bg-[#222222] p-2 rounded-full text-[#222222] dark:text-neutral-400 cursor-pointer" onClick={() => changeTheme()}>
            {theme == 'light' ? (
              <SunIcon />
            ) : (
              <MoonIcon />
            )}
          </button>
        </div>
      </nav>
    </>
  )
}
