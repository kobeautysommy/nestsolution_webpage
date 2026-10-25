// 지점 데이터. 지점이 늘거나 숫자가 바뀌면 이 파일만 고치면 돼요.
// region: "11" = 서울, "31" = 경기 (행정구역 코드)
// m: 성과 지표 — r0/r1 리뷰 전후, np 월 신환 증가율(%), kw 네이버 검색어, v0/v1 재진율 전후(%), tenure 평균 근속(년)
// 없는 지표는 빼면 화면에서도 자동으로 숨겨져요.
// lx/ly/anchor: 지도에서 지점 이름 글자 위치 조정(겹칠 때만)

export const BRANCHES = [
  { id: "snu", name: "서울대입구점", region: "11", lat: 37.4812, lng: 126.9527, dept: "정형외과", lx: 8, ly: 14,
    m: { r0: 985, r1: 1731, np: 8, kw: "서울대입구 정형외과", v0: 20, v1: 45, tenure: 2 } },
  { id: "gwanak", name: "난곡사거리점", region: "11", lat: 37.4797, lng: 126.9209, dept: "내과", lx: -8, ly: 12, anchor: "end",
    m: { r0: 12, r1: 315, np: 7, kw: "난곡동 내과", v0: 24, v1: 35, tenure: 1 } },
  { id: "hongdae", name: "홍대점", region: "11", lat: 37.5572, lng: 126.9245, dept: "정형외과",
    m: { r0: 352, r1: 1026, np: 6, kw: "홍대역 정형외과", v0: 22.5, v1: 38, tenure: 1.5 } },
  { id: "isu", name: "이수점", region: "11", lat: 37.4862, lng: 126.9819, dept: "정형외과", lx: 8, ly: -6,
    m: { r0: 411, r1: 1093, np: 7.5, kw: "이수역 정형외과", v0: 20, v1: 35, tenure: 2 } },
  { id: "kyodae", name: "교대역점", region: "11", lat: 37.4934, lng: 127.0142, dept: "정형외과",
    m: { r0: 400, r1: 1183, np: 6, kw: "교대역 정형외과", v0: 25, v1: 40, tenure: 1.5 } },
  { id: "kkachi", name: "까치산역점", region: "11", lat: 37.5317, lng: 126.8467, dept: "정형외과", isNew: "개원 2개월",
    m: { r0: 0, r1: 165, kw: "까치산역 정형외과" } },
  { id: "suwon", name: "수원점", sub: "정형외과", region: "31", lat: 37.266, lng: 127.0, dept: "정형외과", lx: -8, ly: -4, anchor: "end",
    m: { r0: 986, r1: 2027, np: 7, kw: "수원역 정형외과", v0: 24, v1: 38, tenure: 1.5 } },
  { id: "suwon2", name: "수원점", sub: "내과·이비인후과", region: "31", lat: 37.26, lng: 127.03, dept: "내과·이비인후과", lx: 8, ly: 12,
    m: { r0: 106, r1: 707, np: 7, kw: "수원역 이비인후과", v0: 27, v1: 40, tenure: 1.5 } },
  { id: "anseong", name: "안성점", region: "31", lat: 37.008, lng: 127.2797, dept: "정형외과",
    m: { r0: 342, r1: 1080, np: 6, kw: "안성 정형외과", v0: 19, v1: 31, tenure: 1 } },
];

export const REGIONS = [
  { code: "all", name: "전체", label: "KOREA" },
  { code: "11", name: "서울", label: "SEOUL" },
  { code: "31", name: "경기", label: "GYEONGGI" },
];
