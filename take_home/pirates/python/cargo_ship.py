import utils


class CargoShip:
    def __init__(self):
        self.x, self.y = utils.random_coordinates()
        self.cargo = utils.random_cargo()
        self.money = utils.random_money()

    def move_north(self):
        self.y -= 1

    def move_south(self):
        self.y += 1

    def move_east(self):
        self.x += 1

    def move_west(self):
        self.x -= 1
