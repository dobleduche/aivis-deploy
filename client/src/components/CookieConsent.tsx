import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/Button";
import { initSentryIfConsented } from "../lib/sentry";

const KEY = "cookie-consent" as const;
const CONSENT_EVENT = "aivis-consent-change" as const;
type ConsentValue = "accepted" | "dismissed";

function safeGet(key: string): string | null {
  try {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string): void {
  try {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, value);
  } catch {
    // ignore
  }
}

function safeRemove(key: string): void {
  try {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

function emitConsentChange(value: ConsentValue | null): void {
  try {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
  } catch {
    // ignore
  }
}

export function getConsentValue(): ConsentValue | null {
  const current = safeGet(KEY);
  if (current === "accepted" || current === "dismissed") return current;
  return null;
}

export function setConsentValue(value: ConsentValue | null): void {
  if (value) {
    safeSet(KEY, value);
  } else {
    safeRemove(KEY);
  }

  if (value === "accepted") {
    initSentryIfConsented();
  }

  emitConsentChange(value);
}

/**
 * Revoke cookie/analytics consent.
 * Removes the stored preference so the banner re-appears on next page load.
 * Callers (e.g. Settings page) can import this helper.
 */
export function revokeConsent(): void {
  setConsentValue(null);
}

/** Check whether the user has given analytics consent. */
export function hasConsent(): boolean {
  return getConsentValue() === "accepted";
}

export function CookieConsent(): React.JSX.Element | null {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setShow(!getConsentValue());

    const onConsentChanged = (): void => {
      setShow(!getConsentValue());
    };

    window.addEventListener(CONSENT_EVENT, onConsentChanged);

    window.AiVisConsent = {
      get: () => getConsentValue(),
      set: (next: unknown) => {
        const normalized = next === "accepted" || next === "dismissed" ? next : null;
        setConsentValue(normalized);
        return getConsentValue();
      },
      open: () => {
        setShow(true);
      },
      reset: () => {
        revokeConsent();
      },
    };

    return () => {
      window.removeEventListener(CONSENT_EVENT, onConsentChanged);
      if (window.AiVisConsent) {
        delete window.AiVisConsent;
      }
    };
  }, []);

  const accept = (): void => {
    setConsentValue("accepted");
    setShow(false);
  };

  const dismiss = (): void => {
    setConsentValue("dismissed");
    setShow(false);
    // Sentry stays uninitialised — no analytics tracking
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-heading"
      className="fixed bottom-0 left-0 right-0 bg-charcoal-deep text-white p-4 z-50 animate-in slide-in-from-bottom-2 no-print"
    >
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div
          id="cookie-consent-heading"
          className="text-sm text-center sm:text-left text-white/75"
        >
          We use essential localStorage for authentication and optional analytics (Sentry error tracking) to improve AiVIS.
          <strong className="text-white"> "Got it"</strong> enables analytics; <strong className="text-white">"Close"</strong> keeps only essentials.
          See our <Link to="/privacy" className="text-white/85 hover:text-white/85 underline">Privacy Policy</Link>.
        </div>

        <div className="flex flex-wrap justify-center sm:justify-start gap-3">
          <Button
            onClick={dismiss}
            variant="ghost"
            className="text-white/55 hover:text-white hover:bg-charcoal-light"
            aria-label="Dismiss: essential only, no analytics"
          >
            Close
          </Button>

          <Button
            onClick={accept}
            className="bg-charcoal text-white hover:bg-charcoal border border-white/10 shadow-lg shadow-white/20"
            aria-label="Accept cookies and enable analytics"
          >
            Got it
          </Button>
        </div>
      </div>
    </div>
  );
}
