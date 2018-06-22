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
        $http.post("http://localhost:8080/usuarios/buscarCont",payload).then(function Sucess(data){
            debugger
            if(data){ 
                
                contato = data.data.id;
                payloadContato.usuario = $scope.id;
                payloadContato.contato = contato;
                debugger
                if(payload.nome === $scope.nome && payload.ip === $scope.ip){
                    window.location.href = "http://localhost:7000/#/errocontatos";
                }else{
                    debugger
                    $http.post("http://localhost:8080/contatos/existe", payloadContato).then(function Sucess(data){
                        debugger
                        if(data){
                            window.location.href = "http://localhost:7000/#/errocontatos"; 
                        }
                    },function Error(err) {
                        if(err){
                            debugger
                            $http.post("http://localhost:8080/contatos", payloadContato).then(function Sucess(data){
                            debugger
                            if(data){
                                    window.location.href = "http://localhost:7000/#/contatos";   
                                }
                            },function Error(err) {
                                if(err){
                                    window.location.href = "http://localhost:7000/#/erroContatos";
                                }
                            });       
                        }
                    });
                }
            }
        },function err(err){
            if(err){
                window.location.href = "http://localhost:7000/#/errocontatos";
            }
        });
    }

    $scope.buscaContatos = function(){
        $http.defaults.headers.common['Content-Type'] = 'application/json';
        $http.get("http://localhost:8080/contatos/all", $scope.id).then(function Sucess(data){
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
                    $http.get(`http://localhost:8080/usuarios/${payload}`).then(function Sucess(data){
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
                window.location.href = "http://localhost:7000/#/cadastrocontatos";
            break;
            case 'voltar':
                window.location.href = "http://localhost:7000/#/home";
            break;
            case 'voltarMsg':
                window.location.href = "http://localhost:7000/#/contatos";
            break;
        }
    }

    $scope.fechar = function(){
        window.location.href = "http://localhost:7000/#/contatos";
   }

   $scope.submit = function(option,id,nome,msgid){

        switch (option){
            case 'msgview':
                $http.defaults.headers.common['Content-Type'] = 'application/json';
                $http.get(`http://localhost:8080/mensagens/${id}&${$scope.id}`).then(function Sucess(data){
                    if(data){
                        if(data.data){
                            let arrayMsg = [];
                            for (var i in data.data){
                                arrayMsg.push(data.data[i]);    
                            }
                            window.sessionStorage.setItem('idContato', id);
                            window.sessionStorage.setItem('nomeContato', nome);
                            window.location.href = "http://localhost:7000/#/mensagens";
                        }else{
                            window.location.href = "http://localhost:7000/#/erromsg";
                        }
                    }
                },function Error(err) {
                    if(err){
                        window.location.href = "http://localhost:7000/#/erromsg";
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
                $http.post("http://localhost:8080/mensagens", payload).then(function Sucess(data){
                    if(data){
                        window.location.href = "http://localhost:7000/#/sucessomsg";
                    }
                },function Error(err) {
                    if(err){
                        window.location.href = "http://localhost:7000/#/erromsg";
                    }
                });
            break;
        }
   }
    $scope.mensagens = [];

    $scope.msg = function(){

        $http.defaults.headers.common['Content-Type'] = 'application/json';
        $http.get(`http://localhost:8080/mensagens/${$scope.idc}&${$scope.id}`).then(function Sucess(data){
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