function adjustFooter() {
      let body = document.body;
      let html = document.documentElement;
      let height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      let footer = document.getElementsByTagName('footer')[0];
      let footerHeight = footer.offsetHeight;
      
      if (height > window.innerHeight) {
        footer.style.position = 'relative';
      } else {
        footer.style.position = 'fixed';
        footer.style.bottom = '0';
      }
    }
    
adjustFooter();
window.addEventListener('resize', adjustFooter);