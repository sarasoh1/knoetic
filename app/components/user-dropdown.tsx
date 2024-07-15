import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

export function UserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="w-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
            <MenuIcon className="h-6 w-6 lg:w-5 lg:h-5" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuItem>
            <Link className="w-full" href="/forum/create">
                Create Forum
            </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
            <Link className="w-full" href="/create">
                Create Post
            </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
            <Link className="w-full" href="/settings">
                Settings
            </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
            <LogoutLink className="w-full">
                Logout
            </LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}