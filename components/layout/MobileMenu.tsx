"use client";

import { useEffect, useId, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import type { HeaderContent } from "@/types/home";

interface MobileMenuProps {
  content: HeaderContent;
  defaultOpen?: boolean;
  className?: string;
}

export function MobileMenu({ content, defaultOpen = false, className = "" }: MobileMenuProps) {
  const [open, setOpen] = useState(defaultOpen);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  // The native modal dialog provides the focus trap, Escape handling and focus return.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!open) {
      if (dialog.open) dialog.close();
      return;
    }

    if (!dialog.open) {
      // Line the menu bar up with the navigation pill it opens from (it sits lower before the page scrolls).
      const barTop = rootRef.current?.parentElement?.getBoundingClientRect().top ?? 0;
      dialog.style.setProperty("--bar-top", `${Math.max(0, barTop)}px`);
      dialog.showModal();
      // Focus the dialog itself; Safari would otherwise draw a focus ring on the auto-focused logo.
      dialog.focus({ preventScroll: true });
    }

    // Lock page scroll while open; the cleanup restores it on close or unmount.
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    return () => {
      root.style.overflow = previousOverflow;
    };
  }, [open]);

  const close = () => setOpen(false);

  function handleClose() {
    setOpen(false);
    // Safari doesn't focus buttons on tap, so the dialog has nothing to hand focus back to.
    const active = document.activeElement;
    if (active === document.body || dialogRef.current?.contains(active)) {
      triggerRef.current?.focus({ preventScroll: true, focusVisible: false });
    }
  }

  return (
    <div ref={rootRef} className={className}>
      <IconButton
        ref={triggerRef}
        label="Open menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen(true)}
        className="size-11"
      >
        <svg viewBox="0 0 28 20" aria-hidden="true" className="w-[27px]" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
          <path d="M2 2.5h24M2 10h24M8 17.5h18" />
        </svg>
      </IconButton>

      <dialog
        ref={dialogRef}
        id={menuId}
        aria-label="Menu"
        tabIndex={-1}
        onClose={handleClose}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-white p-0 text-heading opacity-100 outline-none transition-opacity backdrop:bg-transparent starting:opacity-0"
      >
        <div className="px-5 pt-[var(--bar-top,0px)] lg:px-14">
          {/* content-box keeps the 56px row of the navigation pill; the border sits below it. */}
          <div className="box-content flex h-14 items-center justify-between border-b border-[#e6e6e6] pr-1.5 pl-3">
            <a
              href="/#top"
              onClick={close}
              className="-ml-0.5 font-display text-[39px] leading-none font-bold tracking-[-0.055em] text-ink transition-colors hover:text-brand active:text-ink-active"
            >
              {content.brandName}
            </a>
            <IconButton label="Close menu" onClick={close} className="size-11">
              <svg viewBox="0 0 30 30" aria-hidden="true" className="size-[30px]" fill="none" stroke="currentColor" strokeLinecap="round">
                <circle cx="15" cy="15" r="14" strokeWidth="1.5" />
                <path d="m11 11 8 8m0-8-8 8" strokeWidth="2" />
              </svg>
            </IconButton>
          </div>

          <nav aria-label="Menu">
            <ul className="mt-[62px] flex flex-col items-center gap-5">
              {content.navigation.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={close}
                    className="block rounded-md px-2 text-xl leading-[1.32] font-medium underline-offset-[6px] transition-colors hover:text-brand hover:underline active:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-[62px] flex flex-col gap-4">
            <Button href={content.primaryCta.href} fullWidth onClick={close}>
              {content.primaryCta.label}
            </Button>
            <Button href={content.secondaryCta.href} variant="outline" fullWidth onClick={close}>
              {content.secondaryCta.label}
            </Button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
