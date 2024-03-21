import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "./ui/button";
import { ArchiveIcon, BookmarkIcon, Menu } from "lucide-react";
// import { ModeToggle } from "./ModeToggle";
import useAuth from "@/hooks/useAuth";
import appIcon from "@/assets/appIcon.png";
import { UserDropdownMenu } from "./UserDropdownMenu";
import { SaveArticleInput } from "./SaveArticleInput";
import { RouteProps } from "@/typings/navigation/articleMenu";
import { Link2Icon } from "@radix-ui/react-icons";
import { getUrlPath } from "@/lib/url";
import { useNavigate } from "react-router-dom";

const LogoIcon = () => <img className="h-8 w-8" src={appIcon} alt="leaf.ai" />;

export const mobileMenu: RouteProps[] = [
  { name: "Saves", href: "/saves", icon: Link2Icon },
  { name: "Archives", href: "/archives", icon: ArchiveIcon },
  { name: "Tags", href: "/tags", icon: BookmarkIcon },
];

export const desktopMenu: RouteProps[] = [];

export const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: user, isLoading } = useAuth();

  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 mb-6 w-full border-b-[1px] bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container flex h-14 w-screen flex-row justify-between px-4">
          {/* app icon */}
          <NavigationMenuItem className="font-bold">
            <a href={user ? "/saves" : "/"} className="ml-2 hidden sm:flex">
              <LogoIcon />
            </a>
          </NavigationMenuItem>

          {/* actions */}
          <div className="flex items-center justify-center gap-3">
            {/* input link */}
            {user && (
              <SaveArticleInput
                trigger={
                  <Button variant={"outline"}>
                    <div className="flex flex-row items-center justify-center gap-4">
                      <span>Add Link</span>
                      <div className="flex">
                        <kbd className="text-md flex flex-row items-center justify-center rounded-md border px-1 text-start">
                          <span>⌘</span>
                        </kbd>
                        <kbd className="text-md flex flex-row items-center justify-center rounded-md border px-1 text-start">
                          <span>/</span>
                        </kbd>
                      </div>
                    </div>
                  </Button>
                }
                onEventListener={true}
              />
            )}
            {/* user */}
            {user && <UserDropdownMenu user={user} />}
            {/* mode */}
            {/* <ModeToggle /> */}

            {/* mobile burger menu */}
            <span className="flex lg:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger className="px-2">
                  <Menu
                    className="flex h-5 w-5 lg:hidden"
                    onClick={() => setIsOpen(true)}
                  >
                    <span className="sr-only">Menu Icon</span>
                  </Menu>
                </SheetTrigger>

                <SheetContent side={"right"}>
                  <SheetHeader className="flex flex-row items-center justify-center gap-3">
                    {/* icon */}
                    <NavigationMenuItem className="flex font-bold">
                      <a href={user ? "/saves" : "/"}>
                        <LogoIcon />
                      </a>
                    </NavigationMenuItem>
                    <SheetTitle className="flex items-center text-xl font-bold">
                      Menu
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="mt-4 flex flex-col items-center justify-center gap-2">
                    {mobileMenu.map((link, index) => {
                      return (
                        <Button
                          key={index}
                          variant={"ghost"}
                          className={`flex w-full flex-row items-center justify-start rounded-md p-2 text-sm ${getUrlPath() === link.href && "bg-secondary"}`}
                          onClick={() => {
                            navigate(link.href);
                            setIsOpen(false);
                          }}
                        >
                          {<link.icon className="mr-2 h-4 w-4" />}
                          <span> {link.name}</span>
                        </Button>
                      );
                    })}
                  </nav>
                </SheetContent>
              </Sheet>
            </span>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};