const calculateTotalAmount = (quantity: number, load: number) => {
    let total;

    if (quantity<=5000){
        total = quantity*1.5;
    } else if (quantity>=5000 && quantity<10000){
        total = quantity*1.4;
    } else if (quantity>=10000 && quantity<15000){
        total = quantity*1.3;
    } else {
        total = quantity*1.2;
    }

    if(load===6){
        total*=1.1;
    } else if(load===12){
        load*=1.2;
    } else {
        load*=1.3;
    }
    return total;
}

export {
    calculateTotalAmount
}