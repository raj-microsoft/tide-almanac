import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { animate, createSpring } from "animejs";
import { ArrowDown, ArrowUpRight, Waves, MoveUpRight } from "lucide-react";
import { NumberTicker } from "./components/magicui/number-ticker";
import "./App.css";
import { CoastalHero, StationPortrait } from "./CoastalMedia";
const mediaPath = `${import.meta.env.BASE_URL}media/`;
import { Almanac } from "./Almanac";
const stations = [
  {
    name: "Den Helder",
    country: "The Netherlands",
    coords: "52.96° N / 4.76° E",
    amplitude: 1.55,
    offset: 0,
  },
  {
    name: "Whitby",
    country: "United Kingdom",
    coords: "54.49° N / 0.61° W",
    amplitude: 2.35,
    offset: 1.5,
  },
  {
    name: "Cuxhaven",
    country: "Germany",
    coords: "53.87° N / 8.71° E",
    amplitude: 1.85,
    offset: -1,
  },
];
const level = (hour: number, station = 0) =>
  +(
    2.6 +
    stations[station].amplitude *
      Math.cos(((hour - 3 - stations[station].offset) * Math.PI) / 6.2)
  ).toFixed(2);
const time = (hour: number) =>
  `${Math.floor(hour).toString().padStart(2, "0")}:${Math.round((hour % 1) * 60)
    .toString()
    .padStart(2, "0")}`;
function App() {
  const [station, setStation] = useState(0),
    [hour, setHour] = useState(9);
  const reduced = useReducedMotion(),
    title = useRef<HTMLHeadingElement>(null);
  const height = level(hour, station),
    rising = level(hour + 0.05, station) > height;
  useEffect(() => {
    if (reduced || !title.current) return;
    const a = animate(title.current, {
      translateY: [12, 0],
      opacity: [0.65, 1],
      ease: createSpring({ duration: 320, bounce: 0.15 }),
    });
    return () => {
      a.revert();
    };
  }, [reduced]);
  return (
    <>
      <a className="skip" href="#explore">
        Skip to almanac
      </a>
      <header className="masthead">
        <a className="brand" href="#">
          <Waves size={26} />
          Tide Almanac
        </a>
        <nav aria-label="Main navigation">
          <a href="#explore">The coast</a>
          <a href="#water">The water</a>
          <a href="#memory">The memory</a>
        </nav>
        <span className="edition">A North Sea field companion</span>
      </header>
      <main>
        <CoastalHero />
        <section className="hero" id="explore">
          <div className="hero-heading"><h2 ref={title} id="tide-clock">A day by the tide.</h2><p>Choose a coast. Follow its rhythm.<br/>Every reading is illustrative.</p></div>
          <div className="tide-stage">
            <div className="station-panel">
              <label htmlFor="station">Choose your stretch of coast</label>
              <select
                id="station"
                value={station}
                onChange={(e) => setStation(+e.target.value)}
              >
                {stations.map((s, i) => (
                  <option value={i} key={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
              <p className="coordinates">
                {stations[station].country}
                <br />
                {stations[station].coords}
              </p>
              <StationPortrait station={station} />
              <div className="reading">
                <span className="state">
                  <MoveUpRight
                    size={17}
                    style={{ transform: rising ? "none" : "rotate(90deg)" }}
                  />
                  {rising ? "The tide is coming in" : "The tide is going out"}
                </span>
                <div className="height">
                  <NumberTicker value={height} />
                  <span>m</span>
                </div>
                <p>Above an illustrative datum</p>
              </div>
              <a className="text-link" href="#water">
                Follow the water <ArrowDown size={16} />
              </a>
            </div>
            <div className="dial-wrap">
              <svg
                className="dial"
                viewBox="0 0 600 510"
                role="img"
                aria-label={`Illustrative tide clock at ${time(hour)}. ${rising ? "Rising" : "Falling"} tide, ${height} metres.`}
              >
                <defs>
                  <clipPath id="dial-clip">
                    <circle cx="300" cy="252" r="181" />
                  </clipPath>
                </defs>
                <circle
                  cx="300"
                  cy="252"
                  r="216"
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity=".23"
                />
                {Array.from({ length: 60 }, (_, i) => {
                  const a = (i * Math.PI) / 30,
                    r = i % 5 === 0 ? 201 : 207;
                  return (
                    <line
                      key={i}
                      x1={300 + Math.sin(a) * r}
                      y1={252 - Math.cos(a) * r}
                      x2={300 + Math.sin(a) * 215}
                      y2={252 - Math.cos(a) * 215}
                      stroke="currentColor"
                      strokeWidth={i % 5 === 0 ? 2 : 1}
                      strokeOpacity={i % 5 === 0 ? 1 : 0.4}
                    />
                  );
                })}
                <circle cx="300" cy="252" r="181" fill="#d5e6d9" />
                <g clipPath="url(#dial-clip)">
                  <image href={`${mediaPath}tide-low-724.webp`} x="119" y="71" width="362" height="362" preserveAspectRatio="xMidYMid slice" />
                  <motion.image href={`${mediaPath}tide-high-724.webp`} x="119" y="71" width="362" height="362" preserveAspectRatio="xMidYMid slice" animate={{opacity: Math.max(0, Math.min(1, (height - 1) / 3.2))}} transition={{type: "spring", duration: reduced ? 0 : 0.32, bounce: 0}} />
                  <circle cx="300" cy="252" r="181" fill="#173f4a" opacity=".12" />
                </g>
                <text x="300" y="17" textAnchor="middle">
                  HIGH WATER
                </text>
                <text x="300" y="502" textAnchor="middle">
                  LOW WATER
                </text>
                <text x="52" y="258" textAnchor="middle">
                  FLOOD
                </text>
                <text x="548" y="258" textAnchor="middle">
                  EBB
                </text>
                <motion.g
                  initial={false}
                  animate={{
                    rotate:
                      ((hour - 3 - stations[station].offset) / 12.4) * 360,
                  }}
                  style={{
                    transformOrigin: "300px 252px",
                    transformBox: "view-box",
                  }}
                  transition={{
                    type: "spring",
                    duration: reduced ? 0 : 0.32,
                    bounce: 0.1,
                  }}
                >
                  <line
                    x1="300"
                    y1="252"
                    x2="300"
                    y2="76"
                    stroke="#cce77c"
                    strokeWidth="3"
                  />
                  <circle
                    cx="300"
                    cy="69"
                    r="7"
                    fill="#173f4a"
                    stroke="#cce77c"
                    strokeWidth="3"
                  />
                </motion.g>
                <circle cx="300" cy="252" r="9" fill="#cce77c" />
                <rect
                  x="244"
                  y="359"
                  width="112"
                  height="42"
                  rx="21"
                  fill="#e9f1e7"
                />
                <text
                  className="clock-time"
                  x="300"
                  y="387"
                  textAnchor="middle"
                >
                  {time(hour)}
                </text>
              </svg>
              <p className="dial-note">High / low water · AI illustrations, not observed conditions</p>
            </div>
            <div className="edge-note">
              THE PULL OF THE MOON. THE SHAPE OF THE SHORE.
            </div>
          </div>
          <div className="time-control">
            <div>
              <label htmlFor="time">Take a day by the tide.</label>
              <span>
                Drag to explore <ArrowUpRight size={14} />
              </span>
            </div>
            <input
              id="time"
              aria-label="Explore hour of the illustrative day"
              type="range"
              min="0"
              max="24"
              step="0.25"
              value={hour}
              onChange={(e) => setHour(+e.target.value)}
              aria-valuetext={time(hour)}
            />
            <div className="time-labels">
              <span>00:00</span>
              <span>06:00</span>
              <output htmlFor="time">{time(hour)}</output>
              <span>18:00</span>
              <span>24:00</span>
            </div>
          </div>
          <p className="data-note">
            Illustrative tide model · Not live measurements. Not for navigation,
            swimming decisions or flood warnings.
          </p>
        </section>
        <Almanac
          hour={hour}
          stationName={stations[station].name}
          data={Array.from({ length: 49 }, (_, i) => ({
            hour: i / 2,
            water: level(i / 2, station),
          }))}
        />
      </main>
      <footer>
        <span>Tide Almanac</span>
        <p>A little closer to the coast.</p>
      </footer>
    </>
  );
}
export default App;
