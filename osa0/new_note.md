sequenceDiagram

    participant browser
    participant server
    participant user

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    servr-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    servr-->>browser: the CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    servr-->>browser: JavaScript file
    deactivate server

    Note right of the browsewr: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": 22023-1-1" }, ...]
    deactivate server

    Note right of browser: The browser execute the callback function that renders the notes

    user->>browser: adds a note in the text field and clicks save
    browser->server: POST https://studies.cs.helsinki.fi/exampleapp/submit-note (with form data)
    activate server
    server-->>browser: 200 OK (note saved)
    deactivate server