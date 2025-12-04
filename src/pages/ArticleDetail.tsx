import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { loadArticles } from "../utils/storage";

export default function ArticleDetail(){
  const { id } = useParams();
  const item = useMemo(()=> loadArticles().find(a => a.id === id), [id]);

  if (!item) return <p className="meta">Article introuvable.</p>;

  return (
    <article className="panel">
      <header className="row">
        <h2 style={{margin:0}}>{item.title}</h2>
        <Link className="btn ghost" to="/articles">Retour</Link>
      </header>
      <p className="meta" style={{marginTop:4}}>
        <span className="badge">{item.category || "uncategorized"}</span>
        {" · "}
        <time dateTime={item.createdAt}>{new Date(item.createdAt).toLocaleString()}</time>
        {" · "}by {item.author || "Anonymous"}
      </p>
      <div style={{marginTop:10, whiteSpace:"pre-wrap"}}>{item.content}</div>
    </article>
  );
}
