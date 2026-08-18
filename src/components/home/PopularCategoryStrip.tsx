import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Link } from "react-router-dom";

export interface PopularCategoryItem {
  id: string;
  slug: string;
  name: string;
  count: number;
}

const TONES = ["bg-mobile-peach", "bg-mobile-sky", "bg-mobile-lime", "bg-mobile-lilac"];
/** 卡片高度也是首頁搜尋欄「拉長」後要對齊的高度，兩處共用同一個 class 字串。 */
export const CATEGORY_CARD_HEIGHT = "h-[172px]";
const CARD_SIZE = `${CATEGORY_CARD_HEIGHT} w-[60vw] max-w-[236px]`;
const GAP_PX = 12; // matches gap-3
const EDGE_GIVE = 64; // px of rubber-band "give" past the first/last card
const DRAG_THRESHOLD = 6; // px before a pointer gesture counts as a drag, not a tap
const SETTLE_TRANSITION = "transform 560ms cubic-bezier(0.18, 1.32, 0.3, 1)";

/** Diminishing-returns resistance: the further you pull past the edge, the harder it pushes back. */
function rubberBand(overshoot: number, give: number) {
  const sign = overshoot < 0 ? -1 : 1;
  return sign * give * (1 - 1 / (Math.abs(overshoot) / give + 1));
}

export default function PopularCategoryStrip({ items }: { items: PopularCategoryItem[] }) {
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{
    startX: number;
    startOffset: number;
    moved: number;
    lastX: number;
    lastT: number;
    velocity: number;
  } | null>(null);
  const didDragRef = useRef(false);

  const getStep = () => {
    const card = cardRefs.current[0];
    return card ? card.offsetWidth + GAP_PX : 0;
  };

  const getBounds = () => {
    const step = getStep();
    return { min: -(step * (items.length - 1)), max: 0, step };
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = {
      startX: event.clientX,
      startOffset: offset,
      moved: 0,
      lastX: event.clientX,
      lastT: performance.now(),
      velocity: 0,
    };
    didDragRef.current = false;
    setDragging(true);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    if (!state) return;
    const { min, max } = getBounds();
    const dx = event.clientX - state.startX;
    let next = state.startOffset + dx;
    if (next > max) next = max + rubberBand(next - max, EDGE_GIVE);
    if (next < min) next = min + rubberBand(next - min, EDGE_GIVE);

    state.moved = Math.max(state.moved, Math.abs(dx));
    if (state.moved > DRAG_THRESHOLD) didDragRef.current = true;

    const now = performance.now();
    const dt = now - state.lastT;
    if (dt > 0) state.velocity = (event.clientX - state.lastX) / dt;
    state.lastX = event.clientX;
    state.lastT = now;

    setOffset(next);
  };

  const settleTo = (rawOffset: number, velocity: number) => {
    const { min, max, step } = getBounds();
    if (step <= 0) return;
    const projected = rawOffset + velocity * 140; // carry a bit of flick momentum forward
    const targetIndex = Math.round(-projected / step);
    const clampedIndex = Math.max(0, Math.min(items.length - 1, targetIndex));
    setOffset(Math.max(min, Math.min(max, -(clampedIndex * step))));
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    if (!state) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    settleTo(offset, state.velocity);
    drag.current = null;
    setDragging(false);
  };

  const onClickCapture = (event: React.MouseEvent) => {
    if (didDragRef.current) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return (
    <div
      className="-mx-5 touch-pan-y select-none overflow-hidden px-5 pb-1"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={onClickCapture}
    >
      <div
        className="flex items-end gap-3"
        style={{
          transform: `translateX(${offset}px)`,
          transition: dragging ? "none" : SETTLE_TRANSITION,
        }}
      >
        {items.map((item, index) => (
          <Link
            key={item.id}
            ref={(node) => {
              cardRefs.current[index] = node;
            }}
            to={`/find?category=${item.slug}`}
            draggable={false}
            className={`flex shrink-0 flex-col justify-between rounded-xl3 p-5 text-ink shadow-card ${TONES[index % TONES.length]} ${CARD_SIZE}`}
          >
            <div className="flex items-start justify-between text-xs">
              <span className="font-mono text-ink/45">0{index + 1}</span>
              <span className="rounded-full bg-mobile-card/55 px-2.5 py-1 text-[10px]">{item.count || "尚無"} 件</span>
            </div>
            <div>
              <p className="mb-1 text-xs text-ink/50">台灣製好物</p>
              <h3 className="font-display text-3xl font-black">{item.name}</h3>
              <p className="mt-2 text-xs font-bold">查看分類 →</p>
            </div>
          </Link>
        ))}
        <div aria-hidden className="w-7 shrink-0" />
      </div>
    </div>
  );
}
