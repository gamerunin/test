$(document).ready(function() {
    // Обработка клика на кнопку "Подписаться"
    const subscribeButton = $("#subscribe-form-button");
    subscribeButton.click(function(event) {
        event.preventDefault();
        const email = $("#subscribe-form-email").val();
        if(!email?.trim()) return;

        $.ajax({
            type: "GET",
            url: "subscribe.json",
            data: {
                email
            },
            dataType: "json",
            success: function(data) {
                subscribeButton.text(data.message).addClass("btn--complete").prop("disabled", true);
            },
            error: function() {
                alert("Сервер не доступен! Попробуйте позже");
            }
        });
    });
});