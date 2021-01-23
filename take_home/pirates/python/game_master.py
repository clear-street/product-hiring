from board import Board
import sys

from island import Island


class GameMaster:
    def __init__(self):
        self.board = Board()

    def turn(self):
        self.board.display()

        sys.stdout.write("Which direction would you like to move?: ")
        sys.stdout.write("1: North")
        sys.stdout.write("2: East")
        sys.stdout.write("3: South")
        sys.stdout.write("4: West")

        direction = input()

        if direction == "1":
            self.board.move_south()
        elif direction == "2":
            self.board.move_east()
        elif direction == "3":
            self.board.move_south()
        else:
            self.board.move_west()

        collision = self.board.get_collision()
        if collision is not None:
            if isinstance(collision, Island):
                print("You crashed into land!")
                sys.exit()
            else:
                print("Avast, there be plunder!")
                self.board.pirate.plunder(collision)

        self.turn()
