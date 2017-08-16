/**
 * 
 * TOMASULO ALGORITHM SIMULATOR v1.0
 * ---------------------------------
 *
 * Pratical project for GCC122 - Computer Architecture II class
 * Federal Univeristy of Lavras - MG - Brazil.
 * 
 * Developed by:
 * 
 *      - Lucas Fonseca dos Santos;
 *      - Marco Aurelio Ferreira;
 *      - Alan Luz Silveira;
 *      - Igor Nunes;
 * 
 * \file core.js
 */

/***********************************************************
FUNCTIONAL UNITS AMOUNT
(will be parameterized)
***********************************************************/
/**
 * Array object with all instructions
 * entered for the tomasulo proccessing;
 * 
 * \var data
 */
const data = new Array();

/**
 *  Constant Store instructions functional units amount
 *  value reserved.
 * 
 * \var __STORE_INSTRUCTIONS_BUFFER_SIZE__
 */
const __STORE_INSTRUCTIONS_BUFFER_SIZE__    = 3;

/**
 * Constant Load instructions functional
 * units amount value reserved.
 * 
 * \var __LOAD_INSTRUCTIONS_BUFFER_SIZE__
 */
const __LOAD_INSTRUCTIONS_BUFFER_SIZE__     = 6;

/**
 * Constant float type one instructions 
 * functional units amount value reserved.
 * SUBD and ADDD instructions.
 * 
 * \var __FLOAT_INSTRUCTIONS_BUFFER_2_SIZE__
 */
const __FLOAT_INSTRUCTIONS_BUFFER_2_SIZE__  = 2;

/**
 * Type two float constant functional units
 * amount value reserved.
 * Fot 
 */
const __FLOAT_INSTRUCTIONS_BUFFER_SIZE__    = 3;

/**
 * Integer constant functional units amount
 * value.
 * 
 * \var __INTEGER_INSTRUCTIONS_BUFFER_SIZE__
 */
const __INTEGER_INSTRUCTIONS_BUFFER_SIZE__  = 3;



/***********************************************************
INSTRUCTIONS LATENCY constants
(will be parameterized)
***********************************************************/

/**
 * Integer instructions executation latency
 * constant value.
 * 
 * \var __INTEGER_INSTRUCTIONS_CYCLES_AMOUNT__
 */
const __INTEGER_INSTRUCTIONS_CYCLES_AMOUNT__ = 2;

/**
 * Memory instructions executation latency
 * constant value.
 * 
 * \var__MEMORY_INSTRUCTIONS_CYCLES_AMOUNT__
 */
const __MEMORY_INSTRUCTIONS_CYCLES_AMOUNT__ = 2;

/**
 * Type one float instructions executation latency
 * constant value.
 * 
 * \var __FLOAT_INSTRUCTIONS_CYCLES_AMOUNT__
 */
const __FLOAT_INSTRUCTIONS_CYCLES_AMOUNT__ = 2;

/**
 * Type two float instructions executation latency
 * constant value. MULTD instructions.
 * 
 * \var __FLOAT_MULTD_INSTRUCTION_CYCLES_AMOUNT__
 */
const __FLOAT_MULTD_INSTRUCTION_CYCLES_AMOUNT__ = 10;

/**
 * TYpe two float instructions executation latency
 * constant value. DIVD instructions.
 * 
 * \var __FLOAT_DIVD_INSTRUCTION_CYCLES_AMOUNT__
 */
const __FLOAT_DIVD_INSTRUCTION_CYCLES_AMOUNT__ = 40;

/**
 * Instrutction status table;
 * A multidimensional array;
 */
const instruction_status = new Array(data.length);

/**
 * Reservation table line 
 * objetc to alloc;
 */
const Instruction_Reservated = {
    id: 0,
    dyspatch_cycle: 0,
    disponibleBit: false,
    OPcodeLabel: "",
    Vj: "",
    Vk: "",
    Qj: "",
    Qk: ""
};

// function Instruction_Reservatedid(id, dyspatch_cycle, disponibleBit, OPcodeLabel,Vj, Vk, Qj, Qk) {
//     this.id = id;
//     this.dyspatch_cycle = dyspatch_cycle;
//     this.disponibleBit = disponibleBit;
//     this.Vj = Vj;
//     this.Vk = Vk;
//     this.Qj = Qk;
//     this.Qk = Qk;
// }

/**
 * Memory instruction reservation
 * line object to allooc;
 */
const Instruction_Reservated_Memory = {
    id: 0,
    dyspatch_cycle: 0,
    disponibleBit: false,
    OPcodeLabel: "",
    address: ""
};

/**
 * Default memory reservation
 * station with line objects;
 */
const Reservation_Stations = {
    integer_instructions_buffer: new Array(__INTEGER_INSTRUCTIONS_BUFFER_SIZE__),
    float_instructions_buffer:   new Array(__FLOAT_INSTRUCTIONS_BUFFER_SIZE__),
    float_instructions_buffer_2: new Array(__FLOAT_INSTRUCTIONS_BUFFER_2_SIZE__)
};


/**
 * Memory reservation station
 * table with line objects;
 */
const Reservation_Stations_Memory = {
    store_instructions_buffer: new Array(__STORE_INSTRUCTIONS_BUFFER_SIZE__),
    load_instructions_buffer:  new Array(__LOAD_INSTRUCTIONS_BUFFER_SIZE__)
};

/**
 * Dispatched instructions counter;
 * Used for controller settings in the tomasulo
 * exec function.
 * 
 * \var dyspatch_index
 */
var dyspatch_index = 1;

/**
 * Float registers counter array object,
 * used for update screen informations.
 * 8 positions.
 * 
 * \var counter_float_registers
 */
var counter_float_registers = [0,0,0,0,0,0,0,0];

/**
 * INteger registers counter array object,
 * used for update screen informations.
 * 32 positions.
 * 
 * \var counter_integer_registers
 */
var counter_integer_registers = [
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0
];

document.getElementById("instructions_list_viwer").value = "";
/**************************************************************************************** */

/**
 * WILL BE IMPLEMENTED!
 * This function is responsible for coordinating
 * all settings options for the user to parameterized
 * all information about the algorithm execution as
 * functional units amount and instructions latency
 * value.
 */
function settings() {}

/**
 * This is an accessor function, responsible for returning
 * the float registers into a string content with html select
 * form options formatted.
 * 
 * \return str String with float registers options.
 */
function getFloatRegisters() {
    var str = "";
    for (i = 0; i <= 16; i = i + 2) {
        str += "<option value='F" + i + "'> F" + i + " </option>"
    }
    return str;
}

/**
 * This is an accessor function, responsible for returning
 * the integer registers into a string content with html select
 * form options formatted.
 * 
 * \return str String with integer registers options.
 */
function getTypeRRegisters() {
    var str = "";
    for (i = 0; i <= 32; i++) {
        str += "<option value='R" + i + "'> R" + i + " </option>"
    }
    return str;
}

/**
 * This function loads the instruction chosen by the user
 * anf after that, sets the registers list to the 3 selects
 * forms. It verifys witch instruction has been chosen and
 * load the specifics registers to this.
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
 * This is an ugly function! This function counts
 * the registers amount inserted by the user into
 * instructions to be proccessed by the tomasulo algorithm
 * and update informations at labels after instructions
 * viwer list.
 * 
 * @param {*} object 
 */
function updateInformations(object) {
    switch(object.RD) {
        case "F0":
            counter_float_registers[0]++;
            break;
        case "F2":
            counter_float_registers[1]++;
            break;
        case "F4":
            counter_float_registers[2]++;
            break;
        case "F6":
            counter_float_registers[3]++;
            break;
        case "F8":
            counter_float_registers[4]++;
            break;
        case "F10":
            counter_float_registers[5]++;
            break;
        case "F12":
            counter_float_registers[6]++;
            break;
        case "F14":
            counter_float_registers[7]++;
            break;
        case "F16":
            counter_float_registers[8]++;
            break;
    }
    switch(object.RS) {
        case "F0":
            counter_float_registers[0]++;
            break;
        case "F2":
            counter_float_registers[1]++;
            break;
        case "F4":
            counter_float_registers[2]++;
            break;
        case "F6":
            counter_float_registers[3]++;
            break;
        case "F8":
            counter_float_registers[4]++;
            break;
        case "F10":
            counter_float_registers[5]++;
            break;
        case "F12":
            counter_float_registers[6]++;
            break;
        case "F14":
            counter_float_registers[7]++;
            break;
        case "F16":
            counter_float_registers[8]++;
            break;
    }
    switch(object.RT) {
        case "F0":
            counter_float_registers[0]++;
            break;
        case "F2":
            counter_float_registers[1]++;
            break;
        case "F4":
            counter_float_registers[2]++;
            break;
        case "F6":
            counter_float_registers[3]++;
            break;
        case "F8":
            counter_float_registers[4]++;
            break;
        case "F10":
            counter_float_registers[5]++;
            break;
        case "F12":
            counter_float_registers[6]++;
            break;
        case "F14":
            counter_float_registers[7]++;
            break;
        case "F16":
            counter_float_registers[8]++;
            break;
        case "R0":
            counter_integer_registers[0]++;
            break;
        case "R1":
            counter_integer_registers[1]++;
            break;
        case "R2":
            counter_integer_registers[2]++;
            break;
        case "R3":
            counter_integer_registers[3]++;
            break;
        case "R4":
            counter_integer_registers[4]++;
            break;
        case "R5":
            counter_integer_registers[5]++;
            break;
        case "R6":
            counter_integer_registers[6]++;
            break;
        case "R7":
            counter_integer_registers[7]++;
            break;
        case "R8":
            counter_integer_registers[8]++;
            break;
        case "R9":
            counter_integer_registers[9]++;
            break;
        case "R10":
            counter_integer_registers[10]++;
            break;
        case "R11":
            counter_integer_registers[11]++;
            break;
        case "R12":
            counter_integer_registers[12]++;
            break;
        case "R13":
            counter_integer_registers[13]++;
            break;
        case "R14":
            counter_integer_registers[14]++;
            break;
        case "R15":
            counter_integer_registers[15]++;
            break;
        case "R16":
            counter_integer_registers[16]++;
            break;
        case "R17":
            counter_integer_registers[17]++;
            break;
        case "R18":
            counter_integer_registers[18]++;
            break;
        case "R19":
            counter_integer_registers[19]++;
            break;
        case "R20":
            counter_integer_registers[20]++;
            break;
        case "R21":
            counter_integer_registers[21]++;
            break;
        case "R22":
            counter_integer_registers[22]++;
            break;
        case "R23":
            counter_integer_registers[23]++;
            break;
        case "R24":
            counter_integer_registers[24]++;
            break;
        case "R25":
            counter_integer_registers[25]++;
            break;
        case "R26":
            counter_integer_registers[26]++;
            break;
        case "R27":
            counter_integer_registers[27]++;
            break;
        case "R28":
            counter_integer_registers[28]++;
            break;
        case "R29":
            counter_integer_registers[29]++;
            break;
        case "R30":
            counter_integer_registers[30]++;
            break;
        case "R31":
            counter_integer_registers[31]++;
            break;
    }
    for(i=0; i < counter_float_registers.length; i++) {
        document.getElementById("f"+i+"_counter").innerHTML = counter_float_registers[i];
    }
    for(i=0; i < counter_integer_registers.length; i++) {
        // document.getElementById("r"+i+"_counter").innerHTML = counter_integer_registers[i];
    }
}


/**
 * This functions adds to global data array
 * object and list viwer at front end screen
 * page the instructions entered by the user
 * that will be proccessed by the tomasulo
 * algorithm.
 * 
 */
var k;
const confirmInst = function () {
    document.getElementById("instructions_counter").innerText = dyspatch_index;
    k = dyspatch_index;
    const Instruction = {
        dyspatch_cycle: dyspatch_index++,
        id: md5(k),
        identifier: document.getElementById("instruction_name").value,
        instruction_type: document.getElementById("instruction_type").value,
        RD: document.getElementById("registers_list").value,
        RS: document.getElementById("registers_list02").value,
        RT: document.getElementById("registers_list03").value
    }
    if(Instruction.RD == ""|| Instruction.RD== "" || Instruction.RS == "") {
        alert("Please, click at the instruction name select box and choose you instruction.");
        return;
    }
    updateInformations(Instruction);
    data.push(Instruction);
    if(Instruction.instruction_type == "load" || Instruction.instruction_type == "store") {
        document.getElementById("instructions_list_viwer").value += Instruction.dyspatch_cycle + ". "+Instruction.identifier + " " + Instruction.RD + ", " + Instruction.RS + "("+Instruction.RT+")" + "\n";
    }else {
        document.getElementById("instructions_list_viwer").value += Instruction.dyspatch_cycle +  ". "+Instruction.identifier + " " + Instruction.RD + ", " + Instruction.RS + ", " + Instruction.RT + "\n";
    }
};

/**
 * This function clears all informations writes
 * into the inserction form.
 */
function clear_form() {
    var elements = document.getElementsByTagName("input");
    for (i = 0; i < elements.length; i++) {
        elements[i].value = "";
    }
}

/**
 * This method builds the reservation station for the comparation
 * in the exec tomasulo function
 */
function buildReservationStations() {
    try {
        for(i=0 ; i < Reservation_Stations.integer_instructions_buffer.length; i++) {
            Reservation_Stations.integer_instructions_buffer[i] = Object.create(Instruction_Reservated);
        }
        for(i=0 ; i < Reservation_Stations.float_instructions_buffer.length; i++) {
            Reservation_Stations.float_instructions_buffer[i] = Object.create(Instruction_Reservated);
        }
        for(i=0 ; i < Reservation_Stations.float_instructions_buffer_2.length; i++) {
            Reservation_Stations.float_instructions_buffer_2[i] = Object.create(Instruction_Reservated);
        }
        for(i=0 ; i < Reservation_Stations_Memory.store_instructions_buffer.length; i++) {
            Reservation_Stations_Memory.store_instructions_buffer[i] = Object.create(Instruction_Reservated_Memory);
        }
        for(i=0 ; i < Reservation_Stations_Memory.load_instructions_buffer.length; i++) {
            Reservation_Stations_Memory.load_instructions_buffer[i] = Object.create(Instruction_Reservated_Memory);
        }
	}catch(exception) {
		alert("ERROR: The executation failed! (" + exception + ")");
	}

}

/**
 * This function is reponsible for returns for the caller function the execution 
 * delay calculation when the current instruction to dyspatch has a one or more
 * dependencys. It works receving the current algorithm cycle, a dependency instruction
 * dyspatch cycle, a dyspatch amount to know the dependency array lenght, a current
 * instruction constant latency value, defined by the application settings, a dependency
 * instruction constant latency value and the current status table.
 * 
 * It verifys if total execution time of dependency instruction is greater than current
 * instructions execution time, if yes, the dependency found, the dependency executation
 * time will interfere with the current execution.
 * 
 * @param {*} dependencyInstructionDyspatchCycle 
 * @param {*} dyspatchAmount 
 * @param {*} currentCycle 
 * @param {*} statusTable 
 * @param {*} dependencyInstructionLatency 
 * @param {*} currentInstructionLatency 
 */
function toSolveExecDelay(currentCycle, writerCycleDependencyInstruction, currentInstructionLatency, dependencyInstructionDyspatchCycle, dependencyInstructionLatency) {
    if(dependencyInstructionDyspatchCycle + dependencyInstructionLatency < currentCycle) 
    {
        return eval(currentCycle + currentInstructionLatency);
    }else {
        return eval(writerCycleDependencyInstruction + currentInstructionLatency);// + dependency_instruction[lineNumber].dyspatch_cycle;
    }
}

function reservationStationsHasDisponibleFU(reservationStationArray, bufferSize, control) {
    try {
        for(i=0; i < reservationStationArray.length; i++) {
            if(!reservationStationArray[i].disponibleBit) {
                alert("HAVE");
                return true;
            }
        }
        return false;
    }catch(ex) {
        alert("THE EXECUTATION FAILED:  "+ex);
    }
    return true;
}

function updateDisponibleBit(id) {
    var type;
    for(i=0 ; i < data.length ; i++) {
        if(id == data[i].id) {
            type = data[i].instruction_type;
        }
    }
    switch(type) {
        case "integer":
            for(i=0 ; i<Reservation_Stations.integer_instructions_buffer.length ; i++) {
                if(id == Reservation_Stations.integer_instructions_buffer[i].id) {
                    alert("MUDOU O BIT "+Reservation_Stations.integer_instructions_buffer[i].dyspatch_cycle);
                    Reservation_Stations.integer_instructions_buffer[i].disponibleBit = false;
                    alert("agr vamo ver como ficou tudo");
                    alert("tam " +Reservation_Stations.integer_instructions_buffer.length);
                    for(k=0 ; k < Reservation_Stations.integer_instructions_buffer.length ; k++) {
                        alert("DYSPATCH CYCLE "+Reservation_Stations.integer_instructions_buffer[i].dyspatch_cycle + "\ndiponible bit "+Reservation_Stations.integer_instructions_buffer[i].disponibleBit)
                    }
                }
            }
            break;
        case "float_1":
            for(i=0 ; i<Reservation_Stations.float_instructions_buffer.length ; i++) {
                if(id == Reservation_Stations.float_instructions_buffer[i].id) {
                    Reservation_Stations.float_instructions_buffer[i].disponibleBit = false;
                }
            }
            break;
        case "float_2":
            for(i=0 ; i<Reservation_Stations.float_instructions_buffer_2.length ; i++) {
                if(id == Reservation_Stations.float_instructions_buffer_2[i].id) {
                    Reservation_Stations.float_instructions_buffer_2[i].disponibleBit = false;
                }
            }
            break;
        case "store":
            for(i=0 ; i<Reservation_Stations_Memory.store_instructions_buffer.length ; i++) {
                if(id == Reservation_Stations_Memory.store_instructions_buffer[i].id) {
                    Reservation_Stations_Memory.store_instructions_buffer[i].disponibleBit = false;
                }
            }
            break;
        case "load":
            for(i=0 ; i<Reservation_Stations_Memory.load_instructions_buffer.length ; i++) {
                if(id == Reservation_Stations_Memory.load_instructions_buffer[i].id) {
                    Reservation_Stations_Memory.load_instructions_buffer[i].disponibleBit = false;
                }
            }
            break;
    }
}
/**
 * This function is the tomasulo algorithm implementation.
 * It controller the instructions dyspatch and writes at the
 * reservation station.
 * 
 * IT STILL CONTAINS A BUG WHEN DYSPATCH A FLOAT SUBD INSTRUCTION WITH
 * LOAD MEMORY INSTRUCTION DEPENDENCY.
 * 
 * THE ISSUE CONTROL NOT IMPLEMENTED YET, BUT THE RESERVATION STATIONS ARE READY
 * TO USE.
 * 
 */
function exec() {
    var cycle = 0;
    var currentInstructionToDyspatch;
    var dyspatch_instructions_amount = 0;
    
    if(data.length == 0) {
        alert("Please, before the algorithm execution, insert a instruction.");
        return;
    }

    do {
        cycle++;
        alert("cycle "+cycle +", dyspatcths "+dyspatch_instructions_amount);
        currentInstructionToDyspatch = data[dyspatch_instructions_amount];
        instruction_status[dyspatch_instructions_amount] = new Array(4);
        lineNumber = 0;

        //Build the reservation stations if it is on the first cycle;
        if(cycle == 1) {
            buildReservationStations();
        }

        for(i=0 ; i < instruction_status.length; i++) {
            if(cycle == instruction_status[i][2]) {
                updateDisponibleBit(instruction_status[i][3]);
            }
        }
    
        //Dyspatch
        var booleanControl = true;
        var dependency_instruction = new Array();
        
        for(i = dyspatch_instructions_amount-2; i >= 0; i--) {
            if(data[dyspatch_instructions_amount-1].identifier == "BNEZ") {
                if(data[i].RD == currentInstructionToDyspatch.RD) {
                    dependency_instruction.push(data[i]);
                }
            }else {
                if(data[i].RD == currentInstructionToDyspatch.RS || data[i].RD == currentInstructionToDyspatch.RT) {
                    dependency_instruction.push(data[i]);
                }
            }
        }

        var lineNumber;
        if(dependency_instruction.length > 0) {
            var bigger = dependency_instruction[dependency_instruction.length-1];
            for(i = 0 ; i < instruction_status.length; i++) {
                if(instruction_status[i][3] == bigger.id) {
                    lineNumber = i;
                    break;
                }
            }
            for(d = 0 ; d < instruction_status.length; d++) {
                if(instruction_status[d][2] > instruction_status[lineNumber][2]) {
                    for(t = 0 ; t < dependency_instruction.length ; t++) {
                        if(instruction_status[d][3] == dependency_instruction[t].id) {
                            lineNumber = d;
                        }else {
                            continue;
                        }
                    }
                }
            }
            for(i = 0 ; i < dependency_instruction.length ; i++) {
                if(dependency_instruction[i].id == instruction_status[lineNumber][3]) {
                    lineNumber = i;
                    break;
                }
            }
        }

        if(currentInstructionToDyspatch.instruction_type == "integer") {
            if(reservationStationsHasDisponibleFU(Reservation_Stations.integer_instructions_buffer, __INTEGER_INSTRUCTIONS_BUFFER_SIZE__, booleanControl)) {
                instruction_status[dyspatch_instructions_amount][0] = cycle;
                if(dependency_instruction.length == 0) {
                    instruction_status[dyspatch_instructions_amount][1] = cycle + __INTEGER_INSTRUCTIONS_CYCLES_AMOUNT__;
                }else {
                    if(dependency_instruction[lineNumber].instruction_type == "integer") {
                        for(run=0 ; run<instruction_status.length; run++) {
                            if(dependency_instruction[lineNumber].id == instruction_status[run][3]) {
                                instruction_status[dyspatch_instructions_amount][1] = toSolveExecDelay(cycle, instruction_status[run][2], __INTEGER_INSTRUCTIONS_CYCLES_AMOUNT__, dependency_instruction[lineNumber].dyspatch_cycle, __INTEGER_INSTRUCTIONS_CYCLES_AMOUNT__);
                            }
                        }
                    // }else if(dependency_instruction[lineNumber].instruction_type == "load" || dependency_instruction[lineNumber].instruction_type == "store") {
                    //     for(run=0 ; run<instruction_status.length; run++) {
                    //         if(dependency_instruction[lineNumber].id == instruction_status[run][3]) {
                    //             instruction_status[dyspatch_instructions_amount][1] = toSolveExecDelay(cycle, instruction_status[run][2],__INTEGER_INSTRUCTIONS_CYCLES_AMOUNT__ , dependency_instruction[lineNumber].dyspatch_cycle, __MEMORY_INSTRUCTIONS_CYCLES_AMOUNT__);
                    //         }
                    //     }
                    //     for(run=0 ; run<instruction_status.length; run++) {
                    //         if(dependency_instruction[lineNumber].id == instruction_status[run][3]) {
                    //             instruction_status[dyspatch_instructions_amount][1] = toSolveExecDelay(cycle, instruction_status[run][2],  __INTEGER_INSTRUCTIONS_CYCLES_AMOUNT__, dependency_instruction[lineNumber].dyspatch_cycle,__MEMORY_INSTRUCTIONS_CYCLES_AMOUNT__);
                    //         }
                    //     }
                    // }
                    }
                }
                instruction_status[dyspatch_instructions_amount][2] = instruction_status[dyspatch_instructions_amount][1] + 1;
                instruction_status[dyspatch_instructions_amount][3] = currentInstructionToDyspatch.id;        
                for(t=0 ; t < __INTEGER_INSTRUCTIONS_BUFFER_SIZE__ ; t++) {
                    if(Reservation_Stations.integer_instructions_buffer[t].disponibleBit == false) {
                        dyspatch_instructions_amount++;
                        Reservation_Stations.integer_instructions_buffer[t].id = currentInstructionToDyspatch.id;
                        Reservation_Stations.integer_instructions_buffer[t].dyspatch_cycle = currentInstructionToDyspatch.dyspatch_cycle;
                        Reservation_Stations.integer_instructions_buffer[t].OPcodeLabel = currentInstructionToDyspatch.identifier;
                        Reservation_Stations.integer_instructions_buffer[t].disponibleBit = true;
                        if(dependency_instruction.length > 0) {
                            if(dependency_instruction[lineNumber].RD == currentInstructionToDyspatch.RS) {
                                Reservation_Stations.integer_instructions_buffer[t].Vj = "";
                                Reservation_Stations.integer_instructions_buffer[t].Vk = currentInstructionToDyspatch.RT;
                                for(iteration = 0 ; iteration < Reservation_Stations.integer_instructions_buffer.length ; iteration++) {
                                    if(dependency_instruction[lineNumber].id == Reservation_Stations.integer_instructions_buffer[iteration].id) {
                                        Reservation_Stations.integer_instructions_buffer[t].Qj = "Integer ["+iteration+"]";
                                        Reservation_Stations.integer_instructions_buffer[t].Qk = "";
                                        break;
                                    }
                                }
                            }else if(dependency_instruction[lineNumber].RD == currentInstructionToDyspatch.RT) {
                                Reservation_Stations.integer_instructions_buffer[t].Vj = currentInstructionToDyspatch.RS;
                                Reservation_Stations.integer_instructions_buffer[t].Vk = "";
                                for(iteration = 0 ; iteration < Reservation_Stations.integer_instructions_buffer.length ; iteration++) {
                                    if(dependency_instruction[lineNumber].id == Reservation_Stations.integer_instructions_buffer[iteration].id) {
                                        Reservation_Stations.integer_instructions_buffer[t].Qj = "";
                                        Reservation_Stations.integer_instructions_buffer[t].Qk = "Integer ["+iteration+"]";
                                        break;
                                    }
                                }
                            }else if((dependency_instruction[lineNumber].RD == currentInstructionToDyspatch.RT) && (dependency_instruction[lineNumber].RD == currentInstructionToDyspatch.RS)){
                                Reservation_Stations.integer_instructions_buffer[t].Vj = "";
                                Reservation_Stations.integer_instructions_buffer[t].Vk = "";
                                for(iteration = 0 ; iteration < Reservation_Stations.integer_instructions_buffer.length ; iteration++) {
                                    if(dependency_instruction[lineNumber].id == Reservation_Stations.integer_instructions_buffer[iteration].id) {
                                        Reservation_Stations.integer_instructions_buffer[t].Qj = "Integer ["+iteration+"]";
                                        Reservation_Stations.integer_instructions_buffer[t].Qk = "Integer ["+iteration+"]";
                                        break;
                                    }
                                }
                            }
                        }else {
                            Reservation_Stations.integer_instructions_buffer[t].Vj = currentInstructionToDyspatch.RS;
                            Reservation_Stations.integer_instructions_buffer[t].Vk = currentInstructionToDyspatch.RT;
                            Reservation_Stations.integer_instructions_buffer[t].Qj = Reservation_Stations.integer_instructions_buffer[t].Qk = "";
                            break;
                        }
                    }
                }
                for(i=0 ; i < Reservation_Stations.integer_instructions_buffer.length ; i++) {
                    alert("RESERVATION BUSY: "+ i + " \nDISPONIVEL: " + Reservation_Stations.integer_instructions_buffer[i].disponibleBit + "\nVJ: " + Reservation_Stations.integer_instructions_buffer[i].Vj + "\nVK: " + Reservation_Stations.integer_instructions_buffer[i].Vk + "\nQj: " + Reservation_Stations.integer_instructions_buffer[i].Qj + "\nQk: "+Reservation_Stations.integer_instructions_buffer[i].Qk);
                }
                alert(Reservation_Stations.integer_instructions_buffer[2] === Reservation_Stations.integer_instructions_buffer[1]);
            }else {
                    alert("caiu");
                    continue;
            }
        }else if(currentInstructionToDyspatch.instruction_type == "float_1") {            
            if(reservationStationsHasDisponibleFU(Reservation_Stations.float_instructions_buffer, __FLOAT_INSTRUCTIONS_BUFFER_SIZE__, booleanControl)) {
                instruction_status[dyspatch_instructions_amount][0] = cycle;
                if(dependency_instruction.length == 0) {
                    instruction_status[dyspatch_instructions_amount][1] = cycle + __FLOAT_INSTRUCTIONS_CYCLES_AMOUNT__;
                }else {
                    if(dependency_instruction[lineNumber].instruction_type == "float_1") {
                        for(run=0 ; run<instruction_status.length; run++) {
                            if(dependency_instruction[lineNumber].id == instruction_status[run][3]) {
                                instruction_status[dyspatch_instructions_amount][1] = toSolveExecDelay(cycle, instruction_status[run][2],  __FLOAT_INSTRUCTIONS_CYCLES_AMOUNT__ , dependency_instruction[lineNumber].dyspatch_cycle, __FLOAT_INSTRUCTIONS_CYCLES_AMOUNT__);
                            }
                        }
                    }else if(dependency_instruction[lineNumber].instruction_type == "float_2") {
                        if(dependency_instruction[lineNumber].identifier == "MULTD") {
                            for(run=0 ; run<instruction_status.length; run++) {
                                if(dependency_instruction[lineNumber].id == instruction_status[run][3]) {
                                    instruction_status[dyspatch_instructions_amount][1] = toSolveExecDelay(cycle, instruction_status[run][2], __FLOAT_INSTRUCTIONS_CYCLES_AMOUNT__ , dependency_instruction[lineNumber].dyspatch_cycle, __FLOAT_MULTD_INSTRUCTION_CYCLES_AMOUNT__);
                                }
                            }
                        }else if(dependency_instruction[lineNumber].identifier == "DIVD"){
                            for(run=0 ; run<instruction_status.length; run++) {
                                if(dependency_instruction[lineNumber].id == instruction_status[run][3]) {
                                    instruction_status[dyspatch_instructions_amount][1] = toSolveExecDelay(cycle, instruction_status[run][2], __FLOAT_INSTRUCTIONS_CYCLES_AMOUNT__ , dependency_instruction[lineNumber].dyspatch_cycle,__FLOAT_DIVD_INSTRUCTION_CYCLES_AMOUNT__);
                                }
                            }
                        }
                    }else if(dependency_instruction[lineNumber].instruction_type == "load" || dependency_instruction[lineNumber].instruction_type == "store") {
                        for(run=0 ; run<instruction_status.length; run++) {
                            if(dependency_instruction[lineNumber].id == instruction_status[run][3]) {
                                instruction_status[dyspatch_instructions_amount][1] = toSolveExecDelay(cycle, instruction_status[run][2], __FLOAT_INSTRUCTIONS_CYCLES_AMOUNT__, dependency_instruction[lineNumber].dyspatch_cycle, __MEMORY_INSTRUCTIONS_CYCLES_AMOUNT__ );
                            }
                        }
                    }
                }
                instruction_status[dyspatch_instructions_amount][2] = instruction_status[dyspatch_instructions_amount][1] + 1;
                instruction_status[dyspatch_instructions_amount][3] = currentInstructionToDyspatch.id;
            }else {
                cycle++;
                continue;
            }
            dyspatch_instructions_amount++;
        }else if(currentInstructionToDyspatch.instruction_type == "float_2") {
            if(reservationStationsHasDisponibleFU(Reservation_Stations.integer_instructions_buffer, __FLOAT_INSTRUCTIONS_BUFFER_2_SIZE__, booleanControl)) {
                instruction_status[dyspatch_instructions_amount][0] = cycle;
                if(dependency_instruction.length == 0) {
                    if(currentInstructionToDyspatch.identifier == "MULTD") {
                        instruction_status[dyspatch_instructions_amount][1] = cycle + __FLOAT_MULTD_INSTRUCTION_CYCLES_AMOUNT__;
                    }else {
                        instruction_status[dyspatch_instructions_amount][1] = cycle + __FLOAT_DIVD_INSTRUCTION_CYCLES_AMOUNT__;
                    }
                }else {
                    if(dependency_instruction[lineNumber].instruction_type == "float_1") {
                        if(currentInstructionToDyspatch.identifier == "MULTD") {
                            for(run=0 ; run<instruction_status.length; run++) {
                                if(dependency_instruction[lineNumber].id == instruction_status[run][3]) {
                                    instruction_status[dyspatch_instructions_amount][1] = toSolveExecDelay(cycle, instruction_status[run][2],__FLOAT_MULTD_INSTRUCTION_CYCLES_AMOUNT__, dependency_instruction[lineNumber].dyspatch_cycle, __FLOAT_INSTRUCTIONS_CYCLES_AMOUNT__ );
                                }
                            }
                        }else {
                            for(run=0 ; run<instruction_status.length; run++) {
                                if(dependency_instruction[lineNumber].id == instruction_status[run][3]) {
                                    instruction_status[dyspatch_instructions_amount][1] = toSolveExecDelay(cycle, instruction_status[run][2], __FLOAT_DIVD_INSTRUCTION_CYCLES_AMOUNT__, dependency_instruction[lineNumber].dyspatch_cycle, __FLOAT_INSTRUCTIONS_CYCLES_AMOUNT__ );
                                }
                            }
                        }
                    }else if(dependency_instruction[lineNumber].instruction_type == "float_2") {
                        if(currentInstructionToDyspatch.identifier == "MULTD") {
                            if(dependency_instruction[lineNumber].identifier == "MULTD") {
                                for(run=0 ; run<instruction_status.length; run++) {
                                    if(dependency_instruction[lineNumber].id == instruction_status[run][3]) {
                                        instruction_status[dyspatch_instructions_amount][1] = toSolveExecDelay(cycle, instruction_status[run][2], __FLOAT_MULTD_INSTRUCTION_CYCLES_AMOUNT__, dependency_instruction[lineNumber].dyspatch_cycle, __FLOAT_MULTD_INSTRUCTION_CYCLES_AMOUNT__);
                                    }
                                }
                            }else {
                                for(run=0 ; run<instruction_status.length; run++) {
                                    if(dependency_instruction[lineNumber].id == instruction_status[run][3]) {
                                        instruction_status[dyspatch_instructions_amount][1] = toSolveExecDelay(cycle, instruction_status[run][2],  __FLOAT_MULTD_INSTRUCTION_CYCLES_AMOUNT__, dependency_instruction[lineNumber].dyspatch_cycle,__FLOAT_DIVD_INSTRUCTION_CYCLES_AMOUNT__);
                                    }
                                }
                            }
                        }else {
                            if(dependency_instruction[lineNumber].identifier == "MULTD") {
                                for(run=0 ; run<instruction_status.length; run++) {
                                    if(dependency_instruction[lineNumber].id == instruction_status[run][3]) {
                                        instruction_status[dyspatch_instructions_amount][1] = toSolveExecDelay(cycle, instruction_status[run][2], __FLOAT_DIVD_INSTRUCTION_CYCLES_AMOUNT__, dependency_instruction[lineNumber].dyspatch_cycle, __FLOAT_MULTD_INSTRUCTION_CYCLES_AMOUNT__);
                                    }
                                }
                            }else {
                                for(run=0 ; run<instruction_status.length; run++) {
                                    if(dependency_instruction[lineNumber].id == instruction_status[run][3]) {
                                        instruction_status[dyspatch_instructions_amount][1] = toSolveExecDelay(cycle, instruction_status[run][2], __FLOAT_DIVD_INSTRUCTION_CYCLES_AMOUNT__, dependency_instruction[lineNumber].dyspatch_cycle, __FLOAT_DIVD_INSTRUCTION_CYCLES_AMOUNT__);
                                    }
                                }
                            }
                        }
                    }else if(dependency_instruction[lineNumber].instruction_type == "load" || dependency_instruction[lineNumber].instruction_type == "store") {
                        if(currentInstructionToDyspatch.identifier == "MULTD") {
                            alert(dependency_instruction[lineNumber].dyspatch_cycle);
                            for(run=0 ; run<instruction_status.length; run++) {
                                if(dependency_instruction[lineNumber].id == instruction_status[run][3]) {
                                    instruction_status[dyspatch_instructions_amount][1] = toSolveExecDelay(cycle, instruction_status[run][2], __FLOAT_MULTD_INSTRUCTION_CYCLES_AMOUNT__, dependency_instruction[lineNumber].dyspatch_cycle, __MEMORY_INSTRUCTIONS_CYCLES_AMOUNT__);
                                }
                            }
                        }else if(currentInstructionToDyspatch.identifier == "DIVD"){
                            for(run=0 ; run<instruction_status.length; run++) {
                                if(dependency_instruction[lineNumber].id == instruction_status[run][3]) {
                                    instruction_status[dyspatch_instructions_amount][1] = toSolveExecDelay(cycle, instruction_status[run][2], __FLOAT_DIVD_INSTRUCTION_CYCLES_AMOUNT__, dependency_instruction[lineNumber].dyspatch_cycle,__MEMORY_INSTRUCTIONS_CYCLES_AMOUNT__);
                                }
                            }
                        }
                    }
                }
                instruction_status[dyspatch_instructions_amount][2] = instruction_status[dyspatch_instructions_amount][1] + 1;
                instruction_status[dyspatch_instructions_amount][3] = currentInstructionToDyspatch.id;
            }else {
                cycle++;
                continue;
            }
            dyspatch_instructions_amount++;
        }else if(currentInstructionToDyspatch.instruction_type == "load") {
            if(reservationStationsHasDisponibleFU(Reservation_Stations_Memory.load_instructions_buffer, __LOAD_INSTRUCTIONS_BUFFER_SIZE__, booleanControl)) {
                instruction_status[dyspatch_instructions_amount][0] = cycle;
                if(dependency_instruction.length == 0) {
                    instruction_status[dyspatch_instructions_amount][1] = cycle + __MEMORY_INSTRUCTIONS_CYCLES_AMOUNT__;
                }else {
                    if(dependency_instruction[lineNumber].instruction_type == "integer") {
                        for(run=0 ; run<instruction_status.length; run++) {
                            if(dependency_instruction[lineNumber].id == instruction_status[run][3]) {
                                instruction_status[dyspatch_instructions_amount][1] = toSolveExecDelay(cycle, instruction_status[run][2], __MEMORY_INSTRUCTIONS_CYCLES_AMOUNT__, dependency_instruction[lineNumber].dyspatch_cycle,__INTEGER_INSTRUCTIONS_CYCLES_AMOUNT__);
                            }
                        }
                    }else if(dependency_instruction[lineNumber].instruction_type == "load" || dependency_instruction[lineNumber].instruction_type == "store") {
                        for(run=0 ; run<instruction_status.length; run++) {
                            if(dependency_instruction[lineNumber].id == instruction_status[run][3]) {
                                instruction_status[dyspatch_instructions_amount][1] = toSolveExecDelay(cycle, instruction_status[run][2], __MEMORY_INSTRUCTIONS_CYCLES_AMOUNT__, dependency_instruction[lineNumber].dyspatch_cycle, __MEMORY_INSTRUCTIONS_CYCLES_AMOUNT__);
                            }
                        }
                    }else if(dependency_instruction[lineNumber].instruction_type == "float_1") {
                        for(run=0 ; run<instruction_status.length; run++) {
                            if(dependency_instruction[lineNumber].id == instruction_status[run][3]) {
                                instruction_status[dyspatch_instructions_amount][1] = toSolveExecDelay(cycle, instruction_status[run][2], __MEMORY_INSTRUCTIONS_CYCLES_AMOUNT__, dependency_instruction[lineNumber].dyspatch_cycle,__FLOAT_INSTRUCTIONS_CYCLES_AMOUNT__);
                            }
                        }
                    }else if(dependency_instruction[lineNumber].instruction_type == "float_2") {
                        if(dependency_instruction[lineNumber].identifier == "MULTD") {
                            for(run=0 ; run<instruction_status.length; run++) {
                                if(dependency_instruction[lineNumber].id == instruction_status[run][3]) {
                                    instruction_status[dyspatch_instructions_amount][1] = toSolveExecDelay(cycle, instruction_status[run][2], __MEMORY_INSTRUCTIONS_CYCLES_AMOUNT__, dependency_instruction[lineNumber].dyspatch_cycle, __FLOAT_MULTD_INSTRUCTION_CYCLES_AMOUNT__);
                                }
                            }
                        }else {
                            for(run=0 ; run<instruction_status.length; run++) {
                                if(dependency_instruction[lineNumber].id == instruction_status[run][3]) {
                                    instruction_status[dyspatch_instructions_amount][1] = toSolveExecDelay(cycle, instruction_status[run][2], __MEMORY_INSTRUCTIONS_CYCLES_AMOUNT__, dependency_instruction[lineNumber].dyspatch_cycle,__FLOAT_DIVD_INSTRUCTION_CYCLES_AMOUNT__);
                                }
                            }
                        }
                    }
                }
                instruction_status[dyspatch_instructions_amount][2] = instruction_status[dyspatch_instructions_amount][1] + 1;
                instruction_status[dyspatch_instructions_amount][3] = currentInstructionToDyspatch.id;
            }else {
                cycle++;
                continue;
            }
            dyspatch_instructions_amount++;
        }else if(currentInstructionToDyspatch.instruction_type == "store") {
            if(reservationStationsHasDisponibleFU(Reservation_Stations_Memory.store_instructions_buffer, __STORE_INSTRUCTIONS_BUFFER_SIZE__, booleanControl)) {
                instruction_status[dyspatch_instructions_amount][0] = cycle;
                if(dependency_instruction.length == 0) {
                    instruction_status[dyspatch_instructions_amount][1] = cycle + __MEMORY_INSTRUCTIONS_CYCLES_AMOUNT__;
                }else {
                    if(dependency_instruction[lineNumber].instruction_type == "integer") {
                        for(run=0 ; run<instruction_status.length; run++) {
                            if(dependency_instruction[lineNumber].id == instruction_status[run][3]) {
                                instruction_status[dyspatch_instructions_amount][1] = toSolveExecDelay(cycle, instruction_status[run][2], __MEMORY_INSTRUCTIONS_CYCLES_AMOUNT__, dependency_instruction[lineNumber].dyspatch_cycle, __INTEGER_INSTRUCTIONS_CYCLES_AMOUNT__ );
                            }
                        }
                    }else if(dependency_instruction[lineNumber].instruction_type == "load" || dependency_instruction[lineNumber].instruction_type == "store") {
                        for(run=0 ; run<instruction_status.length; run++) {
                            if(dependency_instruction[lineNumber].id == instruction_status[run][3]) {
                                instruction_status[dyspatch_instructions_amount][1] = toSolveExecDelay(cycle, instruction_status[run][2], __MEMORY_INSTRUCTIONS_CYCLES_AMOUNT__, dependency_instruction[lineNumber].dyspatch_cycle, __MEMORY_INSTRUCTIONS_CYCLES_AMOUNT__);
                            }
                        }
                    }else if(dependency_instruction[lineNumber].instruction_type == "float_1") {
                        for(run=0 ; run<instruction_status.length; run++) {
                            if(dependency_instruction[lineNumber].id == instruction_status[run][3]) {
                                instruction_status[dyspatch_instructions_amount][1] = toSolveExecDelay(cycle, instruction_status[run][2],  __MEMORY_INSTRUCTIONS_CYCLES_AMOUNT__, dependency_instruction[lineNumber].dyspatch_cycle, __INTEGER_INSTRUCTIONS_CYCLES_AMOUNT__);
                            }
                        }
                    }else if(dependency_instruction[lineNumber].instruction_type == "float_2") {
                        if(dependency_instruction[lineNumber].identifier == "MULTD") {
                            for(run=0 ; run<instruction_status.length; run++) {
                                if(dependency_instruction[lineNumber].id == instruction_status[run][3]) {
                                    instruction_status[dyspatch_instructions_amount][1] = toSolveExecDelay(cycle, instruction_status[run][2], __MEMORY_INSTRUCTIONS_CYCLES_AMOUNT__, dependency_instruction[lineNumber].dyspatch_cycle, __FLOAT_MULTD_INSTRUCTION_CYCLES_AMOUNT__);
                                }
                        }
                        }else {
                            for(run=0 ; run<instruction_status.length; run++) {
                                if(dependency_instruction[lineNumber].id == instruction_status[run][3]) {
                                    instruction_status[dyspatch_instructions_amount][1] = toSolveExecDelay(cycle, instruction_status[run][2], __MEMORY_INSTRUCTIONS_CYCLES_AMOUNT__, dependency_instruction[lineNumber].dyspatch_cycle,  __FLOAT_DIVD_INSTRUCTION_CYCLES_AMOUNT__);
                                }
                            }
                        }
                    }
                }
                instruction_status[dyspatch_instructions_amount][2] = instruction_status[dyspatch_instructions_amount][1] + 1;
                instruction_status[dyspatch_instructions_amount][3] = currentInstructionToDyspatch.id;
            }else {
                cycle++;
                continue;
            }
            dyspatch_instructions_amount++;
        }   
    }while(dyspatch_instructions_amount < data.length);
    renderizeResults(cycle);
}

/**
 * This function is responsible for rendering and
 * compiling through a table and shows it for the user.
 * It generates a new html page with tables and all proccessing
 * content.
 */
function renderizeResults(cycle) {
    var exec_table = "";
    var reservation_table = "";
    var memory_reservation_table = "";

    for(i = 0; i < instruction_status.length; i++) {
        exec_table += "<tr>";
        exec_table += "<td style='text-align:left !important;'><p> ";
            if(data[i].instruction_type == "load" || data[i].instruction_type == "store") {
                exec_table += data[i].identifier + " " + data[i].RD + ", " + data[i].RS + "(" + data[i].RT + ")";
            }else {
                exec_table += data[i].identifier + " " + data[i].RD + ", " + data[i].RS + ", " + data[i].RT;
            }
        exec_table += "</p></td>";
        for(j = 0; j < 3; j++) {
            exec_table += "<td><p>" + instruction_status[i][j] + "</p></td>";
        }
        exec_table += "</tr>";
    }

    for(i = 0 ; i < Reservation_Stations.integer_instructions_buffer.length ; i++) {
        reservation_table += "<tr>";
            reservation_table += "<td><p>";
                reservation_table += "Integer ["+eval(i+1)+"]";
            reservation_table += "</p></td>";
            reservation_table += "<td><p>";
                if(Reservation_Stations.integer_instructions_buffer[i].disponibleBit) {
                    reservation_table += "<span style='color:#F00'>YES </spoan>";
                }else if(!Reservation_Stations.integer_instructions_buffer[i].disponibleBit){
                    reservation_table += "<span style='color: #00FF00;'>NO </span>";
                }
                
            reservation_table += "</p></td>";
            reservation_table += "<td><p>";
                reservation_table += Reservation_Stations.integer_instructions_buffer[i].OPcodeLabel;
            reservation_table += "</p></td>";
            reservation_table += "<td><p>";
                reservation_table += Reservation_Stations.integer_instructions_buffer[i].Vj;
            reservation_table += "</p></td>";
            reservation_table += "<td><p>";
                reservation_table += Reservation_Stations.integer_instructions_buffer[i].Vk;
            reservation_table += "</p></td>";
            reservation_table += "<td><p style='color: #F00;'>";
                reservation_table += Reservation_Stations.integer_instructions_buffer[i].Qj;
            reservation_table += "</p></td>";
            reservation_table += "<td><p style='color: #F00;'>";
                reservation_table += Reservation_Stations.integer_instructions_buffer[i].Qk;
            reservation_table += "</p></td>";
        reservation_table += "</tr>";
    }

    reservation_table += "<tr><td colspan='7'><hr/></td></tr>";
    for(i = 0 ; i < Reservation_Stations.float_instructions_buffer.length ; i++) {
        reservation_table += "<tr>";
            reservation_table += "<td><p>";
                reservation_table += "Float_1 ["+eval(i+1)+"]";
            reservation_table += "</p></td>";
            reservation_table += "<td><p>";
                if(Reservation_Stations.float_instructions_buffer[i].disponibleBit) {
                    reservation_table += "<span style='color:#F00'>YES </spoan>";
                }else if(!Reservation_Stations.float_instructions_buffer[i].disponibleBit){
                    reservation_table += "<span style='color: #00FF00;'>NO </span>";
                }
                
            reservation_table += "</p></td>";
            reservation_table += "<td><p>";
                reservation_table += Reservation_Stations.float_instructions_buffer[i].OPcodeLabel;
            reservation_table += "</p></td>";
            reservation_table += "<td><p>";
                reservation_table += Reservation_Stations.float_instructions_buffer[i].Vj;
            reservation_table += "</p></td>";
            reservation_table += "<td><p>";
                reservation_table += Reservation_Stations.float_instructions_buffer[i].Vk;
            reservation_table += "</p></td>";
            reservation_table += "<td><p style='color: #F00;'>";
                reservation_table += Reservation_Stations.float_instructions_buffer[i].Qj;
            reservation_table += "</p></td>";
            reservation_table += "<td><p style='color: #F00;'>";
                reservation_table += Reservation_Stations.float_instructions_buffer[i].Qk;
            reservation_table += "</p></td>";
        reservation_table += "</tr>";
    }
    reservation_table += "<tr><td colspan='7'><hr/></td></tr>";
    for(i = 0 ; i < Reservation_Stations.float_instructions_buffer_2.length ; i++) {
        reservation_table += "<tr>";
            reservation_table += "<td><p>";
                reservation_table += "Float_2 ["+eval(i+1)+"]";
            reservation_table += "</p></td>";
            reservation_table += "<td><p>";
                if(Reservation_Stations.float_instructions_buffer_2[i].disponibleBit) {
                    reservation_table += "<span style='color:#F00'>YES </spoan>";
                }else if(!Reservation_Stations.float_instructions_buffer_2[i].disponibleBit){
                    reservation_table += "<span style='color: #00FF00;'>NO </span>";
                }
                
            reservation_table += "</p></td>";
            reservation_table += "<td><p>";
                reservation_table += Reservation_Stations.float_instructions_buffer_2[i].OPcodeLabel;
            reservation_table += "</p></td>";
            reservation_table += "<td><p>";
                reservation_table += Reservation_Stations.float_instructions_buffer_2[i].Vj;
            reservation_table += "</p></td>";
            reservation_table += "<td><p>";
                reservation_table += Reservation_Stations.float_instructions_buffer_2[i].Vk;
            reservation_table += "</p></td>";
            reservation_table += "<td><p style='color: #F00;'>";
                reservation_table += Reservation_Stations.float_instructions_buffer_2[i].Qj;
            reservation_table += "</p></td>";
            reservation_table += "<td><p style='color: #F00;'>";
                reservation_table += Reservation_Stations.float_instructions_buffer_2[i].Qk;
            reservation_table += "</p></td>";
        reservation_table += "</tr>";
    }

    for(i = 0 ; i < Reservation_Stations_Memory.load_instructions_buffer.length ; i++) {
        memory_reservation_table += "<tr>";
            memory_reservation_table += "<td><p>";
                memory_reservation_table += "Load ["+eval(i+1)+"]";
            memory_reservation_table += "</p></td>";
            memory_reservation_table += "<td><p>";
                if(Reservation_Stations_Memory.load_instructions_buffer[i].disponibleBit) {
                    memory_reservation_table += "<span style='color:#F00'>YES </spoan>";
                }else if(!Reservation_Stations_Memory.load_instructions_buffer[i].disponibleBit){
                    memory_reservation_table += "<span style='color: #00FF00;'>NO </span>";
                }
                
            memory_reservation_table += "</p></td>";
            memory_reservation_table += "<td><p>";
                if(Reservation_Stations_Memory.load_instructions_buffer[i].RS == undefined || Reservation_Stations_Memory.load_instructions_buffer[i].RT == undefined) {
                    Reservation_Stations_Memory.load_instructions_buffer[i].RS = "";
                    Reservation_Stations_Memory.load_instructions_buffer[i].RT = "";
                }
                memory_reservation_table += Reservation_Stations_Memory.load_instructions_buffer[i].RS +"+"+ Reservation_Stations_Memory.load_instructions_buffer[i].RT;
            memory_reservation_table += "</p></td>";
        memory_reservation_table += "</tr>";
    }
    memory_reservation_table += "<tr><td colspan='3'><hr/></td></tr>";
    for(i = 0 ; i < Reservation_Stations_Memory.store_instructions_buffer.length ; i++) {
        memory_reservation_table += "<tr>";
            memory_reservation_table += "<td><p>";
                memory_reservation_table += "Store ["+eval(i+1)+"]";
            memory_reservation_table += "</p></td>";
            memory_reservation_table += "<td><p>";
                if(Reservation_Stations_Memory.store_instructions_buffer[i].disponibleBit) {
                    memory_reservation_table += "<span style='color:#F00'>YES </spoan>";
                }else if(!Reservation_Stations_Memory.store_instructions_buffer[i].disponibleBit){
                    memory_reservation_table += "<span style='color: #00FF00;'>NO </span>";
                }
                
            memory_reservation_table += "</p></td>";
            memory_reservation_table += "<td><p>";
                if(Reservation_Stations_Memory.store_instructions_buffer[i].RS == undefined || Reservation_Stations_Memory.store_instructions_buffer[i].RT == undefined) {
                    Reservation_Stations_Memory.store_instructions_buffer[i].RS = "";
                    Reservation_Stations_Memory.store_instructions_buffer[i].RT = "";
                }
                memory_reservation_table += Reservation_Stations_Memory.store_instructions_buffer[i].RS +"+"+ Reservation_Stations_Memory.store_instructions_buffer[i].RT;
            memory_reservation_table += "</p></td>";
        memory_reservation_table += "</tr>";
    }

    var myWindow = window.open("", "_blank", "toolbar=yes,scrollbars=yes,resizable=no,top=500,left=500,width=600px,height=400px");
    myWindow.document.write(+
    "<!DOCTYPE html>"+
    "<html>"+
        "<head>"+
            "<title>Tomasulo Proccess Result</title>"+
            "<style>"+
                "* {"+
                    "margin: 0px auto;"+
                    "padding: 0px;"+
                "}"+
                "body {"+
                    "background-color: #333399;"+
                "}"+
                "thead, tr:first-child {"+
                    "background: #FFF !important;"+
                "}"+
                "h1 {"+
                    "text-transform: uppercase;"+
                    "color: #333399;"+
                "}"+
                "table {"+
                    "width: 70%;"+
                    "border: solid 2px #fff;"+
                    "border-radius: 10px;"+
                    "-o-border-radius: 10px;"+
                    "-ms-border-radius: 10px;"+
                    "-moz-border-radius: 10px;"+
                    "-webkit-border-radius: 10px;"+
                    "text-align: center !important;"+
                    "margin-bottom: 100px"+
                "}"+
                "tr {"+
                    "border: solid 1px #FFF !important;"+
                "}"+
                "td {"+
                    "padding: 5px !important;"+
                    "font-family: 'courier-new', sans-serif;"+
                    "transition: 0.8s;"+
                    "-o-transition: 0.8s;"+
                    "-ms-transition: 0.8s;"+
                    "-moz-transition: 0.8s;"+
                    "-webkit-transition: 0.8s;"+
                "}"+
                "tr::last-child td {"+
                    "border: none;"+
                "}"+
                "tr:hover {"+
                    "background: rgba(255,255,255,0.3);"+
                    "transition: 0.8s;"+
                    "-o-transition: 0.8s;"+
                    "-ms-transition: 0.8s;"+
                    "-moz-transition: 0.8s;"+
                    "-webkit-transition: 0.8s;"+
                    ""+
                "}"+
                "p {"+
                    "font-size: 20px;"+
                    "color: #FFF"+
                "}"+
            "</style>"+
        "</head>"+
            "<body>"+
                "<main>"+
                    "<center>"+
                        "<table>"+
                            "<thead>"+
                                "<tr>"+
                                    "<td colspan='4'><h1>Execution Table</h1></td>"+
                                "</tr>"+
                            "</thead>"+
                            "<tbody>"+
                                "<tr>"+
                                    "<td>INSTRUCTION:</td>"+
                                    "<td>ISSUE:</td>"+
                                    "<td>EXEC FINISHED:</td>"+
                                    "<td>WRITE:</td>"+
                                "</tr>"+
                                exec_table
                            +"</tbody>"+
                        "</table>"+
                        "<table>"+
                            "<thead>"+
                                "<tr>"+
                                    "<td colspan='7'><h1> Reservation Stations - CYCLE "+cycle+"</h1></td>"+
                                "</tr>"+
                            "</thead>"+
                            "<tbody>"+
                                "<tr>"+
                                    "<td>FUNCTIONAL UNIT</td>"+
                                    "<td>BUSY</td>"+
                                    "<td>OPCode Label</td>"+
                                    "<td>Vj</td>"+
                                    "<td>Vk</td>"+
                                    "<td>Qj</td>"+
                                    "<td>Qk</td>"+
                                "</tr>"+
                                reservation_table
                            +"</tbody>"+
                        "</table>"+
                        "<table>"+
                            "<thead>"+
                                "<tr>"+
                                    "<td colspan='3'><h1> Memory Reservation Stations - CYCLE "+cycle+"</h1></td>"+
                                "</tr>"+
                            "</thead>"+
                            "<tbody>"+
                                "<tr>"+
                                    "<td>FUNCTIONAL UNIT</td>"+
                                    "<td>BUSY</td>"+
                                    "<td>Address</td>"+
                                "</tr>"+
                                memory_reservation_table
                            +"</tbody>"+
                        "</table>"+
                    "</center>"+
                "</main>"+
            "</body>"+
    "</html>");
}

/**
 * This is an array to store all
 * page backgrounds colors for makes
 * a gradient UI design.
 */
var colors = new Array(
  [131,58,180],
  [253, 29, 29],
  [253, 29, 29],
  [252, 176, 69]
);
var step = 0;
var colorIndices = [0,1,2,3];

//transition speed
var gradientSpeed = 0.001;

/**
 * This method generates a lot of transitios
 * based on the colors
 */
function updateGradient() {
  
  if ( $===undefined ) return;
  
    var c0_0 = colors[colorIndices[0]];
    var c0_1 = colors[colorIndices[1]];
    var c1_0 = colors[colorIndices[2]];
    var c1_1 = colors[colorIndices[3]];

    var istep = 1 - step;
    var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
    var color1 = "rgb("+r1+","+g1+","+b1+")";

    var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
    var color2 = "rgb("+r2+","+g2+","+b2+")";

    $('body').css({
        background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
        background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"}).css({
        background: "-ms-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"}).css({
        background: "-o-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"}).css({
        background: "linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
    
    step += gradientSpeed;
    if ( step >= 1 )
    {
        step %= 1;
        colorIndices[0] = colorIndices[1];
        colorIndices[2] = colorIndices[3];
        
        //pick two new target color indices
        //do not pick the same as the current one
        colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
        colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
        
    }
}

setInterval(updateGradient,50);
