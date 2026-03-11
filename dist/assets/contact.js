var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
};

function escapeHtml(string) {
    return String(string).replace(/[&<>"'`=\/]/g, function (s) {
        return entityMap[s];
    });
}

function elToSafeJson(el) {
    return escapeHtml(el.val());
}

function getAlertHtml(text) {
    return '<div class="alert alert-info"><strong>' + text + '</strong></div>'
}

$('.b-contact').submit(function () {
    var $form = $(this);
    var $email = $form.find('input[name="email"]');
    var $name = $form.find('input[name="name"]');
    var $how = $form.find('input[name="how"]');
    var $message = $form.find('textarea[name="message"]');
    var $submit = $form.find('input[name="submit"]');
    var $dataStatus = $form.find('.data-status');

    if ($email.val().trim() == "") {

        $dataStatus.show().html(getAlertHtml("Email can't be blank"));
    } else {

        $email.attr('disabled', 'disabled');
        $name.attr('disabled', 'disabled');
        $how.attr('disabled', 'disabled');
        $message.attr('disabled', 'disabled');
        $submit.attr('disabled', 'disabled');
        $dataStatus.show().html(getAlertHtml("Loading..."));

        $.post(Routes.contact_us_pages_path(), {
            email: elToSafeJson($email),
            name: elToSafeJson($name),
            how: elToSafeJson($how),
            message: elToSafeJson($message)
        })
            .done(function (data) {
                console.log(data);
                $email.removeAttr('disabled');
                $name.removeAttr('disabled');
                $how.removeAttr('disabled');
                $message.removeAttr('disabled');
                $submit.removeAttr('disabled');
                if (data.success) {
                    $dataStatus.html(getAlertHtml("Message Sent Successfully")).fadeIn();
                } else {
                    $dataStatus.html(getAlertHtml("Message did not send, please try again later")).fadeIn();
                }
            });
    }

    return false;
});

