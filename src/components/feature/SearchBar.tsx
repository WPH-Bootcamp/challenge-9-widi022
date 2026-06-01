import { z } from "zod";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchBarPropsSchema = z.object({
  value: z.string(),
  placeholder: z.string().optional(),
});

type SearchBarProps = z.infer<typeof SearchBarPropsSchema> & {
  className?: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
};

export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "Search movie...",
  className,
}: SearchBarProps) {
  SearchBarPropsSchema.parse({ value, placeholder });

  return (
    <form
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
    >
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="pl-9"
            aria-label="Search"
          />
        </div>
        <Button
          type="submit"
          variant="secondary"
          className="hidden sm:inline-flex"
        >
          🔍
        </Button>
      </div>
    </form>
  );
}
