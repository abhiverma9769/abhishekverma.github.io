/**
 * contact.js — Form Validation & Submission
 */

'use strict';

const ContactForm = (() => {
  const rules = {
    name:    { min: 2,  message: 'Name must be at least 2 characters.' },
    email:   { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email address.' },
    subject: { min: 4,  message: 'Subject must be at least 4 characters.' },
    message: { min: 20, message: 'Message must be at least 20 characters.' },
  };

  function validate(field, value) {
    const rule = rules[field];
    if (!rule) return null;
    if (!value.trim()) return `${capitalize(field)} is required.`;
    if (rule.min && value.trim().length < rule.min) return rule.message;
    if (rule.pattern && !rule.pattern.test(value.trim())) return rule.message;
    return null;
  }

  function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  function setFieldState(input, error, isError) {
    input.classList.toggle('error', isError);
    const errEl = document.getElementById(`${input.id}-error`);
    if (errEl) {
      errEl.textContent = error || '';
      errEl.classList.toggle('visible', isError);
    }
  }

  function init() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // Live validation on blur
    form.querySelectorAll('.form-input, .form-textarea').forEach(input => {
      input.addEventListener('blur', () => {
        const err = validate(input.name, input.value);
        setFieldState(input, err, !!err);
      });
      input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
          const err = validate(input.name, input.value);
          setFieldState(input, err, !!err);
        }
      });
    });

    form.addEventListener('submit', async e => {
      e.preventDefault();

      let hasErrors = false;
      const data = {};

      form.querySelectorAll('.form-input, .form-textarea').forEach(input => {
        const err = validate(input.name, input.value);
        if (err) {
          setFieldState(input, err, true);
          hasErrors = true;
        } else {
          setFieldState(input, null, false);
          data[input.name] = input.value.trim();
        }
      });

      if (hasErrors) return;

      // Disable submit & show spinner
      const submitBtn = form.querySelector('[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<svg class="spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Sending…`;

      try {
        // ── Formspree Integration ──────────────────────────────────────
        // Sign up free at https://formspree.io → create form → paste your form ID below
        // Replace 'YOUR_FORM_ID' with the ID from Formspree dashboard (e.g. 'xpzvqkab')
        const FORMSPREE_ID = 'mreraoop';
        const endpoint = `https://formspree.io/f/${FORMSPREE_ID}`;

        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            name:    data.name,
            email:   data.email,
            subject: data.subject,
            message: data.message,
            _subject: `Portfolio Contact: ${data.subject}`,
          }),
        });

        if (res.ok) {
          form.reset();
          if (window.showToast) {
            window.showToast('Message sent! I\'ll reply within 24 hours. 🎉', 'success');
          }
        } else {
          const json = await res.json().catch(() => ({}));
          throw new Error(json?.error || 'Server error');
        }

      } catch (err) {
        console.error('Form submission error:', err);
        if (window.showToast) {
          window.showToast('Failed to send. Please email me directly at abhiverma9769@gmail.com', 'error');
        }
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => ContactForm.init());
