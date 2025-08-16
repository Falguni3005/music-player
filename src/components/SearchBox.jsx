import { Search } from "lucide-react";

export default function SearchBox({ value, setValue }) {
  return (
    <div className="relative w-full mb-4">
      <input
        type="text"
        placeholder="Search Song, Artist"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-2 pr-10 rounded bg-white/10 outline-none"
      />
      <Search
        size={18}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      />
    </div>
  );
}

  