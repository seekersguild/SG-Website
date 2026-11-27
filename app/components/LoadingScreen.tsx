import { Emblem } from "./Emblem";

/* Initial-visit compass. The mark is server-rendered and adds no image
   requests or animation library. BootLoader retires it after hydration. */
export function LoadingScreen({ initial = false }: { initial?: boolean }) {
  return (
    <div className={`guild-loader${initial ? " guild-loader--initial" : ""}`} role="status" aria-label="Loading Seekers Guild">
      <div className="guild-loader__instrument">
        <Emblem id={initial ? "loading-initial" : "loading-route"} className="guild-loader__compass" needle={32} />
      </div>
    </div>
  );
}
