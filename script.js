// Love Letter Content (Easily editable here)
        const loveLetterText = `Sayangku,\n\nTidak terasa waktu berjalan begitu cepat. Hari ini, 22 November 2026, kita merayakan empat tahun kebersamaan kita. Empat tahun yang penuh dengan tawa, pelukan hangat, dan perjalanan emosional yang membentuk kita menjadi seperti sekarang.\n\nTerima kasih karena selalu ada di sisiku, baik di saat-saat membahagiakan maupun saat hari-hari terasa berat. Kesabaran dan ketulusanmu adalah hadiah terindah dalam hidupku. Aku menyadari bahwa tidak ada hubungan yang sempurna, namun bersamamu, aku belajar untuk terus memperbaiki diri dan saling menguatkan.\n\nAku berharap ke depannya kita bisa terus tumbuh bersama, mewujudkan impian-impian kecil kita, dan saling menggenggam tangan melewati apapun dunia di hadapan kita. I love you, today, tomorrow, and always.`;

        // Gallery Photos Array for Lightbox
        const galleryPhotos = [
            { src: 'assets/images/foto1.jpg', title: 'Awal Perjalanan Kita', sub: 'November 2022 • Saat semuanya dimulai' },
            { src: 'assets/images/foto2.jpg', title: 'Tawa & Kebersamaan', sub: 'Tahun Kedua • Menemukan kebahagiaan sederhana' },
            { src: 'assets/images/foto3.jpg', title: 'Petualangan Berdua', sub: 'Tahun Ketiga • Menjelajah tempat baru' },
            { src: 'assets/images/foto4.jpg', title: 'Saling Menguatkan', sub: 'Melewati setiap tantangan bersama' },
            { src: 'assets/images/foto5.jpg', title: 'Senyum Manismu', sub: 'Hal yang paling kurindukan setiap hari' },
            { src: 'assets/images/foto6.jpg', title: 'Empat Tahun Bahagia', sub: 'November 2026 • Menuju masa depan' }
        ];

        let currentPhotoIndex = 0;
        let isAudioPlaying = false;

        // Floating Particles & Hearts Generator
        function createParticles() {
            const container = document.getElementById('particles-container');
            const particleCount = 25;
            const symbols = ['❤️', '✨', '🌸', '⭐', '💖'];

            for (let i = 0; i < particleCount; i++) {
                const el = document.createElement('div');
                el.className = 'particle';
                el.innerText = symbols[Math.floor(Math.random() * symbols.length)];
                el.style.left = Math.random() * 100 + 'vw';
                el.style.top = (Math.random() * 20 + 100) + 'vh';
                el.style.fontSize = (Math.random() * 12 + 10) + 'px';
                
                const duration = Math.random() * 10 + 8;
                const delay = Math.random() * 10;
                el.style.animationDuration = duration + 's';
                el.style.animationDelay = delay + 's';

                container.appendChild(el);
            }
        }

        // Cinematic Opening Handler
        document.getElementById('open-surprise-btn').addEventListener('click', function() {
            const overlay = document.getElementById('cinematic-overlay');
            const mainContent = document.getElementById('main-content');
            const musicWidget = document.getElementById('music-player-widget');

            overlay.style.opacity = '0';
            overlay.style.transform = 'scale(1.05)';
            setTimeout(() => {
                overlay.style.display = 'none';
                mainContent.style.opacity = '1';
                mainContent.style.pointerEvents = 'auto';
                musicWidget.classList.remove('hidden');
            }, 1000);

            // Start Audio
            playAudio();
        });

        // Audio Player Controls
        const audio = document.getElementById('bg-audio');
        const audioToggle = document.getElementById('audio-toggle');
        const audioIcon = document.getElementById('audio-icon');
        const audioStatus = document.getElementById('audio-status');
        const volumeSlider = document.getElementById('volume-slider');
        const muteToggle = document.getElementById('mute-toggle');
        const muteIcon = document.getElementById('mute-icon');

        function playAudio() {
            audio.play().then(() => {
                isAudioPlaying = true;
                audioIcon.className = 'fas fa-pause';
                audioStatus.innerText = 'Playing romantic melody';
            }).catch(e => {
                console.log("Audio autoplay prevented or file missing, fallback active.");
                audioStatus.innerText = 'Audio ready (Click to play)';
            });
        }

        audioToggle.addEventListener('click', () => {
            if (isAudioPlaying) {
                audio.pause();
                isAudioPlaying = false;
                audioIcon.className = 'fas fa-play';
                audioStatus.innerText = 'Music paused';
            } else {
                playAudio();
            }
        });

        volumeSlider.addEventListener('input', (e) => {
            audio.volume = e.target.value;
            if (audio.volume === 0) {
                muteIcon.className = 'fas fa-volume-xmark';
            } else {
                muteIcon.className = 'fas fa-volume-high';
            }
        });

        muteToggle.addEventListener('click', () => {
            if (audio.muted) {
                audio.muted = false;
                muteIcon.className = 'fas fa-volume-high';
            } else {
                audio.muted = true;
                muteIcon.className = 'fas fa-volume-xmark';
            }
        });

        // Lightbox Functions
        function openLightbox(index) {
            currentPhotoIndex = index;
            const lightbox = document.getElementById('lightbox');
            const img = document.getElementById('lightbox-img');
            const caption = document.getElementById('lightbox-caption');
            const sub = document.getElementById('lightbox-subcaption');

            const photo = galleryPhotos[index];
            img.src = photo.src;
            img.onerror = function() {
                this.src = `https://placehold.co/800x1000/18181f/C9A36B?text=Memory+${index+1}`;
            };
            caption.innerText = photo.title;
            sub.innerText = photo.sub;

            lightbox.classList.remove('hidden');
            lightbox.classList.add('flex');
        }

        function closeLightbox() {
            const lightbox = document.getElementById('lightbox');
            lightbox.classList.remove('flex');
            lightbox.classList.add('hidden');
        }

        function nextPhoto() {
            currentPhotoIndex = (currentPhotoIndex + 1) % galleryPhotos.length;
            openLightbox(currentPhotoIndex);
        }

        function prevPhoto() {
            currentPhotoIndex = (currentPhotoIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
            openLightbox(currentPhotoIndex);
        }

        // Keyboard navigation for Lightbox
        document.addEventListener('keydown', (e) => {
            const lightbox = document.getElementById('lightbox');
            if (!lightbox.classList.contains('hidden')) {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowRight') nextPhoto();
                if (e.key === 'ArrowLeft') prevPhoto();
            }
        });

        // Envelope & Letter Typewriter Animation
        let isLetterOpen = false;
        function openLoveLetter() {
            if (isLetterOpen) return;
            isLetterOpen = true;

            const envelopeClosed = document.getElementById('envelope-closed');
            const letterContent = document.getElementById('letter-content');
            const envelope = document.getElementById('envelope');

            envelopeClosed.style.display = 'none';
            letterContent.classList.remove('hidden');
            envelope.classList.add('envelope-open');

            // Typewriter Effect
            const typingContainer = document.getElementById('typing-text');
            typingContainer.innerHTML = '';
            let i = 0;
            const speed = 25; // typing speed ms

            function typeWriter() {
                if (i < loveLetterText.length) {
                    if (loveLetterText.charAt(i) === '\n') {
                        typingContainer.innerHTML += '<br>';
                    } else {
                        typingContainer.innerHTML += loveLetterText.charAt(i);
                    }
                    i++;
                    setTimeout(typeWriter, speed);
                }
            }
            typeWriter();
        }

        function resetLetter() {
            isLetterOpen = false;
            const envelopeClosed = document.getElementById('envelope-closed');
            const letterContent = document.getElementById('letter-content');
            const envelope = document.getElementById('envelope');

            letterContent.classList.add('hidden');
            envelopeClosed.style.display = 'block';
            envelope.classList.remove('envelope-open');
        }

        // Favorite Moments Toggle
        const momentStates = { 1: false, 2: false, 3: false };
        const momentFullTexts = {
            1: "Saat pertama kali kita tertawa bersama tanpa canggung. Aku tahu ada sesuatu yang berbeda darimu—seseorang yang membuat duniamu terasa jauh lebih hangat. Di detik itu, hatiku yakin bahwa kamu adalah seseorang yang ingin ku kenal lebih dalam.",
            2: "Setiap momen saat kita menghabiskan waktu berdua dalam kesunyian yang menenangkan. Tanpa kata pun, kita tahu bahwa kita saling melengkapi dan merasa aman dalam dekap satu sama lain. Kenangan sederhana yang menjadi harta paling berharga.",
            3: "Karena bersamamu, aku tidak perlu berpura-pura menjadi orang lain. Kamu menerima kekuranganku, merayakan kelebihanku, dan selalu menjadi alasan di balik senyumku setiap hari. Sampai kapan pun, pilihanku tetap sama: kamu."
        };

        function toggleMoment(id) {
            const descEl = document.getElementById(`moment-desc-${id}`);
            const btnEl = document.getElementById(`moment-btn-${id}`);

            momentStates[id] = !momentStates[id];
            if (momentStates[id]) {
                descEl.innerText = momentFullTexts[id] + " (Terima kasih telah membersamaiku selama 4 tahun penuh arti ini.)";
                btnEl.innerText = "Tutup Sembunyikan";
            } else {
                descEl.innerText = momentFullTexts[id].substring(0, 110) + "...";
                btnEl.innerText = "Baca Selengkapnya";
            }
        }

        // Back to top & Navbar scroll state
        const backToTopBtn = document.getElementById('back-to-top');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.remove('hidden');
                backToTopBtn.classList.add('flex');
            } else {
                backToTopBtn.classList.remove('flex');
                backToTopBtn.classList.add('hidden');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // README Modal handlers
        function openReadmeModal(e) {
            if (e) e.preventDefault();
            const modal = document.getElementById('readme-modal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }

        function closeReadmeModal() {
            const modal = document.getElementById('readme-modal');
            modal.classList.remove('flex');
            modal.classList.add('hidden');
        }

        // Initialize on load
        window.onload = function() {
            createParticles();
        };