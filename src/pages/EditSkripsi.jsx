import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { getAllSkripsi, updateSkripsi, deleteSkripsi, createSkripsi } from "../services/skripsiService";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function EditSkripsi() {
  const [skripsiData, setSkripsiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedSkripsi, setSelectedSkripsi] = useState(null);
  const [originalSkripsi, setOriginalSkripsi] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // State untuk Create
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newSkripsi, setNewSkripsi] = useState({
    judul: "",
    nama_mahasiswa: "",
    prodi: "",
    nim: "",
    pembimbing: "",
    abstrak: "",
  });

  const isCreateValid = newSkripsi.judul.trim() !== "" && newSkripsi.nama_mahasiswa.trim() !== "" && newSkripsi.prodi.trim() !== "" && newSkripsi.nim.trim() !== "" && newSkripsi.abstrak.trim() !== "";

  useEffect(() => {
    fetchData();
  }, []);

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

  // Edit Logic
  const handleEdit = (skripsi) => {
    setSelectedSkripsi(skripsi);
    setOriginalSkripsi({ ...skripsi });
    setShowModal(true);
  };

  const handleClose = () => {
    setSelectedSkripsi(null);
    setShowModal(false);
  };

  const handleSave = async () => {
    try {
      await updateSkripsi(selectedSkripsi.id, selectedSkripsi);
      await fetchData();
      handleClose();
      alert("Data skripsi berhasil diperbarui");
    } catch (error) {
      console.error("Gagal update skripsi:", error);
      alert("Gagal memperbarui data skripsi");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteSkripsi(selectedSkripsi.id);
      await fetchData();
      handleClose();
      alert("Data skripsi berhasil dihapus");
    } catch (error) {
      console.error("Gagal menghapus data skripsi:", error);
      alert("Gagal menghapus data skripsi");
    }
  };

  const isChanged = selectedSkripsi && JSON.stringify(selectedSkripsi) !== JSON.stringify(originalSkripsi);

  // Create Logic
  const handleCreateSkripsi = async () => {
    try {
      await createSkripsi(newSkripsi);
      await fetchData();
      setShowCreateModal(false);
      setNewSkripsi({
        judul: "",
        nama_mahasiswa: "",
        prodi: "",
        nim: "",
        pembimbing: "",
        abstrak: "",
      });
      alert("Data skripsi berhasil dibuat!");
    } catch (error) {
      console.error("Gagal membuat skripsi:", error);
      alert("Gagal membuat data skripsi");
    }
  };

  // filter search
  const filteredData = skripsiData.filter((skripsi) => skripsi.judul.toLowerCase().includes(searchQuery.toLowerCase()) || skripsi.nama_mahasiswa.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      {/* Section Search */}
      <div className="max-w-2xl mx-auto text-center pt-10 px-6">
        <h2 className="text-[#1a2b52] text-3xl font-bold">Cari Data Skripsi Yang Anda Butuhkan</h2>
        <SearchBar onSearch={setSearchQuery} />
      </div>

      {/* Section Body */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : filteredData.length === 0 ? (
          <p className="text-center text-gray-500">Tidak ada hasil ditemukan, Tambahkan Data Skripsi Anda</p>
        ) : (
          <div className="space-y-4">
            {filteredData.map((skripsi) => (
              <div key={skripsi.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200 relative">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
                  <div className="flex-1">
                    <div className="flex items-start mb-3">
                      <h4 className="text-xl font-semibold text-[#1a2b52] hover:text-[#2c4a7a] hover:underline cursor-pointer">{skripsi.judul}</h4>
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

                {/* Button Edit */}
                <button className="absolute top-4 right-4 bg-[#be9c2e] text-white px-4 py-1 rounded hover:bg-[#d1ab44] transition" onClick={() => handleEdit(skripsi)}>
                  Edit
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form Edit */}
      {showModal && selectedSkripsi && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
            {/* Close Button */}
            <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-800" onClick={handleClose}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center text-[#1a2b52]">Edit Skripsi</h2>

            <div className="grid grid-cols-2 gap-4">
              {/* Judul */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                <input type="text" value={selectedSkripsi.judul} onChange={(e) => setSelectedSkripsi({ ...selectedSkripsi, judul: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>

              {/* Nama Mahasiswa */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Mahasiswa</label>
                <input type="text" value={selectedSkripsi.nama_mahasiswa} onChange={(e) => setSelectedSkripsi({ ...selectedSkripsi, nama_mahasiswa: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>

              {/* Prodi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prodi</label>
                <input type="text" value={selectedSkripsi.prodi} onChange={(e) => setSelectedSkripsi({ ...selectedSkripsi, prodi: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>

              {/* NIM */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">NIM</label>
                <input type="text" value={selectedSkripsi.nim} onChange={(e) => setSelectedSkripsi({ ...selectedSkripsi, nim: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>

              {/* Dosen Pembimbing */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dosen Pembimbing</label>
                <input type="text" value={selectedSkripsi.pembimbing} onChange={(e) => setSelectedSkripsi({ ...selectedSkripsi, pembimbing: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>

              {/* Abstrak */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Abstrak</label>
                <textarea value={selectedSkripsi.abstrak} onChange={(e) => setSelectedSkripsi({ ...selectedSkripsi, abstrak: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2 h-50" />
              </div>
            </div>

            {/* Button Delete & Save */}
            <div className="flex justify-end space-x-3 mt-6">
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition" onClick={handleDelete}>
                Delete
              </button>
              <button className={`px-4 py-2 rounded transition ${isChanged ? "bg-[#be9c2e] hover:bg-[#d1ab44] text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`} onClick={handleSave} disabled={!isChanged}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button Create */}
      <button
        onClick={() => setShowCreateModal(true)}
        className="fixed bottom-6 right-6 bg-[#be9c2e] hover:bg-[#d1ab44] 
             text-white rounded-full w-14 h-14 flex items-center justify-center 
             shadow-lg"
      >
        {/* Icon Plus SVG */}
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* Form Create */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
            {/* Close Button */}
            <button onClick={() => setShowCreateModal(false)} className="absolute top-4 right-4 text-gray-600 hover:text-black">
              {/* Icon Close SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center text-[#1a2b52]">Create Skripsi</h2>

            <div className="grid grid-cols-2 gap-4">
              {/* Judul */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                <input type="text" value={newSkripsi.judul} onChange={(e) => setNewSkripsi({ ...newSkripsi, judul: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>

              {/* Nama Mahasiswa */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Mahasiswa</label>
                <input type="text" value={newSkripsi.nama_mahasiswa} onChange={(e) => setNewSkripsi({ ...newSkripsi, nama_mahasiswa: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>

              {/* Prodi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prodi</label>
                <input type="text" value={newSkripsi.prodi} onChange={(e) => setNewSkripsi({ ...newSkripsi, prodi: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>

              {/* NIM */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">NIM</label>
                <input type="text" value={newSkripsi.nim} onChange={(e) => setNewSkripsi({ ...newSkripsi, nim: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>

              {/* Dosen Pembimbing */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dosen Pembimbing</label>
                <input type="text" value={newSkripsi.pembimbing} onChange={(e) => setNewSkripsi({ ...newSkripsi, pembimbing: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>

              {/* Abstrak */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Abstrak</label>
                <textarea value={newSkripsi.abstrak} onChange={(e) => setNewSkripsi({ ...newSkripsi, abstrak: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2 h-50" />
              </div>
            </div>

            {/* Button Create */}
            <div className="flex justify-end mt-6">
              <button className={`px-4 py-2 rounded transition ${isCreateValid ? "bg-[#be9c2e] hover:bg-[#d1ab44] text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`} onClick={handleCreateSkripsi} disabled={!isCreateValid}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EditSkripsi;
