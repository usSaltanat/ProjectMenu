document.addEventListener('DOMContentLoader', () => {
    const from = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    const forbiddenEmailDomains = [];
    async function loadForbiddenEmail() {
        try {
            const responce = await fetch('forbidden-domains.txt');
            if (responce.ok) {
                const text = await responce.text();
                forbiddenEmailDomains.push(...text.split('\n').map(line=>line.trim()));
            } else {
                console.error('не удалось загрузить файл с доменами');
            }
        } catch(error) {
        console.error('Ошибка при загрузке файла.')
        }
    }

    function validateName(name) {
        const nameRegex = /^[a-zA-Zа-яА-ЯЁё\s]{1,100}$/;
        return nameRegex.test(name);
    }

    function validateEmail(email) {
        const emailParts = email.split('@');
        if(emailParts.lenght !==2) return false;
        const domain = emailParts[1].toLowerCase();
        return !forbiddenEmailDomains.includes(domain);
    }
    
    function containsUnsafeCode(value) {
        const unsafeCodeRegex = /<\/?[a-zA-z][\s\S]*>|<script[\s\S]*?<\/script>|<?php[\s\S]*?\?>/i;
        return unsafeCodeRegex.test(value);
    }

    function showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function clearError(input, errorElement) {
        input.classList.Remove('error');
        errorElement.textContent = '';
        errorElement.style.display ='none';
    }

    function validateForm() {
        let isValid = true;
        if(nameInput.value) {
            if(!validateName(nameInput.value)) {
                showError(nameInout, nameError, 'Имя должно содержать только буквы и пробелы и не более 100 символов.')
                isValid = false;
            } else {
                clearError(nameInput, nameError);
            }
        }
 

        if(emailInput.value) {
            if(!validateEmail(emailInput.value)) {
                showError(emailInout, emailError, 'Пожалуйста, используйте корректный домен для электронной почты.')
                isValid = false;
            } else {
                clearError(emailInput, emailError);
            }
        }

        if(messageInput.value) {
            if(!containsUnsafeCode(messageInput.value)) {
                showError(messageInout, messageError, 'Пожалуйста, сообщение не должно содержать HTML, JS или PHP код.')
                isValid = false;
            } else {
                clearError(messageInput, messageError);
            }
        }
        return isValid;
    }

    loadForbiddenEmail().then (() => {
        nameInput.addEventListener('input', validateForm)
        emailInput.addEventListener('input', validateForm)
        messageInput.addEventListener('input', validateForm)

        form.addEventListener('submit', function(event) {
            event.preventDefault();

            if(validateForm()) {
                alert(`Спасибо, ${nameInput.value}! Ваше сообщение отправлено!`);
                from.reset();
            } else {
                alert('Пожалуйста, исправьте ошибки в форме.')
            }
        })
    })

    document.querySelectiorAll('nav', 'a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        })
    })
}) 
})
