var app = angular.module("App", ['ngRoute']);

app.config(function($routeProvider){
    $routeProvider
    .when("/",{
        templateUrl: "templates/login.html",
        controller: 'loginController'
    })
    .when("/sucessocadastro",{
        templateUrl: "templates/sucessoCadastro.html",
        controller: 'loginController'
    })
    .when("/errocadastro",{
        templateUrl: "templates/erroCadastro.html",
        controller: 'loginController'
    })
    .when("/errologin",{
        templateUrl: "templates/erroLogin.html"
    })
    .when("/contatos",{
        templateUrl: "templates/contatos.html"
    })
    .when("/grupos",{
        templateUrl: "templates/grupos.html",
        controller: 'gruposController'
    })
    .when("/cadastrogrupos",{
        templateUrl: "templates/cadastroGrupos.html",
        controller: 'gruposController'
    })
    .when("/sucessocadastrogrupos",{
        templateUrl: "templates/sucessoCadastroGrupos.html",
        controller: 'gruposController'
    })
    .when("/errogrupos",{
        templateUrl: "templates/erroGrupos.html",
        controller: 'gruposController'
    })
    .when("/grupos",{
        templateUrl: "templates/grupos.html",
        controller: 'gruposController'
    })
    .when("/cadastrocontatos",{
        templateUrl: "templates/cadastroContatos.html",
        controller: 'contatosController'
    })
    .when("/errocontatos",{
        templateUrl: "templates/erroContatos.html",
        controller: 'contatosController'
    })
    .when("/erromsg",{
        templateUrl: "templates/erroMensagens.html",
        controller: 'contatosController'
    })
    .when("/sucessomsg",{
        templateUrl: "templates/sucessoMensagem.html",
        controller: 'contatosController'
    })
    .when("/sucessomsgG",{
        templateUrl: "templates/sucessoMensagemGrupo.html",
        controller: 'gruposController'
    })
    .when("/erromsgG",{
        templateUrl: "templates/erroMensagemGrupo.html",
        controller: 'gruposController'
    })
    .when("/mensagens",{
        templateUrl: "templates/mensagens.html",
        controller: 'contatosController'
    })
    .when("/grupos",{
        templateUrl: "templates/grupos.html",
        controller: 'contatosController'
    })
    .when("/mensagensG",{
        templateUrl: "templates/mensagensGrupo.html",
        controller: 'gruposController'
    })
    .when("/home",{
        templateUrl: "templates/home.html",
        controller: 'homeController'
    })

    .otherwise({redirectTo : "/"});
});