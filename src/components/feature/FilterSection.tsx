import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FilterSchema = z.object({
  query: z.string().optional().default(""),
  minRating: z.coerce.number().optional(),
  sortBy: z.enum(["popular", "rating", "title"]).optional().default("popular"),
});

type FilterState = z.infer<typeof FilterSchema>;

export interface FilterSectionProps {
  value: FilterState;
  onChange: (next: FilterState) => void;
  className?: string;
}

export function FilterSection({
  value,
  onChange,
  className,
}: FilterSectionProps) {
  const parsed = FilterSchema.parse(value);

  return (
    <section className={className}>
      <div className="flex flex-col gap-3 rounded-lg border bg-card/50 p-4 backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Filter</Badge>
            <span className="text-sm text-muted-foreground">
              Opsional, bisa dikembangkan
            </span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() =>
              onChange({ query: "", sortBy: "popular", minRating: undefined })
            }
          >
            Reset
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Input
            value={parsed.query ?? ""}
            onChange={(e) => onChange({ ...parsed, query: e.target.value })}
            placeholder="Keyword"
            aria-label="Filter keyword"
          />

          <Input
            value={
              typeof parsed.minRating === "number"
                ? String(parsed.minRating)
                : ""
            }
            onChange={(e) => {
              const v = e.target.value.trim();
              onChange({
                ...parsed,
                minRating: v ? Number(v) : undefined,
              });
            }}
            placeholder="Min rating"
            aria-label="Minimum rating"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {["popular", "rating", "title"].map((k) => (
            <Button
              key={k}
              type="button"
              variant={parsed.sortBy === k ? "secondary" : "outline"}
              size="sm"
              onClick={() =>
                onChange({ ...parsed, sortBy: k as FilterState["sortBy"] })
              }
            >
              {k === "popular"
                ? "Popular"
                : k === "rating"
                  ? "Rating"
                  : "Title"}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
