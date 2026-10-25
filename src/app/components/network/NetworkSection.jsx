import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import GEO from "./koreaGeo";
import { BRANCHES, REGIONS } from "./networkData";
import "./NetworkSection.css";

const FULL = [0, 0, 720, 690];
const project = (lng, lat) => [(lng - GEO.LNG0) * GEO.K * GEO.C, (GEO.LAT0 - lat) * GEO.K];
const count = (code) => (code === "all" ? BRANCHES.length : BRANCHES.filter((b) => b.region === code).length);
const fmt = (n) => n.toLocaleString("ko-KR");

function regionBox(code) {
  if (code === "all") return FULL;
  const [x0, y0, x1, y1] = GEO.provinces.find((p) => p.code === code).bbox;
  const pad = code === "11" ? 6 : 14;
  let w = x1 - x0 + pad * 2;
  let h = y1 - y0 + pad * 2;
  const ratio = FULL[2] / FULL[3];
  if (w / h > ratio) h = w / ratio;
  else w = h * ratio;
  return [(x0 + x1) / 2 - w / 2, (y0 + y1) / 2 - h / 2, w, h];
}

function badgePos(code) {
  const [x0, y0, x1, y1] = GEO.provinces.find((p) => p.code === code).bbox;
  return code === "11"
    ? [(x0 + x1) / 2, (y0 + y1) / 2 - 2]
    : [x0 + (x1 - x0) * 0.62, y0 + (y1 - y0) * 0.72];
}

export default function NetworkSection() {
  const [region, setRegion] = useState("all");
  const [current, setCurrent] = useState(BRANCHES[0].id);
  const [vb, setVb] = useState(FULL);
  const vbRef = useRef(FULL);
  const raf = useRef(0);

  // 지역이 바뀌면 지도를 부드럽게 확대/축소
  useEffect(() => {
    const from = vbRef.current;
    const to = regionBox(region);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dur = reduce ? 0 : 700;
    const t0 = performance.now();
    cancelAnimationFrame(raf.current);
    const step = (now) => {
      const k = dur ? Math.min(1, (now - t0) / dur) : 1;
      const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      const next = from.map((v, i) => v + (to[i] - v) * e);
      vbRef.current = next;
      setVb(next);
      if (k < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [region]);

  const pins = useMemo(() => BRANCHES.map((b) => ({ b, xy: project(b.lng, b.lat) })), []);
  const branch = BRANCHES.find((b) => b.id === current);
  const visible = BRANCHES.filter((b) => region === "all" || b.region === region);
  const s = vb[2] / FULL[2];
  const zoomed = region !== "all";

  const pickRegion = (code) => {
    if (code !== "all" && branch.region !== code) setCurrent(BRANCHES.find((b) => b.region === code).id);
    setRegion(code);
  };
  const pickBranch = (id) => {
    const b = BRANCHES.find((x) => x.id === id);
    setCurrent(id);
    if (region !== b.region) setRegion(b.region);
  };
  const onKey = (e, fn) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fn();
    }
  };

  return (
    <section className="ns-network" id="network">
      <div className="ns-wrap">
        <p className="ns-eyebrow">OUR NETWORK</p>
        <h2 className="ns-title">
          이론이 아닙니다.
          <br />
          <em>{BRANCHES.length}개 지점</em>에서 매일 검증합니다
        </h2>
        <p className="ns-lead">서울과 경기에서 운영 중인 반듯한 네트워크의 현장 노하우를 그대로 원장님 병원에 옮깁니다.</p>

        <div className="ns-tabbar" role="tablist">
          {REGIONS.map((r) => (
            <button
              key={r.code}
              type="button"
              role="tab"
              aria-selected={r.code === region}
              className={"ns-tab" + (r.code === region ? " on" : "")}
              onClick={() => pickRegion(r.code)}
            >
              {r.name}
              <em>{count(r.code)}</em>
            </button>
          ))}
        </div>

        <div className="ns-chips">
          {visible.map((b) => (
            <button key={b.id} type="button" className={"ns-chip" + (b.id === current ? " on" : "")} onClick={() => pickBranch(b.id)}>
              {b.name}
              {b.sub && <small>{b.sub}</small>}
            </button>
          ))}
        </div>

        <div className="ns-board">
          <div className="ns-mapcard">
            <span className="ns-maplabel">{REGIONS.find((r) => r.code === region).label}</span>
            <svg viewBox={vb.join(" ")} role="img" aria-label="지점 위치 지도">
              <g>
                {GEO.provinces.map((p) => {
                  const has = count(p.code) > 0;
                  const clickable = !zoomed && has;
                  return (
                    <path
                      key={p.code}
                      d={p.d}
                      className={"ns-prov" + (has ? " has" : "") + (zoomed && p.code === region ? " sel" : "")}
                      style={clickable ? { cursor: "pointer" } : undefined}
                      onClick={clickable ? () => pickRegion(p.code) : undefined}
                    />
                  );
                })}
              </g>
              <g>
                {GEO.munis.map((m) => (
                  <path
                    key={m.code}
                    d={m.d}
                    vectorEffect="non-scaling-stroke"
                    className={"ns-muni" + (zoomed && m.code.slice(0, 2) === region ? " show" : "")}
                  />
                ))}
              </g>
              <g style={{ opacity: zoomed ? 0 : 1, transition: "opacity .3s" }}>
                {["11", "31"].map((code) => {
                  const [cx, cy] = badgePos(code);
                  return (
                    <g key={code} className="ns-badge">
                      <rect x={cx - 20} y={cy - 13} width={40} height={26} rx={13} />
                      <text x={cx} y={cy + 6} textAnchor="middle" fontSize={16}>
                        {count(code)}
                      </text>
                    </g>
                  );
                })}
              </g>
              <g>
                {pins.map(({ b, xy: [x, y] }) => {
                  const label = b.sub ? `${b.name}(${b.sub === "정형외과" ? "정형" : "내과"})` : b.name;
                  return (
                    <g
                      key={b.id}
                      className={"ns-pin" + (zoomed && b.region === region ? " show" : "") + (b.id === current ? " on" : "")}
                      role="button"
                      tabIndex={zoomed && b.region === region ? 0 : -1}
                      aria-label={b.name + (b.sub ? " " + b.sub : "")}
                      onClick={() => pickBranch(b.id)}
                      onKeyDown={(e) => onKey(e, () => pickBranch(b.id))}
                    >
                      <circle className="halo" cx={x} cy={y} r={7 * s} />
                      <circle className="dot" cx={x} cy={y} r={6 * s} strokeWidth={2 * s} />
                      <text
                        x={x + (b.lx ?? 10) * s}
                        y={y + (b.ly ?? -8) * s}
                        textAnchor={b.anchor || "start"}
                        fontSize={13 * s}
                        strokeWidth={4 * s}
                      >
                        {label}
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>
            <span className="ns-mapsrc">행정구역: 통계청(2013)</span>
          </div>

          <div className="ns-detail" aria-live="polite">
            <span className="ns-where">{branch.region === "11" ? "SEOUL" : "GYEONGGI"} · BRANCH</span>
            <h3>반듯한 {branch.name}</h3>
            <span className="ns-dept">{branch.dept}</span>

            {branch.m ? (
              <>
                <div className="ns-rank">
                  <span>NAVER</span>
                  <b>"{branch.m.kw}" 검색 1위</b>
                </div>
                <div className="ns-metrics">
                  <div className="ns-metric">
                    <span>방문자 리뷰</span>
                    <b>
                      {fmt(branch.m.r0)} → {fmt(branch.m.r1)}
                    </b>
                    <small>+{fmt(branch.m.r1 - branch.m.r0)}건</small>
                  </div>
                  {branch.m.np != null && (
                    <div className="ns-metric">
                      <span>월 신환</span>
                      <b>+{branch.m.np}%</b>
                      <small>월 평균 증가</small>
                    </div>
                  )}
                  {branch.m.v0 != null && (
                    <div className="ns-metric">
                      <span>재진율</span>
                      <b>
                        {branch.m.v0}% → {branch.m.v1}%
                      </b>
                      <small>+{Math.round((branch.m.v1 - branch.m.v0) * 10) / 10}%p</small>
                    </div>
                  )}
                  {branch.m.tenure != null && (
                    <div className="ns-metric">
                      <span>직원 평균 근속</span>
                      <b>{branch.m.tenure}년</b>
                      <small>&nbsp;</small>
                    </div>
                  )}
                  {branch.isNew && (
                    <div className="ns-metric new">
                      <span>NEW</span>
                      <b>{branch.isNew}</b>
                      <small>개원하자마자 지역 1위</small>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <p className="ns-pending">성과 지표를 정리하고 있어요</p>
            )}

            <div className="ns-stats">
              <div>
                <b>{BRANCHES.length}</b>
                <span>BRANCHES</span>
              </div>
              <div>
                <b>{count("11")}</b>
                <span>SEOUL</span>
              </div>
              <div>
                <b>{count("31")}</b>
                <span>GYEONGGI</span>
              </div>
            </div>
          </div>
        </div>

        <div className="ns-cta">
          <p>우리 병원도 이렇게 운영하고 싶다면</p>
          <Link to="/contact">무료 상담 신청 →</Link>
        </div>
      </div>
    </section>
  );
}
