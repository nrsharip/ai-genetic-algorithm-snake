export default class Snake {
    constructor(rows,cols) {
        this.rows = rows;
        this.cols = cols;
        this.body = [];
        this.body.push(this.initialize_snake());
        this.directions = [];
    }

    initialize_snake () {
        let snake_row = this.rows / 2
        let snake_col = 1

        return (snake_row, snake_col)
    }

    update_body_positions () {
        //Iterate through each square that is part of the snake's body
        //for (let i,pos in enumerate(this.body)) { // CHECK
        for (let i = 0; i < this.body.length; i++) { // CHECK
            let pos = this.body[i];
            //Get the direction to move next that corresponds to the body position
            let direct = this.directions[i];
            //Update the body position after moving in the direction
            if (direct == "left") {
                //Move left
                this.body[i] = (pos[0],pos[1]-1);
            } else if (direct == "up") {
                //Move up
                this.body[i] = (pos[0]-1,pos[1])
            } else if (direct == "right") {
                //Move right
                this.body[i] = (pos[0],pos[1]+1)        
            } else {
                //Move down
                this.body[i] = (pos[0]+1, pos[1])
            }
        }
    }

    extend_snake () {
        
        let snake_tail = this.body[this.body.length - 1]
        
        //Get the direction of the tail of the body
        let tail_dir = this.directions[this.body.length - 1]

        if (tail_dir == "left") {
            //If tail is going left, add new tail to right of old tail
            this.body.append((snake_tail[0], snake_tail[1] + 1))
        } else if (tail_dir == "up") {
            //If tail is going up, add new tail below old tail
            this.body.append((snake_tail[0] + 1, snake_tail[1]))
        } else if (tail_dir == "right") {
            //If tail is going right, add new tail to the left of old tail
            this.body.append((snake_tail[0], snake_tail[1] - 1))
        } else {
            //If tail is going down, add new tail above old tail
            this.body.append((snake_tail[0] - 1, snake_tail[1]))
        }
    }
}
