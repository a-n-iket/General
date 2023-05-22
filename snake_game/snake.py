import pygame
import random
import os

pygame.mixer.init()
pygame.init()
win_width, win_height = 800, 600
win = pygame.display.set_mode((win_width, win_height))
pygame.display.set_caption("Snake Game")
def bgimg(path):
	bgpic = pygame.image.load(path)
	bgpic = pygame.transform.scale(bgpic, (win_width, win_height)).convert_alpha()
	win.blit(bgpic, (0, 0))
fps = 20
clock = pygame.time.Clock()
#colors
white, black, red, green, blue = (255, 255, 255), (0, 0, 0), (255, 0, 0), (0, 255, 0), (0, 0, 255)
#music
def music(path):
	pygame.mixer.music.load(path)
	pygame.mixer.music.play()

def text(text, color, x, y , font, boldness, font_size):
	font = pygame.font.SysFont(font, font_size, bold=boldness)
	screen_text = font.render(text, True, color)
	win.blit(screen_text, (x, y))

def plotsnake(segments, color, x, y, radius):
	for x, y in segments:
		pygame.draw.circle(win, color, (x, y), radius)

def welcome():
	music("music/welcome.mp3")
	run = True
	while run:
		for event in pygame.event.get():
			if event.type == pygame.QUIT:
				run = False
			if event.type == pygame.KEYDOWN:
				if event.key == pygame.K_SPACE:
					gameloop()
				if event.key == pygame.K_q:
					pygame.quit()
					quit()
		bgimg("images/snake3.png")
		text("!!!WELCOME!!!", green, 200, 470, "Segoe script", 20, 30)
		text("Hit SPACEBAR to play", green, 120, 510, "Segoe script", 10, 30)
		text("Press 'q' to exit", black, 200, 550, "Segoe script", 20, 30)
		pygame.display.update()
		clock.tick(fps)
	pygame.quit()
	quit()
def gameloop():
	music("music/music.mp3")
	#head
	head_x, head_y = random.randint(100, win_width/2), random.randint(100, win_height/2)
	vel_x, vel_y, vel_increment = 0, 0, 13
	#food
	food_x, food_y = random.randint(100, win_width-100), random.randint(100, win_height-100)
	#snake body
	segments = []
	body_length =1
	#score
	score = 0
	if(not os.path.exists("score.txt")):
		with open("score.txt", "w") as f:
			f.write("0")
	else:
		with open("score.txt", "r") as f:
			highscore = f.read()
 
	run = True
	exit_game = False
	while run:
		if exit_game:
			for event in pygame.event.get():
				if event.type == pygame.QUIT:
					run = False
				if event.type == pygame.KEYDOWN:
					if event.key == pygame.K_RETURN:
						gameloop()
					if event.key == pygame.K_q:
						pygame.quit()
						quit()
			with open("score.txt", "w") as f:
				f.write(highscore)
			bgimg("images/snake2.jpg")
			text("!!!OOPS, Game Over!!!", red, 200, 170, "Segoe script", 10, 30)
			text("Hit ENTER to play again", blue, 175, 420, "Segoe script", 10, 30)
			text("Press 'q' to exit game", black, 210, 460, "Segoe script", 10, 30)
		else:				
			for event in pygame.event.get():
				if event.type == pygame.QUIT:
					run = False
				if event.type == pygame.KEYDOWN:
					if event.key == pygame.K_RIGHT and vel_x != -vel_increment:
						vel_x = vel_increment
						vel_y = 0
					if event.key == pygame.K_LEFT and vel_x != vel_increment:
						vel_x = -vel_increment
						vel_y = 0
					if event.key == pygame.K_UP and vel_y != vel_increment:
						vel_y = -vel_increment
						vel_x = 0
					if event.key == pygame.K_DOWN and vel_y != -vel_increment:
						vel_y = vel_increment
						vel_x = 0
			head_x += vel_x
			head_y += vel_y

			if abs(head_x-food_x)<12 and abs(head_y-food_y)<12:
				score += 10
				body_length +=1
				if score > int(highscore):
					highscore = str(score)

				food_x, food_y = random.randint(100, win_width-100), random.randint(100, win_height-100) 


			bgimg("images/snake.jpg")
			text("Score: "+str(score)+" HighScore: "+highscore, blue, 200, 15, "courier", 0 , 30)
			pygame.draw.circle(win, red, (food_x, food_y), 10)

			new_segment = []
			new_segment.append(head_x)
			new_segment.append(head_y)
			segments.append(new_segment)

			if len(segments)>body_length:
				del segments[0]

			if new_segment in segments[:-1]:
				music("music/collision.mp3")
				exit_game = True

			if head_x<0 or head_x>win_width or head_y<0 or head_y>win_height:
				music("music/collision.mp3")
				exit_game = True

			plotsnake(segments, black, head_x, head_y, 13)

		pygame.display.update()
		clock.tick(fps)
	pygame.quit()
	quit()
welcome()