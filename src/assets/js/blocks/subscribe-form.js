$(document).ready(function () {
    // Обработка клика на кнопку "Подписаться"
    const subscribeButton = $('#subscribe-form-button')
    subscribeButton.click(function (event) {
        event.preventDefault()
        const email = $('#subscribe-form-email').val()
        if (!email?.trim()) return

        // Проверка на корректный формат email-адреса
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        if (!email || !emailPattern.test(email)) {
            alert('Пожалуйста, введите корректный email-адрес')
            return
        }

        $.ajax({
            type: 'GET',
            url: 'subscribe.json',
            data: {
                email,
            },
            dataType: 'json',
            success: function (data) {
                subscribeButton
                    .text(data.message)
                    .addClass('btn--complete')
                    .prop('disabled', true)
            },
            error: function () {
                alert('Сервер не доступен! Попробуйте позже')
            },
        })
    })
})
