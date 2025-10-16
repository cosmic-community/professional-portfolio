export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Professional Photography Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}