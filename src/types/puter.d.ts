declare global {
  interface Window {
    puter: {
      ai: {
        chat: (prompt: string) => Promise<string>;
        img2txt: (imageUrl: string) => Promise<string>;
        txt2speech: (text: string) => Promise<string>;
        txt2img: (prompt: string) => Promise<string>;
      };
    };
  }
}

export {}; 