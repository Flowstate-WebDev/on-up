import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/nauczyciel/')({
  component: TeacherPage,
  beforeLoad: () => {
    document.title = 'On-Up | Dla nauczyciela'
  }
})

function TeacherPage() {
  return <div>Hello "/nauczyciel/"!</div>
}