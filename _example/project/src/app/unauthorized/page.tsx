import Link from "next/link";
import { ShieldX } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-6">
          <ShieldX className="w-8 h-8 text-destructive" />
        </div>
        <h1 className="text-3xl font-bold mb-3">Access Denied</h1>
        <p className="text-muted-foreground mb-8">
          Your email is not on the approved list. Please contact the
          administrator to request access.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-brand hover:bg-brand-light text-white rounded-full h-12 px-8 font-medium transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
