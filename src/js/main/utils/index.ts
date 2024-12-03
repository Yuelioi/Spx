export function imageLoadError(event: Event) {
  const target = event.target as HTMLImageElement;
  if (target) {
    target.style.display = "none";
  }
}
