
export const Header = () => {
    return (
        <header className="flex items-center justify-between w-full px-6 py-4 bg-white border-b border-gray-200">
            <a href="/" className="text-lg font-semibold text-gray-900">Streaming</a>
            <nav className="flex gap-x-6">
                <a href="/" className="text-sm font-semibold text-gray-600 hover:text-gray-900">Home</a>
                <a href="/movies" className="text-sm font-semibold text-gray-600 hover:text-gray-900">Movies</a>
                <a href="/tv-shows" className="text-sm font-semibold text-gray-600 hover:text-gray-900">TV Shows</a>
                <a href="/my-list" className="text-sm font-semibold text-gray-600 hover:text-gray-900">My List</a>
            </nav>
        </header>
    )
}