document.getElementById('currentYear').textContent = new Date().getFullYear();
//Функція для відображення адаптивного меню
document.addEventListener('DOMContentLoaded', function () {

    const toggleMenu = () => {
        const menuItems = document.getElementById("menu-items");
        menuItems.classList.toggle("show");
    };

    const menuToggle = document.querySelector('.dropbtn');
    menuToggle.addEventListener('click', event => {
        toggleMenu();
    });

    window.onclick = event => {
        if (!event.target.matches('.dropbtn')) {
            const dropdowns = document.getElementsByClassName("menu-items");
            for (const dropdown of dropdowns) {
                if (dropdown.classList.contains('show')) {
                    dropdown.classList.remove('show');
                }
            }
        }
    }
});
