function SearchBar({ onSearch }) {
  const handleChange = (e) => {
    onSearch(e.target.value); // langsung update ke parent (Home)
  };

  return (
    <div className="max-w-2xl mx-auto text-center pt-8">
      <form onSubmit={(e) => e.preventDefault()} className="relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Cari berdasarkan judul atau penulis..."
            onChange={handleChange}
            className="w-full px-6 py-4 pr-12 text-gray-700 bg-white rounded-full 
             shadow-md focus:shadow-lg focus:shadow-gray-400/50 
             focus:outline-none text-lg"
          />
          <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#be9c2e] hover:bg-[#a68929] text-white p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
