# sprawozdanie z tworzenia zadanie

## Testowane przeglądarki i urządzenie

Projekt utowrzyłam na linuxie (dystrybucja ubuntu) Podczas wykonywania zadania poprawność działania programu spawdzam na przeglądarkch

1. chrome
2. firefox
3. epiphany - przeglądarka oparta na silniku webkit

## Channels

Dane zwracam za pomocą routingu. W tym calu musiałam pobrać biblioteki koa-body i koa-router. Na Frontendzie dane pobieram za pomocą biblioteki axios.

Aby wyświetlić elementy utworzyłam widok pojedyńczego elementy. Następnie go schowałam i za pomcą javyscript klonuję wszystki elementy w zależności od tego co zwraca channels.json 

Do wyszukiwania danego kanału po tekscie dodałam bibliotekę debounce