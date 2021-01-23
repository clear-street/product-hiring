import random


def random_money():
    return random.randint(100, 5000)


def random_cargo():
    return random.randint(1, 5)


def random_coordinates():
    # Will return a random coordinate from [0,0] to [1000, 1000]
    return random.randint(0, 1000), random.randint(0, 1000)
