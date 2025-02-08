import { useQuery } from "@tanstack/react-query";
import AppLayout from "../../shared/layouts/AppLayout";
import { getPostList } from "../../shared/services/posts";
import PostCard from "../components/PostCard";
import PostCardSkeleton from "../components/PostCardSkeleton";

export default function Posts() {

  const { data, isLoading } = useQuery({
    queryKey: ["getPosts"],
    queryFn: getPostList,
  })

  return (
    <AppLayout>
      <div className="flex justify-center pt-6">
        <div className="w-xl min-w-0 space-y-4">
          {!isLoading ? data?.data.map(p => (
            <PostCard key={p.id} post={p} />
          )) : (
            <div className="w-xl min-w-0 space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <PostCardSkeleton key={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
