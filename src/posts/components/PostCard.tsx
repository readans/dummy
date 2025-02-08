import Send2Icon from "../../shared/components/icons/Send2Icon"
import ThumbUpIcon from "../../shared/components/icons/ThumbUpIcon"
import { PostPreview } from "../../shared/models/Post"
import { formatDate, formatRelativeTime } from "../../shared/utils/dateUtils"

type Props = {
  post: PostPreview
}

export default function PostCard({ post }: Props) {
  return (
    <div className="bg-white dark:bg-[#161616] border border-gray-200 dark:border-neutral-800 rounded-xl">
      <div className="p-6 grid grid-cols-[40px_1fr_20px] gap-4 border-b border-gray-200 dark:border-neutral-800">
        <img className="size-10 rounded-full" src={post.owner.picture} alt="" />
        <div className="">
          <h4 className="text-lg font-semibold dark:text-white">{post.owner.firstName} {post.owner.lastName}</h4>
          <h6 className="text-neutral-700 dark:text-neutral-400">{post.owner.title}</h6>
        </div>
      </div>
      <div className="p-6 space-y-6 border-b border-gray-200 dark:border-neutral-800">
        <p className="text-neutral-700 dark:text-neutral-400 inline-flex gap-2">
          {post.text}
          <span className="text-violet-500">{post.tags.join(' ')}</span>
        </p>
        <img className="aspect-[3/2] rounded-lg w-full" src={post.image} alt="" />
        <div className="grid grid-cols-2">
          <div className="inline-flex items-center gap-4 dark:text-white">
            <ThumbUpIcon className="cursor-pointer" />
            {post.likes}
          </div>
          <div className="justify-self-end dark:text-white">
            {formatRelativeTime(post.publishDate)}
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="px-4 border-b border-gray-200 dark:border-[#262626] flex items-center gap-4">
          <input className="outline-none py-3 flex-1 text-lg dark:text-white" type="text" placeholder="Write a comment" name="" id="" />
          <Send2Icon className="text-neutral-400 cursor-pointer" />
        </div>
      </div>
    </div>
  )
}
