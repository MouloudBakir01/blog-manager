type Props = {
  query: string;
  setQuery: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  order: "newest" | "oldest";
  setOrder: (v: "newest" | "oldest") => void;
};

export default function SearchBar({ query, setQuery, category, setCategory, order, setOrder }: Props){
  return (
    <div className="panel" role="search">
      <div className="row">
        <input
          className="input"
          placeholder="Search by title or author…"
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
          aria-label="Search articles"
        />
        <input
          className="input"
          placeholder="Filter by category…"
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
          aria-label="Filter by category"
        />
        <select className="select" value={order} onChange={(e)=>setOrder(e.target.value as any)} aria-label="Sort by date">
          <option value="newest">Nouveau → Ancien</option>
          <option value="oldest">Ancien → Nouveau</option>
        </select>
      </div>
    </div>
  );
}
