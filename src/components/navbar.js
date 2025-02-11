import ComponentBuilder from './component-builder.js'

const location = document.location.pathname.split('src/')[1]
const slashCount = location.split('/').length - 1
const linkPrefix = '../'.repeat(slashCount)

const navbarCode = `
<nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
    <div class="container-fluid">
        <a class="navbar-brand" href="${linkPrefix}index.html">
            <i class="fa-solid fa-house"></i> ${document.title}
        </a>
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
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item dropdown">
                    <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >Distros</a>
                    <ul class="dropdown-menu">
                        <li>
                            <a class="dropdown-item" href="${linkPrefix}distros.html">Distro List</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="${linkPrefix}distros-history">History</a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >Desktop</a>
                    <ul class="dropdown-menu">
                        <li>
                            <a class="dropdown-item" href="${linkPrefix}window-managers.html">Window Managers</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="${linkPrefix}desktop-environments.html">Desktop Environments</a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >Terminal</a>
                    <ul class="dropdown-menu">
                        <li>
                            <a class="dropdown-item" href="${linkPrefix}terminals.html">Terminals</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="${linkPrefix}terminal-themes.html">Terminal Themes</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="${linkPrefix}shells.html">Shells</a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >Software</a>
                    <ul class="dropdown-menu">
                        <li>
                            <a class="dropdown-item" href="${linkPrefix}package-managers.html">Package Managers</a>
                            <a class="dropdown-item" href="${linkPrefix}configurator.html">Configurator</a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="${linkPrefix}personal-setups.html">Our Setups</a>
                </li>
            </ul>
            <form class="d-flex" role="search" id="navbar-search-form">
                <input
                    class="form-control me-2"
                    id="navbar-search-input"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                />
                <button class="btn btn-primary" type="button" id="navbar-search-button">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
        </div>
    </div>
</nav>

<!-- Modal for Search Results -->
<div class="modal fade" id="search-results-modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Search Results</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p id="search-query-text"></p>
                <ul class="list-group" id="search-results-list">
                    <!-- Results will be populated dynamically -->
                </ul>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
`

const onMount = async () => {
    const searchForm = document.getElementById('navbar-search-form')
    const searchInput = document.getElementById('navbar-search-input')

    const searchResultsList = document.getElementById('search-results-list')
    const searchQueryText = document.getElementById('search-query-text')

    const performSearch = async () => {
        const query = searchInput.value.trim()

        if (!query) {
            alert('Please enter a search query.')
            return
        }

        // eslint-disable-next-line no-undef
        const modal = new bootstrap.Modal(
            document.getElementById('search-results-modal')
        )

        // Clear previous results
        searchResultsList.innerHTML = ''
        searchQueryText.textContent = `Search results for: "${query}"`

        try {
            const { default: searchDocuments } = await import(
                '../utils/search.js'
            )
            const results = await searchDocuments(query)

            const createListEntry = (result) => {
                const listItem = document.createElement('li')
                listItem.className = 'list-group-item'

                const link = document.createElement('a')
                link.href = `${linkPrefix}${result.file}`
                link.target = '_blank'
                link.textContent = result.file

                const content = document.createElement('p')
                content.className = 'mb-0'
                content.textContent = result.content

                listItem.appendChild(link)
                listItem.appendChild(content)

                return listItem
            }

            if (results.length === 0) {
                searchResultsList.innerHTML =
                    '<li class="list-group-item">No results found.</li>'
            } else {
                results.map(createListEntry).forEach((listItem) => {
                    searchResultsList.appendChild(listItem)
                })
            }

            modal.show()
        } catch (error) {
            console.error('Error fetching search results:', error)
            searchResultsList.innerHTML =
                '<li class="list-group-item text-danger">An error occurred while fetching results.</li>'
        }
    }

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault()
        performSearch()
    })

    const searchButton = document.getElementById('navbar-search-button')
    searchButton.addEventListener('click', performSearch)
}

const navbarBuilder = new ComponentBuilder('navbar', navbarCode)
navbarBuilder.addOnMount(onMount)
navbarBuilder.build()
