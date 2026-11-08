import { useEffect, useRef, useState } from "react";
import { animate, createSpring } from "animejs";
import { useReducedMotion } from "motion/react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowRight } from "lucide-react";
const phaseNames = ["New moon", "First quarter", "Full moon", "Last quarter"];
const phaseCopy = [
  "The moon’s sunlit side faces away from Earth. Near new and full moon, the Sun and Moon’s tidal effects reinforce each other.",
  "Half the visible disc is illuminated. Around quarter moons, the tidal range tends to be smaller.",
  "The visible disc is fully illuminated. Spring tides describe a larger tidal range, not a season.",
  "The other half of the visible disc is illuminated. Local coastline shape still makes every tide its own.",
];
export function Almanac({
  hour,
  stationName,
  data,
}: {
  hour: number;
  stationName: string;
  data: { hour: number; water: number }[];
}) {
  const [phase, setPhase] = useState(2),
    [table, setTable] = useState(false),
    history = useRef<HTMLElement>(null),
    reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !history.current) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target, {
              translateY: [18, 0],
              opacity: [0.55, 1],
              ease: createSpring({ duration: 350, bounce: 0.08 }),
            });
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.18 },
    );
    history.current
      .querySelectorAll(".memory-moment")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [reduced]);
  return (
    <>
      <section id="water" className="water-section section-pad">
        <div className="section-heading">
          <h2>A day, drawn by water.</h2>
          <p>
            Two rises. Two falls. A familiar rhythm,
            <br />
            never quite the same twice.
          </p>
        </div>
        <div className="chart-caption">
          <span>{stationName} · Illustrative 24-hour profile</span>
          <span>Height (m) above illustrative datum</span>
        </div>
        <ChartContainer
          config={{ water: { label: "Sea level", color: "#173f4a" } }}
          className="sea-chart"
          aria-label="Synthetic sea level through 24 hours"
        >
          <AreaChart
            data={data}
            margin={{ left: 0, right: 16, top: 15, bottom: 0 }}
            accessibilityLayer
          >
            <CartesianGrid vertical={false} stroke="#173f4a25" />
            <XAxis
              dataKey="hour"
              type="number"
              domain={[0, 24]}
              ticks={[0, 6, 12, 18, 24]}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${String(v).padStart(2, "0")}:00`}
              tickMargin={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              domain={[0, 6]}
              ticks={[0, 2, 4, 6]}
              width={30}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    `${String(value).padStart(2, "0")}:00`
                  }
                  indicator="line"
                />
              }
            />
            <Area
              type="monotone"
              dataKey="water"
              stroke="var(--color-water)"
              fill="#c6dcca"
              strokeWidth={2}
              isAnimationActive={false}
            />
            <ReferenceLine
              x={hour}
              stroke="#173f4a"
              strokeDasharray="4 4"
              label={{
                value: "Selected",
                position: "insideTopRight",
                fill: "#173f4a",
                fontSize: 11,
              }}
            />
          </AreaChart>
        </ChartContainer>
        <div className="chart-bottom">
          <p>
            A simplified mathematical model, not a tide prediction.
            <br />
            The moving line follows the time you choose above.
          </p>
          <Button
            variant="outline"
            onClick={() => setTable(!table)}
            aria-expanded={table}
          >
            {table ? "Hide" : "Show"} data table <ArrowRight size={14} />
          </Button>
        </div>
        {table && (
          <div className="table-wrap">
            <table>
              <caption>Illustrative sea level · {stationName}</caption>
              <thead>
                <tr>
                  <th scope="col">Hour</th>
                  <th scope="col">Height (m)</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .filter((d) => d.hour % 3 === 0)
                  .map((d) => (
                    <tr key={d.hour}>
                      <th scope="row">{String(d.hour).padStart(2, "0")}:00</th>
                      <td>{d.water.toFixed(2)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <section
        className="moon-section section-pad"
        aria-labelledby="moon-title"
      >
        <div className="moon-intro">
          <h2 id="moon-title">
            A distant pull.
            <br />A daily return.
          </h2>
          <p>
            The moon leaves its signature on every shore. Explore the four
            familiar faces of a lunar cycle.
          </p>
          <span className="small-note">
            Schematic phases · Not today’s lunar calendar
          </span>
        </div>
        <div className="lunar-panel">
          <div
            className="phase-options"
            role="group"
            aria-label="Choose a lunar phase"
          >
            {phaseNames.map((name, i) => (
              <button
                key={name}
                onClick={() => setPhase(i)}
                aria-pressed={phase === i}
                className={phase === i ? "phase active" : "phase"}
              >
                <svg viewBox="0 0 80 80" aria-hidden="true">
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    fill={i === 2 ? "#e1ebdf" : "#173f4a"}
                    stroke="#a5bdb4"
                  />
                  {i === 1 && (
                    <path d="M40 8 A32 32 0 0 1 40 72 Z" fill="#e1ebdf" />
                  )}
                  {i === 3 && (
                    <path d="M40 8 A32 32 0 0 0 40 72 Z" fill="#e1ebdf" />
                  )}
                </svg>
                <span>{name}</span>
              </button>
            ))}
          </div>
          <div className="phase-description" aria-live="polite">
            <h3>{phaseNames[phase]}</h3>
            <p>{phaseCopy[phase]}</p>
          </div>
        </div>
      </section>
      <section id="memory" ref={history} className="memory-section section-pad">
        <div className="section-heading">
          <h2>The sea has a memory.</h2>
          <p>
            A tide is a rhythm.
            <br />A storm surge is a different story.
          </p>
        </div>
        <article className="memory-moment">
          <div className="year">1953</div>
          <div>
            <h3>The night the water came.</h3>
            <p>
              On the night of 31 January–1 February 1953, a severe North Sea
              storm surge coincided with a high spring tide. Coastal communities
              in the Netherlands, the United Kingdom and Belgium suffered
              devastating flooding.
            </p>
            <p>
              This was not an ordinary high tide. Wind and low atmospheric
              pressure raised the sea on top of the astronomical tide.
            </p>
            <a
              href="https://en.wikipedia.org/wiki/North_Sea_flood_of_1953"
              className="source-link"
            >
              Read the historical account <ArrowUpRight size={15} />
            </a>
          </div>
        </article>
        <article className="memory-moment">
          <div className="year after">
            After
            <br />
            the flood
          </div>
          <div>
            <h3>Learning to live with water.</h3>
            <p>
              The disaster helped drive major changes in coastal protection,
              including the Netherlands’ Delta Works. Barriers and dikes became
              part of a larger, ongoing conversation between land and sea.
            </p>
            <p>
              Remembering the flood is also remembering the communities
              affected—not simply the engineering that followed.
            </p>
            <a
              href="https://www.rijkswaterstaat.nl/en/expertise/water"
              className="source-link"
            >
              Read about Dutch water management <ArrowUpRight size={15} />
            </a>
          </div>
        </article>
        <aside className="safety-note">
          <WavesMark />
          <p>
            <strong>Beautiful to explore. Never a safety forecast.</strong> For
            a real coastal visit, consult local tide tables, weather warnings
            and the relevant coastal authority. This almanac does not receive
            live data.
          </p>
        </aside>
      </section>
      <section className="making section-pad">
        <h2>How this was made</h2>
        <div>
          <p>
            Built from{" "}
            <a href="https://docs.google.com/document/d/1xJX5V0UXEMwu66qwL_fqStcUP1p40SHbK1NN3at2djc/edit">
              “The 5 Sites That Make AI-Built Websites Look Expensive”
            </a>
            , credited to Sebastian Hardy in the{" "}
            <a href="https://raj-microsoft.github.io/ai-web-design-library/">
              AI Web Design Library
            </a>
            .
          </p>
          <p>
            React + Vite + Tailwind, with shadcn/ui components and charts.
            Motion handles spring-based state changes; Anime.js handles the
            heading entrance and two scroll moments. Separate jobs, no competing
            animation engines on an element. Motion is limited to 350ms and
            respects reduced-motion preferences.
          </p>
          <p>
            The hero uses a copied and adapted{" "}
            <a href="https://magicui.design/docs/components/number-ticker">
              Magic UI Number Ticker
            </a>{" "}
            (MIT). The hero was built and visually reviewed before the other
            sections. <strong>Manus is a paid agent and was skipped;</strong>{" "}
            direct implementation with free libraries replaces it.
          </p>
          <p>
            All tide values, station profiles and lunar displays are synthetic
            or schematic. They are not calibrated observations. Historical text
            is an original summary; sources are linked beside the story. No
            third-party photography is used.{" "}
            <a href="./THIRD-PARTY-NOTICES.txt">Third-party licenses</a>.
          </p>
        </div>
      </section>
    </>
  );
}
function WavesMark() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 11 Q9 5 18 11 T33 11 M3 19 Q9 13 18 19 T33 19 M3 27 Q9 21 18 27 T33 27"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
