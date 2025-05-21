// Danh sách lời chúc
const wishes = [
    "Mỗi ngày mới là 1 ngày vui !",
    "Luôn xinh đẹp và rạng rỡ!",
    "Kiếm được nhiều xiền ha!",
    " Giữ mãi sự xink đẹp !",
    "Nhiều may mắn !",
    "Nhiều sức khỏe",
    "Nhiều giai theo ",
    "Mừng sinh nhật Thị Ngân tuổi 22 !"
];

// Danh sách ảnh và lời chúc mặt sau
const photos = [
    {
       image: "image/asset/mungsn1.jpg",
        message: "A long time ago haha!"
    },
    {
        image: "image/asset/mungsn2.png",
        message: "Ôi 1004 !"
    },
    {
        image: "image/asset/mungsn3.png",
        message: "Đẹp giai chưa !"
    },
    {
        image: "image/asset/mungsn4.png",
        message: "Tấm này ngầu vch !"
    },
    {
        image: "image/asset/mungsn5.jpg",
        message: "Chắc không nhớ tấm này !"
    },
    {
        image: "image/asset/mungsn6.png",
        message: "Trông quạo vch!"
    },
    {
        image: "image/asset/mungsn7.png",
        message: "Choáy choáy!!"
    },
    {
        image: "image/asset/mungsn8.jpg",
        message: "Oh a princess!"
    },
    {
        image: "image/asset/mungsn9.png",
        message: "Alime girl ha !"
    },
    {
        image: "image/asset/mungsn11.png",
        message: "Alime girl ha !"
    },
    {
       image: "image/asset/mungsn12.png",
        message: "WoW !"
    },
    {
      image: "image/asset/mungsn13.png",
        message: "Chụp ảnh đồ , nghệ nghệ !"
    },
    
     {
       image: "image/asset/mungsn15.png",
        message: "Ngân của ngày hôm qua !"
    },
     {
       image: "image/asset/mungsn16.png",
        message: "Ừ thì lượn lờ làm quen !"
    }
];

// Các hàm sẽ được khởi chạy khi trang đã load xong
document.addEventListener('DOMContentLoaded', function() {
    // Tạo các hộp quà
    createGiftBoxes();
    
    // Tạo slider ảnh
    createPhotoSlider();

    // Khởi tạo các sự kiện các nút
    setupButtonEvents();
    
    // Tạo các ngôi sao nền
    createFloatingStars();
    
    // Cập nhật slider
    updateSlider();
    
    // Xử lý responsive
    handleResponsive();
    
    // Thêm sự kiện resize
    window.addEventListener('resize', handleResponsive);
});

// Biến toàn cục cho slider
let currentSlide = 0;
const slidesPerView = 3; // Số ảnh hiển thị cùng lúc

// Tạo các hộp quà
function createGiftBoxes() {
    const giftContainer = document.getElementById('giftContainer');
    const giftSound = document.getElementById('giftSound');
    const confettiSound = document.getElementById('confettiSound');
    
    wishes.forEach((wish, index) => {
        const giftBox = document.createElement('div');
        giftBox.className = 'gift-box';
        giftBox.dataset.wish = wish;
        
        // Tạo tooltip lời chúc
        const wishText = document.createElement('div');
        wishText.className = 'wish-text';
        wishText.textContent = wish;
        
        giftBox.appendChild(wishText);
        
        // Sự kiện click
        giftBox.addEventListener('click', function() {
            giftSound.currentTime = 0;
            giftSound.play();
            
            // Hiển thị lời chúc
            wishText.style.display = 'block';
            wishText.style.left = '50%';
            wishText.style.transform = 'translateX(-50%)';
            wishText.style.bottom = '100%';
            
            // Tạo hiệu ứng pháo giấy
            createConfetti(this);
            confettiSound.currentTime = 0;
            confettiSound.play();
            
            // Ẩn hộp quà sau 1 giây
            setTimeout(() => {
                this.style.opacity = '0';
                this.style.transform = 'scale(0)';
                
                // Sau khi ẩn, đặt lại để có thể click lại
                setTimeout(() => {
                    this.style.opacity = '1';
                    this.style.transform = 'scale(1)';
                    wishText.style.display = 'none';
                }, 3000);
            }, 3000);
        });
        
        giftContainer.appendChild(giftBox);
    });
}

// Tạo slider ảnh
function createPhotoSlider() {
    const sliderTrack = document.getElementById('sliderTrack');
    const sliderNav = document.getElementById('sliderNav');
    
    // Tạo các slide
    photos.forEach((photo, index) => {
        const flipCard = document.createElement('div');
        flipCard.className = 'flip-card';
        
        const flipCardInner = document.createElement('div');
        flipCardInner.className = 'flip-card-inner';
        
        const flipCardFront = document.createElement('div');
        flipCardFront.className = 'flip-card-front';
        flipCardFront.style.backgroundImage = `url(${photo.image})`;
        
        const flipCardBack = document.createElement('div');
        flipCardBack.className = 'flip-card-back';
        flipCardBack.textContent = photo.message;
        
        flipCardInner.appendChild(flipCardFront);
        flipCardInner.appendChild(flipCardBack);
        flipCard.appendChild(flipCardInner);
        
        // Sự kiện click để lật thẻ
        flipCard.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
        
        sliderTrack.appendChild(flipCard);
    });
}

// Thiết lập các sự kiện nút
function setupButtonEvents() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const mainPage = document.getElementById('mainPage');
    const photoPage = document.getElementById('photoPage');
    const showPhotoBtn = document.getElementById('showPhotoBtn');
    const backBtn = document.getElementById('backBtn');
    const musicControl = document.getElementById('musicControl');
    const bgMusic = document.getElementById('bgMusic');
    
    // Nút điều hướng slider
    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlider();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentSlide < photos.length - slidesPerView) {
            currentSlide++;
            updateSlider();
        }
    });
    
    // Chuyển trang
    showPhotoBtn.addEventListener('click', () => {
        mainPage.style.display = 'none';
        photoPage.style.display = 'flex';
        // Reset slider về vị trí đầu khi chuyển trang
        currentSlide = 0;
        updateSlider();
    });
    
    backBtn.addEventListener('click', () => {
        photoPage.style.display = 'none';
        mainPage.style.display = 'flex';
    });
    
    // Điều khiển nhạc
    let isPlaying = false;
    musicControl.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicControl.textContent = '🎵';
        } else {
            bgMusic.play();
            musicControl.textContent = '🔊';
        }
        isPlaying = !isPlaying;
    });
}

// Cập nhật vị trí slider
function updateSlider() {
    const sliderTrack = document.getElementById('sliderTrack');
    if (!sliderTrack.children.length) return;
    
    const slideWidth = sliderTrack.children[0].offsetWidth + 40; // width + gap (40px)
    const newPosition = -currentSlide * slideWidth;
    sliderTrack.style.transform = `translateX(${newPosition}px)`;
}

// Xử lý responsive
function handleResponsive() {
    const width = window.innerWidth;
    let newSlidesPerView = 3;
    
    if (width < 768) newSlidesPerView = 2;
    if (width < 480) newSlidesPerView = 1;
    
    // Đảm bảo currentSlide không vượt quá giới hạn
    const maxSlide = Math.max(0, photos.length - newSlidesPerView);
    if (currentSlide > maxSlide) {
        currentSlide = maxSlide;
    }
    
    updateSlider();
}

// Tạo hiệu ứng pháo giấy
function createConfetti(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const colors = ['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff', '#ff9900', '#ff0099'];
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${centerX}px`;
        confetti.style.top = `${centerY}px`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // Kích thước ngẫu nhiên
        const size = Math.random() * 10 + 5;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        
        // Hình dạng ngẫu nhiên
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        } else {
            confetti.style.borderRadius = '0';
        }
        
        document.body.appendChild(confetti);
        
        // Di chuyển pháo giấy
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 10 + 5;
        const x = Math.cos(angle) * velocity;
        const y = Math.sin(angle) * velocity;
        
        let posX = centerX;
        let posY = centerY;
        let opacity = 1;
        
        const moveConfetti = setInterval(() => {
            posX += x;
            posY += y + 1; // Rơi xuống
            opacity -= 0.02;
            
            confetti.style.left = `${posX}px`;
            confetti.style.top = `${posY}px`;
            confetti.style.opacity = opacity;
            
            if (opacity <= 0) {
                clearInterval(moveConfetti);
                confetti.remove();
            }
        }, 30);
    }
}

// Tạo các ngôi sao cố định (70 sao)
  function createFloatingStars() {
            const starCount = 70;
            
            for (let i = 0; i < starCount; i++) {
                const star = document.createElement('div');
                star.className = 'floating-star';
                
                // Vị trí ngẫu nhiên
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                
                // Thời gian di chuyển ngẫu nhiên
                const duration = Math.random() * 20 + 10;
                star.style.animationDuration = `${duration}s`;
                
                // Kích thước ngẫu nhiên
                const size = Math.random() * 15 + 5;
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;
                
                // Độ mờ ngẫu nhiên
                star.style.opacity = Math.random() * 0.5 + 0.3;
                
                document.body.appendChild(star);
            }
        }

        // Chuyển trang
        const mainPage = document.getElementById('mainPage');
        const photoPage = document.getElementById('photoPage');
        const showPhotoBtn = document.getElementById('showPhotoBtn');
        const backBtn = document.getElementById('backBtn');
        
        showPhotoBtn.addEventListener('click', () => {
            mainPage.style.display = 'none';
            photoPage.style.display = 'flex';
            // Reset slider về vị trí đầu khi chuyển trang
            currentSlide = 0;
            updateSlider();
        });
        
        backBtn.addEventListener('click', () => {
            photoPage.style.display = 'none';
            mainPage.style.display = 'flex';
        });

        // Điều khiển nhạc
        const musicControl = document.getElementById('musicControl');
        const bgMusic = document.getElementById('bgMusic');
        let isPlaying = false;
        
        musicControl.addEventListener('click', () => {
            if (isPlaying) {
                bgMusic.pause();
                musicControl.textContent = '🎵';
            } else {
                bgMusic.play();
                musicControl.textContent = '🔊';
            }
            isPlaying = !isPlaying;
        });

        // Khởi tạo
        createFloatingStars();
        updateSlider(); // Cập nhật slider lần đầu