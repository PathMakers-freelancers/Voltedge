document.addEventListener('DOMContentLoaded', () => {
    const rtlBtn = document.getElementById('rtl-btn');
    const html = document.documentElement;

    // Check saved preference
    const savedDir = localStorage.getItem('dir');
    if (savedDir) {
        html.setAttribute('dir', savedDir);
        updateRTLIcon(savedDir);
    }

    if (rtlBtn) {
        rtlBtn.addEventListener('click', () => {
            const currentDir = html.getAttribute('dir');
            const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';

            html.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
            updateRTLIcon(newDir);
        });
    }

    function updateRTLIcon(dir) {
        if (rtlBtn) {
            // rtlBtn.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
            // Keeping symbol static as per user request
        }
    }
});
