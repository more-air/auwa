"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCenter,
  type DragEndEvent,
  type DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { PostTile } from "./lib";
import { TileContent } from "./tile-content";

function SortableTile({ tile, position }: { tile: PostTile; position: number }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: tile.slug });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
    cursor: "grab",
    touchAction: "none",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TileContent tile={tile} position={position} />
    </div>
  );
}

type SaveState = "idle" | "saving" | "saved" | "error";

export function DraggableGrid({ initialTiles }: { initialTiles: PostTile[] }) {
  const [tiles, setTiles] = useState(initialTiles);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [, startTransition] = useTransition();
  const router = useRouter();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = tiles.findIndex((t) => t.slug === active.id);
    const newIndex = tiles.findIndex((t) => t.slug === over.id);
    if (oldIndex < 0 || newIndex < 0) return;

    const next = arrayMove(tiles, oldIndex, newIndex);
    setTiles(next);
    setSaveState("saving");

    try {
      const res = await fetch("/api/instagram-plan/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: next.map((t) => t.slug) }),
      });
      if (!res.ok) throw new Error(await res.text());
      setSaveState("saved");
      // Re-fetch server-rendered data so warnings recompute.
      startTransition(() => router.refresh());
      setTimeout(() => setSaveState("idle"), 1500);
    } catch {
      setSaveState("error");
    }
  };

  const activeTile = activeId ? tiles.find((t) => t.slug === activeId) : null;
  const activePosition = activeTile ? tiles.findIndex((t) => t.slug === activeTile.slug) + 1 : 0;

  return (
    <>
      <div className="max-w-[935px] mx-auto px-4 md:px-12 pb-3 flex items-center justify-between">
        <div className="font-sans text-[12px] uppercase tracking-[0.14em] text-sumi/50">
          Scheduled · {tiles.length} {tiles.length === 1 ? "slot" : "slots"} · drag to reorder
        </div>
        <SaveIndicator state={saveState} />
      </div>

      <div className="max-w-[935px] mx-auto">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <SortableContext items={tiles.map((t) => t.slug)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-3 gap-[3px] md:gap-1">
              {tiles.map((tile, i) => (
                <SortableTile key={tile.slug} tile={tile} position={i + 1} />
              ))}
            </div>
          </SortableContext>
          <DragOverlay>
            {activeTile ? (
              <div className="shadow-2xl">
                <TileContent tile={activeTile} position={activePosition} dragging />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
}

function SaveIndicator({ state }: { state: SaveState }) {
  if (state === "idle") return null;
  const text = state === "saving" ? "Saving" : state === "saved" ? "Saved" : "Save failed";
  const colour = state === "error" ? "text-[#c44a2a]" : "text-sumi/60";
  return <span className={`font-sans text-[11px] uppercase tracking-[0.14em] ${colour}`}>{text}</span>;
}
