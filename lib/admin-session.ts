import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_SESSION_COOKIE = "portfolio_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12;

type AdminSessionPayload = {
  username: string;
  exp: number;
};

function getAdminUsername() {
  return process.env.ADMIN_USERNAME?.trim() ?? "";
}

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? "";
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? "";
}

export function getAdminSetupErrors() {
  const errors: string[] = [];

  if (!getAdminUsername()) {
    errors.push("Falta ADMIN_USERNAME.");
  }

  if (!getAdminPassword()) {
    errors.push("Falta ADMIN_PASSWORD.");
  }

  if (!process.env.ADMIN_TOKEN?.trim()) {
    errors.push("Falta ADMIN_TOKEN.");
  }

  if (getSessionSecret().length < 16) {
    errors.push("ADMIN_SESSION_SECRET debe tener al menos 16 caracteres.");
  }

  return errors;
}

export function isAdminConfigured() {
  return getAdminSetupErrors().length === 0;
}

function signSession(data: string) {
  return createHmac("sha256", getSessionSecret()).update(data).digest("base64url");
}

function encodeSession(payload: AdminSessionPayload) {
  const data = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  return `${data}.${signSession(data)}`;
}

function decodeSession(value: string) {
  const [data, signature] = value.split(".", 2);
  if (!data || !signature || getSessionSecret().length < 16) {
    return null;
  }

  const expectedSignature = signSession(data);
  const providedBuffer = Buffer.from(signature, "utf8");
  const expectedBuffer = Buffer.from(expectedSignature, "utf8");

  if (
    providedBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(providedBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const parsed = JSON.parse(
      Buffer.from(data, "base64url").toString("utf8"),
    ) as Partial<AdminSessionPayload>;

    if (
      typeof parsed.username !== "string" ||
      typeof parsed.exp !== "number" ||
      parsed.exp <= Date.now()
    ) {
      return null;
    }

    return {
      username: parsed.username,
      exp: parsed.exp,
    } satisfies AdminSessionPayload;
  } catch {
    return null;
  }
}

export function validateAdminCredentials(username: string, password: string) {
  if (!isAdminConfigured()) {
    return {
      ok: false as const,
      message: getAdminSetupErrors().join(" "),
    };
  }

  const expectedUsername = getAdminUsername();
  const expectedPassword = getAdminPassword();
  const providedUsername = username.trim();

  if (!providedUsername || !password) {
    return {
      ok: false as const,
      message: "Completa usuario y contrasena.",
    };
  }

  if (providedUsername !== expectedUsername) {
    return {
      ok: false as const,
      message: "Usuario o contrasena invalidos.",
    };
  }

  const expectedBuffer = Buffer.from(expectedPassword, "utf8");
  const providedBuffer = Buffer.from(password, "utf8");

  if (
    expectedBuffer.length !== providedBuffer.length ||
    !timingSafeEqual(expectedBuffer, providedBuffer)
  ) {
    return {
      ok: false as const,
      message: "Usuario o contrasena invalidos.",
    };
  }

  return {
    ok: true as const,
    username: expectedUsername,
  };
}

export function buildAdminSessionCookie(username: string) {
  return {
    name: ADMIN_SESSION_COOKIE,
    value: encodeSession({
      username,
      exp: Date.now() + SESSION_TTL_SECONDS * 1000,
    }),
    options: {
      httpOnly: true,
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: SESSION_TTL_SECONDS,
    },
  };
}

export function getAdminSessionCookieName() {
  return ADMIN_SESSION_COOKIE;
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const rawSession = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!rawSession) {
    return null;
  }

  const session = decodeSession(rawSession);
  if (!session) {
    return null;
  }

  return {
    username: session.username,
    expiresAt: session.exp,
  };
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return session;
}
