import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
            Photography
          </Link>
          
          <div className="flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900 transition-colors">
              Portfolio
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900 transition-colors">
              About
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}