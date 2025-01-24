/*
        <script
            src="https://kit.fontawesome.com/0a7e2ccef9.js"
            crossorigin="anonymous"
        ></script>
        <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
            crossorigin="anonymous"
        />
*/

const bootstrapFiles = [
   'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/js/dist/base-component.js',
   'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/js/dist/modal.js',
   'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/js/dist/dropdown.js',
   'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js',
]

const loadStylesAndScripts = () => {
  const fontAwesomeScript = document.createElement('script');
  fontAwesomeScript.src = "https://kit.fontawesome.com/0a7e2ccef9.js";
  fontAwesomeScript.crossOrigin = "anonymous";
  document.head.appendChild(fontAwesomeScript);
  
  const bootstrapLink = document.createElement('link');
  bootstrapLink.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
  bootstrapLink.rel = "stylesheet";
  bootstrapLink.integrity = "sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH";
  bootstrapLink.crossOrigin = "anonymous";
  document.head.appendChild(bootstrapLink);

  for (const file of bootstrapFiles) {
    const script = document.createElement('script');
    script.src = file;
//    script.integrity = "sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz";
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);    
  }
};

loadStylesAndScripts();