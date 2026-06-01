import {Logo} from "@/components/feature/Logo"
export interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={className}>
      <div className="flex flex-row items-center justify-between">
        <Logo className="px-4" />
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          copyright © {new Date().getFullYear()} Movie Explorer
        </div>
      </div>
    </footer>
  );
}
