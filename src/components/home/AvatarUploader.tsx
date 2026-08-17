import { useRef } from "react";
import { useAvatarOverride } from "@/hooks/useAvatarOverride";

export default function AvatarUploader({
  userId,
  fallbackUrl,
  name,
}: {
  userId: string | null;
  fallbackUrl?: string;
  name: string;
}) {
  const { overrideUrl, setAvatarFile } = useAvatarOverride(userId);
  const inputRef = useRef<HTMLInputElement>(null);
  const src = overrideUrl ?? fallbackUrl;

  return (
    <div className="relative w-16 h-16 shrink-0">
      {src ? (
        <img
          src={src}
          alt={`${name} 的大頭貼`}
          className="w-16 h-16 rounded-full object-cover border-2 border-surface shadow-card"
        />
      ) : (
        <div className="w-16 h-16 rounded-full bg-chip-blue/40 border-2 border-surface shadow-card flex items-center justify-center font-display font-bold text-lg text-ink/60">
          {name.slice(0, 1)}
        </div>
      )}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        aria-label="更換大頭貼"
        title="更換大頭貼"
        className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-accent text-white text-[10px] flex items-center justify-center shadow-card border-2 border-surface"
      >
        +
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) setAvatarFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
