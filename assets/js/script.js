(function () {
            const modal    = document.getElementById('subscribe-modal');
            const overlay  = document.getElementById('modal-overlay');
            const closeBtn = document.getElementById('modal-close');
            const form     = document.getElementById('subscribe-form');
            const formState = document.getElementById('modal-form-state');
            const success  = document.getElementById('modal-success');
            const triggers = document.querySelectorAll('[data-subscribe]');

            function openModal() {
                modal.removeAttribute('hidden');
                document.body.style.overflow = 'hidden';
                closeBtn.focus();
            }

            function closeModal() {
                modal.setAttribute('hidden', '');
                document.body.style.overflow = '';
                /* reset to form state for next open */
                formState.removeAttribute('hidden');
                success.setAttribute('hidden', '');
                form.reset();
            }

            triggers.forEach(t => t.addEventListener('click', e => {
                e.preventDefault();
                openModal();
            }));

            overlay.addEventListener('click', closeModal);
            closeBtn.addEventListener('click', closeModal);

            document.addEventListener('keydown', e => {
                if (e.key === 'Escape' && !modal.hasAttribute('hidden')) closeModal();
            });

            form.addEventListener('submit', e => {
                e.preventDefault();
                formState.setAttribute('hidden', '');
                success.removeAttribute('hidden');
                setTimeout(closeModal, 2800);
            });

            /* focus trap */
            modal.addEventListener('keydown', e => {
                if (e.key !== 'Tab') return;
                const focusable = Array.from(modal.querySelectorAll(
                    'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
                )).filter(el => !el.closest('[hidden]'));
                if (!focusable.length) return;
                const first = focusable[0];
                const last  = focusable[focusable.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault(); last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault(); first.focus();
                }
            });
        })();