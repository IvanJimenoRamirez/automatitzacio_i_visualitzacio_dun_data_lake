'use client'

import { useEffect, useState } from 'react'

export function ProjectName ({ id }) {
  const [project, setProject] = useState(false)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/DataLakeAPI/projects/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProject(data)
      })
  }, [])

  return (
    <>
      {project && project.name}
    </>
  )
}
