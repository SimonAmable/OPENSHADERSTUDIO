import type { ReactNode } from "react";
import type { MockupChromeTheme } from "./types";

export const BROWSER_CHROME_BASE_HEIGHT = 44;

type BrowserChromeThemeColors = {
  bar: string;
  border: string;
  address: string;
  icon: string;
  iconDisabled: string;
  addressBorder: string;
};

export function getBrowserChromeThemeColors(theme: MockupChromeTheme): BrowserChromeThemeColors {
  switch (theme) {
    case "dark":
      return {
        bar: "#323234",
        border: "#1c1c1e",
        address: "#1c1c1e",
        icon: "#ebebf0",
        iconDisabled: "#636366",
        addressBorder: "rgba(255,255,255,.06)",
      };
    case "glass":
      return {
        bar: "rgba(255,255,255,.72)",
        border: "rgba(0,0,0,.08)",
        address: "rgba(255,255,255,.55)",
        icon: "#3c3c43",
        iconDisabled: "#9a9aa0",
        addressBorder: "rgba(0,0,0,.06)",
      };
    case "light":
    default:
      return {
        bar: "#f6f6f6",
        border: "#d1d1d6",
        address: "#ececee",
        icon: "#3c3c43",
        iconDisabled: "#c7c7cc",
        addressBorder: "rgba(0,0,0,.05)",
      };
  }
}

const ICON = {
  stroke: "currentColor",
  fill: "none",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function BrowserIcon({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={className ? `browser-icon ${className}` : "browser-icon"} aria-hidden="true">
      <svg viewBox="0 0 16 16" width="16" height="16">{children}</svg>
    </span>
  );
}

export function SafariBrowserBar({ hidden = false, theme = "light" }: { hidden?: boolean; theme?: MockupChromeTheme }) {
  return (
    <div className={`browser-bar browser-bar--${theme}`} aria-hidden={hidden}>
      <div className="browser-leading">
        <div className="browser-traffic" aria-hidden="true">
          <span className="browser-dot browser-dot--close" />
          <span className="browser-dot browser-dot--minimize" />
          <span className="browser-dot browser-dot--zoom" />
        </div>
        <div className="browser-nav">
          <BrowserIcon>
            <rect x="2.5" y="3.5" width="11" height="9" rx="1.2" {...ICON} />
            <path d="M5.5 3.5v9" {...ICON} />
          </BrowserIcon>
          <BrowserIcon>
            <path d="M9.5 4.5 5.5 8l4 3.5" {...ICON} />
          </BrowserIcon>
          <BrowserIcon className="is-disabled">
            <path d="M6.5 4.5 10.5 8l-4 3.5" {...ICON} />
          </BrowserIcon>
        </div>
      </div>
      <div className="browser-address" aria-hidden="true">
        <BrowserIcon className="browser-shield">
          <path d="M8 2.25 4.25 3.75v3.1c0 2.45 1.6 4.74 3.75 5.4 2.15-.66 3.75-2.95 3.75-5.4v-3.1L8 2.25z" {...ICON} />
        </BrowserIcon>
        <BrowserIcon className="browser-refresh">
          <path d="M11.25 4.75a4 4 0 1 0 .9 3.1" {...ICON} />
          <path d="M11.25 2.75v2h-2" {...ICON} />
        </BrowserIcon>
      </div>
      <div className="browser-actions">
        <BrowserIcon>
          <circle cx="8" cy="8" r="5.25" {...ICON} />
          <path d="M8 5.5v4.25M6.25 8.75 8 10.5l1.75-1.75" {...ICON} />
        </BrowserIcon>
        <BrowserIcon>
          <rect x="4.75" y="8.75" width="6.5" height="4.75" rx="1" {...ICON} />
          <path d="M8 8.5V3.75M5.75 6 8 3.5 10.25 6" {...ICON} />
        </BrowserIcon>
        <BrowserIcon>
          <path d="M8 4.25v7.5M4.25 8h7.5" {...ICON} />
        </BrowserIcon>
        <BrowserIcon>
          <rect x="2.75" y="5.25" width="6.25" height="6.25" rx="1" {...ICON} />
          <rect x="5.75" y="2.75" width="6.25" height="6.25" rx="1" {...ICON} />
        </BrowserIcon>
      </div>
    </div>
  );
}

type SafariChromeBounds = {
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
};

function strokeIcon(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string,
  draw: (context: CanvasRenderingContext2D, scale: number) => void,
) {
  context.save();
  context.translate(x, y);
  context.strokeStyle = color;
  context.fillStyle = "transparent";
  context.lineWidth = 1.05;
  context.lineCap = "round";
  context.lineJoin = "round";
  draw(context, size / 16);
  context.restore();
}

export function drawSafariBrowserChrome(
  context: CanvasRenderingContext2D,
  bounds: SafariChromeBounds,
  theme: MockupChromeTheme = "light",
) {
  const { x: barLeft, y: barTop, width, height: bar, radius } = bounds;
  const centerY = barTop + bar / 2;
  const colors = getBrowserChromeThemeColors(theme);
  const iconSize = Math.max(11, bar * 0.34);

  context.fillStyle = colors.bar;
  context.beginPath();
  context.roundRect(barLeft, barTop, width, bar, [radius, radius, 0, 0]);
  context.fill();

  context.strokeStyle = colors.border;
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(barLeft, barTop + bar - 0.5);
  context.lineTo(barLeft + width, barTop + bar - 0.5);
  context.stroke();

  const lightRadius = Math.max(4.8, bar * 0.13);
  [
    { color: "#ff5f57", x: barLeft + 14 },
    { color: "#febc2e", x: barLeft + 30 },
    { color: "#28c840", x: barLeft + 46 },
  ].forEach(({ color, x }) => {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, centerY, lightRadius, 0, Math.PI * 2);
    context.fill();
    context.strokeStyle = "rgba(0,0,0,.12)";
    context.lineWidth = 0.75;
    context.stroke();
  });

  let iconX = barLeft + 64;
  const iconGap = Math.max(12, bar * 0.28);
  strokeIcon(context, iconX, centerY - iconSize / 2, iconSize, colors.icon, (ctx, scale) => {
    ctx.beginPath();
    ctx.roundRect(2.5 * scale, 3.5 * scale, 11 * scale, 9 * scale, 1.2 * scale);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(5.5 * scale, 3.5 * scale);
    ctx.lineTo(5.5 * scale, 12.5 * scale);
    ctx.stroke();
  });
  iconX += iconGap;
  strokeIcon(context, iconX, centerY - iconSize / 2, iconSize, colors.icon, (ctx, scale) => {
    ctx.beginPath();
    ctx.moveTo(9.5 * scale, 4.5 * scale);
    ctx.lineTo(5.5 * scale, 8 * scale);
    ctx.lineTo(9.5 * scale, 11.5 * scale);
    ctx.stroke();
  });
  iconX += iconGap;
  strokeIcon(context, iconX, centerY - iconSize / 2, iconSize, colors.iconDisabled, (ctx, scale) => {
    ctx.beginPath();
    ctx.moveTo(6.5 * scale, 4.5 * scale);
    ctx.lineTo(10.5 * scale, 8 * scale);
    ctx.lineTo(6.5 * scale, 11.5 * scale);
    ctx.stroke();
  });

  const addressHeight = Math.max(22, bar * 0.62);
  const addressWidth = Math.min(width * 0.52, width - 180);
  const addressX = barLeft + (width - addressWidth) / 2;
  const addressY = barTop + (bar - addressHeight) / 2;

  context.fillStyle = colors.address;
  context.beginPath();
  context.roundRect(addressX, addressY, addressWidth, addressHeight, addressHeight / 2);
  context.fill();
  context.strokeStyle = colors.addressBorder;
  context.lineWidth = 0.75;
  context.stroke();

  strokeIcon(context, addressX + 10, centerY - iconSize / 2, iconSize, colors.icon, (ctx, scale) => {
    ctx.beginPath();
    ctx.moveTo(8 * scale, 2.25 * scale);
    ctx.lineTo(4.25 * scale, 3.75 * scale);
    ctx.lineTo(4.25 * scale, 6.85 * scale);
    ctx.quadraticCurveTo(4.25 * scale, 9.3 * scale, 8 * scale, 12.5 * scale);
    ctx.quadraticCurveTo(11.75 * scale, 9.3 * scale, 11.75 * scale, 6.85 * scale);
    ctx.lineTo(11.75 * scale, 3.75 * scale);
    ctx.closePath();
    ctx.stroke();
  });

  strokeIcon(context, addressX + addressWidth - iconSize - 10, centerY - iconSize / 2, iconSize * 0.9, colors.icon, (ctx, scale) => {
    ctx.beginPath();
    ctx.arc(8 * scale, 8 * scale, 4 * scale, Math.PI * 0.9, Math.PI * 2.1);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(11.25 * scale, 2.75 * scale);
    ctx.lineTo(11.25 * scale, 4.75 * scale);
    ctx.lineTo(9.25 * scale, 4.75 * scale);
    ctx.stroke();
  });

  let rightX = barLeft + width - 14;
  const rightGap = Math.max(13, bar * 0.3);
  [
    (ctx: CanvasRenderingContext2D, scale: number) => {
      ctx.beginPath();
      ctx.arc(8 * scale, 8 * scale, 5.25 * scale, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(8 * scale, 5.5 * scale);
      ctx.lineTo(8 * scale, 9.75 * scale);
      ctx.moveTo(6.25 * scale, 8.75 * scale);
      ctx.lineTo(8 * scale, 10.5 * scale);
      ctx.lineTo(9.75 * scale, 8.75 * scale);
      ctx.stroke();
    },
    (ctx: CanvasRenderingContext2D, scale: number) => {
      ctx.beginPath();
      ctx.roundRect(4.75 * scale, 8.75 * scale, 6.5 * scale, 4.75 * scale, 1 * scale);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(8 * scale, 8.5 * scale);
      ctx.lineTo(8 * scale, 3.75 * scale);
      ctx.moveTo(5.75 * scale, 6 * scale);
      ctx.lineTo(8 * scale, 3.5 * scale);
      ctx.lineTo(10.25 * scale, 6 * scale);
      ctx.stroke();
    },
    (ctx: CanvasRenderingContext2D, scale: number) => {
      ctx.beginPath();
      ctx.moveTo(8 * scale, 4.25 * scale);
      ctx.lineTo(8 * scale, 11.75 * scale);
      ctx.moveTo(4.25 * scale, 8 * scale);
      ctx.lineTo(11.75 * scale, 8 * scale);
      ctx.stroke();
    },
    (ctx: CanvasRenderingContext2D, scale: number) => {
      ctx.beginPath();
      ctx.roundRect(2.75 * scale, 5.25 * scale, 6.25 * scale, 6.25 * scale, 1 * scale);
      ctx.stroke();
      ctx.beginPath();
      ctx.roundRect(5.75 * scale, 2.75 * scale, 6.25 * scale, 6.25 * scale, 1 * scale);
      ctx.stroke();
    },
  ].reverse().forEach((draw) => {
    strokeIcon(context, rightX - iconSize, centerY - iconSize / 2, iconSize, colors.icon, draw);
    rightX -= rightGap;
  });
}
