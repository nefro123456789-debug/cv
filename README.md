# Ahmed Mandour - Premium Portfolio Website

A stunning, Apple-inspired portfolio website featuring premium animations, gradient backgrounds, and modern design aesthetics.

## 🌟 Features

### Design
- **Apple-Inspired Color Palette**: Deep blues, purples, and smooth gradients with wide-gamut color support
- **Premium Animations**: Smooth scroll-triggered effects using GSAP
- **Responsive Design**: Fully responsive across all devices
- **Glassmorphism Effects**: Modern frosted glass UI elements
- **Gradient Orbs**: Animated floating gradient backgrounds

### Sections
1. **Hero Section**: Full viewport height with animated gradient background, floating tech cards
2. **About Section**: Personal introduction with animated statistics and contact information
3. **Skills Section**: Interactive skill cards with animated progress bars
4. **Projects Section**: Three featured projects with hover effects
5. **Contact Section**: Easy-to-access contact methods
6. **Footer**: Clean footer with social links

### Animations
- Fade-in and slide-up animations on scroll
- Floating card animations
- Magnetic button effects
- 3D card tilt on hover
- Animated progress bars
- Parallax scrolling effects
- Scroll progress indicator

## 🚀 How to Use

1. **Open the Website**:
   - Simply open `index.html` in any modern web browser
   - Or use a local server for best performance

2. **Using a Local Server** (Recommended):
   ```bash
   # If you have Python installed:
   python3 -m http.server 8000
   
   # Then open: http://localhost:8000
   ```

3. **Navigate**:
   - Use the navigation menu at the top
   - Scroll through sections to see animations
   - Click on contact methods to reach out

## 📁 File Structure

```
mand/
├── index.html      # Main HTML structure
├── style.css       # Premium CSS with animations
├── script.js       # GSAP animations and interactions
└── README.md       # This file
```

## 🎨 Color Palette

The website uses Apple's premium color scheme:
- **Primary Blue**: #0071e3
- **Purple**: #bf5af2
- **Pink**: #ff2d55
- **Indigo**: #5856d6
- **Teal**: #5ac8fa
- **Dark Background**: #1d1d1f
- **Custom Gradients**: Multiple gradient combinations

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Advanced animations, gradients, and effects
- **JavaScript (ES6+)**: Modern JavaScript features
- **GSAP 3.12**: Professional-grade animation library
- **ScrollTrigger**: Scroll-based animations
- **Google Fonts**: Inter font family

## ✨ Key Features Explained

### Gradient Orbs
Three animated gradient orbs float in the hero section background, creating a dynamic and premium feel.

### Scroll Animations
All sections animate smoothly as you scroll, using GSAP's ScrollTrigger for performance.

### Magnetic Buttons
Buttons follow your cursor with a magnetic effect, creating an interactive experience.

### 3D Card Tilt
Skill and project cards tilt in 3D based on mouse position for a premium feel.

### Progress Bars
Skill progress bars animate when scrolled into view, counting up to the target percentage.

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🎯 Customization

### Changing Colors
Edit the CSS variables in `style.css`:
```css
:root {
    --apple-blue: #0071e3;
    --apple-purple: #bf5af2;
    /* ... more colors */
}
```

### Modifying Content
Edit `index.html` to update:
- Personal information
- Skills and percentages
- Project descriptions
- Contact details

### Adjusting Animations
Modify animation timings in `script.js`:
```javascript
gsap.from('.element', {
    duration: 0.8,  // Animation duration
    delay: 0.2,     // Delay before start
    ease: 'power3.out'  // Easing function
});
```

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## 📞 Contact Information

- **Phone**: 01555043853
- **Email**: AhmedMandour@gmail.com

## 🎓 About

This portfolio showcases the work of Ahmed Mandour, a 14-year-old student at AMS School passionate about:
- Python Programming
- Flask Web Development
- AI Modeling
- Web Development

## 📝 License

This is a personal portfolio website. Feel free to use it as inspiration for your own portfolio!

---

**Built with ❤️ and passion for technology**
