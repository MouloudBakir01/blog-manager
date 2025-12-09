import type { Article } from "../type";
import ArticleCard from "./ArticleCard";

type Props = {
  items: Article[];
  onEdit: (a: Article) => void;
  onDelete: (id: string) => void;
};

export default function ArticleList({ items, onEdit, onDelete }: Props){
  if (!items.length) return <p className="meta">Pas encore d'article.</p>;
  return (
    <ul className="list">
      {items.map(a => (
        <ArticleCard key={a.id} article={a} onEdit={onEdit} onDelete={onDelete}/>
      ))}
    </ul>
  );
}
