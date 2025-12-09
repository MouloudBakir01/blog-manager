import { useEffect, useState } from "react";
import type { Article } from "../type";

type Props = {
  initial?: Partial<Article>;
  onSubmit: (data: Omit<Article,"id"|"createdAt">) => void;
};

export default function ArticleForm({ initial, onSubmit }: Props){
  const [title, setTitle] = useState(initial?.title ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [author, setAuthor] = useState(initial?.author ?? "");
  const [errors, setErrors] = useState<{[k:string]:string}>({});

  useEffect(()=>{ setErrors({}) }, [title, category, content, author]);

  function handleSubmit(e: React.FormEvent){
    e.preventDefault();
    const nextErrors: {[k:string]:string} = {};
    if (!title.trim()) nextErrors.title = "Title is required";
    if (!category.trim()) nextErrors.category = "Category is required";
    if (!content.trim()) nextErrors.content = "Content is required";
    if (!author.trim()) nextErrors.author = "Author is required";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    onSubmit({ title: title.trim(), category: category.trim(), content: content.trim(), author: author.trim() });
  }

  return (
    <form className="grid" onSubmit={handleSubmit} noValidate>
      <label>
        <span className="sr-only">Title</span>
        <input className="input" placeholder="Title *" value={title} onChange={e=>setTitle(e.target.value)}
               aria-invalid={errors.title? "true":"false"} />
      </label>
      {errors.title && <p className="meta" role="alert" style={{color:"var(--danger)"}}>{errors.title}</p>}

      <label>
        <span className="sr-only">Categorie</span>
        <input className="input" placeholder="Category *" value={category} onChange={e=>setCategory(e.target.value)}
               aria-invalid={errors.category? "true":"false"} />
      </label>
      {errors.category && <p className="meta" role="alert" style={{color:"var(--danger)"}}>{errors.category}</p>}

      <label>
        <span className="sr-only">Content</span>
        <textarea className="textarea" placeholder="Content *" rows={8} value={content} onChange={e=>setContent(e.target.value)}
                  aria-invalid={errors.content? "true":"false"} />
      </label>
      {errors.content && <p className="meta" role="alert" style={{color:"var(--danger)"}}>{errors.content}</p>}

      <label>
        <span className="sr-only">Auteur</span>
        <input className="input" placeholder="Author *" value={author} onChange={e=>setAuthor(e.target.value)}
               aria-invalid={errors.author? "true":"false"} />
      </label>
      {errors.author && <p className="meta" role="alert" style={{color:"var(--danger)"}}>{errors.author}</p>}

      <div className="toolbar" style={{marginTop:4}}>
        <button type="submit" className="btn">Sauvegarder</button>
      </div>
    </form>
  );
}
