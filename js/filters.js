const allParticipantsDiv = document.getElementById('allParticipantsList');
document.addEventListener("DOMContentLoaded", function () {
    const participantsData = JSON.parse(localStorage.getItem('surveyData'));

    if (participantsData) {
        displayAllParticipants(participantsData);
    } else {
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'No participant data found.';
        errorDiv.classList.add('error-message');
        allParticipantsDiv.appendChild(errorDiv);
    }

});

function displayAllParticipants(participantsData) {
    participantsData.forEach(participant => {
        const participantDiv = document.createElement('div');
        participantDiv.textContent = `Full Name: ${participant.fullName}, Phone: ${participant.phone}, Age: ${calculateAge(participant.dob)}, Position: ${participant.position}`;
        allParticipantsDiv.appendChild(participantDiv);
    });
}

function calculateAge(dob) {
    const dobDate = new Date(dob);
    const currentDate = new Date();
    const age = currentDate.getUTCFullYear() - dobDate.getFullYear();
    return age;
}
