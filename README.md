# 4-я проектная работа - Mesto.
Яндекс.Практикум курс Web-разработчик студент Роман Шигапов.

Проект можно посмотреть по [ссылке](https://romanshigapov.github.io/mesto/)
### Описание
Веб-приложение, содержащее в себе профиль пользователя и карточки мест, с фотографиями и описанием места.

Создан для демонстрации работы с сайтом через JS, реализованно появление Popup формы для редактирования, параметров профиля.

Адаптирован для просмотра с любого устройства.

### Технологии

* __БЭМ__
    * Файловая структура nested модели, блоки разнесены по собственным папкам в корневой папке blocks, элементы и модификаторы расположены внутри папок родительских блоков, и имеют свои собственные папки. Каждый блок, элемент и модификатор имеет свой файл стиля который подключается через @import в файл index.css.
    * Названия классов соответствует БЭМ концепции.

* __HTML__
    * Использование семантических тэгов, списков для улучшения доступности сайта для людей с ограничениями по зрению.
    * Валидная разметка с правильной структурой заголовков так же использован атрибут aria-label.

* __CSS__
    * Использование flexbox и grid для создания адаптивного сайта, так же широко используется директива @media.
    * Используется блочная модель с позиционированием сложных элементов.
    * Работа с Popup формой.

* __JS__
    * Поиск в DOM
    * Обработка значений инпутов и замена текстовых значений элементов
    * Работа с классами элементов.
    * Функции и обработчики событий EventListener/

### Макет
Макет можно посмотреть по [ссылке](https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1)


