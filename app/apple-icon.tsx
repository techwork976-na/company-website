import { ImageResponse } from "next/og";
import { palette } from "@/lib/tokens";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: palette.violet }}>
      <svg width="180" height="180" viewBox="0 0 32 32">
        <rect x="8" y="8" width="4.5" height="16" rx="1.2" fill={palette.white} />
        <rect x="19.5" y="8" width="4.5" height="16" rx="1.2" fill={palette.white} />
        <path d="M8 8h4.5L24 24h-4.5z" fill={palette.lime} />
      </svg>
    </div>,
    size,
  );
}
