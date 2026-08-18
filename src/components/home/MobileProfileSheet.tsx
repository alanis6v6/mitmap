import { useTheme } from "@/components/ThemeProvider";
import { CloseIcon, MoonIcon, SunIcon } from "@/components/icons";
import ProfilePanel from "@/components/home/ProfilePanel";

export default function MobileProfileSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div aria-hidden={!open} className={`fixed inset-0 z-40 ${open ? "" : "pointer-events-none"}`}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-ink/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="會員中心"
        className={`absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-y-auto rounded-t-[2rem] bg-mobile-card px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4 shadow-shell transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-ink/15" />
        <div className="mb-4 flex items-center justify-between">
          <h2 className="heading-section">會員中心</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="關閉"
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink/50"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <ProfilePanel className="!border-0 !bg-transparent !p-0 !shadow-none" />

        <button
          type="button"
          onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
          className="mt-6 flex w-full items-center justify-between rounded-2xl border border-ink/8 bg-mobile-bg px-4 py-3 text-sm font-bold"
        >
          <span>{resolvedTheme === "light" ? "切換暗色主題" : "切換亮色主題"}</span>
          {resolvedTheme === "light" ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
}
