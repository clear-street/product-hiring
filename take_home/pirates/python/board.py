from pirate_ship import PirateShip
from cargo_ship import CargoShip
from island import Island


class Board:

    def __init__(self):
        self.pirate = PirateShip()

        self.islands = []
        self.cargo_ships = []

    def init_board(self):
        for i in range(20):
            self.islands.append(Island())

        for i in range(3):
            self.cargo_ships.append(CargoShip())

    def move_north(self):
        self.pirate.move_north()

    def move_south(self):
        self.pirate.move_south()

    def move_east(self):
        self.pirate.move_east()

    def move_west(self):
        self.pirate.move_west()

    def display(self):
        board = [['^'] * 1000] * 1000

        for x in range(1000):
            for y in range(1000):
                for cargo in self.cargo_ships:
                    if cargo.x == x and cargo.y == y:
                        board[x][y] = 'C'
                for island in self.islands:
                    if island.x == x and island.y == y:
                        board[x][y] = 'I'

        for x in range(1000):
            print(''.join(board[x]))

    def get_collision(self):
        for cargo in self.cargo_ships:
            if cargo.x == self.pirate.x and cargo.y == self.pirate.y:
                return cargo
        for island in self.islands:
            if island.x == self.pirate.x and island.y == self.pirate.y:
                return island

        return None
