export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="px-16 py-16">
      <h1 className="text-5xl font-light text-text-body">{params.slug}</h1>
    </div>
  )
}
