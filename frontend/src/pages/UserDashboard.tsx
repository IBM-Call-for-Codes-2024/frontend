import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Label } from "../components/ui/Label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/Tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/Cards"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/Avatar"
import { ScrollArea } from "../components/ui/Scroll_Area"
import { User, Upload, MessageSquare, BarChart2, Settings } from 'lucide-react'
import DiseaseOptions from '../components/DiseaseOptions'
import UploadImage from '../components/UploadImage'
import Chat from '../components/Chat'

interface ChatMessage {
  id: string
  content: string
  timestamp: string
  isAI: boolean
}

interface ChatHistory {
  id: string
  title: string
  lastMessage: string
  timestamp: string
  messages: ChatMessage[]
}

const mockChatHistory: ChatHistory[] = [
  {
    id: '1',
    title: 'Skin Rash Diagnosis',
    lastMessage: 'Based on the image, it appears to be...',
    timestamp: '2023-06-15 14:30',
    messages: [
      { id: '1a', content: "I've uploaded an image of my skin rash. Can you help diagnose it?", timestamp: '2023-06-15 14:25', isAI: false },
      { id: '1b', content: "I've analyzed the image of your skin rash. Based on what I can see, it appears to be a case of contact dermatitis. This is often caused by exposure to an irritant or allergen. The rash shows typical signs such as redness, slight swelling, and what looks like small, itchy bumps. However, for a definitive diagnosis, I'd recommend consulting with a dermatologist. They can perform additional tests if necessary and provide appropriate treatment options. In the meantime, try to avoid scratching the area and keep it clean and dry. Cool compresses might help alleviate some discomfort. Do you have any other symptoms or questions about this condition?", timestamp: '2023-06-15 14:30', isAI: true },
    ]
  },
  {
    id: '2',
    title: 'Eye Infection Query',
    lastMessage: 'The symptoms you described could indicate...',
    timestamp: '2023-06-14 09:45',
    messages: [
      { id: '2a', content: "My eye has been red and itchy for a few days. What could it be?", timestamp: '2023-06-14 09:40', isAI: false },
      { id: '2b', content: "I'm sorry to hear you're experiencing discomfort with your eye. The symptoms you've described - redness and itchiness - could indicate several conditions, but one common possibility is conjunctivitis, also known as pink eye. Conjunctivitis is an inflammation of the conjunctiva, the thin, clear tissue that lies over the white part of the eye. It can be caused by a viral or bacterial infection, or by allergies. Other possibilities could include dry eye syndrome or an allergic reaction. Without a physical examination or more details, it's difficult to provide a definitive diagnosis. I would recommend the following steps: 1) Avoid touching or rubbing your eye to prevent spreading any potential infection. 2) Use a clean, warm compress on the affected eye for comfort. 3) If you wear contact lenses, switch to glasses until the symptoms resolve. 4) Most importantly, consult with an eye doctor (optometrist or ophthalmologist) as soon as possible. They can properly examine your eye and provide an accurate diagnosis and treatment plan. If you experience severe pain, vision changes, or if the condition worsens rapidly, seek immediate medical attention. Do you have any other symptoms or questions about your eye condition?", timestamp: '2023-06-14 09:45', isAI: true },
    ]
  },
]

export default function UserDashboard() {
  const [activeChat, setActiveChat] = useState<ChatHistory | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [uploadStep, setUploadStep] = useState(0)
  const [imageType, setImageType] = useState<'rash' | 'eye' | null>(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null)
  const [chatMessages, setChatMessages] = useState<Array<{ text: string; isAI: boolean }>>([])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() && activeChat) {
      const updatedChat = {
        ...activeChat,
        messages: [
          ...activeChat.messages,
          { id: Date.now().toString(), content: newMessage, timestamp: new Date().toISOString(), isAI: false }
        ]
      }
      setActiveChat(updatedChat)
      setNewMessage('')
      // Here you would typically send the message to your AI service and update with the response
    }
  }

  const handleImageTypeSelect = (type: 'rash' | 'eye') => {
    setImageType(type)
    setUploadStep(1)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, imageUrl: string) => {
    console.log('Image uploaded:', event.target.files?.[0])
    setUploadedImageUrl(imageUrl)
    setUploadStep(2)
    setChatMessages([{ text: `I've analyzed your ${imageType} image. Let's discuss your symptoms in more detail.`, isAI: true }])
  }

  const handleChatSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const input = form.elements.namedItem('message') as HTMLInputElement
    const userMessage = input.value
    setChatMessages(prev => [...prev, { text: userMessage, isAI: false }])
    form.reset()
    setTimeout(() => {
      setChatMessages(prev => [...prev, { text: `Based on the ${imageType} image and your symptoms, it appears to be...`, isAI: true }])
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-teal-50 p-8">
      <Card className="w-full max-w-6xl mx-auto bg-white bg-opacity-90 backdrop-blur-lg shadow-xl rounded-xl overflow-hidden">
        <CardHeader className="border-b border-gray-200">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-indigo-600">User Dashboard</CardTitle>
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
              <AvatarFallback><User /></AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 rounded-lg bg-indigo-100 p-1">
              <TabsTrigger value="overview" className="rounded-md py-2">Overview</TabsTrigger>
              <TabsTrigger value="upload" className="rounded-md py-2">Upload</TabsTrigger>
              <TabsTrigger value="history" className="rounded-md py-2">Chat History</TabsTrigger>
              <TabsTrigger value="settings" className="rounded-md py-2">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome back, User!</CardTitle>
                  <CardDescription>Here's an overview of your account activity.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
                        <BarChart2 className="h-4 w-4 text-indigo-600" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">28</div>
                        <p className="text-xs text-gray-500">+10% from last month</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Active Chats</CardTitle>
                        <MessageSquare className="h-4 w-4 text-indigo-600" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-gray-500">2 new since yesterday</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Saved Reports</CardTitle>
                        <Settings className="h-4 w-4 text-indigo-600" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-gray-500">View all reports</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="upload" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upload a New Image</CardTitle>
                  <CardDescription>Upload an image for AI analysis.</CardDescription>
                </CardHeader>
                <CardContent>
                  <AnimatePresence mode="wait">
                    {uploadStep === 0 && (
                      <DiseaseOptions onImageTypeSelect={handleImageTypeSelect} fromDashboard={true} />
                    )}
                    {uploadStep === 1 && (
                      <UploadImage imageType={imageType} onImageUpload={handleImageUpload} />
                    )}
                    {uploadStep === 2 && (
                      <Chat
                        chatMessages={chatMessages}
                        onSendMessage={handleChatSendMessage}
                        imageType={imageType}
                        uploadedImageUrl={uploadedImageUrl}
                      />
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="history" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Chat History</CardTitle>
                  <CardDescription>Review and continue your previous conversations.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex h-[600px]">
                    <div className="w-1/3 border-r border-gray-200 pr-4">
                      <ScrollArea className="h-[570px]">
                        {mockChatHistory.map((chat) => (
                          <div
                            key={chat.id}
                            className={`p-3 mb-2 rounded-lg cursor-pointer transition-colors ${
                              activeChat?.id === chat.id ? 'bg-indigo-100' : 'hover:bg-indigo-50'
                            }`}
                            onClick={() => setActiveChat(chat)}
                          >
                            <h3 className="font-semibold text-indigo-600">{chat.title}</h3>
                            <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                            <p className="text-xs text-gray-400 mt-1">{chat.timestamp}</p>
                          </div>
                        ))}
                      </ScrollArea>
                    </div>
                    <div className="w-2/3 pl-4">
                      {activeChat ? (
                        <>
                          <ScrollArea className="h-[500px] mb-4 p-4 border border-gray-200 rounded-lg">
                            {activeChat.messages.map((message) => (
                              <div
                                key={message.id}
                                className={`mb-4 ${
                                  message.isAI ? 'text-left' : 'text-right'
                                }`}
                              >
                                <div
                                  className={`inline-block p-3 rounded-lg ${
                                    message.isAI
                                      ? 'bg-indigo-100 text-indigo-800'
                                      : 'bg-green-100 text-green-800'
                                  }`}
                                >
                                  {message.content}
                                </div>
                                <p className="text-xs text-gray-400 mt-1">
                                  {message.timestamp}
                                </p>
                              </div>
                            ))}
                          </ScrollArea>
                          <form onSubmit={handleSendMessage} className="flex gap-2">
                            <Input
                              type="text"
                              placeholder="Type your message..."
                              value={newMessage}
                              onChange={(e) => setNewMessage(e.target.value)}
                              className="flex-grow"
                            />
                            <Button type="submit">Send</Button>
                          </form>
                        </>
                      ) : (
                        <div className="h-full flex items-center justify-center text-gray-500">
                          Select a chat to view the conversation
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="settings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences and information.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue="John Doe" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>
                    <div>
                      <Label htmlFor="notifications">Notification Preferences</Label>
                      <select id="notifications" className="w-full p-2 border border-gray-300 rounded-md">
                        <option>All notifications</option>
                        <option>Important only</option>
                        <option>None</option>
                      </select>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}