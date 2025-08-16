export default function Tabs({ activeTab, setActiveTab }) {
    return (
      <div className="flex gap-6 mb-4 mt-1">
        <button
          className={activeTab === "forYou" ? "font-bold text-xl" : "text-xl font-bold opacity-60"}
          onClick={() => setActiveTab("forYou")}
        >
          For You
        </button>
        <button
          className={activeTab === "topTracks" ? "font-bold text-xl" : "text-xl font-bold opacity-60"}
          onClick={() => setActiveTab("topTracks")}
        >
          Top Tracks
        </button>
      </div>
    );
  }
  