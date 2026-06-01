import logoPng from "@/assets/Logo.png";

export interface LogoProps {
  className?: string;
  alt?: string;
}

export function Logo({ className, alt = "Movie Explorer" }: LogoProps) {
  return (
    <img src={logoPng} alt={alt} className={className} draggable={false} />
  );
}
