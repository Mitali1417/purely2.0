import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { create } from "zustand";
import { useLocation, useNavigate } from "react-router-dom";

type LoginDialogState = {
  open: boolean;
  message?: string;
  openDialog: (message?: string) => void;
  closeDialog: () => void;
};

export const useLoginDialogStore = create<LoginDialogState>((set) => ({
  open: false,
  message: undefined,
  openDialog: (message) => set({ open: true, message }),
  closeDialog: () => set({ open: false, message: undefined }),
}));

const LoginRequiredDialog: React.FC = () => {
  const { open, message, closeDialog } = useLoginDialogStore();
  const navigate = useNavigate();
  const location = useLocation();

  const goTo = (path: string) => {
    // Keep current path to potentially redirect after login
    navigate(path, { state: { from: location.pathname } });
    closeDialog();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => (o ? undefined : closeDialog())}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-muted-foreground">
            Login required
          </DialogTitle>
          <div className="text-sm text-muted-foreground">
            {message || "Please login to continue."}
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => goTo("/signup")}>
            Create account
          </Button>
          <Button onClick={() => goTo("/login")}>Login</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginRequiredDialog;
