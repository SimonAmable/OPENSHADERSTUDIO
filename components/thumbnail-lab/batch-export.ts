import JSZip from "jszip";
import type { ThumbnailJob } from "./types";
import { captureThumbnailBlob, downloadBlob } from "./capture";

export async function downloadThumbnailJobs(jobs: ThumbnailJob[], zipName: string) {
  const zip = new JSZip();
  const folder = zip.folder("previews");
  if (!folder) throw new Error("Could not create ZIP folder");

  for (const job of jobs) {
    const blob = await captureThumbnailBlob(job.recipe);
    folder.file(job.filename, blob);
  }

  const archive = await zip.generateAsync({ type: "blob" });
  downloadBlob(archive, zipName);
}

export async function downloadSingleJob(job: ThumbnailJob) {
  const blob = await captureThumbnailBlob(job.recipe);
  downloadBlob(blob, job.filename);
}
