import { createContext, useContext } from "react";

const BASE = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";

const TOKEN_KEY = "atelier_token";

export function getToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function saveToken(token: string): void {
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  sessionStorage.removeItem(TOKEN_KEY);
}

export async function atelierFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();
  const res = await fetch(`${BASE}/api/atelier${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  });

  if (res.status === 401) {
    clearToken();
    window.location.href = `${import.meta.env.BASE_URL}atelier`.replace(/\/\//g, "/");
    throw new Error("Session expired");
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { error?: string }).error ?? `Request failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export interface AtelierAuthContextValue {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AtelierAuthContext = createContext<AtelierAuthContextValue>({
  token: null,
  login: async () => {},
  logout: () => {},
});

export function useAtelierAuth() {
  return useContext(AtelierAuthContext);
}
