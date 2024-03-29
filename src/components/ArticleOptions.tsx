import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  DotsVerticalIcon,
  BookmarkIcon,
  CopyIcon,
  CheckboxIcon,
} from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { DeleteIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  archiveArticle,
  deleteArticle,
  unarchiveArticle,
} from "@/api/articles";
import toast from "react-hot-toast";
import { Article } from "@/typings/article/Article";
import Dialog from "./Dialog";
import { useState } from "react";

type Props = {
  article: Article;
};

const ArticleOptions = ({ article }: Props) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [currToast, setCurrToast] = useState("");
  const queryClient = useQueryClient();

  // delete article
  const { mutate: deleteArticleById } = useMutation({
    mutationFn: deleteArticle,
    onSuccess: (data) => {
      toast.dismiss(currToast);
      toast.success("Link deleted!");

      // invalidate query
      if (article.state === "AVAILABLE") {
        queryClient.invalidateQueries({ queryKey: ["get-all-articles"] });
      } else {
        queryClient.invalidateQueries({
          queryKey: ["get-all-archived-articles"],
        });
      }
    },
    onError: (error) => {
      toast.dismiss(currToast);
      toast.error(`Error!`);
    },
    onSettled: () => {},
  });

  const { mutate: archiveArticleById } = useMutation({
    mutationFn: archiveArticle,
    onSuccess: (data) => {
      toast.dismiss(currToast);
      toast.success("Link archived!");

      // invalidate query
      if (article.state === "AVAILABLE") {
        queryClient.invalidateQueries({ queryKey: ["get-all-articles"] });
      } else {
        queryClient.invalidateQueries({
          queryKey: ["get-all-archived-articles"],
        });
      }
    },
    onError: (error) => {
      toast.dismiss(currToast);
      toast.error(`Error!`);
    },
    onSettled: () => {},
  });

  const { mutate: unarchiveArticleById } = useMutation({
    mutationFn: unarchiveArticle,
    onSuccess: (data) => {
      toast.success("Link restored!");
    },
    onError: (error) => {
      alert(`Error`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-all-archived-articles"],
      });
    },
  });

  async function copyTextToClipboard(link: string) {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(link);
      toast.success("Link copied!");
    }
  }

  async function menuItemSelect() {
    const toastId = toast.loading("Deleting...");
    setCurrToast(toastId);
    deleteArticleById({ id: article.id });
  }

  return (
    <>
      {/* setting modal to false, prevent drop down from remaining open */}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-full">
            <DotsVerticalIcon width={"18"} height={"18"} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="text-red-600"
              onSelect={(e) => e.preventDefault()}
              onClick={() => setOpenDialog(true)}
            >
              <DeleteIcon width={"18"} height={"18"} className="mr-2" />
              Delete
              {/* <DropdownMenuShortcut>⌘ ⌫</DropdownMenuShortcut> */}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => copyTextToClipboard(article.link)}>
              <CopyIcon width={"18"} height={"18"} className="mr-2" /> Copy
            </DropdownMenuItem>
            {article.state === "AVAILABLE" && (
              <DropdownMenuItem>
                <BookmarkIcon width={"18"} height={"18"} className="mr-2" /> Tag
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              onClick={() => {
                if (article.state === "AVAILABLE") {
                  const toastId = toast.loading("Archiving...");
                  setCurrToast(toastId);
                  archiveArticleById({ id: article.id });
                } else {
                  const toastId = toast.loading("Restoring...");
                  setCurrToast(toastId);
                  unarchiveArticleById({ id: article.id });
                }
              }}
            >
              <CheckboxIcon width={"18"} height={"18"} className="mr-2" />
              {article.state === "AVAILABLE" ? "Archive" : "Restore"}
            </DropdownMenuItem>

            {/* temp commented out till implemented */}
            {/* <DropdownMenuItem>
              <StarIcon width={"18"} height={"18"} className="mr-2" /> Favourite
            </DropdownMenuItem> */}
            {/* <DropdownMenuSeparator />
          <DropdownMenuItem>
          <ReaderIcon width={"18"} height={"18"} className="mr-2" />
          Add notes
        </DropdownMenuItem> */}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* alert dialog */}
      <Dialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        cb={menuItemSelect}
        title="Are you sure?"
        description="This action cannot be undone. This will delete the article."
      />
    </>
  );
};

export default ArticleOptions;
