sequenceDiagram where the user adds a new note to the single-page app

    participant browser
    participant server
    participant user

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->browser: the CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->browser: [{ "content": 2HTML is easy", "date": "2023-1-1" }, ...]
    deactivate server

    Note right of browser: The browser execute the callback function that render notes

    user->>browser: adds note in the text field and click save
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/submit-note (with user form data)
    activate server
    server-->>browser: 200 OK (note saved and added)
    deactivate server