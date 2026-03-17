import type { ImgHTMLAttributes } from "react";

type RemoteImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "alt"> & {
  alt: string;
};

export function RemoteImage({
  alt,
  loading = "lazy",
  decoding = "async",
  ...props
}: RemoteImageProps) {
  return <img alt={alt} loading={loading} decoding={decoding} {...props} />;
}
