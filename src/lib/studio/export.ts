import { toPng } from "html-to-image";
import { CREATIVE_HEIGHT, CREATIVE_WIDTH } from "@/components/studio/templates/ProjectCaseTemplate";

export async function exportNodeToPng(node: HTMLElement, filename: string) {
  await document.fonts.ready;

  const images = Array.from(node.querySelectorAll("img"));
  await Promise.all(
    images.map(
      (image) =>
        image.complete ||
        new Promise<void>((resolve) => {
          image.onload = () => resolve();
          image.onerror = () => resolve();
        }),
    ),
  );

  const dataUrl = await toPng(node, {
    cacheBust: true,
    pixelRatio: 1,
    width: CREATIVE_WIDTH,
    height: CREATIVE_HEIGHT,
    canvasWidth: CREATIVE_WIDTH,
    canvasHeight: CREATIVE_HEIGHT,
    backgroundColor: "#0F1115",
    style: {
      transform: "none",
      transformOrigin: "top left",
      width: `${CREATIVE_WIDTH}px`,
      height: `${CREATIVE_HEIGHT}px`,
    },
  });

  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
}
