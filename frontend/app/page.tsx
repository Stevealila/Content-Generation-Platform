'use client'

import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import { postContent } from "./data/content"
import { useRouter } from 'next/navigation'
import { isUserLoggedIn } from "./data/user"

type Content = {
  title: string
  body: string
}

export default function Home() {
  const [content, setContent] = useState<Content>({ title: "", body: "" })
  const [question, setQuestion] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = isUserLoggedIn()
      if (!loggedIn) {
        router.push('/users/login')
      }
    }
    checkAuth()
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setQuestion(e.target.value)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await postContent(question)
      setContent(response.content)
    } catch (error) {
      console.error("Failed to fetch content:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <form className="mx-auto md:w-1/2 space-y-4 md:space-y-6 mt-10 p-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="question"
          value={question}
          onChange={handleChange}
          placeholder="Ask a question"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          disabled={isLoading}
        />
        <button type="submit" className="bg-teal-600 hover:bg-teal-800 text-gray-100 p-2 rounded-lg" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
      <div className="mx-auto md:w-2/4 space-y-4 md:space-y-6 my-8 p-4">
        <ReactMarkdown>{content.body}</ReactMarkdown>
      </div>
    </>
  )
}
