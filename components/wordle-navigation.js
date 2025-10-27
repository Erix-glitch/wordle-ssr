"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MoveLeft, MoveRight, OctagonAlert } from "lucide-react";

export function WordleNavigation({
  wordNum,
  wordId,
  prevDateString,
  nextDateString,
  printDate,
  isSpoiler,
  canAdvance,
}) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const cancelButtonRef = useRef(null);

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
    router.push(`/?date=${nextDateString}`);
  }, [router, nextDateString]);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      setIsDialogOpen(false);
    }
  };

  const disabledNextControl = (
    <span aria-disabled="true" className="p-1 rounded text-gray-600">
      <MoveRight className="w-8 cursor-not-allowed" />
    </span>
  );

  const previousControl =
    wordId === 1 ? (
      <span aria-disabled="true" className="p-1 rounded text-gray-600">
        <MoveLeft className="w-8 cursor-not-allowed" />
      </span>
    ) : (
      <Link
        className="p-1 rounded hover:bg-gray-800 transition-colors"
        aria-label="Previous Wordle"
        href={`/?date=${prevDateString}`}
      >
        <MoveLeft className="w-8" />
      </Link>
    );

  let nextControl = null;
  if (isSpoiler && canAdvance) {
    nextControl = (
      <>
        <button
          type="button"
          className="p-1 rounded hover:bg-gray-800 hover:cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
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
              className="w-full max-w-md rounded-lg bg-[#121213] p-6 text-left shadow-lg outline-none"
              tabIndex={-1}
            >
              <h2
                id="spoiler-dialog-title"
                className="text-xl font-semibold text-white"
              >
                <OctagonAlert className="inline mr-2" />
                ACHTUNG! Spoiler Ahead!
              </h2>
              <div className="mt-2 border-t border-gray-700"></div>
              <p
                id="spoiler-dialog-description"
                className="mt-2 text-md text-gray-300"
              >
                Clicking next will reveal tomorrow&apos;s Wordle solution.
              </p>
              <br />
              <p className="font-bold">Are you sure whatever you're doing is worth it?</p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  ref={cancelButtonRef}
                  type="button"
                  className="rounded-md border border-gray-600 px-4 py-2 text-sm font-medium text-gray-200 transition hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                  onClick={() => setIsDialogOpen(false)}
                >
                  No, stay here
                </button>
                <button
                  type="button"
                  className="rounded-md bg-red-400 px-4 py-2 text-sm font-semibold text-gray-900 transition hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                  onClick={handleConfirm}
                >
                  Yes, I hate myself
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  } else if (isSpoiler) {
    nextControl = disabledNextControl;
  } else if (canAdvance) {
    nextControl = (
      <Link
        className="p-1 rounded hover:bg-gray-800 transition-colors"
        aria-label="Next Wordle"
        href={`/?date=${nextDateString}`}
      >
        <MoveRight className="w-8" />
      </Link>
    );
  } else {
    nextControl = disabledNextControl;
  }

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 text-base text-gray-400 font-mono">
        {previousControl}
        <span>{wordNum ? `Wordle #${wordNum}` : "Wordle"}</span>
        {nextControl}
      </div>
      <p className="items-center text-sm text-gray-600 font-mono">{printDate}</p>
    </div>
  );
}
