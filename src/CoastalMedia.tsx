import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
const media = `${import.meta.env.BASE_URL}media/`;
export function CoastPhoto({name, alt, className = ""}: {name: string; alt: string; className?: string}) {
  return <img className={className} src={`${media}${name}-724.webp`} srcSet={`${media}${name}-480.webp 480w, ${media}${name}-724.webp 724w`} sizes="(max-width: 700px) 88vw, 36vw" width="724" height="362" alt={alt} loading="lazy" decoding="async" />;
}
export function CoastalHero() {
  const preferred = useReducedMotion();
  const [reduced, setReduced] = useState(preferred);
  useEffect(() => { const query = matchMedia('(prefers-reduced-motion: reduce)'); const update = () => setReduced(query.matches); update(); query.addEventListener('change', update); return () => query.removeEventListener('change', update); }, []);
  const [paused, setPaused] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => { if (!video.current) return; if (paused || reduced) video.current.pause(); else void video.current.play().catch(() => {}); }, [paused, reduced]);
  return <figure className="coastal-hero">
    <img src={`${media}hero-1600.webp`} srcSet={`${media}hero-960.webp 960w, ${media}hero-1600.webp 1600w`} sizes="100vw" width="1600" height="900" fetchPriority="high" alt="AI-generated golden-hour North Sea shore, with dunes and small waves reflecting the sun." />
    {reduced === false && <video ref={video} className="hero-film" autoPlay muted loop playsInline preload="none" aria-hidden="true" poster={`${media}hero-1600.webp`}><source src={`${media}hero-mobile.mp4`} media="(max-width: 700px)" type="video/mp4"/><source src={`${media}hero-desktop.mp4`} type="video/mp4"/></video>}
    <div className="coastal-hero-copy"><h1>Between land<br/>and a changing sea.</h1><p>A small almanac for a coast that never stands still.</p><a href="#tide-clock">Explore the tide <span aria-hidden="true">↓</span></a></div>
    <figcaption>AI-generated coastal illustration · Not a specific location</figcaption>
    {!reduced && <button className="film-toggle" onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? "Play sea motion" : "Pause sea motion"}</button>}
  </figure>;
}
export function StationPortrait({station}: {station: number}) {
  const scenes = [{name:"station-dunes",alt:"Dune grass beside a sandy North Sea beach"},{name:"station-cliffs",alt:"Green cliffs above a rocky North Sea shore"},{name:"station-marsh",alt:"A tidal creek winding through Wadden saltmarsh"}];
  const scene=scenes[station];
  return <figure className="station-portrait"><CoastPhoto name={scene.name} alt={`AI-generated illustration: ${scene.alt}. Not an exact station location.`}/><figcaption>Coastal character · AI illustration, not this exact station</figcaption></figure>;
}
