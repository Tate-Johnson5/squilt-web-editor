from math import sin,cos

class Actor:
    def __init__(self):
        self.x = 0
        self.y = 0
        self.direction = 90
        self.show = True

    def onstart(self):
        pass

    def loop(self):
        pass

    def on_actor_click(self, event):
        pass

    def on_key_pressed(self, event):
        pass

    def step(self, step_amount):
        self.x += sin(self.direction) * step_amount
        self.y += cos(self.direction) * step_amount