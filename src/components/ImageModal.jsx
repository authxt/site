export default class ImageModal {
  constructor() {
    this.modalContainer = null;
    this.isOpen = false;
  }

  create(imageSrc) {
    // Create modal container if it doesn't exist
    if (!this.modalContainer) {
      this.modalContainer = document.createElement('div');
      this.modalContainer.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/95 opacity-0 transition-opacity duration-300 cursor-pointer';
      document.body.appendChild(this.modalContainer);

      const fileName = imageSrc.split('/').pop();

      // Create modal content
      this.modalContainer.innerHTML = `
        <div class="relative w-screen h-screen flex flex-col items-center justify-center">
          <p class="absolute top-6 left-0 w-full text-center text-xl text-purple-400">
            ${fileName}
          </p>
          <div class="w-full h-full px-4 flex items-center justify-center">
            <img
              src="${imageSrc}"
              alt="Full screen view"
              class="max-w-[95vw] max-h-[85vh] rounded-[2rem] object-contain"
            />
          </div>
          <div class="absolute bottom-8 left-0 w-full text-center">
            <p class="text-sm text-white/60 font-light tracking-wider">
              Click anywhere to dismiss
            </p>
          </div>
        </div>
      `;

      // Simple click handler to close modal
      this.modalContainer.addEventListener('click', () => this.close());

      // Trigger animation
      requestAnimationFrame(() => {
        this.modalContainer.style.opacity = '1';
      });
    }
  }

  close() {
    if (this.modalContainer) {
      this.modalContainer.style.opacity = '0';
      setTimeout(() => {
        this.modalContainer.remove();
        this.modalContainer = null;
      }, 300);
    }
  }
} 