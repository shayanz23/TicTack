import { GameCanvas } from "./GameCanvas"

export class BoxComponent {
    areaXBegin: number;
    areaYBegin: number;
    lineWidth: number;
    padding: number;
    size: number = 0;
    drawPosX: number = 0;
    drawPosY: number = 0;
    drawn: boolean = false;
    player: string = "empty box";
    canvas: GameCanvas;
    constructor(areaXBegin: number, areaYBegin: number, canvas: GameCanvas) {
        this.areaXBegin = areaXBegin;
        this.areaYBegin = areaYBegin;
        this.canvas = canvas;
        this.lineWidth = Math.min(this.canvas.boxAreaHeight, this.canvas.boxAreaWidth) / 7;
        this.padding = this.lineWidth;
        this.calculateDrawPos();
    }

    protected beginDrawing() {
        this.canvas.context.lineWidth = this.lineWidth;

        // this.context.strokeStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
        this.canvas.context.beginPath();
        return true;
    }

    protected endDrawing() {
        this.canvas.context.closePath();
        this.canvas.context.stroke();
        this.drawn = true;
    }

    public calculateDrawPos() {
        this.size = Math.min(this.canvas.boxAreaHeight, this.canvas.boxAreaWidth) - this.padding * 2;
        this.drawPosX = this.areaXBegin + (this.canvas.boxAreaWidth - this.size) / 2;
        this.drawPosY = this.areaYBegin + (this.canvas.boxAreaHeight - this.size) / 2;
    }

    public recalculateDrawPos(areaXBegin: number, areaYBegin: number) {
        this.areaXBegin = areaXBegin
        this.areaYBegin = areaYBegin;
        this.lineWidth = Math.min(this.canvas.boxAreaHeight, this.canvas.boxAreaWidth) / 7;
        this.padding = this.lineWidth;
        this.calculateDrawPos();
    }

    public draw(): void {

    }

    public checkWinnerBase(col: number, row: number): boolean {
        if (this.player === "empty box") {
            return false;
        }
        let diagToRightWinner = this.checkWinner(col, row, 0, 1);
        let diagToLeftWinner = this.checkWinner(col, row, 0, 2);
        let horizWinner = this.checkWinner(col, row, 0, 3);
        let vertWinner = this.checkWinner(col, row, 0, 4);

        if (diagToRightWinner || diagToLeftWinner || horizWinner || vertWinner) {
            return true;
        }

        return false;
    }

    private checkWinner(col: number, row: number, len: number, type: number): boolean {
        let won = false;
        if (len >= this.canvas.winLength) {
            return true;
        }
        if (this.canvas.boxes[col] === undefined || this.canvas.boxes[col][row] === undefined) {
            return false;
        }
        if (this.canvas.boxes[col][row].player === this.player) {
            if (type === 1) {
                won = this.checkWinner(col + 1, row + 1, len + 1, 1);
            } else if (type === 2) {
                won = this.checkWinner(col - 1, row + 1, len + 1, 2);
            } else if (type === 3) {
                won = this.checkWinner(col + 1, row, len + 1, 3);
            } else if (type === 4) {
                won = this.checkWinner(col, row + 1, len + 1, 4);
            }
        }
        return won;
    }
}

export class Component0 extends BoxComponent {
    constructor(AreaXBegin: number, AreaYBegin: number, canvas: GameCanvas, player: string) {
        super(AreaXBegin, AreaYBegin, canvas);
        this.player = player;
        this.draw();
    }

    public draw() {
        this.beginDrawing();
        this.canvas.context.moveTo(this.drawPosX, this.drawPosY);
        this.canvas.context.lineTo(this.drawPosX + this.size, this.drawPosY + this.size);
        this.canvas.context.moveTo(this.drawPosX + this.size, this.drawPosY);
        this.canvas.context.lineTo(this.drawPosX, this.drawPosY + this.size);
        this.endDrawing();
    }
}

export class Component1 extends BoxComponent {
    constructor(AreaXBegin: number, AreaYBegin: number, canvas: GameCanvas, player: string) {
        super(AreaXBegin, AreaYBegin, canvas);
        this.player = player;
        this.draw();
    }

    public draw() {
        this.beginDrawing();
        this.canvas.context.arc(
            this.drawPosX + this.size / 2,
            this.drawPosY + this.size / 2,
            this.size / 2,
            0,
            2 * Math.PI
        );
        this.endDrawing();
    }
}