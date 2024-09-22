"use client"

import React, { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Bell, Bookmark, Heart, Home, MessageCircle, Moon, MoreHorizontal, Search, Send, Sun, User } from 'lucide-react'

type BookmarkedPost = {
  id: number
  user: string
  avatar: string
  content: string
  image?: string
  likes: number
  comments: number
  shares: number
  timestamp: string
}

export default function BookmarkPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [bookmarks, setBookmarks] = useState<BookmarkedPost[]>([
    {
      id: 1,
      user: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Just had an amazing day at the beach! 🏖️ #SummerVibes",
      image: "/placeholder.svg?height=300&width=400",
      likes: 120,
      comments: 15,
      shares: 5,
      timestamp: "2d ago"
    },
    {
      id: 2,
      user: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "New blog post is up! Check out my latest tech review. 📱💻 #TechReview",
      likes: 85,
      comments: 10,
      shares: 3,
      timestamp: "1w ago"
    },
    {
      id: 3,
      user: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Just finished my first marathon! 🏃‍♂️🏅 #RunningGoals",
      image: "/placeholder.svg?height=300&width=400",
      likes: 200,
      comments: 25,
      shares: 8,
      timestamp: "3d ago"
    },
  ])
  const [searchTerm, setSearchTerm] = useState("")

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

  const removeBookmark = (id: number) => {
    setBookmarks(bookmarks.filter(bookmark => bookmark.id !== id))
  }

  const filteredBookmarks = bookmarks.filter(bookmark =>
    bookmark.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bookmark.user.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 ${darkMode ? 'dark' : ''}`}>
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-500 dark:text-blue-400">SocialFusion</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {darkMode ? <Sun className="h-5 w-5 text-gray-900 dark:text-gray-100" /> : <Moon className="h-5 w-5 text-gray-900 dark:text-gray-100" />}
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
              <AvatarFallback className="dark:text-gray-100">U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-1/4">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold dark:text-gray-100">Navigation</h2>
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
                <Button variant="ghost" className="w-full justify-start bg-gray-200 dark:bg-gray-700 dark:text-gray-100">
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

        <section className="w-full lg:w-3/4">
          <Card className="mb-8">
            <CardHeader>
              <h2 className="text-xl font-semibold dark:text-gray-100">Your Bookmarks</h2>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Search bookmarks"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 dark:bg-gray-800 dark:text-gray-100"
              />
              <ScrollArea className="h-[600px]">
                {filteredBookmarks.map((bookmark) => (
                  <Card key={bookmark.id} className="mb-4">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={bookmark.avatar} alt={bookmark.user} />
                            <AvatarFallback className="dark:text-gray-100">{bookmark.user[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold dark:text-gray-100">{bookmark.user}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{bookmark.timestamp}</p>
                          </div>
                        </div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4 dark:text-gray-100" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-40 dark:bg-gray-800 dark:text-gray-100">
                            <div className="grid gap-4">
                              <Button variant="ghost" onClick={() => removeBookmark(bookmark.id)} className="dark:text-gray-100">Remove Bookmark</Button>
                              <Button variant="ghost" className="dark:text-gray-100">Share</Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="dark:text-gray-100">{bookmark.content}</p>
                      {bookmark.image && (
                        <img src={bookmark.image} alt="Bookmark image" className="mt-4 rounded-lg w-full" />
                      )}
                    </CardContent>
                    <CardFooter>
                      <div className="flex justify-between w-full">
                        <Button variant="ghost" size="sm" className="dark:text-gray-100">
                          <Heart className="mr-2 h-4 w-4" />
                          {bookmark.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="dark:text-gray-100">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          {bookmark.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="dark:text-gray-100">
                          <Send className="mr-2 h-4 w-4" />
                          {bookmark.shares}
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </section>
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
