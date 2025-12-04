type Props = {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ open, title, onClose, children }: Props){
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label={title || "Dialog"}
         style={{position:"fixed",inset:0,background:"rgba(0,0,0,.35)",display:"grid",placeItems:"center",padding:16}}>
      <div className="panel" style={{maxWidth:700, width:"min(700px, 96vw)"}}>
        <div className="row" style={{marginBottom:8}}>
          <h3 style={{margin:0}}>{title}</h3>
          <button className="btn ghost" onClick={onClose} aria-label="Close">Fermer</button>
        </div>
        {children}
      </div>
    </div>
  );
}
