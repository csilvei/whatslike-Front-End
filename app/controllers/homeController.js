app.controller('homeController', ['$scope', '$http', function($scope, $http) {

    $scope.nome = window.sessionStorage.getItem('nome');
    
    $scope.redirect = function(option){

        switch(option){
            case 'contatos':
                window.location.href = "https://whatslike-front-end.herokuapp.com/#/contatos";
            break;
            case 'grupos':
                window.location.href = "https://whatslike-front-end.herokuapp.com/#/grupos";
            break;
            case 'sair':
                let payload = {};
                payload.nome = $scope.nome = window.sessionStorage.getItem('nome');    
                payload.ip = $scope.nome = window.sessionStorage.getItem('ip');
                $http.defaults.headers.common['Content-Type'] = 'application/json';
                $http.post("https://whatslike-back-end.herokuapp.com/usuarios/logout", payload).then(function Sucess(data){
                    if(data){
                        window.location.href = "https://whatslike-front-end.herokuapp.com/#/login";
                    }
                },function Error(err) {
                    if(err){
                        window.location.href = "https://whatslike-front-end.herokuapp.com/#/login";
                    }
                });
            break;
        }
    }

}]);
