#!/bin/bash

echo "Starting enhanced website optimization..."

# Create directories for optimized files
mkdir -p optimized/js
mkdir -p optimized/css
mkdir -p optimized/img
mkdir -p optimized/fonts
mkdir -p optimized/html

# Install required tools if not already installed
echo "Checking and installing required tools..."
if ! command -v npm &> /dev/null; then
    echo "npm is required but not installed. Please install Node.js and npm first."
    exit 1
fi

# Install required packages
echo "Installing optimization tools..."
npm install -g terser clean-css-cli html-minifier-terser imagemin-cli imagemin-webp critical

# 1. Optimize JavaScript - More aggressive approach
echo "Optimizing JavaScript files..."

# Create essential JS bundle
cat assets/js/jquery-3.6.0.min.js assets/js/bootstrap.bundle.min.js > optimized/js/essential.js
terser optimized/js/essential.js -c -m -o optimized/js/essential.min.js

# Create animation JS bundle (loaded after page load)
cat assets/js/gsap.min.js assets/js/ScrollTrigger.min.js assets/js/wow.min.js assets/js/swiper-bundle.min.js > optimized/js/animations.js
terser optimized/js/animations.js -c -m -o optimized/js/animations.min.js

# Optimize main script
terser assets/js/script.js -c -m -o optimized/js/script.min.js

# 2. Optimize CSS - More aggressive approach
echo "Optimizing CSS files..."

# Create essential CSS bundle
cat assets/css/bootstrap.min.css assets/css/global.css > optimized/css/essential.css
cleancss optimized/css/essential.css -o optimized/css/essential.min.css

# Create style CSS bundle
cat assets/css/fontawesome.css assets/css/animate.css assets/css/swiper.min.css assets/css/magnific-popup.css assets/css/style.css > optimized/css/styles.css
cleancss optimized/css/styles.css -o optimized/css/styles.min.css

# 3. Optimize Images - More aggressive approach
echo "Optimizing images..."

# Create a function to process images
process_image() {
    local src="$1"
    local filename=$(basename "$src")
    local extension="${filename##*.}"
    local basename="${filename%.*}"
    local target_dir="optimized/img/$(dirname "${src#assets/img/}")"
    
    mkdir -p "$target_dir"
    
    # Optimize original format
    imagemin "$src" --out-dir="$target_dir"
    
    # Convert to WebP
    if [[ "$extension" == "jpg" || "$extension" == "jpeg" || "$extension" == "png" ]]; then
        imagemin "$src" --plugin=webp --out-dir="$target_dir"
    fi
}

# Process all images
export -f process_image
find assets/img -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.gif" \) -exec bash -c 'process_image "$0"' {} \;

# 4. Copy and optimize fonts
echo "Copying fonts..."
cp -r assets/fonts/* optimized/fonts/

# 5. Create optimized HTML template
echo "Creating optimized HTML template..."

cat > optimized/html/template.html << 'EOL'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>%%TITLE%%</title>
    <meta name="description" content="%%DESCRIPTION%%">
    <meta name="keywords" content="%%KEYWORDS%%">
    <meta name="author" content="BLOCKSIZE">
    <link rel="shortcut icon" href="assets/img/logo/f-icon.png" type="image/x-icon">
    <!-- Mobile Specific Meta -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <!-- Preload critical assets -->
    <link rel="preload" href="optimized/css/essential.min.css" as="style">
    <link rel="preload" href="optimized/js/essential.min.js" as="script">
    <link rel="preload" href="optimized/fonts/fontawesome-webfont.woff2" as="font" type="font/woff2" crossorigin>
    
    <!-- Critical CSS inline -->
    <style>%%CRITICAL_CSS%%</style>
    
    <!-- Non-critical CSS with media attributes -->
    <link rel="stylesheet" href="optimized/css/essential.min.css">
    <link rel="stylesheet" href="optimized/css/styles.min.css" media="print" onload="this.media='all'">
    
    <!-- Preconnect to external domains -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <!-- Browser caching headers will be set in .htaccess -->
</head>
<body class="%%BODY_CLASS%%">
    <div id="preloader"></div>
    <div class="up">
        <a href="#" class="scrollup text-center"><i class="fas fa-chevron-up"></i></a>
    </div>
    <div class="cursor"></div>
    
    %%CONTENT%%
    
    <!-- Essential scripts -->
    <script src="optimized/js/essential.min.js"></script>
    
    <!-- Defer non-critical scripts -->
    <script src="optimized/js/animations.min.js" defer></script>
    <script src="optimized/js/script.min.js" defer></script>
    
    <!-- Add lazy loading to images -->
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
            
            if ("IntersectionObserver" in window) {
                let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting) {
                            let lazyImage = entry.target;
                            lazyImage.src = lazyImage.dataset.src;
                            if(lazyImage.dataset.srcset) {
                                lazyImage.srcset = lazyImage.dataset.srcset;
                            }
                            lazyImage.classList.remove("lazy");
                            lazyImageObserver.unobserve(lazyImage);
                        }
                    });
                });
                
                lazyImages.forEach(function(lazyImage) {
                    lazyImageObserver.observe(lazyImage);
                });
            } else {
                // Fallback for browsers without IntersectionObserver support
                let active = false;
                
                const lazyLoad = function() {
                    if (active === false) {
                        active = true;
                        
                        setTimeout(function() {
                            lazyImages.forEach(function(lazyImage) {
                                if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
                                    lazyImage.src = lazyImage.dataset.src;
                                    if(lazyImage.dataset.srcset) {
                                        lazyImage.srcset = lazyImage.dataset.srcset;
                                    }
                                    lazyImage.classList.remove("lazy");
                                    
                                    lazyImages = lazyImages.filter(function(image) {
                                        return image !== lazyImage;
                                    });
                                    
                                    if (lazyImages.length === 0) {
                                        document.removeEventListener("scroll", lazyLoad);
                                        window.removeEventListener("resize", lazyLoad);
                                        window.removeEventListener("orientationchange", lazyLoad);
                                    }
                                }
                            });
                            
                            active = false;
                        }, 200);
                    }
                };
                
                document.addEventListener("scroll", lazyLoad);
                window.addEventListener("resize", lazyLoad);
                window.addEventListener("orientationchange", lazyLoad);
            }
        });
    </script>
</body>
</html>
EOL

# 6. Create .htaccess with caching rules
echo "Creating optimized .htaccess file..."

cat > optimized/.htaccess << 'EOL'
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
EOL

# 7. Create a script to convert HTML files
cat > optimized/convert-html.sh << 'EOL'
#!/bin/bash

# Function to convert an HTML file
convert_html_file() {
    local src="$1"
    local filename=$(basename "$src")
    local target="optimized/${src#*/}"
    
    echo "Converting $src to $target..."
    
    # Extract metadata
    local title=$(grep -oP '<title>\K[^<]+' "$src")
    local description=$(grep -oP '<meta name="description" content="\K[^"]+' "$src")
    local keywords=$(grep -oP '<meta name="keywords" content="\K[^"]+' "$src")
    local body_class=$(grep -oP '<body class="\K[^"]+' "$src")
    
    # Extract content between body tags
    local content=$(sed -n '/<body/,/<\/body>/p' "$src" | sed '1d;$d')
    
    # Replace image tags with lazy loading
    content=$(echo "$content" | sed 's/<img src="/<img class="lazy" src="data:image\/gif;base64,R0lGODlhAQABAIAAAAAAAP\/\/\/yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="/g')
    
    # Generate critical CSS
    critical --base ./ --src "$src" --dest "optimized/css/critical-${filename%.html}.css" --width 1300 --height 900 --inline false
    local critical_css=$(cat "optimized/css/critical-${filename%.html}.css")
    
    # Create optimized HTML
    mkdir -p "$(dirname "$target")"
    cat optimized/html/template.html | \
        sed "s/%%TITLE%%/$title/g" | \
        sed "s/%%DESCRIPTION%%/$description/g" | \
        sed "s/%%KEYWORDS%%/$keywords/g" | \
        sed "s/%%BODY_CLASS%%/$body_class/g" | \
        sed "s|%%CRITICAL_CSS%%|$critical_css|g" | \
        sed "s|%%CONTENT%%|$content|g" > "$target"
    
    # Minify HTML
    html-minifier-terser --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype --minify-css true --minify-js true "$target" -o "$target"
}

# Convert all HTML files
for html_file in $(find . -maxdepth 1 -name "*.html"); do
    convert_html_file "$html_file"
done
EOL

chmod +x optimized/convert-html.sh

echo "Enhanced optimization script complete!"
echo "To use:"
echo "1. Run this script to prepare optimized assets"
echo "2. cd into the optimized directory and run ./convert-html.sh to convert HTML files"
echo "3. Test the optimized site and upload to your server"
