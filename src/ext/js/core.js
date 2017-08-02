var data = new Array();
var counter = 0;

function teste() {
        
    var i1 = document.getElementById("instruction_name");
    var registers_list = document.getElementById("registers_list");
    var registers_list02 = document.getElementById("registers_list02");
    var registers_list03 = document.getElementById("registers_list03");

    

    if(i1.value == "ADDD" || i1.value == "SUBD" || i1.value == "MULTD" || i1.value == "DIVD") {
        registers_list.innerHTML = "<option value='F0'> F0 </option>" + 
                                "<option value='F2'> F2 </option>" +
                                "<option value='F4'> F4 </option>" + 
                                "<option value='F6'> F6 </option>" + 
                                "<option value='F8'> F8 </option>" + 
                                "<option value='F10'> F10 </option>" + 
                                "<option value='F12'> F12 </option>" + 
                                "<option value='F14'> F14 </option>" + 
                                "<option value='F16'> F16 </option>";

        registers_list02.innerHTML = "<option value='F0'> F0 </option>" + 
                                "<option value='F2'> F2 </option>" +
                                "<option value='F4'> F4 </option>" + 
                                "<option value='F6'> F6 </option>" + 
                                "<option value='F8'> F8 </option>" + 
                                "<option value='F10'> F10 </option>" + 
                                "<option value='F12'> F12 </option>" + 
                                "<option value='F14'> F14 </option>" + 
                                "<option value='F16'> F16 </option>";
        
        registers_list03.innerHTML = "<option value='F0'> F0 </option>" + 
                                "<option value='F2'> F2 </option>" +
                                "<option value='F4'> F4 </option>" + 
                                "<option value='F6'> F6 </option>" + 
                                "<option value='F8'> F8 </option>" + 
                                "<option value='F10'> F10 </option>" + 
                                "<option value='F12'> F12 </option>" + 
                                "<option value='F14'> F14 </option>" + 
                                "<option value='F16'> F16 </option>";

    }else if(i1.value == "LD" || i1.value == "SD") {
        registers_list.innerHTML = "<option value='F0'> F0 </option>" + 
                                "<option value='F2'> F2 </option>" +
                                "<option value='F4'> F4 </option>" + 
                                "<option value='F6'> F6 </option>" + 
                                "<option value='F8'> F8 </option>" + 
                                "<option value='F10'> F10 </option>" + 
                                "<option value='F12'> F12 </option>" + 
                                "<option value='F14'> F14 </option>";

        var offset = prompt("Insira o valor do offset de memoria:");
        registers_list02.innerHTML = "<option value='"+offset+"'>"+offset+"</option>";
        registers_list03.innerHTML = "<option value='R0'> R0 </option>" + 
                                "<option value='R1'> R1 </option>" +
                                "<option value='R2'> R2 </option>" + 
                                "<option value='R3'> R3 </option>" + 
                                "<option value='R4'> R4 </option>" + 
                                "<option value='R5'> R5 </option>" + 
                                "<option value='R6'> R6 </option>" + 
                                "<option value='R7'> R7 </option>" +
                                "<option value='R8'> R8 </option>" +
                                "<option value='R9'> R9 </option>" +
                                "<option value='R10'> R10 </option>" +
                                "<option value='R11'> R11 </option>" +
                                "<option value='R12'> R12 </option>" +
                                "<option value='R13'> R13 </option>" +
                                "<option value='R14'> R14 </option>" +
                                "<option value='R15'> R15 </option>" +
                                "<option value='R16'> R16 </option>" +
                                "<option value='R17'> R17 </option>" +
                                "<option value='R18'> R18 </option>" +
                                "<option value='R19'> R19 </option>" +
                                "<option value='R20'> R20 </option>" +
                                "<option value='R21'> R21 </option>" +
                                "<option value='R22'> R22 </option>" +
                                "<option value='R23'> R23 </option>" +
                                "<option value='R24'> R24 </option>" +
                                "<option value='R25'> R25 </option>" +
                                "<option value='R26'> R26 </option>" +
                                "<option value='R27'> R27 </option>" +
                                "<option value='R28'> R28 </option>" + 
                                "<option value='R29'> R29 </option>" +
                                "<option value='R30'> R30 </option>" +
                                "<option value='R31'> R31 </option>" +
                                "<option value='R32'> R32 </option>";
    }else if(i1.value == "ADD") {
        registers_list.innerHTML = "<option value='R0'> R0 </option>" + 
                                "<option value='R1'> R1 </option>" +
                                "<option value='R2'> R2 </option>" + 
                                "<option value='R3'> R3 </option>" + 
                                "<option value='R4'> R4 </option>" + 
                                "<option value='R5'> R5 </option>" + 
                                "<option value='R6'> R6 </option>" + 
                                "<option value='R7'> R7 </option>" +
                                "<option value='R8'> R8 </option>" +
                                "<option value='R9'> R9 </option>" +
                                "<option value='R10'> R10 </option>" +
                                "<option value='R11'> R11 </option>" +
                                "<option value='R12'> R12 </option>" +
                                "<option value='R13'> R13 </option>" +
                                "<option value='R14'> R14 </option>" +
                                "<option value='R15'> R15 </option>" +
                                "<option value='R16'> R16 </option>" +
                                "<option value='R17'> R17 </option>" +
                                "<option value='R18'> R18 </option>" +
                                "<option value='R19'> R19 </option>" +
                                "<option value='R20'> R20 </option>" +
                                "<option value='R21'> R21 </option>" +
                                "<option value='R22'> R22 </option>" +
                                "<option value='R23'> R23 </option>" +
                                "<option value='R24'> R24 </option>" +
                                "<option value='R25'> R25 </option>" +
                                "<option value='R26'> R26 </option>" +
                                "<option value='R27'> R27 </option>" +
                                "<option value='R28'> R28 </option>" + 
                                "<option value='R29'> R29 </option>" +
                                "<option value='R30'> R30 </option>" +
                                "<option value='R31'> R31 </option>" +
                                "<option value='R32'> R32 </option>";

        registers_list02.innerHTML = "<option value='R0'> R0 </option>" + 
                                "<option value='R1'> R1 </option>" +
                                "<option value='R2'> R2 </option>" + 
                                "<option value='R3'> R3 </option>" + 
                                "<option value='R4'> R4 </option>" + 
                                "<option value='R5'> R5 </option>" + 
                                "<option value='R6'> R6 </option>" + 
                                "<option value='R7'> R7 </option>" +
                                "<option value='R8'> R8 </option>" +
                                "<option value='R9'> R9 </option>" +
                                "<option value='R10'> R10 </option>" +
                                "<option value='R11'> R11 </option>" +
                                "<option value='R12'> R12 </option>" +
                                "<option value='R13'> R13 </option>" +
                                "<option value='R14'> R14 </option>" +
                                "<option value='R15'> R15 </option>" +
                                "<option value='R16'> R16 </option>" +
                                "<option value='R17'> R17 </option>" +
                                "<option value='R18'> R18 </option>" +
                                "<option value='R19'> R19 </option>" +
                                "<option value='R20'> R20 </option>" +
                                "<option value='R21'> R21 </option>" +
                                "<option value='R22'> R22 </option>" +
                                "<option value='R23'> R23 </option>" +
                                "<option value='R24'> R24 </option>" +
                                "<option value='R25'> R25 </option>" +
                                "<option value='R26'> R26 </option>" +
                                "<option value='R27'> R27 </option>" +
                                "<option value='R28'> R28 </option>" + 
                                "<option value='R29'> R29 </option>" +
                                "<option value='R30'> R30 </option>" +
                                "<option value='R31'> R31 </option>" +
                                "<option value='R32'> R32 </option>";
        
        registers_list03.innerHTML = "<option value='R0'> R0 </option>" + 
                                "<option value='R1'> R1 </option>" +
                                "<option value='R2'> R2 </option>" + 
                                "<option value='R3'> R3 </option>" + 
                                "<option value='R4'> R4 </option>" + 
                                "<option value='R5'> R5 </option>" + 
                                "<option value='R6'> R6 </option>" + 
                                "<option value='R7'> R7 </option>" +
                                "<option value='R8'> R8 </option>" +
                                "<option value='R9'> R9 </option>" +
                                "<option value='R10'> R10 </option>" +
                                "<option value='R11'> R11 </option>" +
                                "<option value='R12'> R12 </option>" +
                                "<option value='R13'> R13 </option>" +
                                "<option value='R14'> R14 </option>" +
                                "<option value='R15'> R15 </option>" +
                                "<option value='R16'> R16 </option>" +
                                "<option value='R17'> R17 </option>" +
                                "<option value='R18'> R18 </option>" +
                                "<option value='R19'> R19 </option>" +
                                "<option value='R20'> R20 </option>" +
                                "<option value='R21'> R21 </option>" +
                                "<option value='R22'> R22 </option>" +
                                "<option value='R23'> R23 </option>" +
                                "<option value='R24'> R24 </option>" +
                                "<option value='R25'> R25 </option>" +
                                "<option value='R26'> R26 </option>" +
                                "<option value='R27'> R27 </option>" +
                                "<option value='R28'> R28 </option>" + 
                                "<option value='R29'> R29 </option>" +
                                "<option value='R30'> R30 </option>" +
                                "<option value='R31'> R31 </option>" +
                                "<option value='R32'> R32 </option>";
    }else if(i1.value == "DADDUI") {
        registers_list.innerHTML = "<option value='R0'> R0 </option>" + 
                                "<option value='R1'> R1 </option>" +
                                "<option value='R2'> R2 </option>" + 
                                "<option value='R3'> R3 </option>" + 
                                "<option value='R4'> R4 </option>" + 
                                "<option value='R5'> R5 </option>" + 
                                "<option value='R6'> R6 </option>" + 
                                "<option value='R7'> R7 </option>" +
                                "<option value='R8'> R8 </option>" +
                                "<option value='R9'> R9 </option>" +
                                "<option value='R10'> R10 </option>" +
                                "<option value='R11'> R11 </option>" +
                                "<option value='R12'> R12 </option>" +
                                "<option value='R13'> R13 </option>" +
                                "<option value='R14'> R14 </option>" +
                                "<option value='R15'> R15 </option>" +
                                "<option value='R16'> R16 </option>" +
                                "<option value='R17'> R17 </option>" +
                                "<option value='R18'> R18 </option>" +
                                "<option value='R19'> R19 </option>" +
                                "<option value='R20'> R20 </option>" +
                                "<option value='R21'> R21 </option>" +
                                "<option value='R22'> R22 </option>" +
                                "<option value='R23'> R23 </option>" +
                                "<option value='R24'> R24 </option>" +
                                "<option value='R25'> R25 </option>" +
                                "<option value='R26'> R26 </option>" +
                                "<option value='R27'> R27 </option>" +
                                "<option value='R28'> R28 </option>" + 
                                "<option value='R29'> R29 </option>" +
                                "<option value='R30'> R30 </option>" +
                                "<option value='R31'> R31 </option>" +
                                "<option value='R32'> R32 </option>";
        registers_list02.innerHTML = "<option value='R0'> R0 </option>" + 
                                "<option value='R1'> R1 </option>" +
                                "<option value='R2'> R2 </option>" + 
                                "<option value='R3'> R3 </option>" + 
                                "<option value='R4'> R4 </option>" + 
                                "<option value='R5'> R5 </option>" + 
                                "<option value='R6'> R6 </option>" + 
                                "<option value='R7'> R7 </option>" +
                                "<option value='R8'> R8 </option>" +
                                "<option value='R9'> R9 </option>" +
                                "<option value='R10'> R10 </option>" +
                                "<option value='R11'> R11 </option>" +
                                "<option value='R12'> R12 </option>" +
                                "<option value='R13'> R13 </option>" +
                                "<option value='R14'> R14 </option>" +
                                "<option value='R15'> R15 </option>" +
                                "<option value='R16'> R16 </option>" +
                                "<option value='R17'> R17 </option>" +
                                "<option value='R18'> R18 </option>" +
                                "<option value='R19'> R19 </option>" +
                                "<option value='R20'> R20 </option>" +
                                "<option value='R21'> R21 </option>" +
                                "<option value='R22'> R22 </option>" +
                                "<option value='R23'> R23 </option>" +
                                "<option value='R24'> R24 </option>" +
                                "<option value='R25'> R25 </option>" +
                                "<option value='R26'> R26 </option>" +
                                "<option value='R27'> R27 </option>" +
                                "<option value='R28'> R28 </option>" + 
                                "<option value='R29'> R29 </option>" +
                                "<option value='R30'> R30 </option>" +
                                "<option value='R31'> R31 </option>" +
                                "<option value='R32'> R32 </option>";
        //ESSA MERDA DE CAMPO TEM QUE SER O IMEDIATO INTEIRO
        registers_list03.innerHTML = "<option value='R0'> R0 </option>" + 
                                "<option value='R1'> R1 </option>" +
                                "<option value='R2'> R2 </option>" + 
                                "<option value='R3'> R3 </option>" + 
                                "<option value='R4'> R4 </option>" + 
                                "<option value='R5'> R5 </option>" + 
                                "<option value='R6'> R6 </option>" + 
                                "<option value='R7'> R7 </option>" +
                                "<option value='R8'> R8 </option>" +
                                "<option value='R9'> R9 </option>" +
                                "<option value='R10'> R10 </option>" +
                                "<option value='R11'> R11 </option>" +
                                "<option value='R12'> R12 </option>" +
                                "<option value='R13'> R13 </option>" +
                                "<option value='R14'> R14 </option>" +
                                "<option value='R15'> R15 </option>" +
                                "<option value='R16'> R16 </option>" +
                                "<option value='R17'> R17 </option>" +
                                "<option value='R18'> R18 </option>" +
                                "<option value='R19'> R19 </option>" +
                                "<option value='R20'> R20 </option>" +
                                "<option value='R21'> R21 </option>" +
                                "<option value='R22'> R22 </option>" +
                                "<option value='R23'> R23 </option>" +
                                "<option value='R24'> R24 </option>" +
                                "<option value='R25'> R25 </option>" +
                                "<option value='R26'> R26 </option>" +
                                "<option value='R27'> R27 </option>" +
                                "<option value='R28'> R28 </option>" + 
                                "<option value='R29'> R29 </option>" +
                                "<option value='R30'> R30 </option>" +
                                "<option value='R31'> R31 </option>" +
                                "<option value='R32'> R32 </option>";
    }else if(i1.value == "BEQ") {
        var isConst = confirm("O valor a ser comparado e uma constante?")
        registers_list.innerHTML = "<option value='R0'> R0 </option>" + 
                                "<option value='R1'> R1 </option>" +
                                "<option value='R2'> R2 </option>" + 
                                "<option value='R3'> R3 </option>" + 
                                "<option value='R4'> R4 </option>" + 
                                "<option value='R5'> R5 </option>" + 
                                "<option value='R6'> R6 </option>" + 
                                "<option value='R7'> R7 </option>" +
                                "<option value='R8'> R8 </option>" +
                                "<option value='R9'> R9 </option>" +
                                "<option value='R10'> R10 </option>" +
                                "<option value='R11'> R11 </option>" +
                                "<option value='R12'> R12 </option>" +
                                "<option value='R13'> R13 </option>" +
                                "<option value='R14'> R14 </option>" +
                                "<option value='R15'> R15 </option>" +
                                "<option value='R16'> R16 </option>" +
                                "<option value='R17'> R17 </option>" +
                                "<option value='R18'> R18 </option>" +
                                "<option value='R19'> R19 </option>" +
                                "<option value='R20'> R20 </option>" +
                                "<option value='R21'> R21 </option>" +
                                "<option value='R22'> R22 </option>" +
                                "<option value='R23'> R23 </option>" +
                                "<option value='R24'> R24 </option>" +
                                "<option value='R25'> R25 </option>" +
                                "<option value='R26'> R26 </option>" +
                                "<option value='R27'> R27 </option>" +
                                "<option value='R28'> R28 </option>" + 
                                "<option value='R29'> R29 </option>" +
                                "<option value='R30'> R30 </option>" +
                                "<option value='R31'> R31 </option>" +
                                "<option value='R32'> R32 </option>";
        if(isConst) {
            var constValue = prompt("Insira o valor da constante para ser comparada com o registrador: ");
            registers_list02.innerHTML = "<option value='"+constValue+"'>"+constValue+"</option>";
        }else {
            registers_list02.innerHTML = "<option value='R0'> R0 </option>" + 
                                "<option value='R1'> R1 </option>" +
                                "<option value='R2'> R2 </option>" + 
                                "<option value='R3'> R3 </option>" + 
                                "<option value='R4'> R4 </option>" + 
                                "<option value='R5'> R5 </option>" + 
                                "<option value='R6'> R6 </option>" + 
                                "<option value='R7'> R7 </option>" +
                                "<option value='R8'> R8 </option>" +
                                "<option value='R9'> R9 </option>" +
                                "<option value='R10'> R10 </option>" +
                                "<option value='R11'> R11 </option>" +
                                "<option value='R12'> R12 </option>" +
                                "<option value='R13'> R13 </option>" +
                                "<option value='R14'> R14 </option>" +
                                "<option value='R15'> R15 </option>" +
                                "<option value='R16'> R16 </option>" +
                                "<option value='R17'> R17 </option>" +
                                "<option value='R18'> R18 </option>" +
                                "<option value='R19'> R19 </option>" +
                                "<option value='R20'> R20 </option>" +
                                "<option value='R21'> R21 </option>" +
                                "<option value='R22'> R22 </option>" +
                                "<option value='R23'> R23 </option>" +
                                "<option value='R24'> R24 </option>" +
                                "<option value='R25'> R25 </option>" +
                                "<option value='R26'> R26 </option>" +
                                "<option value='R27'> R27 </option>" +
                                "<option value='R28'> R28 </option>" + 
                                "<option value='R29'> R29 </option>" +
                                "<option value='R30'> R30 </option>" +
                                "<option value='R31'> R31 </option>" +
                                "<option value='R32'> R32 </option>";
        }
        var label = prompt("INSIRA O LABEL DESEJADO: ", "Qual o label dessa instrucao?");
        registers_list03.innerHTML = "<option value='"+label+"'>"+label+"</option>";
    }else if(i1.value == "BNEZ") {
        registers_list.innerHTML = "<option value='R0'> R0 </option>" + 
                                "<option value='R1'> R1 </option>" +
                                "<option value='R2'> R2 </option>" + 
                                "<option value='R3'> R3 </option>" + 
                                "<option value='R4'> R4 </option>" + 
                                "<option value='R5'> R5 </option>" + 
                                "<option value='R6'> R6 </option>" + 
                                "<option value='R7'> R7 </option>" +
                                "<option value='R8'> R8 </option>" +
                                "<option value='R9'> R9 </option>" +
                                "<option value='R10'> R10 </option>" +
                                "<option value='R11'> R11 </option>" +
                                "<option value='R12'> R12 </option>" +
                                "<option value='R13'> R13 </option>" +
                                "<option value='R14'> R14 </option>" +
                                "<option value='R15'> R15 </option>" +
                                "<option value='R16'> R16 </option>" +
                                "<option value='R17'> R17 </option>" +
                                "<option value='R18'> R18 </option>" +
                                "<option value='R19'> R19 </option>" +
                                "<option value='R20'> R20 </option>" +
                                "<option value='R21'> R21 </option>" +
                                "<option value='R22'> R22 </option>" +
                                "<option value='R23'> R23 </option>" +
                                "<option value='R24'> R24 </option>" +
                                "<option value='R25'> R25 </option>" +
                                "<option value='R26'> R26 </option>" +
                                "<option value='R27'> R27 </option>" +
                                "<option value='R28'> R28 </option>" + 
                                "<option value='R29'> R29 </option>" +
                                "<option value='R30'> R30 </option>" +
                                "<option value='R31'> R31 </option>" +
                                "<option value='R32'> R32 </option>";
        registers_list02.innerHTML = "<option value='0'>0</option>";
        var label = prompt("INSIRA O LABEL DESEJADO: ", "Qual o label dessa instrucao?");
        registers_list03.innerHTML = "<option value='"+label+"'>"+label+"</option>";
    }

    document.getElementById("confirmButton").onclick = function() {confirmInst()};
    
    function confirmInst() {
        data[counter] = (document.getElementById("instruction_name").value);
        data[counter+1] = (document.getElementById("registers_list").value);
        data[counter+2] = (document.getElementById("registers_list02").value);
        data[counter+3] =(document.getElementById("registers_list03").value);
        alert("BOSTA" + data[0]);
        counter += 4;
        alert(counter);
        for(i = 0; i < data.length; i++) {
            alert(data[i]);
        }
    }


}

function confirmInstruction() {
    var name = document.getElementById("instruction_name");
    var r1 = document.getElementById("registers_list");
    var r2 = document.getElementById("registers_list02");
    var r3 = document.getElementById("registers_list03");

    document.getElementById("instructions_list").innerHTML = "asd";
    alert(document.getElementById("instructions_list").value);
}

function clear_form() {
    var elements = document.getElementsByTagName("input");
    for(i=0; i < elements.length; i++) {
        elements[i].value = "";
    }
}
