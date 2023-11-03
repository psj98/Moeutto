from thicknessDTO import Thickness


# thickness : int 1 2 3
def calculate_temperature(thickness):


    pass
def get_temperature(thickness : Thickness):

    ret = {
        'outer': calculate_temperature(thickness.outer),
        'top': calculate_temperature(thickness.top),
        'bottom': calculate_temperature(thickness.bottom),
        'item': calculate_temperature(thickness.item),
    }
    return  ret