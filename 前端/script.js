// 導航欄功能
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // 點擊導航連結時關閉手機選單
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
});

//  自動輪播
document.addEventListener("DOMContentLoaded", function () {
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function changeSlide(direction) {
        currentSlideIndex += direction;

        if (currentSlideIndex >= slides.length) {
            currentSlideIndex = 0;
        } else if (currentSlideIndex < 0) {
            currentSlideIndex = slides.length - 1;
        }

        showSlide(currentSlideIndex);
    }

    window.changeSlide = changeSlide; // 給 HTML 的按鈕 onclick 用
    window.currentSlide = function(index) {
        currentSlideIndex = index - 1;
        showSlide(currentSlideIndex);
    };

    showSlide(currentSlideIndex); // 初始化

    setInterval(() => {
        changeSlide(1);
    }, 5000);
});



// 統計數字動畫
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
        }, 20);
    });
}

// 滾動觸發動畫
function handleScrollAnimations() {
    const statsSection = document.querySelector('.stats-section');
    const rect = statsSection.getBoundingClientRect();
    
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        animateStats();
        window.removeEventListener('scroll', handleScrollAnimations);
    }
}

window.addEventListener('scroll', handleScrollAnimations);

// 平滑滾動
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 卡片懸停效果增強
document.querySelectorAll('.link-card, .news-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// 載入動畫
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // 為元素添加淡入動畫
    const animatedElements = document.querySelectorAll('.link-card, .news-card, .stat-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});

// 表單驗證功能（為登入頁面準備）
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// 搜尋功能
function searchContent(query) {
    // 這裡可以實現搜尋功能
    console.log('搜尋:', query);
}

// 主題切換功能
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// 載入保存的主題
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
}

// ==================== 頁腳功能 ====================

// 回到頂部功能
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 顯示/隱藏回到頂部按鈕
window.addEventListener('scroll', function() {
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
});

// 頁腳動畫效果
function initFooterAnimations() {
    const footerSections = document.querySelectorAll('.footer-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    footerSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
}

// 社群媒體連結點擊事件
function initSocialLinks() {
    document.querySelectorAll('.social-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.className;
            
            // 這裡可以添加實際的社群媒體連結
            switch(platform) {
                case 'facebook':
                    window.open('https://facebook.com/antiscam', '_blank');
                    break;
                case 'twitter':
                    window.open('https://twitter.com/antiscam', '_blank');
                    break;
                case 'instagram':
                    window.open('https://instagram.com/antiscam', '_blank');
                    break;
                case 'youtube':
                    window.open('https://youtube.com/antiscam', '_blank');
                    break;
                case 'line':
                    window.open('https://line.me/ti/p/@antiscam', '_blank');
                    break;
            }
        });
    });
}

// 頁腳連結統計
function initFooterLinkTracking() {
    document.querySelectorAll('.footer-section a').forEach(link => {
        link.addEventListener('click', function() {
            // 這裡可以添加點擊統計功能
            console.log('Footer link clicked:', this.textContent);
        });
    });
}

// 模擬更新瀏覽人次
function updateVisitorCount() {
    const visitorElements = document.querySelectorAll('.footer-info span');
    if (visitorElements.length >= 3) {
        // 模擬數據更新
        setInterval(() => {
            const todayElement = visitorElements[2];
            if (todayElement && todayElement.textContent.includes('今日：')) {
                const currentCount = parseInt(todayElement.textContent.replace('今日：', '').replace(',', ''));
                const newCount = currentCount + Math.floor(Math.random() * 3) + 1;
                todayElement.textContent = `今日：${newCount.toLocaleString()}`;
            }
        }, 30000); // 每30秒更新一次
    }
}

// 頁腳懸停效果增強
function initFooterHoverEffects() {
    document.querySelectorAll('.footer-section').forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// 平滑滾動到頁腳
function scrollToFooter() {
    const footer = document.querySelector('.footer');
    if (footer) {
        footer.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// 鍵盤快捷鍵支援
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl + Home 回到頂部
        if (e.ctrlKey && e.key === 'Home') {
            e.preventDefault();
            scrollToTop();
        }
        
        // Ctrl + End 到頁腳
        if (e.ctrlKey && e.key === 'End') {
            e.preventDefault();
            scrollToFooter();
        }
    });
}

// 初始化所有頁腳功能
function initFooterFeatures() {
    initFooterAnimations();
    initSocialLinks();
    initFooterLinkTracking();
    initFooterHoverEffects();
    initKeyboardShortcuts();
    updateVisitorCount();
}

// 在現有的DOMContentLoaded事件監聽器中添加頁腳初始化
document.addEventListener('DOMContentLoaded', function() {
    // 現有的初始化代碼...
    
    // 初始化頁腳功能
    initFooterFeatures();
});