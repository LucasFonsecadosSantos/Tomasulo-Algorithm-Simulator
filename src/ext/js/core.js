const data = new Array();
var counter = 0;

function getFloatRegisters() {
    var str = "";
    for (i = 0; i <= 16; i = i + 2) {
        str += "<option value='F" + i + "'> F" + i + " </option>"
    }
    return str;
}

function getTypeRRegisters() {
    var str = "";
    for (i = 0; i <= 32; i++) {
        str += "<option value='R" + i + "'> R" + i + " </option>"
    }
    return str;
}

function teste() {

    var i1 = document.getElementById("instruction_name");
    var registers_list = document.getElementById("registers_list");
    var registers_list02 = document.getElementById("registers_list02");
    var registers_list03 = document.getElementById("registers_list03");

    if (i1.value == "ADDD" || i1.value == "SUBD" || i1.value == "MULTD" || i1.value == "DIVD") {

        registers_list.innerHTML = getFloatRegisters();
        registers_list02.innerHTML = getFloatRegisters();
        registers_list03.innerHTML = getFloatRegisters();

    } else if (i1.value == "LD" || i1.value == "SD") {

        registers_list.innerHTML = getFloatRegisters();
        var offset = prompt("Insert the memory offeset value:");
        registers_list02.innerHTML = "<option value='" + offset + "'>" + offset + "</option>";
        registers_list03.innerHTML = getTypeRRegisters();

    } else if (i1.value == "ADD") {

        registers_list.innerHTML = getTypeRRegisters();
        registers_list02.innerHTML = getTypeRRegisters();
        registers_list03.innerHTML = getTypeRRegisters();

    } else if (i1.value == "DADDUI") {

        registers_list.innerHTML = getTypeRRegisters();
        registers_list02.innerHTML = getTypeRRegisters();
        var offset = prompt("Insert the imediate value:");
        registers_list03.innerHTML = "<option value='" + offset + "'>" + offset + "</option>";

    } else if (i1.value == "BEQ") {

        var isConst = confirm("O valor a ser comparado e uma constante?")
        registers_list.innerHTML = getTypeRRegisters();
        if (isConst) {
            var constValue = prompt("Insira o valor da constante para ser comparada com o registrador: ");
            registers_list02.innerHTML = "<option value='" + constValue + "'>" + constValue + "</option>";
        } else {
            registers_list02.innerHTML = getTypeRRegisters();
        }
        var label = prompt("INSIRA O LABEL DESEJADO: ", "Qual o label dessa instrucao?");
        registers_list03.innerHTML = "<option value='" + label + "'>" + label + "</option>";

    } else if (i1.value == "BNEZ") {

        registers_list.innerHTML = getTypeRRegisters();
        registers_list02.innerHTML = "<option value='0'>0</option>";
        var label = prompt("INSIRA O LABEL DESEJADO: ", "Qual o label dessa instrucao?");
        registers_list03.innerHTML = "<option value='" + label + "'>" + label + "</option>";

    }
}

/**
 * 
 */
const confirmInst = function () {
    const Type_R = {
        identifier: document.getElementById("instruction_name").value,
        RD: document.getElementById("registers_list").value,
        RS: document.getElementById("registers_list02").value,
        RT: document.getElementById("registers_list03").value
    }

    // alert('Type_R:', JSON.stringify(Type_R));
    data.push(Type_R);
    document.getElementById("instructions_list_viwer").value += "-> "+Type_R.identifier + " " + Type_R.RD + " " + Type_R.RS + " " + Type_R.RT + "\n";
    data.forEach(function(element) {
        alert(JSON.stringify(element));
        // console.log(JSON.stringify(element));
    }, this);
};

/**
 * 
 */
function clear_form() {
    var elements = document.getElementsByTagName("input");
    for (i = 0; i < elements.length; i++) {
        elements[i].value = "";
    }
}