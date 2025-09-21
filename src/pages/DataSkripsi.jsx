import SearchBar from "../components/SearchBar";

function DataSkripsi() {
  return (
    <>
     {/* Section Search */}
      <div className="max-w-2xl mx-auto text-center pt-10 px-6">
        <h2 className="text-[#1a2b52] text-3xl font-bold">Cari Data Skripsi Yang Anda Butuhkan</h2>
        <SearchBar />
      </div>
    </>
  );
}

export default DataSkripsi;
