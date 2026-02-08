import { useState, useRef } from 'react'

// Pega aquí la URL de la canción (ej: 'https://...mp3')
// O guarda el MP3 en la carpeta public/ y usa: '/cancion.mp3'
const CANCION_URL = '/cancion.mp3'

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {})
    }
    setPlaying(!playing)
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={CANCION_URL}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        loop
      />
      <button
        type="button"
        onClick={toggle}
        className="fixed bottom-20 right-4 z-40 w-12 h-12 rounded-full bg-rose-500/90 hover:bg-rose-500 text-white shadow-lg flex items-center justify-center touch-manipulation transition-transform active:scale-95"
        aria-label={playing ? 'Pausar música' : 'Reproducir música'}
      >
        {playing ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
        ) : (
          <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
        )}
      </button>
    </>
  )
}
