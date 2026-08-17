/**
 * CyberPhishy - Feedback Custom Dropdown Animation & Form Synchronization
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('custom-category-select');
  if (!container) return;

  const trigger = container.querySelector('.custom-select-trigger');
  const selectedText = trigger.querySelector('.selected-value');
  const options = container.querySelectorAll('.custom-option');
  const hiddenInput = document.getElementById('feedback-category-input');

  // Toggle Dropdown Menu Open/Close
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = container.classList.toggle('open');
    trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Select Option Click Handler
  options.forEach((option) => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();

      // Remove selected class from others and mark current
      options.forEach((opt) => opt.classList.remove('selected'));
      option.classList.add('selected');

      // Update displayed label and hidden form input
      selectedText.textContent = option.textContent.trim();
      selectedText.classList.remove('placeholder');
      hiddenInput.value = option.getAttribute('data-value');

      // Smoothly close menu
      container.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close when clicking anywhere outside
  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
      container.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && container.classList.contains('open')) {
      container.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.focus();
    }
  });
});
