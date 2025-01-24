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

  const bootstrapScript = document.createElement('script');
  bootstrapScript.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js";
  bootstrapScript.integrity = "sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz";
  bootstrapScript.crossOrigin = "anonymous";
  document.head.appendChild(bootstrapScript);
};

loadStylesAndScripts();