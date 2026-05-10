"use client"

import * as React from "react"
import { Avatar } from "@/components/ui/avatar"
import { 
  Heart, 
  MessageSquare, 
  Bookmark, 
  Share2, 
  MoreHorizontal,
  MapPin,
  Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"

interface PostCardProps {
  post: {
    user: { name: string; avatar?: string; location: string };
    content: string;
    images?: string[];
    likes: number;
    comments: number;
    timeAgo: string;
    isAIGenerated?: boolean;
  }
}

export function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = React.useState(false)

  return (
    <div className="rounded-[24px] border border-border bg-surface overflow-hidden shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg animate-fade-up">
      {/* Post Header */}
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar src={post.user.avatar} fallback={post.user.name[0]} size="lg" className="border-2 border-background" />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base font-bold text-text-primary">{post.user.name}</h4>
              {post.isAIGenerated && (
                <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary border border-primary/20">
                  <Sparkles className="size-3" />
                  AI Curated
                </div>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-text-muted mt-1">
              <MapPin className="size-3.5" />
              {post.user.location} · {post.timeAgo}
            </div>
          </div>
        </div>
        <button className="text-text-muted hover:text-text-primary transition-colors">
          <MoreHorizontal className="size-6" />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-6 pb-6">
        <p className="text-base text-text-secondary leading-relaxed">
          {post.content}
        </p>
      </div>

      {/* Post Images */}
      {post.images && post.images.length > 0 && (
        <div className={cn(
          "grid gap-1 bg-background",
          post.images.length === 1 ? "grid-cols-1" : "grid-cols-2"
        )}>
          {post.images.map((img, i) => (
            <div key={i} className="aspect-video overflow-hidden">
              <img src={img} alt="" className="size-full object-cover transition-transform hover:scale-105 duration-700" />
            </div>
          ))}
        </div>
      )}

      {/* Post Actions */}
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className="flex items-center gap-2 text-sm font-bold transition-colors hover:text-primary"
          >
            <Heart className={cn("size-5 transition-transform", isLiked ? "fill-primary text-primary scale-110" : "text-text-muted")} />
            <span className={cn(isLiked ? "text-primary" : "text-text-secondary")}>{post.likes + (isLiked ? 1 : 0)}</span>
          </button>
          <button className="flex items-center gap-2 text-sm font-bold text-text-secondary transition-colors hover:text-text-primary">
            <MessageSquare className="size-5 text-text-muted" />
            <span>{post.comments}</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-text-muted hover:text-text-primary transition-colors">
            <Bookmark className="size-5" />
          </button>
          <button className="text-text-muted hover:text-text-primary transition-colors">
            <Share2 className="size-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
