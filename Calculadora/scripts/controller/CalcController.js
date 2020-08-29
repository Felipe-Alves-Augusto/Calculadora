class CalcController {

    constructor() {

        this._audio = new Audio('click.mp3');
        this._audioOnOff = false;
        this._lastOperator = '';
        this._lastNumber = ''
        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");

        this._currentDate;

        this.initialize();
        this.initButtonsEvents();
        this.setLastNumberDisplay();
        this.initKeyBord();
        this.copyClipBord();
        

    }

    

    copyClipBord(){
        let input = document.createElement('input');

        input.value = this.displayCalc;

        document.body.appendChild(input);

        input.select();

        input.remove();

        document.execCommand('Copy');
    }

    initialize() {

        this.setDisplayDateTime();
       

        setInterval(() => {

            this.setDisplayDateTime();

        }, 1000);

        document.querySelectorAll('.btn-ac').forEach(btn => {

            btn.addEventListener('dblclick', e => {

                this.toggleAudio();

            });

        });

    }

    toggleAudio(){

        this._audioOnOff = !this._audioOnOff;
    }


    playAudio(){
        if(this._audioOnOff){
            this._audio.currentTime = 0
            this._audio.play();
        }
    }


   


    addEventListenerAll(element, events, fn) {

        events.split(' ').forEach(event => {

            element.addEventListener(event, fn, false);

        });

    }

    clearAll() {

        this._operation = [];
        this.setLastNumberDisplay();
    }

    clearEntry() {
        this._operation.pop();
        this.setLastNumberDisplay();
    }
    getLastOperation() {

        return this._operation[this._operation.length - 1];

    }

    setLastOperation(value) {

        this._operation[this._operation.length - 1] = value;

    }

    isOperator(value) {

        return (['+', '-', '*', '%', '/'].indexOf(value) > -1);

    }

    pushOperation(value) {

        this._operation.push(value);


        if (this._operation.length > 3) {

      
            this.calc();
            
        }

    }

    getResult(){
        try{
            return eval(this._operation.join(""));
        }catch(e){
            setTimeout(()=> {
                this.setError();
            })
            
        }
    }

    //calculando o resultado
    calc(){

        let last = ''

        if(this._operation.length > 3){
            let last = this._operation.pop();

           this._lastNumber = this.getResult();
        }

    
        let result = this.getResult();

        if(last == '%'){

          result = result / 100;

            this._operation[result];

        }else{

            this._operation = [result];

            if(last) this._operation.push(last)
        }


       
        this.setLastNumberDisplay();
    }

    getLastItem(isOperator = true){

        let lastItem;
    }

    setLastNumberDisplay(){

        let lastNumber;

        for(let i = this._operation.length-1;i >= 0; i--){
            

            if(!this.isOperator(this._operation[i])){
                lastNumber = this._operation[i];
                break;
            }
        }

        if(!lastNumber) lastNumber = 0
        this.displayCalc = lastNumber
        
    }

    addDoc(){

      

       let lastOperation =  this.getLastOperation();

       if(typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return

       if(this.isOperator(lastOperation) || !lastOperation){

        this.pushOperation("0.");

       }else{
           this.setLastOperation(lastOperation.toString() + '.');
       }

       this.setLastNumberDisplay();

    }
    
   
   
    addOperation(value){

        if(isNaN(this.getLastOperation())){
            // string
            //primeiro numero digitado
            if(this.isOperator(value)){
                //trocar o operador
                 this.setLastOperation(value)// aqui vai substituir o sinal


            }
            else{
                this.pushOperation(value);
                this.setLastNumberDisplay();
            }
        }else{
            if(this.isOperator(value)){
                this.pushOperation(value);
            }else{


                let newValue =  this.getLastOperation().toString() + value.toString(); // quando o usario digitar dois numeros vai concatenar
                this.setLastOperation(newValue); // e aqui estamos adicionando esse numero novo que foi digitado;
                this.setLastNumberDisplay();
                console.log(this._operation);

            }
          
        }

      
    }

    setError() {

        this.displayCalc = "Error";

    }
    


    execBtn(value) {

        this.playAudio();
     
        switch (value) {
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperation('+');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'igual':
                this.calc();
                break;
            case 'ponto':
                this.addDoc();
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
            default:
                this.setError();
            
        }

    }

    initButtonsEvents() {

        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index) => {

            this.addEventListenerAll(btn, 'click', e => {

                let textBtn = btn.className.baseVal.replace("btn-", "");

                this.execBtn(textBtn);

            });

            this.addEventListenerAll(btn, 'mouseover', e => {

                btn.style.cursor = "pointer";

            });

        });

    }

    initKeyBord(){
        document.addEventListener('keyup', function(e){

            this.playAudio()
           
                switch (e.key) {
                    case 'Escape':
                        this.clearAll();
                        break;
                    case 'Backspace':
                        this.clearEntry();
                        break;
                    case '+':
                        this.addOperation(e.key)
                        break;
                    case '-':
                        this.addOperation(e.key);
                        break;
                    case '/':
                        this.addOperation(e.key);
                        break;
                    case '*':
                        this.addOperation(e.key);
                        break;
                    case '%':
                        this.addOperation(e.key);
                        break;
                    case 'igual':
                        this.calc();
                        break;
                    case 'Enter':
                        this.calc();
                    break;
                    case '=':
                        this.calc();
                    case '.':
                    case ',':
                        this.addDoc();
                    break;
                    case 'ponto':
                        this.addDoc();
                        break;
                    case '0':
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                    case '6':
                    case '7':
                    case '8':
                    case '9':
                        this.addOperation(parseInt(e.key));
                    break;

                    case 'c':
                        if(e.ctrlKey) this.copyClipBord();
                        break;
                   
                    
                }
        });
    }

    setDisplayDateTime() {

        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);

    }

    get displayTime() {
        return this._timeEl.innerHTML;
    }

    set displayTime(value) {
        this._timeEl.innerHTML = value;
    }

    get displayDate() {
        return this._dateEl.innerHTML;
    }

    set displayDate(value) {
        this._dateEl.innerHTML = value;
    }

    get displayCalc() {

        return this._displayCalcEl.innerHTML;

    }

    set displayCalc(value) {

        if(value.toString().length > 10){
            this.setError();
            return false
        }

        this._displayCalcEl.innerHTML = value;
        
    }

    get currentDate() {
        return new Date();
    }

    set currentDate(value) {
        this._currentDate = value;
    }

}
