"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MoveLeft, MoveRight, OctagonAlert, CalendarSearch } from "lucide-react";
import { Toaster, toast } from "sonner";

export function WordleNavigation({
  wordNum,
  wordId,
  prevDateString,
  nextDateString,
  printDate,
  isSpoiler,
  canAdvance,
  isoDate,
}) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [spoilerAcknowledged, setSpoilerAcknowledged] = useState(false);
  const dateInputRef = useRef(null);
  const now = new Date();
  const todayString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  useEffect(() => {
    if (isDialogOpen && cancelButtonRef.current) {
      cancelButtonRef.current.focus();
    }
  }, [isDialogOpen]);

  useEffect(() => {
    if (!isDialogOpen) {
      return;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsDialogOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isDialogOpen]);

  const handleConfirm = useCallback(() => {
    setIsDialogOpen(false);
    setSpoilerAcknowledged(true);
    router.push(`/?date=${nextDateString}`);
  }, [router, nextDateString]);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      setIsDialogOpen(false);
    }
  };

  const handleDateChange = useCallback(
    (e) => {
      const value = e.target.value;
      if (value) {
        router.push(`/?date=${value}`);
      }
    },
    [router]
  );

  const disabledNextControl = (
    <span aria-disabled="true" className="p-1 rounded text-gray-600">
      <MoveRight className="w-8 cursor-not-allowed" />
    </span>
  );

  const enabledNextControl = (
    <Link
      className="p-1 rounded dark:hover:bg-gray-800 hover:bg-gray-200 transition-colors"
      aria-label="Next Wordle"
      href={`/?date=${nextDateString}`}
    >
      <MoveRight className="w-8" />
    </Link>
  );
  const previousControl =
    wordId === 1 ? (
      <span aria-disabled="true" className="p-1 rounded text-gray-600">
        <MoveLeft className="w-8 cursor-not-allowed" />
      </span>
    ) : (
      <Link
        className="p-1 rounded dark:hover:bg-gray-800 hover:bg-gray-200 transition-colors"
        aria-label="Previous Wordle"
        href={`/?date=${prevDateString}`}
      >
        <MoveLeft className="w-8" />
      </Link>
    );

  let nextControl = null;
  if (isSpoiler && canAdvance && !spoilerAcknowledged) {
    nextControl = (
      <>
        <button
          type="button"
          className="p-1 rounded dark:hover:bg-red-600 hover:bg-red-400 hover:cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
          aria-label="Next Wordle (spoiler warning)"
          onClick={() => setIsDialogOpen(true)}
        >
          <MoveRight className="w-8" />
        </button>
        {isDialogOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="spoiler-dialog-title"
            aria-describedby="spoiler-dialog-description"
            onClick={handleOverlayClick}
          >
            <div
              className="w-full max-w-md rounded-lg dark:bg-[#121212] bg-gray-200 p-6 text-left shadow-lg outline-none"
              tabIndex={-1}
            >
              <h2
                id="spoiler-dialog-title"
                className="text-xl font-semibold dark:text-white text-black"
              >
                <OctagonAlert className="inline mr-2" />
                ACHTUNG! Spoiler Ahead!
              </h2>
              <div className="mt-2 border-t border-gray-700"></div>
              <p
                id="spoiler-dialog-description"
                className="mt-2 text-md dark:text-gray-300 text-gray-700"
              >
                Clicking next will reveal tomorrow&apos;s Wordle solution.
              </p>
              <br />
              <p className="font-bold">
                Are you sure whatever you're doing is worth it?
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  ref={cancelButtonRef}
                  type="button"
                  className="rounded-md border border-gray-600 px-4 py-2 text-sm font-medium transition dark:hover:bg-gray-800 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                  onClick={() => setIsDialogOpen(false)}
                >
                  No, stay here
                </button>
                <button
                  type="button"
                  className="rounded-md bg-red-400 px-4 py-2 text-sm font-semibold text-gray-900 transition hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                  onClick={() => {
                    handleConfirm();
                    toast.warning("Future words may be changed later!");
                  }}
                >
                  Yes, I hate myself
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  } else if (spoilerAcknowledged) {
    nextControl = enabledNextControl;
  } else if (isSpoiler) {
    nextControl = disabledNextControl;
  } else if (canAdvance) {
    nextControl = enabledNextControl;
  } else {
    nextControl = disabledNextControl;
  }

  return (
    <>
      <div className="mt-4">
        <div className="flex items-center gap-2 text-base md:text-lg dark:text-gray-400 text-gray-700 font-mono">
          {previousControl}
          <span>{wordNum ? `Wordle #${wordNum}` : "Wordle"}</span>
          {nextControl}
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => dateInputRef.current?.showPicker()}
          className="relative flex items-center text-sm dark:text-gray-500 text-gray-600 dark:hover:bg-gray-800 hover:bg-gray-200 px-2 rounded transition-colors font-mono md:text-base hover:cursor-pointer"
          aria-label="Select Wordle by date"
        >
          {printDate}
          <CalendarSearch className="inline ml-1.5 h-5 w-5" />
          <input
            ref={dateInputRef}
            type="date"
            value={isoDate ?? ""}
            min="2021-06-19"
            onChange={handleDateChange}
            className="absolute inset-0 opacity-0 pointer-events-none"
            tabIndex={-1}
            aria-hidden="true"
          />
        </button>
        {isoDate !== todayString && (
          <Link
            href="/"
            className="text-xs dark:text-gray-500 text-gray-500 dark:hover:text-gray-300 hover:text-gray-800 dark:hover:bg-gray-800 hover:bg-gray-200 px-1.5 py-0.5 rounded transition-colors font-mono"
          >
            Today
          </Link>
        )}
      </div>
    </>
  );
}
