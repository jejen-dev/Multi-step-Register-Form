const form = document.getElementById('multi-step-form');
const nextBtn = document.getElementById('next-btn');
const stepLabel = document.getElementById('step-label');
const dots = document.querySelectorAll('.dot');

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');

const summaryName = document.getElementById('summary-name');
const summaryEmail = document.getElementById('summary-email');
const summaryTopic = document.getElementById('summary-topic');

const topicCheckboxes = document.querySelectorAll('input[name="topics"]');
const toast = document.getElementById('toast');

const step1 = document.querySelector('.step1');
const step2 = document.querySelector('.step2');
const step3 = document.querySelector('.step3');

const stepContainers = [step1, step2, step3];

let currentStep = 1;
const totalSteps = dots.length;

let selectedTopics = [];

/* TOAST FUNCTION */
function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

/* GET SELECTED TOPICS */
function getSelectedTopics() {
    return Array.from(topicCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
}

/* EMAIL VALIDATION */
function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

updateUI();

nextBtn.addEventListener('click', () => {

    if (currentStep === 1) {

        if (nameInput.value.trim() === '') {
            showToast("Silakan masukkan nama Anda");
            return;
        }

        if (emailInput.value.trim() === '') {
            showToast("Silakan masukkan email Anda");
            return;
        }

        if (!isValidEmail(emailInput.value.trim())) {
            showToast("Email tidak valid");
            return;
        }

    }

    if (currentStep === 2) {

        selectedTopics = getSelectedTopics();

        if (selectedTopics.length === 0) {
            showToast("Pilih minimal 1 topik");
            return;
        }

        summaryName.textContent = nameInput.value;
        summaryEmail.textContent = emailInput.value;

        summaryTopic.innerHTML = "";
        selectedTopics.forEach(topic => {
            const li = document.createElement("li");
            li.textContent = topic;
            summaryTopic.appendChild(li);
        });

    }

    if (currentStep < totalSteps) {
        currentStep++;
    } else {
        showToast("SUCCES🥳 !!!");
    }

    updateUI();

});

function updateUI() {

    stepLabel.textContent = `Step ${currentStep} of ${totalSteps}`;

    dots.forEach((dot, index) => {
        if (index === currentStep - 1) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });

    stepContainers.forEach((container, index) => {
        if (index === currentStep - 1) {
            container.style.display = 'block';
        } else {
            container.style.display = 'none';
        }
    });
}