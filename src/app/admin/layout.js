export default function AdminLayout({ children }) {
  return (
    <div className="h-screen overflow-hidden bg-gray-50 fixed inset-0 py-9 px-7">
      {children}
    </div>
  )
}