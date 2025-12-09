import { Link } from "react-router-dom";
import type { Article } from "../type";

type Props = {
  article: Article;
  onEdit: (a: Article) => void;
  onDelete: (id: string) => void;
};

export default function ArticleCard({ article, onEdit, onDelete }: Props){
  return (
    <li className="card">
      <Link to={`/articles/${article.id}`} aria-label={`Open article ${article.title}`}>
        <h3 style={{margin:"0 0 4px"}}>{article.title}</h3>
      </Link>
      <div className="meta">
        <span className="badge">{article.category || "uncategorized"}</span>
        {" · "}
        <time dateTime={article.createdAt}>{new Date(article.createdAt).toLocaleString()}</time>
        {" · "}
        <span>by {article.author || "Anonymous"}</span>
      </div>
      <p style={{margin:"6px 0 0", color:"var(--text)"}}>
        {article.content.slice(0, 140)}{article.content.length>140?"…":""}
      </p>
      <div className="toolbar" style={{marginTop:8}}>
        <button className="btn ghost" onClick={()=>onEdit(article)} aria-label="Edit article">Edit</button>
        <button className="btn danger" onClick={()=>onDelete(article.id)} aria-label="Delete article">Delete</button>
      </div>
    </li>
  );
}
