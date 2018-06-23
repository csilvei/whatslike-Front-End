app.controller('contatosController', ['$scope', '$http', function($scope, $http) {

    $scope.nome = window.sessionStorage.getItem('nome');
    $scope.nomeContato = window.sessionStorage.getItem('nomeContato');
    $scope.id = window.sessionStorage.getItem('id');
    $scope.ip = window.sessionStorage.getItem('ip');
    $scope.idc = window.sessionStorage.getItem('idContato');

    $scope.contatos = [];

    $scope.add = function (){
        let payload = {};
        let contato = {};
        let payloadContato = {};
        payload.nome = document.getElementById('nome').value;    
        payload.ip = document.getElementById('ip').value;
        //payload.usuario = $scope.id;

        $http.defaults.headers.common['Content-Type'] = 'application/json';
        $http.post("https://whatslike-back-end.herokuapp.com/usuarios/buscarCont",payload).then(function Sucess(data){
            debugger
            if(data){ 
                
                contato = data.data.id;
                payloadContato.usuario = $scope.id;
                payloadContato.contato = contato;
                debugger
                if(payload.nome === $scope.nome && payload.ip === $scope.ip){
                    window.location.href = "https://whatslike-front-end.herokuapp.com/#/errocontatos";
                }else{
                    debugger
                    $http.post("https://whatslike-back-end.herokuapp.com/contatos/existe", payloadContato).then(function Sucess(data){
                        debugger
                        if(data){
                            window.location.href = "https://whatslike-front-end.herokuapp.com/#/errocontatos"; 
                        }
                    },function Error(err) {
                        if(err){
                            debugger
                            $http.post("https://whatslike-back-end.herokuapp.com/contatos", payloadContato).then(function Sucess(data){
                            debugger
                            if(data){
                                    window.location.href = "https://whatslike-front-end.herokuapp.com/#/contatos";   
                                }
                            },function Error(err) {
                                if(err){
                                    window.location.href = "https://whatslike-front-end.herokuapp.com/#/erroContatos";
                                }
                            });       
                        }
                    });
                }
            }
        },function err(err){
            if(err){
                window.location.href = "https://whatslike-front-end.herokuapp.com/#/errocontatos";
            }
        });
    }

    $scope.buscaContatos = function(){
        $http.defaults.headers.common['Content-Type'] = 'application/json';
        $http.get("https://whatslike-back-end.herokuapp.com/contatos/all", $scope.id).then(function Sucess(data){
            if(data){
                let aux = data.data;
                let payload = "";
                debugger
                for (var i in aux){
                    if(aux[i].usuario == $scope.id){
                        payload = aux[i].contato;
                    }else if(aux[i].contato == $scope.id){
                        payload = aux[i].usuario;
                    }
                    $http.defaults.headers.common['Content-Type'] = 'application/json';
                    $http.get(`https://whatslike-back-end.herokuapp.com/usuarios/${payload}`).then(function Sucess(data){
                        if(data){
                            $scope.contatos.push(data.data);
                            debugger
                        }
                    })
                }
            }
        },function Error(err) {
            if(err){
                
            }
        });
    }

    $scope.redirect = function(option){

        switch(option){
            case 'add':
                window.location.href = "https://whatslike-front-end.herokuapp.com/#/cadastrocontatos";
            break;
            case 'voltar':
                window.location.href = "https://whatslike-front-end.herokuapp.com/#/home";
            break;
            case 'voltarMsg':
                window.location.href = "https://whatslike-front-end.herokuapp.com/#/contatos";
            break;
        }
    }

    $scope.fechar = function(){
        window.location.href = "https://whatslike-front-end.herokuapp.com/#/contatos";
   }

   $scope.submit = function(option,id,nome,msgid){

        switch (option){
            case 'msgview':
                $http.defaults.headers.common['Content-Type'] = 'application/json';
                $http.get(`https://whatslike-back-end.herokuapp.com/mensagens/${id}&${$scope.id}`).then(function Sucess(data){
                    if(data){
                        if(data.data){
                            let arrayMsg = [];
                            for (var i in data.data){
                                arrayMsg.push(data.data[i]);    
                            }
                            window.sessionStorage.setItem('idContato', id);
                            window.sessionStorage.setItem('nomeContato', nome);
                            window.location.href = "https://whatslike-front-end.herokuapp.com/#/mensagens";
                        }else{
                            window.location.href = "https://whatslike-front-end.herokuapp.com/#/erromsg";
                        }
                    }
                },function Error(err) {
                    if(err){
                        window.location.href = "https://whatslike-front-end.herokuapp.com/#/erromsg";
                    }
                });
            break;
            case 'msgsend':
                payload = {};
                payload.text = document.getElementById(msgid).value;
                payload.remetente = $scope.id;
                payload.destinatario = id;
                payload.lida = false;
                payload.grupo = false;
                payload.remetenteNome = $scope.nome;
                $http.defaults.headers.common['Content-Type'] = 'application/json';
                $http.post("https://whatslike-back-end.herokuapp.com/mensagens", payload).then(function Sucess(data){
                    if(data){
                        window.location.href = "https://whatslike-front-end.herokuapp.com/#/sucessomsg";
                    }
                },function Error(err) {
                    if(err){
                        window.location.href = "https://whatslike-front-end.herokuapp.com/#/erromsg";
                    }
                });
            break;
        }
   }
    $scope.mensagens = [];

    $scope.msg = function(){

        $http.defaults.headers.common['Content-Type'] = 'application/json';
        $http.get(`https://whatslike-back-end.herokuapp.com/mensagens/${$scope.idc}&${$scope.id}`).then(function Sucess(data){
            debugger
            if(data){
                if(data.data){
                    for (var i in data.data){
                        $scope.mensagens.push(data.data[i]);    
                    }
                }
            }
        })
    }

    $scope.msg();
    $scope.buscaContatos();

}]);