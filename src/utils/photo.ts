const AVATAR_SIZE = 512;
const MAX_FILE_BYTES = 10 * 1024 * 1024;

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('לא ניתן לקרוא את הקובץ'));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('לא ניתן לטעון את התמונה, נסו קובץ אחר'));
    img.src = src;
  });
}

export async function createCircularAvatar(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) throw new Error('יש להעלות קובץ תמונה');
  if (file.size > MAX_FILE_BYTES) throw new Error('התמונה גדולה מדי (עד 10MB)');

  const img = await loadImage(await readAsDataUrl(file));
  const canvas = document.createElement('canvas');
  canvas.width = AVATAR_SIZE;
  canvas.height = AVATAR_SIZE;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('הדפדפן אינו תומך בעיבוד תמונות');

  const side = Math.min(img.naturalWidth, img.naturalHeight);
  const sx = (img.naturalWidth - side) / 2;
  const sy = (img.naturalHeight - side) / 2;
  const radius = AVATAR_SIZE / 2;
  ctx.beginPath();
  ctx.arc(radius, radius, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(img, sx, sy, side, side, 0, 0, AVATAR_SIZE, AVATAR_SIZE);
  return canvas.toDataURL('image/png');
}
