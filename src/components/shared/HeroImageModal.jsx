import React from 'react';

class HeroImageModal {
  constructor() {
    this.modalContainer = null;
  }

  create(imageSrc) {
    // Remove any existing modal
    this.remove();

    // Get image name from src
    const imageName = imageSrc.split('/').pop();

    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4';
    
    // Create title
    const title = document.createElement('div');
    title.className = 'text-gray-300 mb-4 text-sm font-bold text-purple-400';
    title.textContent = imageName;
    
    // Create image container
    const imageContainer = document.createElement('div');
    imageContainer.className = 'relative rounded-3xl overflow-hidden max-w-screen-lg mx-auto';
    
    // Create image
    const img = document.createElement('img');
    img.src = imageSrc;
    img.className = 'max-h-[80vh] w-auto object-contain';
    
    // Create dismiss text
    const dismissText = document.createElement('div');
    dismissText.className = 'text-gray-400 mt-4 text-sm';
    dismissText.textContent = 'Click anywhere to dismiss';

    // Add click handler
    const closeModal = () => this.remove();
    modal.addEventListener('click', closeModal);
    
    // Add escape key handler
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleEscape);
    
    // Assemble and show modal
    imageContainer.appendChild(img);
    modal.appendChild(title);
    modal.appendChild(imageContainer);
    modal.appendChild(dismissText);
    document.body.appendChild(modal);
    this.modalContainer = modal;
    
    // Store cleanup function
    this.cleanup = () => {
      modal.removeEventListener('click', closeModal);
      document.removeEventListener('keydown', handleEscape);
    };
  }

  remove() {
    if (this.modalContainer) {
      // Clean up event listeners
      if (this.cleanup) {
        this.cleanup();
        this.cleanup = null;
      }
      
      // Remove modal
      this.modalContainer.remove();
      this.modalContainer = null;
    }
  }
}

export default HeroImageModal; 