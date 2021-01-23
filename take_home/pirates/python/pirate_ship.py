import utils


class PirateShip:
    def __init__(self):
        self.x, self.y = utils.random_coordinates()
        self.cargo = 0
        self.money = 0

    def move_north(self):
        self.y -= 1

    def move_south(self):
        self.y += 1

    def move_east(self):
        self.x += 1

    def move_west(self):
        self.x -= 1

    def plunder(self, cargo_ship):
        self.cargo = cargo_ship.cargo
        self.money = cargo_ship.money
