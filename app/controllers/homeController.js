app.controller('homeController', ['$scope', '$http', function($scope, $http) {

    $scope.nome = window.sessionStorage.getItem('nome');
    
    $scope.redirect = function(option){

        switch(option){
            case 'contatos':
                window.location.href = "http://localhost:7000/#/contatos";
            break;
            case 'grupos':
                window.location.href = "http://localhost:7000/#/grupos";
            break;
            case 'sair':
                let payload = {};
                payload.nome = $scope.nome = window.sessionStorage.getItem('nome');    
                payload.ip = $scope.nome = window.sessionStorage.getItem('ip');
                $http.defaults.headers.common['Content-Type'] = 'application/json';
                $http.post("https://whatslike-back-end.herokuapp.com/usuarios/logout", payload).then(function Sucess(data){
                    if(data){
                        window.location.href = "http://localhost:7000/#/login";
                    }
                },function Error(err) {
                    if(err){
                        window.location.href = "http://localhost:7000/#/login";
                    }
                });
            break;
        }
    }

}]);
