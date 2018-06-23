app.controller('gruposController', ['$scope', '$http', function($scope, $http) {

    $scope.nome = window.sessionStorage.getItem('nome');
    $scope.nomeGrupo = window.sessionStorage.getItem('nomeGrupo');
    $scope.id = window.sessionStorage.getItem('id');
    $scope.ip = window.sessionStorage.getItem('ip');
    $scope.idc = window.sessionStorage.getItem('idGrupo');
    $scope.grupos = [];
    $scope.contatos = [];
    $scope.listaAdd = [];
    $scope.listaNomes = [];
    $scope.auxGruposMsg = [];

    $scope.addLista = function(item,nome){
        $scope.listaAdd.push(item);
        $scope.listaNomes.push(nome);
    }

    $scope.removeLista = function(item,nome){
        let index = $scope.listaAdd.indexOf(item);

        if ( index > -1) {

            $scope.listaAdd.splice(index, 1);
          
          }
          let indexn = $scope.listaNomes.indexOf(nome);

          if ( indexn > -1) {
  
              $scope.listaNomes.splice(indexn, 1);
            
            }  
    }

    $scope.add = function (){
        let payload = {};
        payload = document.getElementById('nome').value;    

        $scope.listaAdd.push(parseInt($scope.id));
        if(!$scope.listaAdd.length || $scope.listaAdd.length > 8){
            window.location.href = "http://localhost:7000/#/errogrupos"; 
        }else{
            $http.defaults.headers.common['Content-Type'] = 'application/json';
            $http.post("https://whatslike-back-end.herokuapp.com/grupos/existe",payload).then(function Sucess(data){
                if(data){ 
                    window.location.href = "http://localhost:7000/#/errogrupos";
                }
            },function err(err){
                if(err){
                    let paygrupo = {};
                    paygrupo.nome = payload;
                    $http.defaults.headers.common['Content-Type'] = 'application/json';
                    $http.post("https://whatslike-back-end.herokuapp.com/grupos",paygrupo).then(function Sucess(data){
                        if(data){ 

                            let aux = data.data;
                            let payaux = [];
                            payaux.push(parseInt(aux.id));
                            for( var i in $scope.listaAdd){
                                payaux.push($scope.listaAdd[i]);
                            }
                            $http.defaults.headers.common['Content-Type'] = 'application/json';
                            $http.post("https://whatslike-back-end.herokuapp.com/gruposMembros",payaux).then(function Sucess(data){
                                if(data){
                                    $scope.buscaGrupos();
                                    window.location.href = "http://localhost:7000/#/sucessocadastrogrupos";
                                }
                            })
                        }
                    },function err(){
                        window.location.href = "http://localhost:7000/#/errogrupos";
                    })
                }
            })
        }
    }

    $scope.buscaContatos = function(){
        $http.defaults.headers.common['Content-Type'] = 'application/json';
        $http.get("https://whatslike-back-end.herokuapp.com/contatos/all", $scope.id).then(function Sucess(data){
            if(data){
                let aux = data.data;
                let payload = "";
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
                        }
                    })
                }
            }
        },function Error(err) {
            if(err){
                
            }
        });
    }
    $scope.gruposAux = [];
    $scope.buscaGrupos = function(){
        $http.defaults.headers.common['Content-Type'] = 'application/json';
        $http.get("https://whatslike-back-end.herokuapp.com/gruposMembros/all").then(function Sucess(data){
            if(data){
                let aux = data.data;
                for (var i in aux){
                    if(aux[i].membro == $scope.id){
                        $scope.gruposAux.push(aux[i].grupo);
                    }
                }
                $http.defaults.headers.common['Content-Type'] = 'application/json';
                $http.get("https://whatslike-back-end.herokuapp.com/grupos/all", $scope.id).then(function Sucess(data){

                    if(data){
                        let aux = data.data;
                        let auxgrup = false;
                        for(var i in aux){
                            for (var j in $scope.gruposAux){
                                auxgrup = false;
                                if(aux[i].id === $scope.gruposAux[j]){
                                    for (var k in $scope.grupos){
                                        if(!auxgrup){
                                            if($scope.grupos[k].id ===  aux[i].id){
                                                auxgrup = true;    
                                            }    
                                        }
                                    }
                                    if(!auxgrup){
                                        $scope.grupos.push(aux[i]);
                                    }
                                }
                            }
                        }
                    }

                })
            }
        })
    }

    $scope.redirect = function(option){

        switch(option){
            case 'add':
                window.location.href = "http://localhost:7000/#/cadastrogrupos";
            break;
            case 'voltar':
                window.location.href = "http://localhost:7000/#/home";
            break;
            case 'voltarMsg':
                window.location.href = "http://localhost:7000/#/grupos";
            break;
        }
    }

    $scope.fechar = function(){
        window.location.href = "http://localhost:7000/#/grupos";
   }

   $scope.submit = function(option,id,nome,msgid){
        switch (option){
            case 'msgview':
                $http.defaults.headers.common['Content-Type'] = 'application/json';
                let payload = [];
                payload.push(id);
                $scope.id = parseInt($scope.id);
                payload.push($scope.id);
                $http.post(`https://whatslike-back-end.herokuapp.com/mensagens/grupos`,payload).then(function Sucess(data){
                    if(data){
                            window.sessionStorage.setItem('idGrupo', id);
                            window.sessionStorage.setItem('nomeGrupo', nome);
                            window.location.href = "http://localhost:7000/#/mensagensG";
                    }else{
                        window.location.href = "http://localhost:7000/#/erromsgG";
                    }
                },function Error(err) {
                    if(err){
                        window.location.href = "http://localhost:7000/#/erromsgG";
                    }
                });
            break;
            case 'msgsend':
                payloads = {};
                payloads.text = document.getElementById(msgid).value;
                payloads.remetente = $scope.id;
                payloads.destinatario = id;
                payloads.lida = false;
                payloads.grupo = true;
                payloads.remetenteNome = $scope.nome;
                $http.defaults.headers.common['Content-Type'] = 'application/json';
                $http.post("https://whatslike-back-end.herokuapp.com/mensagens", payloads).then(function Sucess(data){
                    if(data){
                        $scope.payloadMsgGrupo = [];
                        $scope.payloadMsgGrupo.push(id);
                        $scope.payloadMsgGrupo.push(data.data.id);
                        $http.get("https://whatslike-back-end.herokuapp.com/gruposMembros/all").then(function Sucess(data){
                            if(data){
                                let aux = data.data;
                                for (var i in aux){
                                    if(aux[i].grupo == id){
                                        $scope.payloadMsgGrupo.push(aux[i].membro);
                                    }
                                }
                                $http.post("https://whatslike-back-end.herokuapp.com/mensagemgrupos",$scope.payloadMsgGrupo).then(function Sucess(data){
                                    if(data){
                                        
                                        window.location.href = "http://localhost:7000/#/sucessomsgG";
                                    }
                                })    
                                
                            }
                        })    
                    }    
                    },function Error(err) {
                        if(err){
                            window.location.href = "http://localhost:7000/#/erromsgG";
                        }
                    });
            break;
        }
   }
    $scope.mensagens = [];
    
    $scope.msg = function(){
        $scope.idc = parseInt($scope.idc);
        $http.defaults.headers.common['Content-Type'] = 'application/json';
        $http.get(`https://whatslike-back-end.herokuapp.com/mensagens/grupos/${$scope.idc}`).then(function Sucess(data){
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
    $scope.buscaGrupos();
    $scope.buscaContatos();

}]);