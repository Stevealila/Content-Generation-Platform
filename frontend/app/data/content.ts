const apiKey = process.env.NEXT_PUBLIC_API_KEY
const backendURL = "http://localhost:8080/api/content"

if (!apiKey) {
  throw new Error("API key is not defined")
}  

export const postContent = async (question: string) => {
    
    const res = await fetch(backendURL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "API-Key": apiKey
        },
        body: JSON.stringify({ question })
    })
    
    if(!res.ok) {
        throw new Error("Failed to POST content")
    }

    const content = await res.json()

    return content
}