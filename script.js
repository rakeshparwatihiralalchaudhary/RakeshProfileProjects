console.log("Portfolio loaded ✅");

// Hamburger menu toggle (appended)
document.addEventListener('DOMContentLoaded', function () {
	const navToggle = document.getElementById('nav-toggle');
	const navLinks = document.getElementById('nav-links');

	if (navToggle) {
		navToggle.addEventListener('click', function () {
			navLinks.classList.toggle('active');
			navToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
		});

		// Close menu when a link is clicked
		const navItems = navLinks.querySelectorAll('a');
		navItems.forEach(link => {
			link.addEventListener('click', function () {
				navLinks.classList.remove('active');
				navToggle.textContent = '☰';
			});
		});
	}
});

// Contact form handling (appended)
document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('contact-form');
	const success = document.getElementById('contact-success');
	const contactSection = document.querySelector('.contact-section');

	if (contactSection) {
		// Reveal with fade-in
		requestAnimationFrame(() => contactSection.classList.add('visible'));
	}

	if (!form) return;

	form.addEventListener('submit', function (e) {
		e.preventDefault();

		// HTML5 required fields handle basic validation
		const fullName = form.fullName.value.trim();
		const email = form.email.value.trim();
		const subject = form.subject.value;
		const message = form.message.value.trim();

		const data = { fullName, email, subject, message };
		console.log('Contact form submitted:', data);

		// Show success and hide form
		form.style.display = 'none';
		if (success) {
			success.hidden = false;
		}
	});
});

// === THEME SYSTEM ===
(function () {
	const storageKey = 'rakesh-theme';
	const body = document.body;
	const toggle = document.getElementById('theme-toggle');

	const applyTheme = (theme) => {
		body.setAttribute('data-theme', theme);
		toggle.setAttribute('aria-label', theme === 'dark' ? 'Activate light theme' : 'Activate dark theme');
		toggle.setAttribute('aria-pressed', theme === 'dark');
		toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
		localStorage.setItem(storageKey, theme);
	};

	const initTheme = () => {
		const saved = localStorage.getItem(storageKey);
		if (saved === 'dark' || saved === 'light') {
			applyTheme(saved);
		} else {
			applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
		}
	};

	if (toggle) {
		toggle.addEventListener('click', () => {
			applyTheme(body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
		});
	}

	initTheme();
})();

// === SCROLL PROGRESS BAR ===
(function () {
	const progress = document.createElement('div');
	progress.className = 'page-progress';
	document.body.appendChild(progress);

	window.addEventListener('scroll', () => {
		const scrollFraction = Math.min(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight), 1);
		progress.style.width = `${scrollFraction * 100}%`;
	});
})();

// === REVEAL ON SCROLL ===
(function () {
	const reveals = document.querySelectorAll('.reveal, .skill-card, .project-card, .timeline-item, .highlight-card, .contact-card, .contact-form-wrap, .footer-column');
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observer.unobserve(entry.target);
			}
		});
	}, {
		threshold: 0.18,
	});

	reveals.forEach((node) => observer.observe(node));
})();

// === NAV SHRINK ===
(function () {
	const nav = document.querySelector('.site-nav');
	if (!nav) return;
	window.addEventListener('scroll', () => {
		nav.classList.toggle('shrink', window.scrollY > 24);
	});
})();

// === ABOUT STATS COUNTERS ===
(function () {
	const counters = document.querySelectorAll('.counter');
	const observer = new IntersectionObserver((entries, obs) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;
			const counter = entry.target;
			const target = Number(counter.dataset.target) || 0;
			let current = 0;
			const step = Math.max(1, Math.round(target / 50));
			const interval = setInterval(() => {
				current += step;
				counter.textContent = current > target ? target : current;
				if (current >= target) {
					counter.textContent = target;
					clearInterval(interval);
				}
			}, 16);
			obs.unobserve(counter);
		});
	}, { threshold: 0.5 });

	counters.forEach((counter) => observer.observe(counter));
})();

// === PAGE LOAD SPLASH ===
(function () {
	const splash = document.createElement('div');
	splash.className = 'splash-screen';
	splash.innerHTML = '<p>Loading Rakesh Chaudhary — Enterprise Portfolio</p>';
	document.body.appendChild(splash);

	window.addEventListener('load', () => {
		requestAnimationFrame(() => {
			splash.style.opacity = '0';
			splash.style.transition = 'opacity var(--dur) var(--ease)';
		});
		setTimeout(() => {
			document.body.removeChild(splash);
		}, 500);
	});
})();

