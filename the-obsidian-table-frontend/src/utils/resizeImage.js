// Restaurant photos are used both as small square card thumbnails (~250-320px)
// and as the large hero carousel on the restaurant page (~1600px on a retina
// display at desktop widths). We size for the larger case: browsers can shrink
// an oversized image for the thumbnail with no quality loss, but can't sharpen
// an undersized one back up for the carousel.
const MAX_DIMENSION = 1600;
const TARGET_MAX_BYTES = 2 * 1024 * 1024; // 2MB
const PRIMARY_QUALITY = 0.82;
const FALLBACK_QUALITY = 0.65;

function canvasToBlob(canvas, type, quality) {
	return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

export async function resizeImageForUpload(file) {
	if (!file.type.startsWith("image/") || file.type === "image/svg+xml") {
		return file;
	}

	let bitmap;
	try {
		bitmap = await createImageBitmap(file);
	} catch {
		// Unsupported format for this browser - upload as-is.
		return file;
	}

	const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
	const width = Math.round(bitmap.width * scale);
	const height = Math.round(bitmap.height * scale);

	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	canvas.getContext("2d").drawImage(bitmap, 0, 0, width, height);
	bitmap.close?.();

	// Try WebP first - typically 25-35% smaller than JPEG at equivalent quality.
	let blob = await canvasToBlob(canvas, "image/webp", PRIMARY_QUALITY);
	let ext = "webp";

	if (!blob || blob.type !== "image/webp") {
		// Browser can't encode WebP - fall back to JPEG.
		blob = await canvasToBlob(canvas, "image/jpeg", PRIMARY_QUALITY);
		ext = "jpg";
	}

	if (blob && blob.size > TARGET_MAX_BYTES) {
		const smaller = await canvasToBlob(canvas, ext === "webp" ? "image/webp" : "image/jpeg", FALLBACK_QUALITY);
		if (smaller) blob = smaller;
	}

	if (!blob || blob.size >= file.size) {
		return file; // encoding failed or didn't actually help - keep the original
	}

	const newName = file.name.replace(/\.[^.]+$/, "") + "." + ext;
	return new File([blob], newName, { type: blob.type });
}
