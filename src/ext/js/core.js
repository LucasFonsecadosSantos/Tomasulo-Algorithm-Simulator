/**
 * 
 */
const data = new Array();

/**
 * 
 */
const __STORE_INSTRUCTIONS_BUFFER_SIZE__    = 3;

/**
 * 
 */
const __LOAD_INSTRUCTIONS_BUFFER_SIZE__     = 6;

/**
 * 
 */
const __FLOAT_INSTRUCTIONS_BUFFER_2_SIZE__  = 2;

/**
 * 
 */
const __FLOAT_INSTRUCTIONS_BUFFER_SIZE__    = 3;

/**
 * 
 */
const __INTEGER_INSTRUCTIONS_BUFFER_SIZE__  = 3;



const __INTEGER_INSTRUCTIONS_CYCLES_AMOUNT__ = 1;

const __MEMORY_INSTRUCTIONS_CYCLES_AMOUNT__ = 1;

const __FLOAT_ADDER_INSTRUCTION_CYCLES_AMOUNT__ = 3;

const __FLOAT_MULTD_INSTRUCTION_CYCLES_AMOUNT__ = 7;

const __FLOAT_DIVD_INSTRUCTION_CYCLES_AMOUNT__ = 40;

const cycle_exec = new Array();

const Instruction_Reservated = {
    dyspatch_cycle: 0,
    disponibleBit: false,
    OPcodeLabel: "",
    Vj: "",
    vk: "",
    Qj: "",
    Qk: ""
};

const Instruction_Reservated_Memory = {
    disponibleBit: false,
    OPcodeLabel: "",
    address: ""
};

const Reservation_Stations = {
    integer_instructions_queue:  new Array(),
    float_instructions_queue:    new Array(),
    float_instructions_queue_2:  new Array(),
    integer_instructions_buffer: new Array(__INTEGER_INSTRUCTIONS_BUFFER_SIZE__),
    float_instructions_buffer:   new Array(__FLOAT_INSTRUCTIONS_BUFFER_SIZE__),
    float_instructions_buffer_2: new Array(__FLOAT_INSTRUCTIONS_BUFFER_2_SIZE__)
};

const Reservation_Stations_Memory = {
    store_instructions_buffer: new Array(__STORE_INSTRUCTIONS_BUFFER_SIZE__),
    load_instructions_buffer:  new Array(__LOAD_INSTRUCTIONS_BUFFER_SIZE__)
};

/**************************************************************************************** */

/**
 * 
 */
function getFloatRegisters() {
    var str = "";
    for (i = 0; i <= 16; i = i + 2) {
        str += "<option value='F" + i + "'> F" + i + " </option>"
    }
    return str;
}

/**
 * 
 */
function getTypeRRegisters() {
    var str = "";
    for (i = 0; i <= 32; i++) {
        str += "<option value='R" + i + "'> R" + i + " </option>"
    }
    return str;
}

/**
 * 
 */
function loadRegisters() {

    var i1               = document.getElementById("instruction_name");
    var registers_list   = document.getElementById("registers_list");
    var registers_list02 = document.getElementById("registers_list02");
    var registers_list03 = document.getElementById("registers_list03");
    var instruction_type = document.getElementById("instruction_type");

    if (i1.value == "ADDD" || i1.value == "SUBD" || i1.value == "MULTD" || i1.value == "DIVD") {

        registers_list.innerHTML    = getFloatRegisters();
        registers_list02.innerHTML  = getFloatRegisters();
        registers_list03.innerHTML  = getFloatRegisters();
        instruction_type.value      = "float";

    } else if (i1.value == "LD" || i1.value == "SD") {

        registers_list.innerHTML = getFloatRegisters();
        var offset = prompt("Insert the memory offeset value:");
        registers_list02.innerHTML = "<option value='" + offset + "'>" + offset + "</option>";
        registers_list03.innerHTML = getTypeRRegisters();
        if(i1.value == "LD") {
            instruction_type.value = "load";
        }else {
            instruction_type.value = "store";
        }

    } else if (i1.value == "ADD") {

        registers_list.innerHTML    = getTypeRRegisters();
        registers_list02.innerHTML  = getTypeRRegisters();
        registers_list03.innerHTML  = getTypeRRegisters();
        instruction_type.value      = "integer";

    } else if (i1.value == "DADDUI") {

        registers_list.innerHTML = getTypeRRegisters();
        registers_list02.innerHTML = getTypeRRegisters();
        var offset = prompt("Insert the imediate value:");
        registers_list03.innerHTML = "<option value='" + offset + "'>" + offset + "</option>";
        instruction_type.value = "integer";

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
        instruction_type.value = "integer";

    } else if (i1.value == "BNEZ") {

        registers_list.innerHTML = getTypeRRegisters();
        registers_list02.innerHTML = "<option value='0'>0</option>";
        var label = prompt("INSIRA O LABEL DESEJADO: ", "Qual o label dessa instrucao?");
        registers_list03.innerHTML = "<option value='" + label + "'>" + label + "</option>";
        instruction_type.value = "integer";

    }
}

/**
 * 
 */
var dyspatch_index = 1;
const confirmInst = function () {
    const Instruction = {
        dyspatch_cycle: dyspatch_index++, 
        identifier: document.getElementById("instruction_name").value,
        instruction_type: document.getElementById("instruction_type").value,
        RD: document.getElementById("registers_list").value,
        RS: document.getElementById("registers_list02").value,
        RT: document.getElementById("registers_list03").value
    }

    // alert('Instruction:', JSON.stringify(Instruction));
    data.push(Instruction);
    document.getElementById("instructions_list_viwer").value += "-> "+Instruction.identifier + " " + Instruction.RD + " " + Instruction.RS + " " + Instruction.RT + "\n";
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


/**
 * 
 */
var counter = 1;
function exec() {
    data.forEach(function(instruction) {
        cycle_exec = new Array(2);
        if(instruction_type == "integer") {
            var control = true;
            Reservation_Stations.integer_instructions_buffer.forEach(function(element){
                if(element.RD == instruction.RD) {
                    if(element.dyspatch_cycle + __INTEGER_INSTRUCTIONS_CYCLES_AMOUNT__ < Instruction.dyspatch_cycle) {
                        cycle_exec[counter][0] = instruction.dyspatch_cycle + __INTEGER_INSTRUCTIONS_CYCLES_AMOUNT__;
                    }else {
                        cycle_exec[counter][0] = instruction.dyspatch_cycle; //paramos aqui calculando a quantidade de ciclos
                    }
                }
            });
        }
        cycle_exec[counter][0] = 0;//Quando a execucao termina
        cycle_exec[counter][1] = cycle_exec[counter][0]+1;
        if(instruction.type == "integer") {
            Reservation_Stations.integer_instructions_buffer.forEach(function(element) {
                if(!element.disponibleBit) {
                    element.disponibleBit = true;
                    element.OPcodeLabel = instruction.identifier;
                    element.dyspatch_cycle = Instruction.dyspatch_cycle;
                    element
                    var d = false;
                    
                        
                    });
                    
                }else {
                    Reservation_Stations.integer_instructions_queue.push(instruction);
                }
            });
        }else if(instruction.type == "float") {
            if(instruction.name == "MULTD" || instruction.name == "DIVD") {

            }else {

            }
        }else if(instruction.type == "store" ) {

        }else if(instruction.type == "load") {

        }
    });
}