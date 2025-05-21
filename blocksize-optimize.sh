#!/bin/bash

echo "Starting Blocksize website optimization..."

# Create directories for optimized files
mkdir -p optimized/blocksize/js
mkdir -p optimized/blocksize/css
mkdir -p optimized/blocksize/img
mkdir -p optimized/blocksize/fonts

# 1. Optimize JavaScript - Blocksize specific
echo "Optimizing JavaScript files for Blocksize..."

# Create essential JS bundle - only what's needed
cat assets/js/jquery-3.6.0.min.js assets/js/bootstrap.bundle.min.js > optimized/blocksize/js/essential.js
terser optimized/blocksize/js/essential.js -c -m -o optimized/blocksize/js/essential.min.js

# Create minimal script with only needed functionality
cat > optimized/blocksize/js/blocksize-script.js << 'EOL'
(function() {
  "use strict";
  
  // Basic functionality only
  document.addEventListener("DOMContentLoaded", function() {
    // Preloader
    setTimeout(function() {
      const preloader = document.getElementById('preloader');
      if (preloader) {
        preloader.style.display = 'none';
      }
    }, 500);
    
    // Sticky header
    window.addEventListener('scroll', function() {
      const header = document.querySelector('.bi-header-section');
      if (header) {
        if (window.scrollY > 250) {
          header.classList.add('sticky-on');
        } else {
          header.classList.remove('sticky-on');
        }
      }
    });
    
    // Mobile menu
    const mobileMenuButton = document.querySelector('.open_mobile_menu');
    if (mobileMenuButton) {
      mobileMenuButton.addEventListener('click', function() {
        document.querySelector('.mobile_menu_wrap').classList.toggle('mobile_menu_on');
        document.body.classList.toggle('mobile_menu_overlay_on');
      });
    }
    
    // Dropdown functionality
    const dropdownBtns = document.querySelectorAll('.dropdown-btn');
    dropdownBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        this.classList.toggle('toggle-open');
        const dropdown = this.previousElementSibling;
        if (dropdown && dropdown.tagName === 'UL') {
          if (dropdown.style.display === 'block') {
            dropdown.style.display = 'none';
          } else {
            dropdown.style.display = 'block';
          }
        }
      });
    });
    
    // Scroll to top
    const scrollTopBtn = document.querySelector('.scrollup');
    if (scrollTopBtn) {
      scrollTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
      
      window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
          scrollTopBtn.classList.add('scrollup-show');
        } else {
          scrollTopBtn.classList.remove('scrollup-show');
        }
      });
    }
    
    // Lazy load images
    const lazyImages = document.querySelectorAll('img.lazy');
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });
      
      lazyImages.forEach(function(img) {
        imageObserver.observe(img);
      });
    } else {
      // Fallback for older browsers
      let active = false;
      const lazyLoad = function() {
        if (active === false) {
          active = true;
          setTimeout(function() {
            lazyImages.forEach(function(img) {
              if (img.getBoundingClientRect().top <= window.innerHeight && 
                  img.getBoundingClientRect().bottom >= 0 && 
                  getComputedStyle(img).display !== 'none') {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
              }
            });
            active = false;
          }, 200);
        }
      };
      
      document.addEventListener('scroll', lazyLoad);
      window.addEventListener('resize', lazyLoad);
      window.addEventListener('orientationchange', lazyLoad);
      lazyLoad();
    }
  });
})();
EOL

terser optimized/blocksize/js/blocksize-script.js -c -m -o optimized/blocksize/js/blocksize-script.min.js

# 2. Optimize CSS - Blocksize specific
echo "Optimizing CSS files for Blocksize..."

# Create essential CSS with only what's needed
cat assets/css/bootstrap.min.css > optimized/blocksize/css/essential.css

# Create critical CSS
cat > optimized/blocksize/css/critical.css << 'EOL'
/* Critical CSS only */
body {margin:0;padding:0;font-family:Arial,sans-serif;overflow-x:hidden}
.bi-header-section {position:fixed;top:0;left:0;width:100%;z-index:10;transition:all .3s ease-in-out}
.bi-header-section.sticky-on {background:#fff;box-shadow:0 0 20px rgba(0,0,0,.1)}
.bi-header-content {display:flex;align-items:center;justify-content:space-between;padding:15px 30px}
.brand-logo img {max-width:150px}
.mobile_menu_button {display:none}
@media (max-width:991px) {
  .bi-header-main-navigation {display:none}
  .mobile_menu_button {display:block;font-size:24px;cursor:pointer}
}
.preloader {position:fixed;top:0;left:0;width:100%;height:100%;background:#fff;z-index:99999;display:flex;align-items:center;justify-content:center}
.scrollup {position:fixed;bottom:30px;right:30px;width:40px;height:40px;line-height:40px;text-align:center;background:#007bff;color:#fff;border-radius:50%;z-index:9;opacity:0;visibility:hidden;transition:all .3s}
.scrollup-show {opacity:1;visibility:visible}
.mobile_menu_wrap {position:fixed;top:0;left:-300px;width:300px;height:100%;background:#fff;z-index:999;transition:all .3s;overflow-y:auto}
.mobile_menu_on {left:0}
.mobile_menu_overlay_on {overflow:hidden}
.mobile_menu_overlay_on:before {content:'';position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.7);z-index:998}
EOL

cleancss optimized/blocksize/css/critical.css -o optimized/blocksize/css/critical.min.css

# Extract only needed styles from style.css
cat assets/css/style.css | grep -A 5000 -B 5000 "blocksize\|header\|footer\|mobile_menu\|scrollup" > optimized/blocksize/css/blocksize-styles.css
cleancss optimized/blocksize/css/blocksize-styles.css -o optimized/blocksize/css/blocksize-styles.min.css

# 3. Create optimized HTML template for Blocksize
echo "Creating optimized HTML template for Blocksize..."

cat > optimized/blocksize/template.html << 'EOL'
<!DOCTYPE html>
<html lang="hr">
<head>
    <meta charset="UTF-8">
    <title>Blocksize - Blockchain Solutions</title>
    <meta name="description" content="Blocksize - Blockchain rješenja za poslovne korisnike">
    <meta name="keywords" content="blockchain, cryptocurrency, bitcoin, ethereum, web3">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="img/favicon.png" type="image/x-icon">
    
    <!-- Critical CSS inline -->
    <style>
    /* Critical CSS will be inserted here */
    </style>
    
    <!-- Preload critical assets -->
    <link rel="preload" href="css/essential.min.css" as="style">
    <link rel="preload" href="js/essential.min.js" as="script">
    
    <!-- Non-critical CSS with media attributes -->
    <link rel="stylesheet" href="css/essential.min.css">
    <link rel="stylesheet" href="css/blocksize-styles.min.css" media="print" onload="this.media='all'">
    
    <!-- Preconnect to external domains -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
</head>
<body class="blocksize-page">
    <div id="preloader"></div>
    <div class="up">
        <a href="#" class="scrollup text-center"><i class="fas fa-chevron-up"></i></a>
    </div>
    
    <!-- CONTENT WILL BE INSERTED HERE -->
    
    <!-- Essential scripts -->
    <script src="js/essential.min.js" defer></script>
    <script src="js/blocksize-script.min.js" defer></script>
</body>
</html>
EOL

# 4. Create .htaccess with specific caching rules for Blocksize
echo "Creating optimized .htaccess file for Blocksize..."

cat > optimized/blocksize/.htaccess << 'EOL'
# Enable compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript application/x-javascript application/json
</IfModule>

# Set browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  
  # Images
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/x-icon "access plus 1 year"
  
  # Video
  ExpiresByType video/mp4 "access plus 1 year"
  ExpiresByType video/webm "access plus 1 year"
  
  # CSS, JavaScript
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  
  # Fonts
  ExpiresByType application/vnd.ms-fontobject "access plus 1 year"
  ExpiresByType application/x-font-ttf "access plus 1 year"
  ExpiresByType application/x-font-opentype "access plus 1 year"
  ExpiresByType application/x-font-woff "access plus 1 year"
  ExpiresByType application/x-font-woff2 "access plus 1 year"
  ExpiresByType font/ttf "access plus 1 year"
  ExpiresByType font/woff "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
  
  # Others
  ExpiresByType application/pdf "access plus 1 month"
  ExpiresByType application/x-shockwave-flash "access plus 1 month"
</IfModule>

# GZIP compression
<IfModule mod_gzip.c>
  mod_gzip_on Yes
  mod_gzip_dechunk Yes
  mod_gzip_item_include file \.(html?|txt|css|js|php|pl)$
  mod_gzip_item_include handler ^cgi-script$
  mod_gzip_item_include mime ^text/.*
  mod_gzip_item_include mime ^application/x-javascript.*
  mod_gzip_item_exclude mime ^image/.*
  mod_gzip_item_exclude rspheader ^Content-Encoding:.*gzip.*
</IfModule>

# Remove ETags
<IfModule mod_headers.c>
  Header unset ETag
</IfModule>
FileETag None

# Add security headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-XSS-Protection "1; mode=block"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
EOL

# 5. Create a script to optimize images specifically for Blocksize
cat > optimized/blocksize/optimize-images.sh << 'EOL'
#!/bin/bash

# Install required tools if not already installed
if ! command -v cwebp &> /dev/null; then
    echo "Installing WebP tools..."
    brew install webp
fi

if ! command -v pngquant &> /dev/null; then
    echo "Installing pngquant..."
    brew install pngquant
fi

if ! command -v jpegoptim &> /dev/null; then
    echo "Installing jpegoptim..."
    brew install jpegoptim
fi

# Function to optimize an image
optimize_image() {
    local src="$1"
    local filename=$(basename "$src")
    local extension="${filename##*.}"
    local basename="${filename%.*}"
    local target_dir="optimized/blocksize/img"
    
    mkdir -p "$target_dir"
    
    echo "Optimizing $src..."
    
    # Optimize based on file type
    case "$extension" in
        jpg|jpeg)
            # Optimize JPEG
            jpegoptim --strip-all --max=85 --dest="$target_dir" "$src"
            
            # Convert to WebP
            cwebp -q 85 "$src" -o "$target_dir/$basename.webp"
            ;;
        png)
            # Optimize PNG
            pngquant --quality=65-85 --strip --output "$target_dir/$filename" "$src"
            
            # Convert to WebP
            cwebp -q 85 "$src" -o "$target_dir/$basename.webp"
            ;;
        gif)
            # Copy GIF (or convert if needed)
            cp "$src" "$target_dir/$filename"
            ;;
        *)
            # Copy other files
            cp "$src" "$target_dir/$filename"
            ;;
    esac
}

# Process all images
find assets/img -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.gif" \) -exec bash -c 'optimize_image "$0"' {} \;

echo "Image optimization complete!"
EOL

chmod +x optimized/blocksize/optimize-images.sh

# 6. Create a script to generate HTML with WebP support
cat > optimized/blocksize/generate-html.sh << 'EOL'
#!/bin/bash

# Function to process HTML file
process_html() {
    local src="$1"
    local filename=$(basename "$src")
    local target="optimized/blocksize/$filename"
    
    echo "Processing $src to $target..."
    
    # Read template
    local template=$(cat optimized/blocksize/template.html)
    
    # Extract content between body tags (excluding the body tags themselves)
    local content=$(sed -n '/<body/,/<\/body>/p' "$src" | sed '1d;$d')
    
    # Replace image tags with WebP and lazy loading
    content=$(echo "$content" | sed 's/<img src="\([^"]*\.\(jpg\|jpeg\|png\)\)/"/<img class="lazy" src="data:image\/gif;base64,R0lGODlhAQABAIAAAAAAAP\/\/\/yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="\1" srcset="\1 1x, \1.webp 1x" type="image\/webp"/g')
    
    # Read critical CSS
    local critical_css=$(cat optimized/blocksize/css/critical.min.css)
    
    # Replace placeholders in template
    template=${template/\/* Critical CSS will be inserted here *\//$(echo "$critical_css")}
    template=${template/<!-- CONTENT WILL BE INSERTED HERE -->/$(echo "$content")}
    
    # Write to file
    echo "$template" > "$target"
    
    # Minify HTML
    if command -v html-minifier &> /dev/null; then
        html-minifier --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype --minify-css true --minify-js true "$target" -o "$target"
    fi
}

# Process all HTML files
for html_file in *.html; do
    process_html "$html_file"
done

echo "HTML generation complete!"
EOL

chmod +x optimized/blocksize/generate-html.sh

echo "Blocksize optimization script complete!"
echo "To use:"
echo "1. Run this script to prepare the optimization environment"
echo "2. Run ./optimized/blocksize/optimize-images.sh to optimize images"
echo "3. Run ./optimized/blocksize/generate-html.sh to create optimized HTML files"
echo "4. Upload the contents of the optimized/blocksize directory to your web server"
