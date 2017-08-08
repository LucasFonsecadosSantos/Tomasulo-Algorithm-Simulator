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

const __FLOAT_INSTRUCTION_CYCLES_AMOUNT__ = 3;

const __FLOAT_MULTD_INSTRUCTION_CYCLES_AMOUNT__ = 7;

const __FLOAT_DIVD_INSTRUCTION_CYCLES_AMOUNT__ = 40;

/**
 * Instrutction status table;
 * A multidimensional array;
 */
const instruction_status = new Array(data.length);

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
    dyspatch_cycle: 0,
    disponibleBit: false,
    OPcodeLabel: "",
    address: ""
};

const Reservation_Stations = {
    integer_instructions_buffer: new Array(__INTEGER_INSTRUCTIONS_BUFFER_SIZE__),
    float_instructions_buffer:   new Array(__FLOAT_INSTRUCTIONS_BUFFER_SIZE__),
    float_instructions_buffer_2: new Array(__FLOAT_INSTRUCTIONS_BUFFER_2_SIZE__)
};

const Reservation_Stations_Memory = {
    store_instructions_buffer: new Array(__STORE_INSTRUCTIONS_BUFFER_SIZE__),
    load_instructions_buffer:  new Array(__LOAD_INSTRUCTIONS_BUFFER_SIZE__)
};

/**************************************************************************************** */

function settings() {}
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
        if(i1.value == "ADDD" || i1.value == "SUBD") {
            instruction_type.value = "float_1";
        }else {
            instruction_type.value = "float_2"
        }

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
document.getElementById("instructions_list_viwer").value = "";
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
    if(Instruction.instruction_type == "load" || Instruction.instruction_type == "store") {
        document.getElementById("instructions_list_viwer").value += Instruction.dyspatch_cycle + ". "+Instruction.identifier + " " + Instruction.RD + ", " + Instruction.RS + "("+Instruction.RT+")" + "\n";
    }else {
        document.getElementById("instructions_list_viwer").value += Instruction.dyspatch_cycle +  ". "+Instruction.identifier + " " + Instruction.RD + ", " + Instruction.RS + ", " + Instruction.RT + "\n";
    }
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
function exec() {
    var cycle = 0;
    var currentInstructionToDyspatch;
    var dyspatch_instructions_amount = 0;
    do {
        cycle++;
        currentInstructionToDyspatch = data[cycle-1];
        instruction_status[dyspatch_instructions_amount] = new Array(3);
        
        //Build the reservation stations if it is on the first cycle;
        if(cycle == 1) {
            Reservation_Stations.integer_instructions_buffer.forEach(function(newElement) {
                newElement = Instruction_Reservated;
            });
            Reservation_Stations.float_instructions_buffer.forEach(function(newElement) {
                newElement = Instruction_Reservated;
            });
            Reservation_Stations.float_instructions_buffer.forEach(function(newElement) {
                newElement = Instruction_Reservated;
            });
            Reservation_Stations_Memory.store_instructions_buffer.forEach(function(newElement) {
                newElement = Instruction_Reservated_Memory;
            });
            Reservation_Stations_Memory.load_instructions_buffer.forEach(function(newElement) {
                newElement = Instruction_Reservated_Memory;
            });
        }

        //Dyspatch
        var booleanControl = true;
        var dependency_instruction = new Array();
        for(i = cycle-2; i >= 0; i--) {
            if(data[i].RD == currentInstructionToDyspatch.RS || data[i].RD == currentInstructionToDyspatch.RT) {
                dependency_instruction.push(data[i]);
            }
        }
        if(currentInstructionToDyspatch.instruction_type == "integer") {
            for(RSelement = 0; RSelement < Reservation_Stations.integer_instructions_buffer.length; RSelement++) {
                if(!Reservation_Stations.integer_instructions_buffer[RSelement].disponibleBit) {
                    booleanControl = false;
                }
            }
            if(!booleanControl) {
                instruction_status[dyspatch_instructions_amount][0] = cycle;
                if(dependency_instruction.length == 0) {
                    instruction_status[dyspatch_instructions_amount][1] = cycle + __INTEGER_INSTRUCTIONS_CYCLES_AMOUNT__;
                }else {
                    for(k = dependency_instruction.length-1 ; k >= 0 ; k--) {
                        
                        if(dependency_instruction[k].instruction_type == "integer") {
                            if(dependency_instruction[k].dyspatch_cycle + __INTEGER_INSTRUCTIONS_CYCLES_AMOUNT__ < cycle) {
                                instruction_status[dyspatch_instructions_amount][1] = cycle + __INTEGER_INSTRUCTIONS_CYCLES_AMOUNT__;
                                alert("issue ciclo despacho + ex < ciclo atual: "+instruction_status[dyspatch_instructions_amount][0] + "\nEX: "+instruction_status[dyspatch_instructions_amount][1] + "\nWB: " + instruction_status[dyspatch_instructions_amount][2]);
                            }else {
                                instruction_status[dyspatch_instructions_amount][1] = cycle + __INTEGER_INSTRUCTIONS_CYCLES_AMOUNT__ + __INTEGER_INSTRUCTIONS_CYCLES_AMOUNT__ + dependency_instruction[k].dyspatch_cycle;
                                alert("issue ciclo despacho + ex > ciclo atual: "+instruction_status[dyspatch_instructions_amount][0] + "\nEX: "+instruction_status[dyspatch_instructions_amount][1] + "\nWB: " + instruction_status[dyspatch_instructions_amount][2]);
                            }
                        }else if(dependency_instruction[k].instruction_type == "load" || dependency_instruction[k].instruction_type == "store") {
                            if(dependency_instruction[k].dyspatch_cycle + __MEMORY_INSTRUCTIONS_CYCLES_AMOUNT__ < cycle) {
                                instruction_status[dyspatch_instructions_amount][1] = cycle + __INTEGER_INSTRUCTIONS_CYCLES_AMOUNT__;
                                alert("issue ciclo despacho + ex < ciclo atual: "+instruction_status[dyspatch_instructions_amount][0] + "\nEX: "+instruction_status[dyspatch_instructions_amount][1] + "\nWB: " + instruction_status[dyspatch_instructions_amount][2]);
                            }else {
                                instruction_status[dyspatch_instructions_amount][1] = cycle + __MEMORY_INSTRUCTIONS_CYCLES_AMOUNT__ + __INTEGER_INSTRUCTIONS_CYCLES_AMOUNT__ + dependency_instruction[k].dyspatch_cycle;
                                alert("issue ciclo despacho + ex > ciclo atual: "+instruction_status[dyspatch_instructions_amount][0] + "\nEX: "+instruction_status[dyspatch_instructions_amount][1] + "\nWB: " + instruction_status[dyspatch_instructions_amount][2]);
                            }
                        }
                    }
                }
                instruction_status[dyspatch_instructions_amount][2] = instruction_status[dyspatch_instructions_amount][1] + 1;
                alert("issue: "+instruction_status[dyspatch_instructions_amount][0] + "\nEX: "+instruction_status[dyspatch_instructions_amount][1] + "\nWB: " + instruction_status[dyspatch_instructions_amount][2]);
            }else {
                continue;
            }
            if(!x.disponibleBit) {
                x.dyspatch_cycle = currentInstructionToDyspatch.dyspatch_cycle; //Functional unit receives a current dyspatch cycle;
                x.disponibleBit = true; //Busy
                x.OPcodeLabel = currentInstructionToDyspatch.identifier; //Instruction name
                //SETAR AS FILAS, TEM Q VER SE TEM DEPENDENCIA, FALTA
                //VJ, VK, QJ, QK
            }
            dyspatch_instructions_amount++;
        }else if(currentInstructionToDyspatch.instruction_type == "float_1") {
            Reservation_Stations.float_instructions_buffer.forEach(function(x) {
                if(!x.disponibleBit) {
                    booleanControl = false;
                }
            });
            if(booleanControl) {
                instruction_status[dyspatch_instructions_amount][0] = cycle;
                if(dependency_instruction.length == 0) {
                    instruction_status[dyspatch_instructions_amount][1] = cycle + __FLOAT_INSTRUCTION_CYCLES_AMOUNT__;
                }else {
                    for(k = dependency_instruction.length-1 ; k >= 0 ; k--) {
                        
                        if(dependency_instruction[k].instruction_type == "float_1") {
                            if(dependency_instruction[k].dyspatch_cycle + __FLOAT_INSTRUCTION_CYCLES_AMOUNT__ < cycle) {
                                instruction_status[dyspatch_instructions_amount][1] = cycle + __FLOAT_INSTRUCTION_CYCLES_AMOUNT__;
                                alert("issue ciclo despacho + ex < ciclo atual: "+instruction_status[dyspatch_instructions_amount][0] + "\nEX: "+instruction_status[dyspatch_instructions_amount][1] + "\nWB: " + instruction_status[dyspatch_instructions_amount][2]);
                            }else {
                                instruction_status[dyspatch_instructions_amount][1] = cycle + __FLOAT_INSTRUCTION_CYCLES_AMOUNT__ + __FLOAT_INSTRUCTION_CYCLES_AMOUNT__ + dependency_instruction[k].dyspatch_cycle;
                                alert("issue ciclo despacho + ex > ciclo atual: "+instruction_status[dyspatch_instructions_amount][0] + "\nEX: "+instruction_status[dyspatch_instructions_amount][1] + "\nWB: " + instruction_status[dyspatch_instructions_amount][2]);
                            }
                        }else if(dependency_instruction[k].instruction_type == "float_2") {
                            if(dependency_instruction[k].identifier == "MULTD") {
                                if(dependency_instruction[k].dyspatch_cycle + __FLOAT_MULTD_INSTRUCTION_CYCLES_AMOUNT__ < cycle) {
                                    instruction_status[dyspatch_instructions_amount][1] = cycle + __FLOAT_INSTRUCTION_CYCLES_AMOUNT__;
                                    alert("issue ciclo despacho + ex < ciclo atual: "+instruction_status[dyspatch_instructions_amount][0] + "\nEX: "+instruction_status[dyspatch_instructions_amount][1] + "\nWB: " + instruction_status[dyspatch_instructions_amount][2]);
                                }else {
                                    instruction_status[dyspatch_instructions_amount][1] = cycle + __FLOAT_INSTRUCTION_CYCLES_AMOUNT__ + __FLOAT_MULTD_INSTRUCTION_CYCLES_AMOUNT__ + dependency_instruction[k].dyspatch_cycle;
                                    alert("issue ciclo despacho + ex > ciclo atual: "+instruction_status[dyspatch_instructions_amount][0] + "\nEX: "+instruction_status[dyspatch_instructions_amount][1] + "\nWB: " + instruction_status[dyspatch_instructions_amount][2]);
                                }
                            }else if(dependency_instruction[k].identifier == "DIVD"){
                                if(dependency_instruction[k].dyspatch_cycle + __FLOAT_DIVD_INSTRUCTION_CYCLES_AMOUNT__ < cycle) {
                                    instruction_status[dyspatch_instructions_amount][1] = cycle + __FLOAT_INSTRUCTION_CYCLES_AMOUNT__;
                                    alert("issue ciclo despacho + ex < ciclo atual: "+instruction_status[dyspatch_instructions_amount][0] + "\nEX: "+instruction_status[dyspatch_instructions_amount][1] + "\nWB: " + instruction_status[dyspatch_instructions_amount][2]);
                                }else {
                                    instruction_status[dyspatch_instructions_amount][1] = cycle + __FLOAT_INSTRUCTION_CYCLES_AMOUNT__ + __FLOAT_DIVD_INSTRUCTION_CYCLES_AMOUNT__ + dependency_instruction[k].dyspatch_cycle;
                                    alert("issue ciclo despacho + ex > ciclo atual: "+instruction_status[dyspatch_instructions_amount][0] + "\nEX: "+instruction_status[dyspatch_instructions_amount][1] + "\nWB: " + instruction_status[dyspatch_instructions_amount][2]);
                                }
                            }
                        }else if(dependency_instruction[k].instruction_type == "load" || dependency_instruction[k].instruction_type == "store") {
                            if(dependency_instruction[k].dyspatch_cycle + __MEMORY_INSTRUCTIONS_CYCLES_AMOUNT__ < cycle) {
                                instruction_status[dyspatch_instructions_amount][1] = cycle + __FLOAT_INSTRUCTION_CYCLES_AMOUNT__;
                                alert("issue ciclo despacho + ex < ciclo atual: "+instruction_status[dyspatch_instructions_amount][0] + "\nEX: "+instruction_status[dyspatch_instructions_amount][1] + "\nWB: " + instruction_status[dyspatch_instructions_amount][2]);
                            }else {
                                instruction_status[dyspatch_instructions_amount][1] = cycle + __MEMORY_INSTRUCTIONS_CYCLES_AMOUNT__ + __FLOAT_INSTRUCTION_CYCLES_AMOUNT__  + dependency_instruction[k].dyspatch_cycle;
                                alert("issue ciclo despacho + ex > ciclo atual: "+instruction_status[dyspatch_instructions_amount][0] + "\nEX: "+instruction_status[dyspatch_instructions_amount][1] + "\nWB: " + instruction_status[dyspatch_instructions_amount][2]);
                            }
                        }
                    }
                }
                instruction_status[dyspatch_instructions_amount][2] = instruction_status[dyspatch_instructions_amount][1] + 1;
                alert("issue: "+instruction_status[dyspatch_instructions_amount][0] + "\nEX: "+instruction_status[dyspatch_instructions_amount][1] + "\nWB: " + instruction_status[dyspatch_instructions_amount][2]);
            }else {
                continue;
            }
                // if(!x.disponibleBit) {
                //     x.dyspatch_cycle = currentInstructionToDyspatch.dyspatch_cycle; //Functional unit receives a current dyspatch cycle;
                //     x.disponibleBit = true; //Busy
                //     x.OPcodeLabel = currentInstructionToDyspatch.identifier; //Instruction name
                //     //SETAR AS FILAS, TEM Q VER SE TEM DEPENDENCIA, FALTA
                //     //VJ, VK, QJ, QK

                // }
                dyspatch_instructions_amount++;
        }else if(currentInstructionToDyspatch.instruction_type == "float_2") {
            Reservation_Stations.float_instructions_buffer.forEach(function(x) {
                if(!x.disponibleBit) {
                    booleanControl = false;
                }
            });
            if(booleanControl) {
                instruction_status[dyspatch_instructions_amount][0] = cycle;
                if(dependency_instruction.length == 0) {
                    instruction_status[dyspatch_instructions_amount][1] = cycle + __FLOAT_INSTRUCTION_CYCLES_AMOUNT__;
                }else {
                    for(k = dependency_instruction.length-1 ; k >= 0 ; k--) {
                        
                        if(dependency_instruction[k].instruction_type == "float_1") {
                            if(dependency_instruction[k].dyspatch_cycle + __FLOAT_INSTRUCTION_CYCLES_AMOUNT__ < cycle) {
                                instruction_status[dyspatch_instructions_amount][1] = cycle + __FLOAT_INSTRUCTION_CYCLES_AMOUNT__;
                                alert("issue ciclo despacho + ex < ciclo atual: "+instruction_status[dyspatch_instructions_amount][0] + "\nEX: "+instruction_status[dyspatch_instructions_amount][1] + "\nWB: " + instruction_status[dyspatch_instructions_amount][2]);
                            }else {
                                instruction_status[dyspatch_instructions_amount][1] = cycle + __FLOAT_INSTRUCTION_CYCLES_AMOUNT__ + __FLOAT_INSTRUCTION_CYCLES_AMOUNT__ + dependency_instruction[k].dyspatch_cycle;
                                alert("issue ciclo despacho + ex > ciclo atual: "+instruction_status[dyspatch_instructions_amount][0] + "\nEX: "+instruction_status[dyspatch_instructions_amount][1] + "\nWB: " + instruction_status[dyspatch_instructions_amount][2]);
                            }
                        }else if(dependency_instruction[k].instruction_type == "float_2") {
                            if(dependency_instruction[k].identifier == "MULTD") {
                                if(dependency_instruction[k].dyspatch_cycle + __FLOAT_MULTD_INSTRUCTION_CYCLES_AMOUNT__ < cycle) {
                                    instruction_status[dyspatch_instructions_amount][1] = cycle + __FLOAT_INSTRUCTION_CYCLES_AMOUNT__;
                                    alert("issue ciclo despacho + ex < ciclo atual: "+instruction_status[dyspatch_instructions_amount][0] + "\nEX: "+instruction_status[dyspatch_instructions_amount][1] + "\nWB: " + instruction_status[dyspatch_instructions_amount][2]);
                                }else {
                                    instruction_status[dyspatch_instructions_amount][1] = cycle + __FLOAT_INSTRUCTION_CYCLES_AMOUNT__ + __FLOAT_MULTD_INSTRUCTION_CYCLES_AMOUNT__ + dependency_instruction[k].dyspatch_cycle;
                                    alert("issue ciclo despacho + ex > ciclo atual: "+instruction_status[dyspatch_instructions_amount][0] + "\nEX: "+instruction_status[dyspatch_instructions_amount][1] + "\nWB: " + instruction_status[dyspatch_instructions_amount][2]);
                                }
                            }else if(dependency_instruction[k].identifier == "DIVD"){
                                if(dependency_instruction[k].dyspatch_cycle + __FLOAT_DIVD_INSTRUCTION_CYCLES_AMOUNT__ < cycle) {
                                    instruction_status[dyspatch_instructions_amount][1] = cycle + __FLOAT_INSTRUCTION_CYCLES_AMOUNT__;
                                    alert("issue ciclo despacho + ex < ciclo atual: "+instruction_status[dyspatch_instructions_amount][0] + "\nEX: "+instruction_status[dyspatch_instructions_amount][1] + "\nWB: " + instruction_status[dyspatch_instructions_amount][2]);
                                }else {
                                    instruction_status[dyspatch_instructions_amount][1] = cycle + __FLOAT_INSTRUCTION_CYCLES_AMOUNT__ + __FLOAT_DIVD_INSTRUCTION_CYCLES_AMOUNT__ + dependency_instruction[k].dyspatch_cycle;
                                    alert("issue ciclo despacho + ex > ciclo atual: "+instruction_status[dyspatch_instructions_amount][0] + "\nEX: "+instruction_status[dyspatch_instructions_amount][1] + "\nWB: " + instruction_status[dyspatch_instructions_amount][2]);
                                }
                            }
                        }else if(dependency_instruction[k].instruction_type == "load" || dependency_instruction[k].instruction_type == "store") {
                            if(dependency_instruction[k].dyspatch_cycle + __MEMORY_INSTRUCTIONS_CYCLES_AMOUNT__ < cycle) {
                                instruction_status[dyspatch_instructions_amount][1] = cycle + __FLOAT_INSTRUCTION_CYCLES_AMOUNT__;
                                alert("issue ciclo despacho + ex < ciclo atual: "+instruction_status[dyspatch_instructions_amount][0] + "\nEX: "+instruction_status[dyspatch_instructions_amount][1] + "\nWB: " + instruction_status[dyspatch_instructions_amount][2]);
                            }else {
                                instruction_status[dyspatch_instructions_amount][1] = cycle + __MEMORY_INSTRUCTIONS_CYCLES_AMOUNT__ + __FLOAT_INSTRUCTION_CYCLES_AMOUNT__  + dependency_instruction[k].dyspatch_cycle;
                                alert("issue ciclo despacho + ex > ciclo atual: "+instruction_status[dyspatch_instructions_amount][0] + "\nEX: "+instruction_status[dyspatch_instructions_amount][1] + "\nWB: " + instruction_status[dyspatch_instructions_amount][2]);
                            }
                        }
                    }
                }
                instruction_status[dyspatch_instructions_amount][2] = instruction_status[dyspatch_instructions_amount][1] + 1;
                alert("issue: "+instruction_status[dyspatch_instructions_amount][0] + "\nEX: "+instruction_status[dyspatch_instructions_amount][1] + "\nWB: " + instruction_status[dyspatch_instructions_amount][2]);
            }else {
                continue;
            }
                // if(!x.disponibleBit) {
                //     x.dyspatch_cycle = currentInstructionToDyspatch.dyspatch_cycle; //Functional unit receives a current dyspatch cycle;
                //     x.disponibleBit = true; //Busy
                //     x.OPcodeLabel = currentInstructionToDyspatch.identifier; //Instruction name
                //     //SETAR AS FILAS, TEM Q VER SE TEM DEPENDENCIA, FALTA
                //     //VJ, VK, QJ, QK

                // }
                dyspatch_instructions_amount++;
        }   
    }while(dyspatch_instructions_amount < data.length);
    
}