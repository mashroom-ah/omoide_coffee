// script.js
const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('#nav-menu');

toggle.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', !expanded);
  menu.classList.toggle('open');
});

// Валидация формы контактов
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    // Элементы формы
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    // Регулярные выражения для валидации
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    
    // Функция показа ошибки
    function showError(field, message) {
        field.setAttribute('aria-invalid', 'true');
        const errorElement = document.getElementById(field.id + '-error');
        if (errorElement) {
            errorElement.textContent = message;
        }
        
        // Визуальное выделение поля
        field.style.borderColor = 'var(--color-red)';
        field.style.backgroundColor = 'rgba(178, 48, 48, 0.05)';
    }
    
    // Функция очистки ошибки
    function clearError(field) {
        field.setAttribute('aria-invalid', 'false');
        const errorElement = document.getElementById(field.id + '-error');
        if (errorElement) {
            errorElement.textContent = '';
        }
        
        // Возврат нормального стиля
        field.style.borderColor = '';
        field.style.backgroundColor = '';
    }
    
    // Валидация имени
    function validateName() {
        const value = nameInput.value.trim();
        if (!value) {
            showError(nameInput, 'Пожалуйста, введите ваше имя');
            return false;
        }
        if (value.length < 2) {
            showError(nameInput, 'Имя должно содержать минимум 2 символа');
            return false;
        }
        clearError(nameInput);
        return true;
    }
    
    // Валидация email
    function validateEmail() {
        const value = emailInput.value.trim();
        if (!value) {
            showError(emailInput, 'Пожалуйста, введите email');
            return false;
        }
        if (!emailRegex.test(value)) {
            showError(emailInput, 'Пожалуйста, введите корректный email');
            return false;
        }
        clearError(emailInput);
        return true;
    }
    
    // Валидация телефона (необязательное поле)
    function validatePhone() {
        const value = phoneInput.value.trim();
        if (value && !phoneRegex.test(value)) {
            showError(phoneInput, 'Пожалуйста, введите корректный номер телефона');
            return false;
        }
        clearError(phoneInput);
        return true;
    }
    
    // Валидация темы
    function validateSubject() {
        const value = subjectInput.value;
        if (!value) {
            showError(subjectInput, 'Пожалуйста, выберите тему обращения');
            return false;
        }
        clearError(subjectInput);
        return true;
    }
    
    // Валидация сообщения
    function validateMessage() {
        const value = messageInput.value.trim();
        if (!value) {
            showError(messageInput, 'Пожалуйста, введите ваше сообщение');
            return false;
        }
        if (value.length < 10) {
            showError(messageInput, 'Сообщение должно содержать минимум 10 символов');
            return false;
        }
        clearError(messageInput);
        return true;
    }
    
    // Общая валидация формы
    function validateForm() {
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();
        
        return isNameValid && isEmailValid && isPhoneValid && isSubjectValid && isMessageValid;
    }
    
    // Обработчики событий для полей
    nameInput.addEventListener('blur', validateName);
    nameInput.addEventListener('input', function() {
        if (this.getAttribute('aria-invalid') === 'true') {
            validateName();
        }
    });
    
    emailInput.addEventListener('blur', validateEmail);
    emailInput.addEventListener('input', function() {
        if (this.getAttribute('aria-invalid') === 'true') {
            validateEmail();
        }
    });
    
    phoneInput.addEventListener('blur', validatePhone);
    phoneInput.addEventListener('input', function() {
        if (this.getAttribute('aria-invalid') === 'true') {
            validatePhone();
        }
    });
    
    subjectInput.addEventListener('change', validateSubject);
    subjectInput.addEventListener('blur', validateSubject);
    
    messageInput.addEventListener('blur', validateMessage);
    messageInput.addEventListener('input', function() {
        if (this.getAttribute('aria-invalid') === 'true') {
            validateMessage();
        }
        
        // Счетчик символов
        const charCount = this.value.length;
        const hintElement = document.getElementById('message-hint');
        if (hintElement) {
            hintElement.textContent = `Опишите ваш вопрос подробно (${charCount}/250)`;
        }
    });
    
    // Обработчик отправки формы
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (validateForm()) {
            // Симуляция успешной отправки
            showSuccessMessage();
            
            // В реальном проекте здесь был бы AJAX запрос
            // this.submit();
        } else {
            // Фокусировка на первом невалидном поле
            const firstInvalid = this.querySelector('[aria-invalid="true"]');
            if (firstInvalid) {
                firstInvalid.focus();
            }
            
            // Сообщение для скринридера
            showAlertMessage('Пожалуйста, исправьте ошибки в форме');
        }
    });
    
    // Функция показа успешного сообщения
    function showSuccessMessage() {
        // Создаем элемент для сообщения об успехе
        let successElement = document.getElementById('form-success');
        
        if (!successElement) {
            successElement = document.createElement('div');
            successElement.id = 'form-success';
            successElement.setAttribute('aria-live', 'polite');
            successElement.className = 'success-message';
            contactForm.appendChild(successElement);
        }
        
        successElement.textContent = '✅ Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.';
        successElement.style.display = 'block';
        
        // Очистка формы
        contactForm.reset();
        
        // Сброс всех ошибок
        clearError(nameInput);
        clearError(emailInput);
        clearError(phoneInput);
        clearError(subjectInput);
        clearError(messageInput);
        
        // Автоматическое скрытие сообщения
        setTimeout(() => {
            successElement.style.display = 'none';
        }, 5000);
    }
    
    // Функция показа сообщения для скринридера
    function showAlertMessage(message) {
        let alertElement = document.getElementById('form-alert');
        
        if (!alertElement) {
            alertElement = document.createElement('div');
            alertElement.id = 'form-alert';
            alertElement.setAttribute('aria-live', 'assertive');
            alertElement.setAttribute('role', 'alert');
            alertElement.className = 'alert-message';
            alertElement.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
            document.body.appendChild(alertElement);
        }
        
        alertElement.textContent = message;
        
        // Очистка для следующего сообщения
        setTimeout(() => {
            alertElement.textContent = '';
        }, 3000);
    }
    
    // Инициализация счетчика символов для сообщения
    const messageHint = document.getElementById('message-hint');
    if (messageHint && messageInput) {
        messageHint.textContent = `Опишите ваш вопрос подробно (${messageInput.value.length}/250)`;
    }
});