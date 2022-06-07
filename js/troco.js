$(document).ready(function(){
    let note50, note20, note10, note5, note2, note1;
    let coin50, coin25, coin10, coin5, coin1;

    // marcar quais notas e moedas, ele não vai fazer a contagem
    let markMoney50, markMoney20, markMoney10, markMoney5, markMoney2;
    let markCoin50, markCoin25, markCoin10, markCoin5;
    
    let accountDisplay = "", moneyDisplay = "";
    
    // estruturas HMTL do dinheiro e das moedas
    let moneyHTML;
    let coinHTML;

    // cálculo do troco
    $('#calculateThing').click(function(){
        
        // valor da conta
        let account;

        // dinheiro do cliente
        let clientMoney;

        let value;

        account = parseFloat($('#account').val());
        clientMoney = parseFloat($('#clientMoney').val());

        // verifica se os campos estão vazios
        if($('#account').val() == "" || $('#clientMoney').val() == "")
            alert("ERRO\nPreencha os campos numéricos corretamente!");

        // verifica se o dinheiro informado, é maior que o valor da conta
        else if(clientMoney < account)
            alert("ATENÇÃO!\nO dinheiro é insuficiente para pagar a conta!")
        
        // faz o cálculo do troco
        else {
            markNotesIsCoins();
            value = clientMoney - account;
            let entirePart = parseInt(value);
            let centavosFloat = value - entirePart;
            let cents = Math.round(centavosFloat*100);
            $('#thing').val(value.toFixed(2)).css('background','#000').css('border','1px solid #FFF');
            moneyHTML = countMoneyNotes(entirePart);
            coinHTML = countMoneyCents(cents);

            $('#moneys').html(moneyHTML);
            $('#coins').html(coinHTML);
        }
    });

    // testa para ver quais opções de notas e moedas que o sistema não fará a contagem
    function markNotesIsCoins(){
        markMoney50 = $('#box-note-50').is(':checked');
        markMoney20 = $('#box-note-20').is(':checked');
        markMoney10 = $('#box-note-10').is(':checked');
        markMoney5 = $('#box-note-5').is(':checked');
        markMoney2 = $('#box-note-2').is(':checked');
        markCoin50 = $('#box-coin-50').is(':checked');
        markCoin25 = $('#box-coin-25').is(':checked');
        markCoin10 = $('#box-coin-10').is(':checked');
        markCoin5 = $('#box-coin-5').is(':checked');
    }

    // foca/desfoca campos conta e campo troco
    $('#account').focus(function(){
        $(this).css('background','#000').css('border','1px solid #FFF');
        $('#thing').css('background','#212429').css('border','1px dotted #FFF');
    });
    $('#account').blur(function(){
        $(this).css('background','#212429').css('border','1px dotted #FFF');
    });

    // foca/desfoca campos dinheiroCliente e campo troco
    $('#clientMoney').focus(function(){
        $(this).css('background','#000').css('border','1px solid #FFF');
        $('#thing').css('background','#212429').css('border','1px dotted #FFF');
    });
    $('#clientMoney').blur(function(){
        $(this).css('background','#212429').css('border','1px dotted #FFF');
    });

    // testa digitação no campo conta
    $('#account').keyup(function(){
        let flag;
        accountDisplay = $(this).val();
        var tecla = (window.event)?event.keyCode:e.wich;
        
        // teclas de números, teclado numérico e vírgula
        if( (tecla > 47 && tecla < 58) || (tecla > 95 && tecla < 106) || (tecla == 190 || tecla == 194))
            //console.log(`if accountDisplay ${accountDisplay}`);              
            flag = true;
        
            // tecla backspace
        else if(tecla == 8){
            accountDisplay = accountDisplay.substr(0, accountDisplay.length);
        }

        // teclas das letras
        else {
            accountDisplay = accountDisplay.substr(0, accountDisplay.length - 1);
        }
        
        // atualiza o campo conta
        $(this).val(accountDisplay);

    });

    // testa digitação no campo dinheiroCliente
    $('#clientMoney').keyup(function(){
        var flag;
        moneyDisplay = $(this).val();
        var tecla = (window.event)?event.keyCode:e.wich;
        
        // teclas de números e vírgula
        if( (tecla > 47 && tecla < 58) || (tecla > 95 && tecla < 106) || (tecla == 190) )
            flag = true;              
        
        // tecla backspace
        else if(tecla == 8){
            moneyDisplay = moneyDisplay.substr(0, moneyDisplay.length);
        }

        // teclas das letras
        else {
            moneyDisplay = moneyDisplay.substr(0, moneyDisplay.length - 1);
            flag = true;
        }
        
        // atualiza o campo conta
        $(this).val(moneyDisplay);

    });
    
    // contagem das cédulas de dinheiro
    function countMoneyNotes(money){
        let html = "";
        let col = '3';
        let tip = "imgMoney";

        if(money == 0)
        money = 0;

        else {
            if(money >= 50 && !markMoney50) {
                note50 = parseInt(money / 50);
                money %= 50;
                html += buildHTML("img/cedula-50-reais.jpg",note50,col,tip);
            }
            if(money >= 20 && !markMoney20){
                note20 = parseInt(money / 20);
                money %= 20;
                html += buildHTML("img/cedula-20-reais.jpg",note20,col,tip);
            }
            if(money >= 10 && !markMoney10){
                note10 = parseInt(money / 10);
                money %= 10;
                html += buildHTML("img/cedula-10-reais.jpg",note10,col,tip);
            }
            if(money >= 5 && !markMoney5){
                note5 = parseInt(money / 5);
                money %= 5;
                html += buildHTML("img/cedula-5-reais.jpg",note5,col,tip);
            }
                if(money >= 2 && !markMoney2){
                note2 = parseInt(money / 2);
                money %= 2;
                html += buildHTML("img/cedula-2-reais.jpg",note2,col,tip);
            }
            if(money >= 1){
                note1 = money / 1;
                html += buildHTML("img/moeda-1-real-4.jpg",note1,col,"imgCoin");
            }
    
        }
        return html;
    }

    // contagem das moedas de centavos
    function countMoneyCents(cents){
        let html = "";
        let col = '3';
        let tip = "imgCoin";

        if(cents == 0)
            cents = 0;
        else {
            if(cents >= 50 && !markCoin50){
                coin50 = parseInt(cents / 50);
                cents %= 50;
                html += buildHTML("img/moeda-50-centavos.jpg",coin50,col,tip);
            }
            if(cents >= 25 && !markCoin25){
                coin25 = parseInt(cents / 25);
                cents %= 25;
                html += buildHTML("img/moeda-25-centavos.jpg",coin25,col,tip);
            }
            if(cents >= 10 && !markCoin10){
                coin10 = parseInt(cents / 10);
                cents %= 10;
                html += buildHTML("img/moeda-10-centavos.jpg",coin10,col,tip);
            }
            if(cents >= 5 && !markCoin5){
                coin5 = parseInt(cents / 5);
                cents %= 5;
                html += buildHTML("img/moeda-5-centavos.jpg",coin5,col,tip);
            }
            if(cents >= 1){
                coin1 = cents / 1;
                html += buildHTML("img/moeda-1-centavo.jpg",coin1,col,tip);
            }
        }
        return html;
    }

    function buildHTML(img,quant,numCol,tipMoney){
        let codeHTML = `<div class="text-center col-${numCol}">
                    <div>
                        <img id="${tipMoney}" class="p-1" src="${img}">
                        <h4 class="text-center">${quant}</h4>
                    </div>
                    </div>`;
        return codeHTML;
    }

});