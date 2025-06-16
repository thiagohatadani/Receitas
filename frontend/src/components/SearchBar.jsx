export function SearchBar({ onSearch, onAdd }) {
    return (
      <div className="bg-amber-100">
        <div className="flex items-center justify-between pb-4 ml-4">
        <input
          type="text"
          placeholder="Buscar receitas..."
          onChange={(e) => onSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full max-w-md	bg-white"
        />
      </div>
      </div>
    );
  }