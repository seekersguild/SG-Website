import { Emblem } from "./Emblem";

/* Shared by the first visit and Next's route-loading boundary. The mark is
   server-rendered; the loader adds no image requests or animation library. */
export function LoadingScreen({ initial = false }: { initial?: boolean }) {
  return (
    <div className={`guild-loader${initial ? " guild-loader--initial" : ""}`} role="status" aria-label="Loading Seekers Guild">
      <div className="guild-loader__instrument">
        <Emblem id={initial ? "loading-initial" : "loading-route"} className="guild-loader__compass" needle={32} />
      </div>
    </div>
  );
}
