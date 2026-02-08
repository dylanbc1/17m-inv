import { useState } from 'react'
import Modal from './Modal'
import ModalTesoro from './ModalTesoro'
import MusicPlayer from './MusicPlayer'

// Coordenadas del mapa (viewBox 0 0 320 520) - ruta con curvatura
const PUNTOS = [
  { id: 'inicio', x: 50, y: 70, label: 'Inicio', esTesoro: false },
  { id: 'p1', x: 90, y: 160, label: 'Recuerdo 1', esTesoro: true },
  { id: 'p2', x: 230, y: 250, label: 'Recuerdo 2', esTesoro: true },
  { id: 'p3', x: 85, y: 360, label: 'Recuerdo 3', esTesoro: true },
  { id: 'fin', x: 165, y: 450, label: '¡Tesoro!', esTesoro: false },
]

// Ruta curva SVG (bezier) conectando los 5 puntos
const PATH_D = `M 50 70 
  C 70 120, 80 140, 90 160
  C 140 200, 180 220, 230 250
  C 180 300, 120 330, 85 360
  C 100 400, 140 430, 165 450`

// Fotos: pon recuerdo1.jpg, recuerdo2.jpg, recuerdo3.jpg en la carpeta public/
const CONTENIDO_MODAL = {
  p1: {
    titulo: 'Un momento que atesoramos',
    texto: 'Ese instante que guardamos en el corazón. Los dos sabiendo que esto es para siempre.',
    emoji: '🌅',
    imagen: '/recuerdo1.jpeg',
  },
  p2: {
    titulo: 'Infinitos meses más juntos',
    texto: 'Gracias por estos 17 meses, amor. Los días junto a ti son un regalo de Dios.',
    emoji: '💕',
    imagen: '/recuerdo2.jpeg',
  },
  p3: {
    titulo: 'Disfrutemos juntos',
    texto: 'Celebremos con lo que nos gusta juntos... Vamos a Chipichape juntos y a cine esta noche.',
    emoji: '💫',
    imagen: '/recuerdo3.jpeg',
  },
}

export default function Map17M() {
  const [pasoActual, setPasoActual] = useState(0) // 0=inicio, 1,2,3 = puntos, 4=fin
  const [modalAbierto, setModalAbierto] = useState(null) // 'p1' | 'p2' | 'p3' | 'tesoro' | null

  const handleClickPunto = (index) => {
    setPasoActual(index)
    if (index === 1) setModalAbierto('p1')
    else if (index === 2) setModalAbierto('p2')
    else if (index === 3) setModalAbierto('p3')
    else if (index === 4) setModalAbierto('tesoro')
    else setModalAbierto(null)
  }

  const cerrarModal = () => setModalAbierto(null)

  // Posición del muñequito: avanza con pasoActual (0=inicio, 1=p1, 2=p2, 3=p3, 4=fin)
  const posicionMuñeco = PUNTOS[pasoActual]

  return (
    <div className="flex flex-col min-h-dvh max-w-md mx-auto">
      {/* Título */}
      <header className="pt-4 pb-1 px-4 text-center shrink-0">
        <h1 className="text-2xl sm:text-3xl font-semibold text-rose-200 tracking-wide">
          ¡Felices 17 meses amor de mi vida!
        </h1>
        <p className="text-slate-400 text-sm mt-1">Cada día te amo más y eres todo para mí.</p>
          <p className="text-slate-400 text-sm mt-1">Toca cada punto para moverte por el mapa</p>
      </header>

      {/* Mapa SVG - más grande */}
      <div className="flex-1 min-h-0 flex items-center justify-center px-1 py-2">
        <div className="relative w-full aspect-[320/520] max-h-[82vh]">
          <svg
            viewBox="0 0 320 520"
            className="w-full h-full drop-shadow-lg"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Fondo suave del “mapa” */}
            <defs>
              <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f472b6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.3" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Ruta curva (línea del tesoro) */}
            <path
              d={PATH_D}
              fill="none"
              stroke="url(#pathGrad)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-80"
            />
            <path
              d={PATH_D}
              fill="none"
              stroke="rgba(251, 207, 232, 0.5)"
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-60"
            />

            {/* Puntos del mapa - todos clickeables, ir adelante o atrás */}
            {PUNTOS.map((p, i) => (
              <g key={p.id}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={p.id === 'inicio' || p.id === 'fin' ? 18 : 16}
                  fill={p.id === 'inicio' ? '#34d399' : p.id === 'fin' ? '#fbbf24' : '#a78bfa'}
                  stroke="white"
                  strokeWidth="3"
                  filter="url(#glow)"
                  className="cursor-pointer"
                  onClick={() => handleClickPunto(i)}
                />
                {p.id === 'inicio' && <text x={p.x} y={p.y + 5} textAnchor="middle" fill="white" fontSize="14">🚀</text>}
                {p.id === 'fin' && <text x={p.x} y={p.y + 5} textAnchor="middle" fill="white" fontSize="14">🎁</text>}
                {p.esTesoro && (
                  <text x={p.x} y={p.y + 5} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                    {p.id === 'p1' ? '1' : p.id === 'p2' ? '2' : '3'}
                  </text>
                )}
              </g>
            ))}

            {/* Muñequito que se mueve */}
            <g
              transform={`translate(${posicionMuñeco.x}, ${posicionMuñeco.y})`}
              style={{ transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            >
              <circle r="14" fill="#f472b6" stroke="white" strokeWidth="2" />
              <text y="5" textAnchor="middle" fontSize="16">💕</text>
            </g>
          </svg>
        </div>
      </div>

      <MusicPlayer />

      {/* Modal recuerdos (p1, p2, p3) con opción de imagen */}
      {modalAbierto && modalAbierto !== 'tesoro' && (
        <Modal
          titulo={CONTENIDO_MODAL[modalAbierto].titulo}
          texto={CONTENIDO_MODAL[modalAbierto].texto}
          emoji={CONTENIDO_MODAL[modalAbierto].emoji}
          imagen={CONTENIDO_MODAL[modalAbierto].imagen}
          onCerrar={cerrarModal}
        />
      )}

      {/* Modal tesoro: elegir película (3 opciones con foto) */}
      {modalAbierto === 'tesoro' && (
        <ModalTesoro onCerrar={cerrarModal} />
      )}
    </div>
  )
}
