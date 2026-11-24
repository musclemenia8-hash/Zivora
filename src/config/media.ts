/**
 * Centralized Media Asset Mapping — Zivora By Stuti.
 * Uploaded assets under /public/assets/aistudio/ are mapped to their exact sections.
 * Unuploaded slots retain graceful placeholders until provided.
 */
export const MEDIA_ASSETS = {
  // 1. Original Brand Logo
  logo: '/assets/aistudio/file_00000000d0908208815c9e0dc04e99ac_49e0b7ec.png',

  // 2–4. Luxury Banners (awaiting landscape banner uploads)
  banners: {
    banner1: '',
    banner2: '',
    banner3: '',
  },

  // 5–8. Main Showcase Videos (3 uploaded videos + 1 awaiting upload)
  mainVideos: [
    {
      id: 'main-video-1',
      label: 'Pearl Necklace Showcase',
      src: '/assets/aistudio/gemini_generated_video_59730a83_f0cf5db2.mp4',
    },
    {
      id: 'main-video-2',
      label: 'Timeless Pearl Watch Showcase',
      src: '/assets/aistudio/gemini_generated_video_8666357f_d28b5563.mp4',
    },
    {
      id: 'main-video-3',
      label: 'Floral Stone Necklace Set Showcase',
      src: '/assets/aistudio/gemini_generated_video_c9e25ba3_030efc38.mp4',
    },
    {
      id: 'main-video-4',
      label: 'Main Video 4',
      src: '',
    },
  ],

  // 9. Three editorial photographs after main videos (awaiting dedicated uploads)
  showcasePhotos: [
    {
      id: 'showcase-photo-1',
      label: 'Editorial Photograph 1',
      src: '',
    },
    {
      id: 'showcase-photo-2',
      label: 'Editorial Photograph 2',
      src: '',
    },
    {
      id: 'showcase-photo-3',
      label: 'Editorial Photograph 3',
      src: '',
    },
  ],

  // 10. Category video (awaiting upload)
  categoryVideo: '',

  // 11. Featured section video (awaiting upload)
  featuredVideo: '',

  // 12. Footer video (awaiting upload)
  footerVideo: '',
} as const;
