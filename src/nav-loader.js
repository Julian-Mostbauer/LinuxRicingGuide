document.addEventListener('DOMContentLoaded', function () {
    fetch('navbar.html')
        .then((response) => response.text())
        .then((data) => {
            const header = document.querySelector('header')
            header.innerHTML += data
        })
        .catch((error) =>
            console.error('Error loading navbar:', error)
        )
})