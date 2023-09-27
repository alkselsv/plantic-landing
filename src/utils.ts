export default function useAssets() {
  const videos = import.meta.globEager('/src/assets/rust-*.mp4');

  return {
    rustEn: videos['/src/assets/rust-en.mp4'].default,
    rustRu: videos['/src/assets/rust-ru.mp4'].default,
    videos,
  };
}
