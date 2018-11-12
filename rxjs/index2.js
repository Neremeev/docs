//install jquery v.3.2.1
// в вк создаем новое приложение, чтобы получить токен(standalone Application) инструкция в видосе
// приложение: вводишь id в инпут(только число) - получаешь и выводишь юзера
function getUserById(id) {
    // объект параметров коорые отправляем на сервер
    const params = {
        access_token: '547a815314348f7693aa5d246e7f2dfc06326e659082d5b0498edc6f96c7fa390ab547e02b4ce6fde65f6',
        user_ids: id,
        fields: 'photo_big'
    };

    return $.ajax({
        url: 'https://api.vk.com/method/users.get?' + $.param(params),
        type: 'GET',
        dataType: 'JSONP'
    }).promise();
}

Rx.Observable.fromEvent($('input'), 'keyup')
    .pluck('target', 'value')
    .distinct()
    .debounceTime(2000)
    .mergeMap(v => Rx.Observable.fromPromise(getUserById(v)))
.catch(error => Rx.Observable.of(error))
.map(x => x.response[0])
.subscribe(
    (user) => {
    $('h1').html(`${user.first_name} ${user.last_name} <i>${user.uid}</i>`);
$('img').attr('src', user.photo_big);
},
error => console.log(error),
    () => console.log('Completed')
);