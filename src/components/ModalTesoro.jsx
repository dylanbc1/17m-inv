import { useEffect, useState } from 'react'

const WHATSAPP_NUMERO = '573173503132'

// Opciones de película: titulo, imagen y parrafo (descripción debajo del título)
const OPCIONES_PELICULAS = [
  {
    id: '1',
    titulo: 'F1',
    imagen: '/f1.png',
    parrafo: 'Entretenida, divertida y emocionante.',
  },
  {
    id: '2',
    titulo: 'Hamnet',
    imagen: '/hamnet.jpg',
    parrafo: 'Drama romántico y conmovedor.',
  },
  {
    id: '3',
    titulo: 'Send Help',
    imagen: '/send-help.jpg',
    parrafo: 'Thriller psicológico con comedia y terror.',
  },
]

export default function ModalTesoro({ onCerrar }) {
  const [imagenError, setImagenError] = useState({})
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null)

  useEffect(() => {
    const handleEscape = (e) => e.key === 'Escape' && onCerrar()
    window.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [onCerrar])

  const handleConfirmar = () => {
    const nombrePelicula = opcionSeleccionada?.titulo ?? 'esta película'
    const texto = `Te amo mi amor. Acepto, quiero ver ${nombrePelicula}`
    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`
    window.open(url, '_blank')
    onCerrar()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm"
      onClick={onCerrar}
    >
      <div
        className="bg-slate-800 border border-slate-600 rounded-t-2xl sm:rounded-2xl shadow-xl w-full max-w-lg flex flex-col animate-slide-up h-[85vh] sm:h-[88vh] max-h-[700px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0 p-4 pb-2 text-center">
          <h2 className="text-xl font-semibold text-rose-200">🎁 El tesoro</h2>
          <p className="text-slate-400 text-sm mt-0.5">Elige la que más te guste</p>
        </div>

        <div className="flex-1 min-h-0 flex flex-col gap-2 sm:gap-3 px-4 overflow-hidden">
          {OPCIONES_PELICULAS.map((opcion) => (
            <button
              key={opcion.id}
              type="button"
              onClick={() => setOpcionSeleccionada(opcion)}
              className={`flex-1 min-h-0 flex items-center gap-3 sm:gap-4 p-3 rounded-xl border text-left transition-all touch-manipulation flex-shrink-0 ${
                opcionSeleccionada?.id === opcion.id
                  ? 'bg-rose-600/80 border-rose-400 ring-2 ring-rose-400/50'
                  : 'bg-slate-700/80 hover:bg-slate-600 border-slate-600'
              }`}
            >
              <div className="shrink-0 w-16 h-20 sm:w-20 sm:h-28 rounded-lg overflow-hidden bg-slate-600 flex items-center justify-center">
                {!imagenError[opcion.id] ? (
                  <img
                    src={opcion.imagen}
                    alt={opcion.titulo}
                    className="w-full h-full object-cover"
                    onError={() => setImagenError((prev) => ({ ...prev, [opcion.id]: true }))}
                  />
                ) : (
                  <span className="text-2xl sm:text-4xl text-slate-500">🎬</span>
                )}
              </div>
              <div className="min-w-0 flex-1 flex flex-col justify-center gap-0.5">
                <span className="font-medium text-white text-sm sm:text-base">{opcion.titulo}</span>
                {opcion.parrafo && (
                  <span className="text-slate-300 text-xs sm:text-sm line-clamp-2">{opcion.parrafo}</span>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="shrink-0 p-4 pt-3">
          <button
            type="button"
            onClick={handleConfirmar}
            className="w-full py-3 rounded-xl bg-rose-500 hover:bg-rose-500 text-white font-medium transition-colors touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!opcionSeleccionada}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}
