import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Article } from "../type";
import { loadArticles, saveArticles, uid } from "../utils/storage";
import ArticleForm from "../components/ArticleForm";

export default function NewArticle(){
  const [items] = useState<Article[]>(() => loadArticles());
  const nav = useNavigate();

  function create(data: Omit<Article,"id"|"createdAt">){
    const next: Article = { id: uid(), createdAt: new Date().toISOString(), ...data };
    const list = [next, ...items];
    saveArticles(list);
    nav("/articles");
  }

  return (
    <section className="panel">
      <h2 style={{marginTop:0}}>Nouvel article</h2>
      <ArticleForm onSubmit={create}/>
    </section>
  );
}
