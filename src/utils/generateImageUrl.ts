// filename = wedding_01
// format = jpg | webp
// option = c_fill,w_400

interface generateParmasType {
  filename: string;
  format: 'jpg' | 'webp';
  option?: string;
}
export default function generateImageUrl({
  filename,
  format,
  option = 'q_auto,c_fill',
}: generateParmasType) {
  return `https://res.cloudinary.com/dvbai14nq/image/upload/${option}/v1709401176/${format}/${filename}.${format}`;
}
