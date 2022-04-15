import { useState } from "react";

import './Game.css';

function Game(prop){
    const random = prop.random;

    const range = (start, end) => {
        const length = end - start;
        return Array.from({ length }, (_, i) => start + i);
    }

    const perguntasDefault = [" ", "é par", "é impar", "é primo", "não é primo", "é maior que x", "é menor que x"];



    const [numbers, setNumbers] = useState(range(1, 5001));
    const [display, setDisplay] = useState([]);    
    const [perguntas, setPerguntas] = useState(perguntasDefault);

    const [pergunta, setPergunta] = useState(" ");
    const [guess, setGuess] = useState(0);
    const [valorDX, setValorDX] = useState(0);

    const [perguntaHP, setPerguntaHP] = useState(6);
    const [playerHP, setPlayerHP] = useState(3);



    function handleQuestionSubmit(event) {
        event.preventDefault();

        switch(pergunta) {
            case "é par":
                if(random % 2 === 0){
                    setDisplay(["sim, o número é par", ...display]);
                    setNumbers(numbers.filter(num => num % 2 === 0));
                } else {
                    setDisplay(["o número não é par", ...display]);    
                    setNumbers(numbers.filter(num => num % 2 === 1));                    
                    setPerguntaHP(perguntaHP - 1);                                        
                }
                setPerguntas(perguntas.filter(p => p !== "é par" && p !== "é impar"));
                break;
            case "é impar":
                if(random % 2 === 1){
                    setDisplay(["sim, o número é impar", ...display]);
                    setNumbers(numbers.filter(num => num % 2 === 1));                    
                } else {
                    setDisplay(["o número não é impar", ...display]);                    
                    setNumbers(numbers.filter(num => num % 2 === 0));                    
                    setPerguntaHP(perguntaHP - 1);                                        
                }
                setPerguntas(perguntas.filter(p => p !== "é par" && p !== "é impar"));                
                break;
            case "é primo":
                if (ehPrimo(random)){
                    setDisplay(["sim, o número é primo", ...display]);
                    setNumbers(numbers.filter(num => ehPrimo(num)));
                } else {
                    setDisplay(["o número não é primo", ...display]);
                    setNumbers(numbers.filter(num => !ehPrimo(num)));
                    setPerguntaHP(perguntaHP - 1);                    
                }
                setPerguntas(perguntas.filter(p => p !== "é primo" && p !== "não é primo"));                
                break;
            case "não é primo":
                if (!ehPrimo(random)){
                    setDisplay(["sim, o número não é primo", ...display]);
                    setNumbers(numbers.filter(num => !ehPrimo(num)));
                } else {
                    setDisplay(["o número é primo", ...display]);
                    setNumbers(numbers.filter(num => ehPrimo(num)));                    
                    setPerguntaHP(perguntaHP - 1);
                }
                setPerguntas(perguntas.filter(p => p !== "é primo" && p !== "não é primo"));
                break;                
            case "é maior que x":
                if (random > valorDX){
                    setDisplay([`sim, o número é maior que ${valorDX}`, ...display]);
                    setNumbers(numbers.filter(num => num > valorDX));                    
                } else {
                    setDisplay([`o número não é maior que ${valorDX}`, ...display]);                    
                    setNumbers(numbers.filter(num => num <= valorDX));                    
                    setPerguntaHP(perguntaHP - 1);
                }
                break;                                                                          
            case "é menor que x":
                if (random < valorDX){
                    setDisplay([`sim, o número é menor que ${valorDX}`, ...display]);
                    setNumbers(numbers.filter(num => num < valorDX));                    
                } else {
                    setDisplay([`o número não é menor que ${valorDX}`, ...display]);                    
                    setNumbers(numbers.filter(num => num >= valorDX));                    
                    setPerguntaHP(perguntaHP - 1);                    
                }
              break;
            default:
                alert("escolha uma pergunta primeiro");
        }
        if(perguntaHP < 1) {
            setPerguntas([]);
        }
        setPergunta(" ");
        setValorDX(0);
    }

    function handleGuessSubmit(event) {
        event.preventDefault();

        if(playerHP > 0){
            console.log("guess", guess);
            console.log("random", random);            
            if(Number(guess) === Number(random)){
                alert("Vitória");
                setDisplay([`Correto, o número era: ${random}`]);                
            } else {
                setPlayerHP(playerHP - 1);
            }
        } else {
            if(playerHP < 1){
                alert("Fim de jogo");
                setDisplay([`O número correto era: ${random}`]);
            }
        }
    }


    function handleGuessChange(event){
        setGuess(event.target.value);
    }    
    function handleQuestionChange(event){
        setPergunta(event.target.value);
    }
    function handleValorDXChange(event){
        setValorDX(event.target.value);
    }

    function ehPrimo(num){
        for (let i = 2; i * i <= num; i++)
            if (num % i === 0)
                return false; 
        return num > 1;
    }






    return (
        <div>
            <div className="inputs__container">
                <div className='input__container__item'>
                    <form onSubmit={handleQuestionSubmit}>
                        <label htmlFor="filter">Perguntas: ({perguntaHP})</label>
                        <br />
                        <select name="filter" id="filter" onChange={handleQuestionChange} value={pergunta}>
                        {
                            perguntas.map( q => (
                                <option value={q}> {q} </option>
                            ))
                        }                            
                        </select> 
                        
                        {
                            (pergunta === "é maior que x" || pergunta === "é menor que x") &&        
                            <div>
                                <br />
                                <label htmlFor="x">Valor de x:</label><br />
                                <input type="number" id="x" name="x" onChange={handleValorDXChange} value={valorDX}/>
                            </div>
                        }
                        <br />
                        <br />
                        <br />
                        <input type="submit" value={'Perguntar'}/>
                    </form>
                </div>        

                <div className='display input__container__item'>
                    <ul id='info__list'>
                        {
                            display.map( info => (
                                <li className='number'>
                                    { info }
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <div className='input__container__item'>
                    <form onSubmit={handleGuessSubmit}>
                        <label htmlFor="guess">Palpite: ({playerHP})</label><br />
                        <input type="number" id="guess" name="guess" onChange={handleGuessChange} value={guess} />
                        <br />
                        <br />
                        <br />
                        <input type="submit" value={'Arriscar'}/>
                    </form>
                </div>                    
            </div>

            <div className="numbers__container">
                <ul id='numbers__list'>
                    {
                        numbers.map( num => (
                            <li className='number'>
                                { num }
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Game;