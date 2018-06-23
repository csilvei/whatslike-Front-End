app.controller('loginController', ['$scope', '$http', function($scope, $http) {

    $scope.texto = "";
    $scope.exibeModal = false;
   $scope.login = function(){
        let payload = {};
        payload.nome = document.getElementById('nome').value;    
        payload.ip = document.getElementById('ip').value;
        $http.defaults.headers.common['Content-Type'] = 'application/json';
        $http.post(`https://whatslike-back-end.herokuapp.com/usuarios/buscar`,payload).then(function Sucess(data){
            if(data){
                
                window.sessionStorage.setItem('nome', data.data.nome);
                window.sessionStorage.setItem('ip', data.data.ip); 
                window.sessionStorage.setItem('id', data.data.id);
                window.location.href = "https://whatslike-front-end.herokuapp.com/#/home";
            }
        },function Error(err) {
            if(err){
                window.location.href = "https://whatslike-front-end.herokuapp.com/#/errologin";
            }
        });
   }
   
   $scope.fechaModal = function(){
        $scope.exibeModal = false;
   }


   $scope.cadastro = function(){
        let payload = {};
        payload.nome = document.getElementById('nome').value;    
        payload.ip = document.getElementById('ip').value;
        $http.defaults.headers.common['Content-Type'] = 'application/json';
        $http.post("https://whatslike-back-end.herokuapp.com/usuarios", payload).then(function Sucess(data){
            if(data){
                window.location.href = "https://whatslike-front-end.herokuapp.com/#/sucessocadastro";
            }
        },function Error(err) {
            if(err){
                window.location.href = "https://whatslike-front-end.herokuapp.com/#/errocadastro";
            }
        });
   }

   $scope.fechar = function(){
        window.location.href = "https://whatslike-front-end.herokuapp.com/#/";
   }
   
}]);
