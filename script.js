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

//Плавний перехід до елементу з навінації
const scrollToTopOfElement = element => {
    window.scrollTo({
        behavior: 'smooth',
        top: element.offsetTop,
    });
};

const menuItems = document.querySelectorAll('.menu-items li a');
menuItems.forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();
        const targetId = item.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        scrollToTopOfElement(targetElement);
    });
});