import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { useApp } from "@/context/AppContext"
import { Heart, MessageSquare, Send, Trash2, Clock, User, ChevronDown, ChevronUp, X } from "lucide-react"

interface Comment {
  id: string
  author: string
  content: string
  timestamp: string
}

export default function SkillFeed() {
  const { posts, addPost, deletePost, toggleLikePost, user } = useApp()
  const [newPostContent, setNewPostContent] = useState("")
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({})
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({})
  const [allComments, setAllComments] = useState<Record<string, Comment[]>>({
    "1": [
      { id: "c1", author: "Mitanshu Bhasin", content: "This is awesome, can't wait to try it! 🔥", timestamp: "1h ago" },
      { id: "c2", author: "Priya Sharma", content: "Looks clean. Is it open source?", timestamp: "45m ago" },
    ],
    "2": [
      { id: "c3", author: "Rohan Gupta", content: "DM'd you! I have 3 years Node.js experience.", timestamp: "4h ago" },
    ]
  })

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPostContent.trim()) return
    addPost(newPostContent)
    setNewPostContent("")
  }

  const toggleComments = (postId: string) => {
    setOpenComments(prev => ({ ...prev, [postId]: !prev[postId] }))
  }

  const handleAddComment = (postId: string) => {
    const content = commentInputs[postId]?.trim()
    if (!content) return
    const newComment: Comment = {
      id: Date.now().toString(),
      author: user.name || "You",
      content,
      timestamp: "Just now"
    }
    setAllComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment]
    }))
    setCommentInputs(prev => ({ ...prev, [postId]: "" }))
  }

  const handleDeleteComment = (postId: string, commentId: string) => {
    setAllComments(prev => ({
      ...prev,
      [postId]: (prev[postId] || []).filter(c => c.id !== commentId)
    }))
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Create Post Card */}
      <Card className="border-border/50 shadow-soft overflow-hidden">
        <CardContent className="pt-6">
          <form onSubmit={handlePostSubmit} className="space-y-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-secondary overflow-hidden shrink-0 border border-border">
                {user.imageUrl ? (
                  <img src={user.imageUrl} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <User className="w-5 h-5" />
                  </div>
                )}
              </div>
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="What are you working on? Share a skill update..."
                className="w-full min-h-[100px] p-3 text-sm rounded-lg bg-muted/30 border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none transition-all"
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" size="sm" disabled={!newPostContent.trim()} className="gap-2">
                <Send className="w-3.5 h-3.5" /> Post Update
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Feed */}
      <div className="space-y-4">
        <AnimatePresence initial={false}>
          {posts.map((post) => {
            const postComments = allComments[post.id] || []
            const isOpen = openComments[post.id]

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border-border/50 hover:shadow-card transition-all duration-300">
                  <CardHeader className="flex flex-row items-start justify-between pb-2">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary overflow-hidden border border-border">
                        <img src={post.authorImage} alt={post.author} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">{post.author}</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>@{post.authorUsername}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    {post.authorUsername === user.username && (
                      <button 
                        onClick={() => deletePost(post.id)}
                        className="p-1.5 text-muted-foreground hover:text-red-500 rounded-md hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                      {post.content}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-6 pt-2 border-t border-border/30">
                      <button 
                        onClick={() => toggleLikePost(post.id)}
                        className={`flex items-center gap-1.5 text-xs font-medium transition-all ${
                          post.isLiked ? "text-red-500" : "text-muted-foreground hover:text-red-500"
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${post.isLiked ? "fill-current" : ""}`} />
                        {post.likes}
                      </button>
                      <button 
                        onClick={() => toggleComments(post.id)}
                        className={`flex items-center gap-1.5 text-xs font-medium transition-all ${
                          isOpen ? "text-primary" : "text-muted-foreground hover:text-primary"
                        }`}
                      >
                        <MessageSquare className="w-4 h-4" />
                        {postComments.length}
                        {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                    </div>

                    {/* Comments Section */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 space-y-3">
                            {postComments.length === 0 && (
                              <p className="text-xs text-muted-foreground italic text-center py-3">No comments yet. Be the first!</p>
                            )}
                            {postComments.map(comment => (
                              <div key={comment.id} className="flex gap-2.5 group">
                                <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0 text-xs font-bold text-muted-foreground">
                                  {comment.author.charAt(0)}
                                </div>
                                <div className="flex-1 bg-muted/40 rounded-lg px-3 py-2 relative">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-foreground">{comment.author}</span>
                                    <div className="flex items-center gap-2">
                                      <span className="text-[10px] text-muted-foreground">{comment.timestamp}</span>
                                      {comment.author === user.name && (
                                        <button 
                                          onClick={() => handleDeleteComment(post.id, comment.id)}
                                          className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-red-500"
                                        >
                                          <X className="w-3 h-3" />
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                  <p className="text-xs text-foreground/80 mt-0.5">{comment.content}</p>
                                </div>
                              </div>
                            ))}

                            {/* Add Comment */}
                            <div className="flex gap-2 pt-1">
                              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <User className="w-3.5 h-3.5 text-primary" />
                              </div>
                              <div className="flex-1 flex gap-2">
                                <input
                                  type="text"
                                  value={commentInputs[post.id] || ""}
                                  onChange={e => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                                  onKeyDown={e => e.key === "Enter" && handleAddComment(post.id)}
                                  placeholder="Write a comment..."
                                  className="flex-1 h-8 px-3 text-xs rounded-lg border border-border bg-white focus:outline-none focus:ring-1 focus:ring-primary/30"
                                />
                                <Button 
                                  size="sm" 
                                  className="h-8 w-8 p-0"
                                  onClick={() => handleAddComment(post.id)}
                                  disabled={!commentInputs[post.id]?.trim()}
                                >
                                  <Send className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
