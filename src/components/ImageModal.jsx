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
        <div class="relative w-screen h-screen flex items-center justify-center p-4">
          <p class="absolute top-6 left-0 w-full text-center text-2xl font-medium text-purple-400">
            ${fileName}
          </p>
          <div class="transform scale-90 transition-all duration-300 w-full h-full flex items-center justify-center">
            <img
              src="${imageSrc}"
              alt="Full screen view"
              class="max-w-[95vw] max-h-[85vh] rounded-[2rem] object-contain"
            />
          </div>
          <p class="absolute bottom-6 left-0 w-full text-center text-sm text-white/60 font-light tracking-wide">
            Click anywhere to dismiss
          </p>
        </div>
      `;

      // Simple click handler to close modal
      this.modalContainer.addEventListener('click', () => this.close());

      // Get the content container for animation
      const contentContainer = this.modalContainer.querySelector('div > div:nth-child(2)');

      // Trigger animation after a brief delay
      requestAnimationFrame(() => {
        this.modalContainer.style.opacity = '1';
        contentContainer.style.transform = 'scale(1)';
      });
    }
  }

  close() {
    if (this.modalContainer) {
      this.modalContainer.style.opacity = '0';
      const contentContainer = this.modalContainer.querySelector('div > div:nth-child(2)');
      contentContainer.style.transform = 'scale(0.9)';
      
      setTimeout(() => {
        this.modalContainer.remove();
        this.modalContainer = null;
      }, 300);
    }
  }
} 