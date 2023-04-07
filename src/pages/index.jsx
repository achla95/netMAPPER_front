import Page from "@/web/components/Page.jsx"
import PostSummary from "@/web/components/PostSummary.jsx"
import api from "@/web/services/api.js"
import { useEffect, useState } from "react"

const IndexPage = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    ;(async () => {
      const {
        data: { result },
      } = await api("/posts")

      setPosts(result)
    })()
  }, [])

  return (
    <Page className="gap-8">
      {posts.map((post) => (
        <PostSummary key={post._id} post={post} />
      ))}
    </Page>
  )
}

export default IndexPage
