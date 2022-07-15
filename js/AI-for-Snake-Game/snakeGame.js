export default class SnakeGame {
	constructor( fps) {
		this.width = 500
		this.height = 600
		this.grid_start_y = 100
		//this.win = pygame.display.set_mode((this.width, this.height)) //nrsharip uncomment
		this.play = True
		this.restart = False
		//this.clock = pygame.time.Clock() //nrsharip uncomment
		this.fps = fps
		this.rows = 10
		this.cols = this.rows
		this.snake = Snake(this.rows,this.cols)
		this.fruit_pos = (0,0)
		this.generate_fruit()
		this.score = 0
		this.high_score = 0
    }

	redraw_window (self) {

		this.win.fill(pygame.Color(10, 49, 245))
		this.draw_data_window()
		this.draw_grid()
		this.draw_grid_updates()
		pygame.display.update()
    }

	draw_data_window (self) {

		pygame.draw.rect(this.win, pygame.Color(20, 20, 20), (0,0,this.width, this.grid_start_y))

		//Add the score and high score
		font = pygame.font.SysFont('calibri', 20)
		score_text = font.render('Score: ' + str(this.score),1, (255,255,255))
		high_score_text = font.render('High Score: ' + str(this.high_score), 1, (255,255,255))
		this.win.blit(score_text, (30, 50))
		this.win.blit(high_score_text, (this.width - 140, 50))
    }
	draw_grid (self) {

		space_col = this.width//this.cols
		space_row = (this.height - this.grid_start_y)//this.rows

		for (let i in range(this.rows)) { // CHECK
			//draw horizontal line
			pygame.draw.line(this.win, pygame.Color(100,100,100), (0, space_row*i + this.grid_start_y),  (this.width, space_row*i + this.grid_start_y))
        }
		for (let i in range(this.cols)) { // CHECK
			//draw vertical line
			pygame.draw.line(this.win, pygame.Color(100,100,100), (space_col*i, this.grid_start_y), (space_col*i, this.height))
        }
		//draw last lines so they are not cut off
		pygame.draw.line(this.win, pygame.Color(100,100,100), (space_col*this.rows-2, this.grid_start_y), (space_col*this.rows-2, this.height))
		pygame.draw.line(this.win, pygame.Color(100,100,100), (0, this.height -2),  (this.width, this.height -2))
    }

	generate_fruit (self) {

		fruit_row = random.randrange(0,this.rows)
		fruit_col = random.randrange(0,this.cols)

		//Continually generate a location for the fruit until it is not in the snake's body
		while ((fruit_row, fruit_col) in this.snake.body) { // CHECK
			fruit_row = random.randrange(0,this.rows)
			fruit_col = random.randrange(0,this.cols)
        }
		this.fruit_pos = (fruit_row,fruit_col)
    }
	move_snake (self) {
		keys = pygame.key.get_pressed()

		//Determine which arrow key the user selected
		if (keys[pygame.K_LEFT]) {
			direct = "left"
		} else if (keys[pygame.K_UP]) {
			direct = "up"
		} else if (keys[pygame.K_RIGHT]) {
			direct = "right"
		} else if (keys[pygame.K_DOWN]) {
			direct = "down"
		} else {
			if (len(this.snake.directions) == 0) {
				//Move right at beginning of game
				direct = "right"
			} else {
				//Otherwise continue with previous direction if no key pressed
				direct = this.snake.directions[0]
            }
        }
		this.snake.directions.appendleft(direct)
		if (len(this.snake.directions) > len(this.snake.body)) {
			this.snake.directions.pop()
        }
		this.snake.update_body_positions()
    }

	draw_grid_updates (self) {
		space_col = this.width//this.cols
		space_row = (this.height - this.grid_start_y)//this.rows

		//Draw the fruit
		fruit_y = this.fruit_pos[0]
		fruit_x = this.fruit_pos[1]
		pygame.draw.rect(this.win, pygame.Color(250,30,30), (space_col*fruit_x+1, this.grid_start_y + space_row*fruit_y+1, space_col-1, space_row-1))

		//Draw the updated snake since last movement
		for (let pos in this.snake.body) { // CHECK
			pos_y = pos[0]
			pos_x = pos[1]
			
			pygame.draw.rect(this.win, pygame.Color(31,240,12), (space_col*pos_x+1, this.grid_start_y + space_row*pos_y+1, space_col-1, space_row-1))
        }
		head = this.snake.body[0]
		head_y = head[0]
		head_x = head[1]
		head_dir = this.snake.directions[0]

		//Draw eyes on the head of the snake, determining which direction they should face

		//if head facing left
		if (head_dir == "left") {
			//draw left eye
			pygame.draw.circle(this.win, pygame.Color(100,100,100), (space_col*head_x+space_col/10, this.grid_start_y + space_row*head_y + (space_row*4)/5), 2)
			//draw right eye
			pygame.draw.circle(this.win, pygame.Color(100,100,100), (space_col*head_x+space_col/10, this.grid_start_y + space_row*head_y + space_row/5), 2)
		//if head facing up
		} else if (head_dir == "up") {
			//draw left eye
			pygame.draw.circle(this.win, pygame.Color(100,100,100), (space_col*head_x+space_col/5, this.grid_start_y + space_row*head_y + space_row/10), 2)
			//draw right eye
			pygame.draw.circle(this.win, pygame.Color(100,100,100), (space_col*head_x+(space_col*4)/5, this.grid_start_y + space_row*head_y + space_row/10), 2)
		//if head facing right
		} else if (head_dir == "right") {
			//draw left eye
			pygame.draw.circle(this.win, pygame.Color(100,100,100), (space_col*head_x+(space_col*9)/10, this.grid_start_y + space_row*head_y + space_row/5), 2)
			//draw right eye
			pygame.draw.circle(this.win, pygame.Color(100,100,100), (space_col*head_x+(space_col*9)/10, this.grid_start_y + space_row*head_y + (space_row*4)/5), 2)
		//if head is facing down
		} else {
			//draw left eye
			pygame.draw.circle(this.win, pygame.Color(100,100,100), (space_col*head_x+space_col/5, this.grid_start_y + space_row*head_y + (space_row*9)/10), 2)
			//draw right eye
			pygame.draw.circle(this.win, pygame.Color(100,100,100), (space_col*head_x+(space_col*4)/5, this.grid_start_y + space_row*head_y + (space_row*9)/10), 2)
        }
    }

	check_collisions (self) {

		this.check_fruit_collision()
		this.check_wall_collision()
		this.check_body_collision()
    }

	check_fruit_collision (self) {

		//If we found a fruit
		if (this.snake.body[0] == this.fruit_pos) {
			//Add the new body square to the tail of the snake
			this.snake.extend_snake()
			//Generate a new fruit in a random position
			this.generate_fruit()

			this.score += 1
        }
    }

	check_wall_collision (self) {
		//Only need to check the colisions of the head of the snake
		head = this.snake.body[0]
		head_y = head[0]
		head_x = head[1]

		//If there is a wall collision, game over
		if (head_x == this.cols || head_y == this.rows || head_x < 0 || head_y < 0) {
			this.game_over()
        }
    }

	check_body_collision (self) {

		if (len(this.snake.body) > 1) {
			//Only need to check the colisions of the head of the snake
			head = this.snake.body[0];
			body_without_head = this.snake.body.slice(1);

			if (head in body_without_head) {
				this.game_over()
            }
        }
    }

	event_handler (self) {

		for (let event in pygame.event.get()) { // CHECK
			//Check if user has quit the game
			if (event.type == pygame.QUIT) {
				this.run = False
				pygame.quit()
				quit()
            }
        }
    }

	game_over (self) {
		this.snake = Snake(this.rows,this.cols)
		this.generate_fruit()
		this.restart = True
		if (this.score > this.high_score) {
			this.high_score = this.score
        }
		this.score = 0
    }
}