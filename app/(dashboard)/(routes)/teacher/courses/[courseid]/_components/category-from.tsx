"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

interface SelectCategoryProps {
  courseId: string;
  initialValue: string;
  options: { label: string; value: string }[];
}

export const SelectCategory = ({
  courseId,
  initialValue,
  options,
}: SelectCategoryProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(initialValue);
  const router = useRouter();

  const handleChange = async (newValue: string) => {
    setLoading(true);
    try {
      setLoading(true);
      await axios.patch(`/api/courses/${courseId}`, {
        categoryId: newValue,
      });
      toast.success("Category updated");
      setLoading(false);
      setValue(newValue);
      router.refresh();
    } catch {
      setLoading(false);
      toast.error("Failed to update category");
    }
  };

  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium mb-2">Course Category</div>
      {loading && (
        <div className="flex items-center gap-x-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-blue-500"></div>
          <span>Loading...</span>
        </div>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedLabel || "Select category..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search category..." />
            <CommandList>
              <CommandEmpty>No category found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(selected) => {
                      setOpen(false);
                      handleChange(selected);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
