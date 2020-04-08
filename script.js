/* Pegando as tags do html */
var divElement = document.querySelector('div');
    tableElement = document.querySelector('table');

/* Setando o formato do jogo e as variaveis que serão utilizadas */
var Game = {
    start(){
        this.field = [
            ['','',''],
            ['','',''], /* Tamanho do jogo */
            ['','','']
        ];
        this.currentPlayer = 'X';   /* player atual */
        this.isFinished = false;    /* se o jogo ja foi terminado. Precisa iniciar em false */
        this.round = 0;             /* rodada atual */
        this.render();              /* */
    },

    /* função do próximo jogador */
    nextPlayer(){
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    },

    /* Setando os campos e colunas */
    setField(line, column){
        if(!this.isFinished && this.field[line][column] === ''){
            this.field[line][column] = this.currentPlayer;
            this.nextPlayer();
            this.round++;
            this.render();
        }
    },

    /* Comparação das linhas e colunas para saber se estão com X, O ou em brancas*/
    isGameOver(){
        var field = this.field,
            rows = 3,
            cols = 3,
            totalRow = 0,
            totalCol = 0;
        for(var i = 0; i < rows; i++){
            totalCol = 0;
            totalRow = 0; 
            for(var j = 0; j < cols; j++){
                if(field[i][j] === 'X'){
                    totalRow++;
                }
                if(field[i][j] === 'O'){
                    totalRow--;
                }
                if(field[j][i] === 'X'){
                    totalCol++;
                }
                if(field[j][i] === 'O'){
                    totalCol--;
                }
            }
            if(totalRow === 3 || totalCol === 3){
                return 'X';
            }
            if(totalRow === -3 || totalCol === -3){
                return 'O';
            }
        }
        if(field[0][0] !== '' && field[0][0] === field[1][1] && field[1][1] === field[2][2]){
            return field[0][0];
        }
        if(field[0][2] !== '' && field[0][2] === field[1][1] && field[1][1] === field[2][0]){
            return field[0][2];
        }
        if(this.round === rows * cols){
            return 'Ninguém Venceu';
        }
    },

    /* Função para criar as linhas e colunas, indicar o jogador atual e indicar se houve um ganhador ou não */
    render(){
        var Vencedor = this.isGameOver();
        divElement.textContent = Vencedor ? `Vencedor: ${Vencedor}` : `Jogador Atual: ${this.currentPlayer}`;

        if(Vencedor){
            this.isFinished = true;
        }

        var template = '';
        this.field.forEach((line, lineIndex)=>{
            template += '<tr>';
            line.forEach((column, columnIndex)=>{
                template += `<td onclick="Game.setField(${lineIndex}, ${columnIndex})">${column}</td>`;
            })
            template += '</tr>'
        })
        tableElement.innerHTML = template;
    }
}

Game.start();