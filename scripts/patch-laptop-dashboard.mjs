import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "../assets/lottie/platform-web-dashboard.json");

const j = JSON.parse(fs.readFileSync(filePath, "utf8"));
const comp = j.assets.find((a) => a.id === "comp_0");
const layer = comp.layers.find((l) => l.nm === "Shape Layer 3");
if (!layer) throw new Error("Shape Layer 3 not found");

layer.shapes = layer.shapes.filter((s) => !String(s.nm ?? "").startsWith("dash "));

const rgb = (r, g, b) => [r / 255, g / 255, b / 255, 1];

function rectGr(name, x0, y0, x1, y1, color, ix) {
  return {
    ty: "gr",
    it: [
      {
        ind: 0,
        ty: "sh",
        ix: 1,
        ks: {
          a: 0,
          k: {
            i: [
              [0, 0],
              [0, 0],
              [0, 0],
              [0, 0],
            ],
            o: [
              [0, 0],
              [0, 0],
              [0, 0],
              [0, 0],
            ],
            v: [
              [x0, y0],
              [x1, y0],
              [x1, y1],
              [x0, y1],
            ],
            c: true,
          },
        },
        nm: "Path 1",
        mn: "ADBE Vector Shape - Group",
        hd: false,
      },
      {
        ty: "fl",
        c: { a: 0, k: color, ix: 4 },
        o: { a: 0, k: 100, ix: 5 },
        r: 1,
        nm: "Fill 1",
        mn: "ADBE Vector Graphic - Fill",
        hd: false,
      },
      {
        ty: "tr",
        p: { a: 0, k: [0, 0], ix: 2 },
        a: { a: 0, k: [0, 0], ix: 1 },
        s: { a: 0, k: [100, 100], ix: 3 },
        r: { a: 0, k: 0, ix: 6 },
        o: { a: 0, k: 100, ix: 7 },
        sk: { a: 0, k: 0, ix: 4 },
        sa: { a: 0, k: 0, ix: 5 },
        nm: "Transform",
      },
    ],
    nm: name,
    np: 3,
    cix: 2,
    ix,
    mn: "ADBE Vector Group",
    hd: false,
  };
}

const C = { x: -248, y: 12 };
let ix = 10;
const nextIx = () => ix++;

const dash = [
  rectGr("dash panel", C.x - 118, C.y - 92, C.x + 118, C.y + 92, rgb(236, 239, 244), nextIx()),
  rectGr("dash sidebar", C.x - 118, C.y - 92, C.x - 78, C.y + 92, rgb(52, 69, 98), nextIx()),
  rectGr("dash topbar", C.x - 74, C.y - 88, C.x + 114, C.y - 72, rgb(255, 255, 255), nextIx()),
  rectGr("dash search", C.x - 70, C.y - 86, C.x - 24, C.y - 74, rgb(220, 224, 230), nextIx()),
  rectGr("dash card", C.x - 70, C.y - 64, C.x + 32, C.y - 8, rgb(255, 255, 255), nextIx()),
  rectGr("dash card accent", C.x - 66, C.y - 60, C.x - 24, C.y - 28, rgb(100, 149, 237), nextIx()),
  rectGr("dash chart", C.x - 70, C.y + 2, C.x + 110, C.y + 86, rgb(255, 255, 255), nextIx()),
];

const baseY = C.y + 78;
const bars = [
  { x0: -58, x1: -48, h: 38, color: rgb(136, 96, 208) },
  { x0: -42, x1: -32, h: 52, color: rgb(85, 25, 139) },
  { x0: -26, x1: -16, h: 28, color: rgb(9, 211, 172) },
  { x0: -10, x1: 0, h: 44, color: rgb(100, 149, 237) },
  { x0: 6, x1: 16, h: 34, color: rgb(136, 96, 208) },
];
for (const b of bars) {
  dash.push(
    rectGr("dash bar", C.x + b.x0, baseY - b.h, C.x + b.x1, baseY, b.color, nextIx()),
  );
}

layer.shapes.push(...dash);
fs.writeFileSync(filePath, JSON.stringify(j));
console.log("OK: dashboard groups:", dash.length, "total shapes:", layer.shapes.length);
