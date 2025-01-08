const navbarHTML = `
<nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Linux Ricing Guide</a>
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
                    <a class="nav-link" aria-current="page" href="#"
                        >Introduction</a
                    >
                </li>
                <li class="nav-item dropdown">
                    <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Links
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <a
                                class="dropdown-item"
                                href="/src/main.html"
                                >Main Page</a
                            >
                        </li>
                        <li>
                            <a
                                class="dropdown-item"
                                href="/src/index.html"
                                >Entry Page</a
                            >
                        </li>
                                                <li>
                            <a
                                class="dropdown-item"
                                href="/src/introduction.html"
                                >Introduction</a
                            >
                        </li>
                        <li>
                            <a
                                class="dropdown-item"
                                href="/src/distros.html"
                                >Distributions</a
                            >
                        </li>
                        <li>
                            <a
                                class="dropdown-item"
                                href="/src/package-managers.html"
                                >Package Managers</a
                            >
                        </li>
                        <li>
                            <a
                                class="dropdown-item"
                                href="/src/personal-setups.html"
                                >Setups</a
                            >
                        </li>

                        <li>
                            <a
                                class="dropdown-item"
                                href="/src/window-managers.html"
                                >Window Managers</a
                            >
                        </li>
                    </ul>
                </li>
            </ul>
            <form class="d-flex" role="search">
                <input
                    class="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                />
                <button class="btn btn-outline-success" type="submit">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
        </div>
    </div>
</nav>`

// Dummy DOM element to hold navbar
const template = document.createElement('template')
template.innerHTML = navbarHTML.trim()

document
    .getElementById('navbar-wrapper')
    .replaceWith(template.content.firstChild)
