import { useAuth } from "@/components/AuthProvider";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import AvatarUploader from "./AvatarUploader";
import FavoritesPanel from "./FavoritesPanel";

export default function ProfilePanel({ className = "" }: { className?: string }) {
  const { user, signOut } = useAuth();

  return (
    <aside className={`panel-card p-5 flex flex-col gap-6 ${className}`}>
      {user ? (
        <div className="flex items-center gap-3">
          <AvatarUploader userId={user.id} fallbackUrl={user.picture} name={user.name} />
          <div className="min-w-0">
            <p className="heading-sub truncate">{user.name}</p>
            <p className="text-meta truncate">{user.email}</p>
            <button
              type="button"
              onClick={signOut}
              className="text-hint underline underline-offset-2 mt-0.5"
            >
              登出
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <AvatarUploader userId={null} name="訪客" />
            <div>
              <p className="heading-sub">訪客</p>
              <p className="text-meta">登入才能跨裝置管理收藏</p>
            </div>
          </div>
          <GoogleSignInButton />
        </div>
      )}

      <FavoritesPanel />
    </aside>
  );
}
