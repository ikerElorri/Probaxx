var miApp = angular.module("miApp", []);
miApp.controller("miControlador", function ($scope) {
    $scope.LISTA = [];
    $scope.tipoSimulacion = "";
    $scope.capital = 0;
    $scope.CapitalPendiente = 0;
    $scope.Duracion = "";
    $scope.cantidad = 0;
    $scope.PeriodoPago = "";
    $scope.temporal = "";
    $scope.intereses = 0;
    $scope.Interes = 0;
    $scope.AmortizazioMetatua = 0;
    $scope.Amortizazioa = 0;
    $scope.Periodo = 0;


    $scope.Prestamo = function () {
        console.log("$scope.tipoSimulacion " + $scope.tipoSimulacion)
        console.log("$scope.pago_interese" + $scope.pago_interese);
        TasaInteres = parseFloat($scope.intereses) * 0.01;
        ///////////////////////////////////////////////////////////CALCULAR INTERES EFECTIVO/////////////////////
        TIE = Math.pow((1 + TasaInteres), 1 / $scope.pago_interese) - 1;
        console.log("TIE " + TIE)

        /////////////////////////////////////////////////////////////////////////////////////////////////
        if (($scope.tipoSimulacion == 'Lineal') && ($scope.pago_interese == '1')) {
            $scope.mostrarTabla = "true";
            $scope.Amortizazioa = $scope.capital / $scope.cantidad;
            $scope.CapitalPendiente = $scope.capital;
            for (let i = 0; i < $scope.cantidad; i++) {
                console.log(i);
                $scope.AmortizazioMetatua = $scope.AmortizazioMetatua + $scope.Amortizazioa;
                $scope.InteresKuota = $scope.CapitalPendiente * TIE;
                $scope.Kuota = $scope.Amortizazioa + $scope.InteresKuota;
                $scope.CapitalPendiente = $scope.CapitalPendiente - $scope.Amortizazioa;
                Amortizazioa = new Intl.NumberFormat('de-DE').format($scope.Amortizazioa.toFixed(2));
                Amortizazioa = ponerDecimales(Amortizazioa);///////////////////////////////////////////////////////////
                AmorMetatua = new Intl.NumberFormat('de-DE').format($scope.AmortizazioMetatua.toFixed(2));
                AmorMetatua = ponerDecimales(AmorMetatua);///////////////////////////////////////////////////////////
                IntKuota = new Intl.NumberFormat('de-DE').format($scope.InteresKuota.toFixed(2));
                IntKuota = ponerDecimales(IntKuota);///////////////////////////////////////////////////////////
                KuotaTotal = new Intl.NumberFormat('de-DE').format($scope.Kuota.toFixed(2));
                KuotaTotal = ponerDecimales(KuotaTotal);///////////////////////////////////////////////////////////
                Pendiente = new Intl.NumberFormat('de-DE').format($scope.CapitalPendiente.toFixed(2));
                Pendiente = ponerDecimales(Pendiente);///////////////////////////////////////////////////////////
                Peri = i + 1;

                $scope.LISTA.push({
                    Periodo: Peri, Kuota: KuotaTotal, InteresKuota: IntKuota, Amortizazioa: Amortizazioa, AmortizazioMetatua: AmorMetatua, CapitalPendiente: Pendiente
                });
            }
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////
        if (($scope.tipoSimulacion == 'Lineal') && ($scope.pago_interese == '2')) {
            $scope.mostrarTabla = "true";
            $scope.Amortizazioa = $scope.capital / $scope.cantidad;
            tramosPago = $scope.cantidad * 2;
            $scope.CapitalPendiente = $scope.capital;

            for (let i = 1; i <= tramosPago; i++) {

                $scope.InteresKuota = $scope.CapitalPendiente * TIE;
                if ((i % 2) == 0) {

                    kutoaAmortizazioa = $scope.Amortizazioa;
                }
                else {

                    kutoaAmortizazioa = 0;
                }
                $scope.Kuota = kutoaAmortizazioa + $scope.InteresKuota;
                $scope.AmortizazioMetatua = $scope.AmortizazioMetatua + kutoaAmortizazioa;
                $scope.CapitalPendiente = $scope.CapitalPendiente - kutoaAmortizazioa;
                $scope.Periodo = i;
                AmorMetatua = new Intl.NumberFormat('de-DE').format($scope.AmortizazioMetatua.toFixed(2));
                AmorMetatua = ponerDecimales(AmorMetatua);///////////////////////////////////////////////////////////
                IntKuota = new Intl.NumberFormat('de-DE').format($scope.InteresKuota.toFixed(2));
                IntKuota = ponerDecimales(IntKuota);///////////////////////////////////////////////////////////
                KuotaTotal = new Intl.NumberFormat('de-DE').format($scope.Kuota.toFixed(2));
                KuotaTotal = ponerDecimales(KuotaTotal);///////////////////////////////////////////////////////////
                Pendiente = new Intl.NumberFormat('de-DE').format($scope.CapitalPendiente.toFixed(2));
                Pendiente = ponerDecimales(Pendiente);///////////////////////////////////////////////////////////
                Peri = i;
                $scope.LISTA[i] = {
                    Periodo: Peri,
                    Kuota: KuotaTotal,
                    InteresKuota: IntKuota,
                    Amortizazioa: kutoaAmortizazioa,
                    AmortizazioMetatua: AmorMetatua,
                    CapitalPendiente: Pendiente
                };
            }
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////
        if (($scope.tipoSimulacion == 'Lineal') && ($scope.pago_interese == '3')) {
            $scope.mostrarTabla = "true";
            $scope.Amortizazioa = $scope.capital / $scope.cantidad;

            tramosPago = $scope.cantidad * 3;
            $scope.CapitalPendiente = $scope.capital;

            for (let i = 1; i <= tramosPago; i++) {

                $scope.InteresKuota = $scope.CapitalPendiente * TIE;
                if ((i % 3) == 0) {

                    kutoaAmortizazioa = $scope.Amortizazioa;
                }
                else {

                    kutoaAmortizazioa = 0;
                }
                $scope.Kuota = kutoaAmortizazioa + $scope.InteresKuota;
                $scope.AmortizazioMetatua = $scope.AmortizazioMetatua + kutoaAmortizazioa;
                $scope.CapitalPendiente = $scope.CapitalPendiente - kutoaAmortizazioa;
                $scope.Periodo = i;
                AmorMetatua = new Intl.NumberFormat('de-DE').format($scope.AmortizazioMetatua.toFixed(2));
                AmorMetatua = ponerDecimales(AmorMetatua);///////////////////////////////////////////////////////////
                IntKuota = new Intl.NumberFormat('de-DE').format($scope.InteresKuota.toFixed(2));
                IntKuota = ponerDecimales(IntKuota);///////////////////////////////////////////////////////////
                KuotaTotal = new Intl.NumberFormat('de-DE').format($scope.Kuota.toFixed(2));
                KuotaTotal = ponerDecimales(KuotaTotal);///////////////////////////////////////////////////////////
                Pendiente = new Intl.NumberFormat('de-DE').format($scope.CapitalPendiente.toFixed(2));
                Pendiente = ponerDecimales(Pendiente);///////////////////////////////////////////////////////////
                Peri = i;
                $scope.LISTA[i] = {
                    Periodo: Peri,
                    Kuota: KuotaTotal,
                    InteresKuota: IntKuota,
                    Amortizazioa: kutoaAmortizazioa,
                    AmortizazioMetatua: AmorMetatua,
                    CapitalPendiente: Pendiente
                };
            }
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        if (($scope.tipoSimulacion == 'Lineal') && ($scope.pago_interese == '12')) {
            $scope.mostrarTabla = "true";
            $scope.Amortizazioa = $scope.capital / $scope.cantidad;

            tramosPago = $scope.cantidad * 12;
            $scope.CapitalPendiente = $scope.capital;

            for (let i = 1; i <= tramosPago; i++) {

                $scope.InteresKuota = $scope.CapitalPendiente * TIE;
                if ((i % 12) == 0) {

                    kutoaAmortizazioa = $scope.Amortizazioa;
                }
                else {

                    kutoaAmortizazioa = 0;
                }
                $scope.Kuota = kutoaAmortizazioa + $scope.InteresKuota;
                $scope.AmortizazioMetatua = $scope.AmortizazioMetatua + kutoaAmortizazioa;
                $scope.CapitalPendiente = $scope.CapitalPendiente - kutoaAmortizazioa;
                $scope.Periodo = i;
                AmorMetatua = new Intl.NumberFormat('de-DE').format($scope.AmortizazioMetatua.toFixed(2));
                AmorMetatua = ponerDecimales(AmorMetatua);///////////////////////////////////////////////////////////
                IntKuota = new Intl.NumberFormat('de-DE').format($scope.InteresKuota.toFixed(2));
                IntKuota = ponerDecimales(IntKuota);///////////////////////////////////////////////////////////
                KuotaTotal = new Intl.NumberFormat('de-DE').format($scope.Kuota.toFixed(2));
                KuotaTotal = ponerDecimales(KuotaTotal);///////////////////////////////////////////////////////////
                Pendiente = new Intl.NumberFormat('de-DE').format($scope.CapitalPendiente.toFixed(2));
                Pendiente = ponerDecimales(Pendiente);///////////////////////////////////////////////////////////
                Peri = i;
                $scope.LISTA[i] = {
                    Periodo: Peri,
                    Kuota: KuotaTotal,
                    InteresKuota: IntKuota,
                    Amortizazioa: kutoaAmortizazioa,
                    AmortizazioMetatua: AmorMetatua,
                    CapitalPendiente: Pendiente
                };
            }
        }

    }
});
function ponerDecimales(Zenbakia) {
    luzera = Zenbakia.length;
    indiceComa = Zenbakia.indexOf(",");
    if (indiceComa < 0) {
        Zenbakia = Zenbakia + ",00";
    } if ((luzera - indiceComa) == 2) {
        Zenbakia = Zenbakia + "0";
    }
    return Zenbakia;
}