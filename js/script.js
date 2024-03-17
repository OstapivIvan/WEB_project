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
        if (targetId.startsWith('/pages/')) {
            window.location.href = targetId;
            return;
        }
        const targetElement = document.querySelector(targetId);
        scrollToTopOfElement(targetElement);
    });
});

const setMaxDate = (minAge) => {
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - minAge);
    const formattedDate = currentDate.toISOString().slice(0, 10);
    document.getElementById("dob").setAttribute("max", formattedDate);
};

setMaxDate(16);

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('surveyForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const dob = document.getElementById('dob').value;
        const foot = document.querySelector('input[name="foot"]:checked').value;
        const height = document.getElementById('height').value;
        const injuryRisk = document.getElementById('injuryRisk').value;
        const position = document.getElementById('position').value;
        const playstyle = document.querySelectorAll('input[name="playstyle"]');
        const experiance = document.getElementById('experiance').value;
        const selectedPlaystyles = Array.from(playstyle)
            .filter(playstyle => playstyle.checked)
            .map(playstyle => playstyle.value);

        if (selectedPlaystyles.length === 0) {
            alert('Please select at least one playstyle.');
            return
        }

        const formData = {
            fullName: fullName,
            email: email,
            phone: phone,
            dob: dob,
            foot: foot,
            height: height,
            injuryRisk: injuryRisk,
            position: position,
            playstyle: selectedPlaystyles,
            experiance: experiance
        };

        let existingData = JSON.parse(localStorage.getItem('surveyData')) || [];
        existingData.push(formData);
        localStorage.setItem('surveyData', JSON.stringify(existingData));

        alert('Your survey data has been saved successfully.');
    });
});

