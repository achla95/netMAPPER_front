import Link from "@/web/components/Link.jsx"
import { Fragment } from "react"

const Post = (props) => {
  const {
    post: { _id, title, content, tags, publishedAt },
  } = props

  return (
    <article className="flex flex-col gap-2">
      <header>
        <h1 className="text-lg font-semibold">
          <Link href={`/posts/${_id}`}>{title}</Link>
        </h1>
        <p className="text-sm italic text-neutral-500">
          Published on {publishedAt}
        </p>
      </header>
      <div className="flex flex-col gap-2">
        {content.split(/\n\n/g).map((paragraph, index) => (
          <p key={index}>
            {paragraph.split(/\n/g).map((line, i) => (
              <Fragment key={i}>
                {line}
                <br />
              </Fragment>
            ))}
          </p>
        ))}
      </div>
      {tags.length !== 0 && (
        <p className="flex gap-1.5 text-sm">
          {tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </p>
      )}
    </article>
  )
}

export default Post
