import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      expand={false}
      richColors
      closeButton
      duration={4000}
      toastOptions={{
        style: {
          background: 'var(--bs-body-bg)',
          color: 'var(--bs-body-color)',
          border: '1px solid var(--bs-border-color)',
        },
      }}
    />
  );
}

export { toast } from "sonner";