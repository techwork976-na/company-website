import { ImageResponse } from "next/og";
import { palette } from "@/lib/tokens";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: palette.ink,
        }}
      >
        <svg width="112" height="112" viewBox="0 0 24 24" fill={palette.surface}>
          <rect x="4" y="3" width="5" height="18" />
          <path d="M9 3a4.5 4.5 0 0 1 0 9z" />
          <path d="M9 11a5 5 0 0 1 0 10z" />
        </svg>
      </div>
    ),
    size,
  );
}
