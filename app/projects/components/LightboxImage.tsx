import { useEffect, useState } from "react";

type LightboxImageProps = {
  src: string;
  alt: string;
  imageClassName?: string;
  containerClassName?: string;
  ariaLabel?: string;
};

export default function LightboxImage({
  src,
  alt,
  imageClassName,
  containerClassName,
  ariaLabel,
}: LightboxImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div className={containerClassName}>
      <button
        type="button"
        className="block w-full"
        onClick={() => setIsOpen(true)}
        aria-label={ariaLabel ?? "Abrir imagen en pantalla completa"}
      >
        <img
          src={src}
          alt={alt}
          className={imageClassName}
          loading="lazy"
        />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-2 top-2 rounded-full bg-neutral-900/80 px-3 py-1 text-xs text-white hover:bg-neutral-800"
              onClick={() => setIsOpen(false)}
            >
              Cerrar
            </button>
            <img
              src={src}
              alt={alt}
              className="max-h-[80vh] w-full rounded-xl object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}