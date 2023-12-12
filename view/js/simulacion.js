var miApp = angular.module('miApp', []);
miApp.controller('simulacion', function ($scope) {

  $scope.simulacion = [];
  // $scope.simulacion2=[]

  $scope.tipoSimulacion = "";
  $scope.duracion = "";
  $scope.cantidad = 0;
  $scope.gastosIniciales = "";
  $scope.capital = 0;
  $scope.pago_interese = 0;
  $scope.temporal = 0;
  $scope.intereses = 0;
  $scope.periodo = 0;
  $scope.tipo_periodo = "";

  $scope.showMenu = true;

            $scope.simular=function(){
              $scope.simulacion=[];
              $scope.showMenu = false;
              console.log($scope.showMenu)
              console.log($scope.tipoSimulacion)



              if($scope.tipoSimulacion == "Lineal"){
                console.log("--------LINEAL-------")

                var I = parseFloat($scope.intereses) * 0.01
                console.log ("interes ------ "+ I)
  
                var plazoPagoI = parseInt($scope.pago_interese);
                var interesDenbora = parseInt( $scope.temporal);
                console.log(plazoPagoI +"skjdhfusdfh"+ interesDenbora)

                // calculamos el interes cuando plazoPagoI es distinto a interesDenbora
                  if(plazoPagoI != interesDenbora){
                    console.log(I + "----IIIIII")
                    console.log(interesDenbora+ "---- ddd")
    
                    I = Math.pow( (1+I), (1/plazoPagoI)) 
                    console.log(I)
                    I = I - 1
                    console.log("math pow ----- " + I)
                  }

                  var Aamo = parseInt($scope.cantidad - $scope.periodo)

                  
                  var amortizacion2 = amortizacion;
                  var amorMeta = 0
                  var capital = parseInt($scope.capital)
                  var cuota = 0;
                  
                  var sPeriodo = $scope.periodo

                  $scope.simulacion.push({IndiceLista: 0, cuota: "", intereses: "", amortizacion: "", amorMeta: "", capital: new Intl.NumberFormat('de-DE').format(capital)})

                  if ($scope.tipo_periodo == "ALDIKOA"){
                    for(var i=0; i<sPeriodo;i++){
                      for(var j=1; j<=plazoPagoI; j++){
                        var intereses = capital * I
    
                        $scope.simulacion.push({IndiceLista: 0, cuota: "", intereses: new Intl.NumberFormat('de-DE').format(intereses.toFixed(2)), amortizacion: "", amorMeta: "", capital: new Intl.NumberFormat('de-DE').format(capital.toFixed(2))})
                      }
                    }
                  }else if($scope.tipo_periodo == "TOTALA"){
                    for(var i=0; i<sPeriodo;i++){
                      for(var j=1; j<=plazoPagoI; j++){
                        var intereses = capital * I
                        capital = capital + intereses
    
                        $scope.simulacion.push({IndiceLista: 0, cuota: "", intereses: new Intl.NumberFormat('de-DE').format(intereses.toFixed(2)), amortizacion: "", amorMeta: "", capital: new Intl.NumberFormat('de-DE').format(capital.toFixed(2))})
                      }
                    }
                  }
                  
                  var amortizacion =  capital / Aamo

                  for(var x=1; x<=Aamo; x++){
             //       console.log(capital + " C")
                    for(var i=1;i<=plazoPagoI;i++){
                      console.log(capital + "CCCV")
                      if(plazoPagoI == i ){
                        var intereses = capital * I
                        console.log("Interes C "+intereses)
                        amorMeta = amorMeta + amortizacion
                        cuota = intereses + amortizacion
                        amortizacion2 = amortizacion;
      
                        capital = capital - amortizacion;
      
                        console.log("AmorMeta --- "+ amorMeta)
                        console.log("amortizacion --- "+ amortizacion)
                        console.log("cuota --- "+ cuota)
    
                        
      
                      }else{
                        var intereses = capital * I
                        amortizacion2 = 0
                        cuota = intereses
    
                      }
      
                      $scope.simulacion.push({IndiceLista: i+","+x, cuota: new Intl.NumberFormat('de-DE').format(cuota.toFixed(2)), intereses: new Intl.NumberFormat('de-DE').format(intereses.toFixed(2)), amortizacion: new Intl.NumberFormat('de-DE').format(amortizacion2), amorMeta: new Intl.NumberFormat('de-DE').format(amorMeta), capital: new Intl.NumberFormat('de-DE').format(capital)})
      
                    }
                }
       ////////////////////////////////////////////////////////       
              }else if ($scope.tipoSimulacion == "Frances"){
                var capital = parseInt($scope.capital)

                var plazoPagoI = parseInt($scope.pago_interese);
                var interesDenbora = parseInt( $scope.temporal);

                var I = parseFloat($scope.intereses) * 0.01
                console.log ("interes ------ "+ I)

                if (plazoPagoI != interesDenbora){
                  var I = Math.pow((1+I), (1/plazoPagoI))-1
                  console.log(I + "   -----  interes I")
                }

                console.log(I)
                console.log(capital)
                console.log($scope.cantidad)
                console.log(plazoPagoI)

                console.log("resultado :)")
                var A = (capital * I) / ((Math.pow(1+I, parseInt($scope.cantidad))) - 1)
                console.log(A)

                var intereses = capital * I
                console.log(intereses)

                var cantidad = parseInt($scope.cantidad) 
                var amorMeta = 0

                var p = parseInt($scope.cantidad - $scope.periodo);
                
                var sPeriodo = parseInt($scope.periodo)
                
                $scope.simulacion.push({IndiceLista: 0, cuota: "", intereses: "", amortizacion: "", amorMeta: "", capital: new Intl.NumberFormat('de-DE').format(capital.toFixed(2))})
               if($scope.tipo_periodo == "ALDIKOA"){
                for(var i=0; i<sPeriodo;i++){
                  for(var j=1; j<=plazoPagoI; j++){
                    var interes = capital * I

                    $scope.simulacion.push({IndiceLista: 0, cuota: new Intl.NumberFormat('de-DE').format(interes.toFixed(2)), intereses: "", amortizacion: "", amorMeta: "", capital: new Intl.NumberFormat('de-DE').format(capital.toFixed(2))})

                  }
                }
               }else if($scope.tipo_periodo == "TOTALA"){
                for(var i=0; i<sPeriodo;i++){
                  for(var j=1; j<=plazoPagoI; j++){
                    var interes = capital * I
                    capital = capital + interes

                    $scope.simulacion.push({IndiceLista: 0, cuota: 0, intereses: "", amortizacion: "", amorMeta: "", capital: new Intl.NumberFormat('de-DE').format(capital.toFixed(2))})

                  }
                }
               }
                

                var pp = p

                for(var i=0; i<pp; i++){
                  console.log(i + " I "+ p + "p")
                  
                  for(var j=1; j<=plazoPagoI; j++){
                    if(plazoPagoI == j){
                      var interes = capital * I
                      var A = (capital * I) / ((Math.pow(1+I, p)) - 1)
                      
                      var a = A + interes
                      capital = capital - A
                      amorMeta = amorMeta + A
                      p--

                    }else{
                      var interes = capital * I
                      var a = interes
                      var A = 0

                    }
                    $scope.simulacion.push({IndiceLista: i+","+j, cuota: new Intl.NumberFormat('de-DE').format(a.toFixed(2)), intereses: new Intl.NumberFormat('de-DE').format(interes.toFixed(2)), amortizacion: new Intl.NumberFormat('de-DE').format(A.toFixed(2)), amorMeta: new Intl.NumberFormat('de-DE').format(amorMeta.toFixed(2)), capital: new Intl.NumberFormat('de-DE').format(capital.toFixed(2))})

                  }

                }


              }else if($scope.tipoSimulacion == "Americano"){
                var capital = parseInt($scope.capital)

                var plazoPagoI = parseInt($scope.pago_interese);
                var interesDenbora = parseInt( $scope.temporal);

                var I = parseFloat($scope.intereses) * 0.01
                console.log ("interes ------ "+ I)

                var interes = capital * I
                console.log(interes + "  --- Interes")

                var amorMeta = 0
                var cant = $scope.cantidad

                $scope.simulacion.push({IndiceLista: 0, cuota: "", intereses: "", amortizacion: "", amorMeta: "", capital: new Intl.NumberFormat('de-DE').format(capital.toFixed(2))})

                for(var i=1; i<=cant;i++){

                    if(cant == i){
                      var A = capital
                      var a = interes + A
                      amorMeta = A 
                      capital = capital - capital


                    }else{
                      var a = interes
                      var A = 0
                      


                    }
                    $scope.simulacion.push({IndiceLista: i, cuota: new Intl.NumberFormat('de-DE').format(a.toFixed(2)), intereses: new Intl.NumberFormat('de-DE').format(interes.toFixed(2)), amortizacion: new Intl.NumberFormat('de-DE').format(A.toFixed(2)), amorMeta: new Intl.NumberFormat('de-DE').format(amorMeta.toFixed(2)), capital: new Intl.NumberFormat('de-DE').format(capital.toFixed(2))})


                  
                }
                /////////////////////////////////////////////////////////////////////////
              }else if($scope.tipoSimulacion == "Simple"){
                var capital = parseInt($scope.capital)

                var plazoPagoI = parseInt($scope.pago_interese);
                var interesDenbora = parseInt( $scope.temporal);

                var I = parseFloat($scope.intereses) * 0.01
                console.log ("interes ------ "+ I)

                var amorMeta = 0
                var cant = $scope.cantidad

                $scope.simulacion.push({IndiceLista: 0, cuota: "", intereses: "", amortizacion: "", amorMeta: "", capital: new Intl.NumberFormat('de-DE').format(capital.toFixed(2))})

                for(var i=1; i<=cant;i++){
                  if($scope.cantidad == i){
                    
                    var A = capital
                    amorMeta = A
                    var a = capital * Math.pow((1+I), cant)
                    console.log(a)

                    var interes = a - capital
                    capital = capital - capital 

                  }else{
                    var interes = 0
                    var a = 0
                    var A = 0
                    
                   

                  }
                  $scope.simulacion.push({IndiceLista: i, cuota: new Intl.NumberFormat('de-DE').format(a.toFixed(2)), intereses: new Intl.NumberFormat('de-DE').format(interes.toFixed(2)), amortizacion: new Intl.NumberFormat('de-DE').format(A.toFixed(2)), amorMeta: new Intl.NumberFormat('de-DE').format(amorMeta.toFixed(2)), capital: new Intl.NumberFormat('de-DE').format(capital.toFixed(2))})

                }

              }
              

    console.log($scope.simulacion)

    $scope.showTabla = true
  }

  $scope.simularVolver = function () {
    $scope.showMenu = true;
    $scope.showTabla = false
  }



});