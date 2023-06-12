/* eslint-disable no-undef */
'use client'

export function Form ({ children, action, method, className }) {
  const router = useRouter()
  const handleSubmit = (e) => {
    e.preventDefault()
    router.push(action)
  }

  return (
    <form
      action={action}
      method={method}
      onSubmit={handleSubmit}
      className={className}
    >
      {children}
    </form>
  )
}
