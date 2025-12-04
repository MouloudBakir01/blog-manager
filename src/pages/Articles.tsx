import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Article } from "../types";
import { loadArticles, saveArticles, uid } from "../utils/storage";
import SearchBar from "../components/SearchBar";
import ArticleList from "../components/ArticleList";
import Modal from "../components/Modal";
import ArticleForm from "../components/ArticleForm";

export default function Articles(){
  const [items, setItems] = useState<Article[]>(() => loadArticles());
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [order, setOrder] = useState<"newest"|"oldest">("newest");
  const [editing, setEditing] = useState<Article| null>(null);

  const filtered = useMemo(()=>{
    const q = query.trim().toLowerCase();
    return items
      .filter(a =>
        (q==="" || a.title.toLowerCase().includes(q) || a.author.toLowerCase().includes(q)) &&
        (category.trim()==="" || a.category.toLowerCase().includes(category.trim().toLowerCase()))
      )
      .sort((a,b)=> order==="newest"
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  }, [items, query, category, order]);

  function upsertEdited(data: Omit<Article,"id"|"createdAt">){
    if (!editing) return;
    const next = items.map(it => it.id===editing.id ? { ...editing, ...data } : it);
    setItems(next); saveArticles(next); setEditing(null);
  }

  function onDelete(id: string){
    if (!confirm("Delete this article?")) return;
    const next = items.filter(a => a.id !== id);
    setItems(next); saveArticles(next);
  }

  // bouton “seed” rapide pour tester
  function addFake(){
    const now = new Date().toISOString();
    const next: Article = {
      id: uid(),
      title: "Sample article",
      category: "notes",
      content: "This is a sample article generated locally.",
      author: "You",
      createdAt: now
    };
    const list = [next, ...items];
    setItems(list); saveArticles(list);
  }

  return (
    <>
      <div className="row" style={{marginBottom:12}}>
        <h2 style={{margin:0}}>Articles</h2>
        <div className="toolbar">
          <button className="btn ghost" onClick={addFake}>+ Quick sample</button>
          <Link to="/new" className="btn">+ Nouvel article</Link>
        </div>
      </div>

      <SearchBar query={query} setQuery={setQuery}
                 category={category} setCategory={setCategory}
                 order={order} setOrder={setOrder} />

      <section className="panel" style={{marginTop:12}}>
        <ArticleList items={filtered} onEdit={setEditing} onDelete={onDelete}/>
      </section>

      <Modal open={!!editing} onClose={()=>setEditing(null)} title="Edit article">
        {editing && <ArticleForm initial={editing} onSubmit={upsertEdited} />}
      </Modal>
    </>
  );
}
