import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "./sidebar";
export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-70 transition-opacity duration-200 ease-in-out">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="w-56">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}
