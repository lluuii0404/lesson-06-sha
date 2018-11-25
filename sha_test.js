var script = document.createElement("script")

script.src = "https://cdn.rawgit.com/chrisveness/crypto/4e93a4d/sha256.js"

document.head.appendChild(script)

var elements = [
    {
        tagName: "div",
        insertIn: "body",
        attrs: {
            id: "wrapper",
            style: `
                margin: 0 auto;
                max-width: 300px;
                height: 550px;
                border: 2px solid cyan;
                border-radius: 10px;
                padding: 10px;
                background-color: #20B2AA;
            `
        }
    },
    {
        tagName: "p",
        insertIn: "#wrapper",
        attrs: {
            innerText: "Форма входа / регистрации пользователя",
            style: `
                font-size: 20px;
                margin: 15px 10px;
                text-align: center;
            `
        }
    },
    {
        tagName: "form",
        insertIn: "#wrapper",
        attrs: {
            id: "formRegistration",
        }
    },
    {
        tagName: "p",
        insertIn: "#formRegistration",
        attrs: {
            innerText: `  Если Вы еще не загеристрированный пользователь, введите свои данный и нажмите 'Зарегистрироваться'.
  Если Вы уже регистрировались, введите почту и пароль и нажмите 'Войти'`,
            style: `
                font-size: 16px;
                margin: 5px 10px 15px 10px;
                text-align: justify;
            `
        }
    },
    {
        tagName: "lable",
        insertIn: "#formRegistration",
        attrs: {
            innerText: "Введите Имя: ",
            id: "lable-name",
            placeholder: "User Name",
            style: `
                font-size: 18px;
                margin: 10px 10px;
                font-style: italic;
            `
        }
    },
    {
        tagName: "input",
        insertIn: "#lable-name",
        attrs: {
            type: "text",
            id: "inpt-name",
            style: `
                width: 95%;
                font-size: 18px;
                margin: 10px 10px;
            `
        }
    },
    {
        tagName: "lable",
        insertIn: "#formRegistration",
        attrs: {
            innerText: "Введите E-mail:* ",
            id: "lable-log",
            placeholder: "login",
            style: `
                font-size: 18px;
                margin: 10px 10px;
                font-style: italic;
            `
        }
    },
    {
        tagName: "input",
        insertIn: "#lable-log",
        attrs: {
            type: "text",
            id: "inpt-mail",
            style: `
                width: 95%;
                font-size: 18px;
                margin: 10px 10px;
            `
        }
    },
    {
        tagName: "lable",
        insertIn: "#formRegistration",
        attrs: {
            innerText: "Введите пароль:* ",
            id: "lable-pass",
            placeholder: "password",
            style: `
                font-size: 18px;
                margin: 10px 10px;
                font-style: italic;
            `
        }
    },
    {
        tagName: "input",
        insertIn: "#lable-pass",
        attrs: {
            type: "password",
            id: "inpt-pass",
            style: `
                width: 95%;
                font-size: 18px;
                margin: 10px 10px;
            `
        }
    },
    {
        tagName: "p",
        insertIn: "#formRegistration",
        attrs: {
            innerText: "",
            style: `
                font-size: 16px;
                margin: 5px 10px;
                text-align: center;
            `
        }
    },
    {
        tagName: "button",
        insertIn: "#formRegistration",
        
        attrs: {
            innerText: "Зарегистрироваться",
            id: "regist",
            
            style: `
                font-size: 18px;
                margin: 10px 10px;
                padding: 10px 25px;
                border-radius: 20px;
            `
        }
    },
    {
        tagName: "button",
        insertIn: "#formRegistration",
        
        attrs: {
            innerText: "Войти",
            id: "enter",
            style: `
                font-size: 18px;
                margin: 10px 10px;
                padding: 10px 25px;
                border-radius: 20px;
            `
        }
    },
]

elements.forEach ( elemObj => {
    var elem = document.querySelector( [ elemObj.insertIn ] ).appendChild (
        document.createElement ( elemObj.tagName )
    )
    for ( var attr in elemObj.attrs ) {
        elem [ attr ] = elemObj.attrs [ attr ]
    }
})

var users = []

var message = document.createElement("p")
message.style = "font-size: 22px; color: red "
message.id="message"
document.body.appendChild(message)


function init () {
    var userName = document.querySelector("#inpt-name")
    var userEmail = document.querySelector("#inpt-mail")
    var userPass = document.querySelector("#inpt-pass")
    if (!userName.value || !userEmail.value || !userPass.value) return
    var hash = Sha256.hash(userPass.value + userEmail.value)
    users.push({
        "key": `${hash}`,
        "name": `${userName.value}`,
        "email": `${userEmail.value}`
    })
    return users
}

function cleaner () {
    document.querySelector("#inpt-name").value = ""
    document.querySelector("#inpt-mail").value = ""
    document.querySelector("#inpt-pass").value = ""
}

function clickHandlerRegistration (event) {
    event.preventDefault()
    var userArr = init()
    if (!userArr) {
        document.querySelector("#message").innerText = "*Заполните все поля ввода"
        return
    }
    
    var name
    for (var ind in userArr) {
        if (userArr[ind]["name"] === document.querySelector("#inpt-name").value)  
            name = userArr[ind]["name"]
    }
    
    document.querySelector("#message").style = "color: black; font-size: 20px"
    document.querySelector("#message").innerText = name + ", успешно загеристрировался"

    cleaner()
}

function createNewWindow(usName) {
    var newWin = window.open('about:blank')
    newWin.console.log("Hello")
        
    var body = newWin.document.body
    
    body.style = `margin: 20px auto;
        max-width: 500px;
        height: 350px;
        border: 2px solid cyan;
        border-radius: 10px;
        padding: 10px;
        background-color: #20B2AA;
        `
    var div = newWin.document.createElement("div")
    body.appendChild(div)
        
    var avatar = newWin.document.createElement("img")
    avatar.src = "https://intellihr.com.au/wp-content/uploads/2017/06/avatar_placeholder_temporary.png"
    avatar.style = `
                    display: block;
                    width: 150px;
                    height: 150px;
                    border: 1px solid cyan;
                    border-radius: 50%;
                    margin: 15px auto;
                   `
    div.appendChild(avatar)

    var text = newWin.document.createElement("p")
    text.style = "font-size: 30px; color: black; text-align: center; margin: 30px 0"
    text.innerHTML = "Добро пожаловать, " + usName + "!"
    div.appendChild(text)

}

function clickHandlerEnter (event) {
    event.preventDefault()

    if (users.length === 0) {
        document.querySelector("#message").style = "font-size: 22px; color: red "
        document.querySelector("#message").innerText = "Сначало зарегистрируйтеся"
    } else {
        var userEmail = document.querySelector("#inpt-mail")
        var userPass = document.querySelector("#inpt-pass")
        if (!userEmail.value || !userPass.value) return
        var hash = Sha256.hash(userPass.value + userEmail.value)

        for (var ind in users) {
            if (document.querySelector("#inpt-mail").value === users[ind]["email"] && hash === users[ind]["key"]) { 
                document.querySelector("#message").style = "color: black; font-size: 20px"
                document.querySelector("#message").innerText = "Hello " + users[ind]["name"] 
                createNewWindow(users[ind]["name"])
            }
            else { 
                document.querySelector("#message").style = "font-size: 22px; color: red "
                document.querySelector("#message").innerText = "*Неверное введены данные"
            }

        }
        cleaner()
    }
    
}

var btnRegistration = document.querySelector("#regist")
btnRegistration.addEventListener ( 'click', clickHandlerRegistration )

var btnEnter = document.querySelector("#enter")
btnEnter.addEventListener ( 'click', clickHandlerEnter )

