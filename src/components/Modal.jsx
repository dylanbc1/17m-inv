import { useEffect } from 'react'

export default function Modal({ titulo, texto, emoji, imagen, onCerrar }) {
  useEffect(() => {
    const handleEscape = (e) => e.key === 'Escape' && onCerrar()
    window.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [onCerrar])

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onCerrar}
    >
      <div
        className="bg-slate-800 border border-slate-600 rounded-t-2xl sm:rounded-2xl shadow-xl max-w-sm w-full p-6 animate-slide-up max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          {emoji && <span className="text-4xl block mb-3" role="img" aria-hidden>{emoji}</span>}
          {imagen && (
            <div className="rounded-xl overflow-hidden mb-3 w-full min-h-[200px] h-64 sm:h-72 bg-slate-700">
              <img src={imagen} alt="" className="w-full h-full object-cover" />
            </div>
          )}
          <h2 className="text-lg font-semibold text-rose-200">{titulo}</h2>
          <p className="text-slate-300 text-sm mt-2 leading-relaxed">{texto}</p>
        </div>
        <button
          type="button"
          onClick={onCerrar}
          className="mt-6 w-full py-3 rounded-xl bg-rose-500/80 hover:bg-rose-500 text-white font-medium transition-colors touch-manipulation"
        >
          Cerrar
        </button>
      </div>
    </div>
  )
}
