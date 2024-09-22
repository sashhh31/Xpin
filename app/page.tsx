"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button";
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/Config';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Bell,
  Bookmark,
  Heart,
  Home,
  Image as ImageIcon,
  MessageCircle,
  Moon,
  MoreHorizontal,
  Search,
  Send,
  Sun,
  User,
} from "lucide-react";

type Comment = {
  id: number;
  user: string;
  avatar: string;
  content: string;
  timestamp: string;
};

type Post = {
  id: number;
  user: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: Comment[];
  shares: number;
  timestamp: string;
};

export default function MainFeed() {
  const router = useRouter()

  const [darkMode, setDarkMode] = useState(true);
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      user: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "This is a sample post.",
      image: "/path/to/image.jpg",
      likes: 10,
      comments: [
        {
          id: 1,
          user: "Jane Smith",
          avatar: "/placeholder.svg?height=40&width=40",
          content: "Great post!",
          timestamp: "2 minutes ago",
        },
      ],
      shares: 5,
      timestamp: "Just now",
    },
  ]);
  
  const [newPost, setNewPost] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [newComments, setNewComments] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        
        window.location.href = '/api/login';
      } 

    });

    return () => unsubscribe();
  }, []);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now(),
        user: "Current User",
        avatar: "/placeholder.svg?height=40&width=40",
        content: newPost,
        likes: 0,
        comments: [],
        shares: 0,
        timestamp: "Just now",
      };
      setPosts([post, ...posts]);
      setNewPost("");
    }
  };

  const handleLike = (id: number) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };


  const handleCommentSubmit = (postId: number) => {
    if (newComments[postId]?.trim()) {
      setPosts(
        posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: [
                  ...post.comments,
                  {
                    id: Date.now(),
                    user: "Current User",
                    avatar: "/placeholder.svg?height=40&width=40",
                    content: newComments[postId],
                    timestamp: "Just now",
                  },
                ],
              }
            : post
        )
      );
      setNewComments({ ...newComments, [postId]: "" });
    }
  };

  return (
    <div
      className={`min-h-screen bg-gray-100 dark:bg-gray-900 ${
        darkMode ? "" : "dark"
      }`}
    >
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-500 dark:text-gray-100">
            Xpin
          </h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {darkMode ? (
                <Sun className="h-5 w-5 text-gray-100" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Avatar>
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="User"
              />
              <AvatarFallback className="text-gray-100">U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8 lg:pl-1/4">
      <aside className=" top-0 left-0 w-full lg:w-1/4 lg:top-16 lg:bottom-0 lg:overflow-y-auto lg:h-screen z-10">
      <Card>
    <CardHeader>
      <h2 className="text-xl font-semibold dark:text-gray-100">
        Navigation
      </h2>
    </CardHeader>
    <CardContent>
      <nav className="space-y-2">
        <Button variant="ghost" className="w-full justify-start">
          <Home className="mr-2 h-4 w-4" onClick={() => router.push('/')}/>
          Home
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Search className="mr-2 h-4 w-4" />
          Explore
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Bell className="mr-2 h-4 w-4" />
          Notifications
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <MessageCircle className="mr-2 h-4 w-4" />
          Messages
        </Button>
        <Button variant="ghost" className="w-full justify-start" onClick={() => router.push('/bookmarks')}>
          <Bookmark className="mr-2 h-4 w-4" />
          Bookmarks
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <User className="mr-2 h-4 w-4" />
          Profile
        </Button>
      </nav>
    </CardContent>
  </Card>
</aside>


        <section className="w-full lg:w-1/2">
          <Card className="mb-8">
            <CardHeader>
              <h2 className="text-xl font-semibold dark:text-gray-100">
                Create Post
              </h2>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="What's happening?"
                className="mb-4 dark:bg-gray-800 dark:text-gray-100"
                value={newPost}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setNewPost(e.target.value)
                }
              />
              <div className="flex justify-between items-center">
                <Button variant="outline" size="icon">
                  <ImageIcon className="h-4 w-4 dark:text-gray-100" />
                </Button>
                <Button onClick={handlePostSubmit}>Post</Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="foryou" className="mb-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="foryou" className="dark:text-gray-100">
                For You
              </TabsTrigger>
              <TabsTrigger value="following" className="dark:text-gray-100">
                Following
              </TabsTrigger>
            </TabsList>
            <TabsContent value="foryou">
              <ScrollArea className="h-[600px]">
                {posts.map((post) => (
                  <Card key={post.id} className="mb-4">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={post.avatar} alt={post.user} />
                            <AvatarFallback>{post.user[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{post.user}</h3>
                            <p className="text-sm text-gray-500">{post.timestamp}</p>
                          </div>
                        </div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-40">
                            <div className="grid gap-4">
                              <Button variant="ghost">Mute</Button>
                              <Button variant="ghost">Block</Button>
                              <Button variant="ghost">Report</Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>{post.content}</p>
                      {post.image && (
                        <img src={post.image} alt="Post image" className="mt-4 rounded-lg w-full" />
                      )}
                    </CardContent>
                    <CardFooter>
                      <div className="flex justify-between w-full">
                        <Button variant="ghost" size="sm" onClick={() => handleLike(post.id)}>
                          <Heart className="mr-2 h-4 w-4" />
                          {post.likes}
                        </Button>
                        <Collapsible>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MessageCircle className="mr-2 h-4 w-4" />
                              {post.comments.length}
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="mt-2">
                            <Card>
                              <CardContent className="pt-4">
                                {post.comments.map((comment) => (
                                  <div key={comment.id} className="flex items-start space-x-2 mb-2">
                                    <Avatar className="w-8 h-8">
                                      <AvatarImage src={comment.avatar} alt={comment.user} />
                                      <AvatarFallback>{comment.user[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <p className="text-sm font-semibold">{comment.user}</p>
                                      <p className="text-sm">{comment.content}</p>
                                      <p className="text-xs text-gray-500">{comment.timestamp}</p>
                                    </div>
                                  </div>
                                ))}
                                <div className="flex items-center space-x-2 mt-4">
                                  <Input
                                    placeholder="Add a comment..."
                                    value={newComments[post.id] || ""}
                                    onChange={(e) => setNewComments({...newComments, [post.id]: e.target.value})}
                                  />
                                  <Button size="sm" onClick={() => handleCommentSubmit(post.id)}>Send</Button>
                                </div>
                              </CardContent>
                            </Card>
                          </CollapsibleContent>
                        </Collapsible>
                        <Button variant="ghost" size="sm">
                          <Send className="mr-2 h-4 w-4" />
                          {post.shares}
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="following">
              <p className="dark:text-gray-100">
                Content from accounts you follow will appear here.
              </p>
            </TabsContent>
          </Tabs>
        </section>
        <aside className="w-full lg:w-1/4">
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
  );
}
