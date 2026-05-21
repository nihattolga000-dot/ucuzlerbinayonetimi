import { redirect } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Redirect root to default locale (use permanent 308 to avoid temporary 307)
  
  return <>{children}</>;
}