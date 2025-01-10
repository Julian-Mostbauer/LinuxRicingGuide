import ComponentBuilder from './component-builder.js'

const navbarCode = `
<nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
    <div class="container-fluid">
        <a class="navbar-brand" href="index.html"><i class="fa-solid fa-house"></i> ${document.title}</a>
        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>
        <div
            class="collapse navbar-collapse"
            id="navbarSupportedContent"
        >
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="window-managers.html"
                        >Window Managers</a
                    >
                </li>
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="package-managers.html"
                        >Package Managers</a
                    >
                </li>
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="distros.html"
                        >Distributions</a
                    >
                </li>
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="personal-setups.html"
                        >Our Setups</a
                    >
                </li>
            </ul>
            <form class="d-flex" role="search">
                <input
                    class="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                />
                <button class="btn btn-primary" type="submit">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
        </div>
    </div>
</nav>`

const navbarBuilder = new ComponentBuilder(navbarCode, 'navbar')
navbarBuilder.build()