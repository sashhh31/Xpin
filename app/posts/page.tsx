"use client"
import React, { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Heart, MessageCircle, MoreHorizontal, Send, ArrowLeft, Moon, Sun } from 'lucide-react'
import {
    Bell,
    Bookmark,
    Home,


    
    Search,
    User,
} from "lucide-react";

type Comment = {
  id: number
  user: string
  avatar: string
  content: string
  timestamp: string
  likes: number
}

type Post = {
  id: number
  user: string
  avatar: string
  content: string
  image?: string
  likes: number
  comments: Comment[]
  shares: number
  timestamp: string
}

export default function PostDetail() {
  const [darkMode, setDarkMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState("");
  const [post, setPost] = useState<Post>({
    id: 1,
    user: "John Doe",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "Just had an amazing day at the beach! The sunset was absolutely breathtaking, and the waves were perfect for surfing. Can't wait to go back tomorrow! 🏖️🌅🏄‍♂️ #SummerVibes #BeachLife",
    image: "/placeholder.svg?height=400&width=600",
    likes: 120,
    comments: [
      { id: 1, user: "Alice", avatar: "/placeholder.svg?height=40&width=40", content: "Looks amazing! I'm so jealous right now. 😍", timestamp: "2h ago", likes: 5 },
      { id: 2, user: "Bob", avatar: "/placeholder.svg?height=40&width=40", content: "Great shot! Which beach is this?", timestamp: "1h ago", likes: 3 },
      { id: 3, user: "Charlie", avatar: "/placeholder.svg?height=40&width=40", content: "Wow, the colors in that sunset are incredible!", timestamp: "45m ago", likes: 7 },
      { id: 4, user: "Diana", avatar: "/placeholder.svg?height=40&width=40", content: "I need a beach day like this ASAP!", timestamp: "30m ago", likes: 2 },
      { id: 5, user: "Ethan", avatar: "/placeholder.svg?height=40&width=40", content: "Living your best life, man! Enjoy!", timestamp: "15m ago", likes: 4 },
    ],
    shares: 15,
    timestamp: "3h ago"
  })
  const [newComment, setNewComment] = useState("")

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const handleLike = () => {
    setPost(prevPost => ({
      ...prevPost,
      likes: prevPost.likes + 1
    }))
  }

  const handleCommentLike = (commentId: number) => {
    setPost(prevPost => ({
      ...prevPost,
      comments: prevPost.comments.map(comment =>
        comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
      )
    }))
  }

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const newCommentObj: Comment = {
        id: Date.now(),
        user: "Current User",
        avatar: "/placeholder.svg?height=40&width=40",
        content: newComment,
        timestamp: "Just now",
        likes: 0
      }
      setPost(prevPost => ({
        ...prevPost,
        comments: [newCommentObj, ...prevPost.comments]
      }))
      setNewComment("")
    }
  }

  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 ${darkMode ? 'dark' : ''}`}>
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5 text-gray-900 dark:text-gray-100" />
            </Button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Post</h1>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {darkMode ? <Sun className="h-5 w-5 text-gray-900 dark:text-gray-100" /> : <Moon className="h-5 w-5 text-gray-900 dark:text-gray-100" />}
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex flex-col lg:flex-row">
        <aside className="w-full lg:w-1/4 lg:sticky lg:top-16 lg:h-screen lg:overflow-y-auto mb-8 lg:mb-0 lg:pr-4">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold dark:text-gray-100">
                Navigation
              </h2>
            </CardHeader>
            <CardContent>
              <nav className="space-y-2">
                <Button variant="ghost" className="w-full justify-start dark:text-gray-100">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
                <Button variant="ghost" className="w-full justify-start dark:text-gray-100">
                  <Search className="mr-2 h-4 w-4" />
                  Explore
                </Button>
                <Button variant="ghost" className="w-full justify-start dark:text-gray-100">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
                <Button variant="ghost" className="w-full justify-start dark:text-gray-100">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Messages
                </Button>
                <Button variant="ghost" className="w-full justify-start dark:text-gray-100">
                  <Bookmark className="mr-2 h-4 w-4" />
                  Bookmarks
                </Button>
                <Button variant="ghost" className="w-full justify-start dark:text-gray-100">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
              </nav>
            </CardContent>
          </Card>
        </aside>

        <div className="flex-1 lg:mr-4">
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={post.avatar} alt={post.user} />
                    <AvatarFallback>{post.user[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold text-gray-900 dark:text-gray-100">{post.user}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{post.timestamp}</p>
                  </div>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4 text-gray-900 dark:text-gray-100" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-40">
                    <div className="grid gap-4">
                      <Button variant="ghost" className="text-gray-900 dark:text-gray-100">Mute</Button>
                      <Button variant="ghost" className="text-gray-900 dark:text-gray-100">Block</Button>
                      <Button variant="ghost" className="text-gray-900 dark:text-gray-100">Report</Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-900 dark:text-gray-100">{post.content}</p>
              {post.image && (
                <img src={post.image} alt="Post image" className="rounded-lg w-full" />
              )}
            </CardContent>
            <CardFooter>
              <div className="flex justify-between w-full">
                <Button variant="ghost" size="sm" onClick={handleLike} className="text-gray-900 dark:text-gray-100">
                  <Heart className="mr-2 h-4 w-4" />
                  {post.likes}
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-900 dark:text-gray-100">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {post.comments.length}
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-900 dark:text-gray-100">
                  <Send className="mr-2 h-4 w-4" />
                  {post.shares}
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Comments</h2>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Current User" />
                  <AvatarFallback>CU</AvatarFallback>
                </Avatar>
                <Input
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="text-gray-900 dark:text-gray-100"
                />
                <Button onClick={handleCommentSubmit} className="text-gray-900 dark:text-gray-100">Send</Button>
              </div>
              <ScrollArea className="h-[400px]">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex items-start space-x-4 mb-4">
                    <Avatar>
                      <AvatarImage src={comment.avatar} alt={comment.user} />
                      <AvatarFallback>{comment.user[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                        <p className="font-semibold text-gray-900 dark:text-gray-100">{comment.user}</p>
                        <p className="text-gray-900 dark:text-gray-100">{comment.content}</p>
                      </div>
                      <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <p>{comment.timestamp}</p>
                        <Button variant="ghost" size="sm" className="ml-2 text-gray-900 dark:text-gray-100" onClick={() => handleCommentLike(comment.id)}>
                          <Heart className="h-4 w-4 mr-1 text-gray-900 dark:text-gray-100" />
                          {comment.likes}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <aside className="w-full lg:w-1/4 lg:sticky lg:top-16 lg:h-screen lg:overflow-y-auto">
          <Card className="mb-8">
            <CardHeader>
              <h2 className="text-xl font-semibold dark:text-gray-100">
                Search
              </h2>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground dark:text-gray-100" />
                <Input
                  placeholder="Search SocialFusion"
                  className="pl-8 dark:bg-gray-800 dark:text-gray-100"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold dark:text-gray-100">
                Trending
              </h2>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 dark:text-gray-100">
                <li>#SummerVibes</li>
                <li>#TechReview</li>
                <li>#RunningGoals</li>
                <li>#FoodieFinds</li>
                <li>#TravelDreams</li>
              </ul>
            </CardContent>
          </Card>
        </aside>
      </main>
    </div>
  )
}
