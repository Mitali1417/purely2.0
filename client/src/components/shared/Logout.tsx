import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, LogOut } from "lucide-react";

interface LogoutProps {
  handleLogout: () => void;
}

const Logout: React.FC<LogoutProps> = ({ handleLogout }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} size="sm">
          <span className="mr-1 text-muted-foreground w-full md:hidden">
            Logout
          </span>{" "}
          <LogOut />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" showCloseButton>
        <DialogHeader>
          <div className="flex flex-col items-center justify-center">
            <DialogTitle className="flex flex-col items-center gap-6 text-foreground">
              <div className="bg-amber-500/20 p-2 rounded-full">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              </div>
              Confirm Logout
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to logout?
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={"darkDestructive"}
            onClick={handleLogout}
            className="flex-1 sm:flex-initial"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Logout;
