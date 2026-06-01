import { motion, useScroll, useTransform } from "framer-motion";
import { Play, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IMAGE_BASE_URL } from "@/lib/constants";
import type { Movie } from "@/types/movie";

interface HeroSectionProps {
  featuredMovie: Movie | null;
}

export function HeroSection({ featuredMovie }: HeroSectionProps) {
  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.95]);
  const y = useTransform(scrollY, [0, 400], [0, -50]);

  if (!featuredMovie) return null;

  const backdropUrl = `${IMAGE_BASE_URL}/original${featuredMovie.backdrop_path}`;
  const overview =
    featuredMovie.overview.length > 150
      ? featuredMovie.overview.slice(0, 150) + "..."
      : featuredMovie.overview;

  return (
    <motion.section
      className="relative h-screen w-full overflow-hidden"
      style={{ opacity, scale, y }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={backdropUrl}
          alt={featuredMovie.title}
          className="h-full w-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-4">
        <div className="max-w-2xl space-y-6">
          {/* Title */}
          <motion.h1
            className="text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {featuredMovie.title}
          </motion.h1>

          {/* Overview */}
          <motion.p
            className="text-lg text-white/80 md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {overview}
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="rounded-full bg-red-600 px-8 font-semibold hover:bg-red-700"
              asChild
            >
              <Link to={`/movie/${featuredMovie.id}`}>
                <Play className="mr-2 h-5 w-5" fill="white" />
                Watch Trailer
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-white/30 bg-white/10 px-8 font-semibold text-white backdrop-blur-sm hover:bg-white/20"
              asChild
            >
              <Link to={`/movie/${featuredMovie.id}`}>
                <Info className="mr-2 h-5 w-5" />
                See Detail
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

