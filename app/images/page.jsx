import Link from 'next/link'
export default function ImagesPage() {
    let post = {
        id: 1,
        title: "This is the title",
        body: "This is the body"
    }
    return (
        <div>
            <h2>Images:</h2>
            <article>
                <Link href="/images/[id]" as={`/images/${post.id}`}>
                    <h4>{post.title}</h4>
                    <p>{post.body}</p>
                </Link>
            </article>
        </div>
    )
}