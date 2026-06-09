import { useEffect, useState, useCallback } from 'react';

export type PermissionKind = 'location' | 'camera' | 'photos' | 'notifications';
export type PermissionStatus = 'granted' | 'denied' | 'unset';

const KEY = (k: PermissionKind) => `keepr.permission.${k}`;

export const getPermissionStatus = (k: PermissionKind): PermissionStatus => {
  if (typeof window === 'undefined') return 'unset';
  const v = window.localStorage.getItem(KEY(k));
  return v === 'granted' || v === 'denied' ? v : 'unset';
};

export const setPermissionStatus = (k: PermissionKind, s: PermissionStatus) => {
  if (typeof window === 'undefined') return;
  if (s === 'unset') window.localStorage.removeItem(KEY(k));
  else window.localStorage.setItem(KEY(k), s);
  window.dispatchEvent(new CustomEvent('keepr-permission-change', { detail: { kind: k, status: s } }));
};

export const usePermissionStatus = (k: PermissionKind): PermissionStatus => {
  const [status, setStatus] = useState<PermissionStatus>(() => getPermissionStatus(k));
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.kind === k) setStatus(detail.status);
    };
    window.addEventListener('keepr-permission-change', handler);
    return () => window.removeEventListener('keepr-permission-change', handler);
  }, [k]);
  return status;
};

/**
 * Hook to manage a permission flow. Returns:
 * - status: persisted status
 * - request(onGranted?): kicks off the prompt (sets pending=true). If already granted, fires onGranted immediately.
 * - pending: whether the in-app + OS dialog flow is currently active
 * - resolve(granted): call from the prompt UI when user finishes the flow
 * - dismiss(): user dismissed without granting (Not now / Don't Allow)
 */
export const usePermissionFlow = (k: PermissionKind) => {
  const status = usePermissionStatus(k);
  const [pending, setPending] = useState(false);
  const [pendingCallback, setPendingCallback] = useState<(() => void) | null>(null);

  const request = useCallback((onGranted?: () => void) => {
    if (getPermissionStatus(k) === 'granted') {
      onGranted?.();
      return;
    }
    setPendingCallback(() => onGranted || null);
    setPending(true);
  }, [k]);

  const resolve = useCallback((granted: boolean) => {
    setPermissionStatus(k, granted ? 'granted' : 'denied');
    setPending(false);
    if (granted && pendingCallback) pendingCallback();
    setPendingCallback(null);
  }, [k, pendingCallback]);

  const dismiss = useCallback(() => {
    setPermissionStatus(k, 'denied');
    setPending(false);
    setPendingCallback(null);
  }, [k]);

  return { status, pending, request, resolve, dismiss };
};
