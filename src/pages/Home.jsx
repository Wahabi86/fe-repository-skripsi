import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { getAllSkripsi } from "../services/skripsiService";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function Home() {
  const [skripsiData, setSkripsiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllSkripsi();
        setSkripsiData(data);
      } catch (error) {
        console.error("Gagal memuat data skripsi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // filter skripsi (Search)
  const filteredData = skripsiData.filter((skripsi) => skripsi.judul.toLowerCase().includes(searchQuery.toLowerCase()) || skripsi.nama_mahasiswa.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      {/* Section Search */}
      <div className="max-w-2xl mx-auto text-center pt-10 px-6">
        <h2 className="text-[#1a2b52] text-3xl font-bold">Cari Skripsi Yang Anda Butuhkan</h2>
        <SearchBar onSearch={setSearchQuery} />
      </div>

      {/* Section Body*/}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : filteredData.length === 0 ? (
          <p className="text-center text-gray-500">Tidak ada hasil ditemukan</p>
        ) : (
          <div className="space-y-4">
            {filteredData.map((skripsi) => (
              <div key={skripsi.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
                  <div className="flex-1">
                    <div className="flex items-start mb-3">
                      <h4 className="text-xl font-semibold text-blue-600 hover:text-blue-800 cursor-pointer">{skripsi.judul}</h4>
                    </div>

                    <div className="flex items-center text-sm text-gray-600 mb-3 space-x-3">
                      <span className="text-[#be9c2e]">
                        {skripsi.nama_mahasiswa} ({skripsi.nim})
                      </span>
                      <span>{dayjs(skripsi.created_at).fromNow()}</span>
                    </div>

                    <p className="text-gray-700 text-sm leading-relaxed mb-4">{skripsi.abstrak}</p>
                    <span>{skripsi.prodi}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
