def valid(*args, **kwargs):
    total = 0
    for arg in args:
        print(f"Arg: {arg}")

    for key, value in kwargs.items():
        print(f"Kwarg: {key} => {value}")


if __name__ == "__main__":
    valid([1, 2, 3], [4, 5], [6, 7 , 8], {"a":1, "b":2, "c":3}, a = 100, b = 90, c = 80, d = {"name":str})

'''
Arg: [1, 2, 3]
Arg: [4, 5]
Arg: [6, 7, 8]
Arg: {'a': 1, 'b': 2, 'c': 3}
Kwarg: a => 100
Kwarg: b => 90
Kwarg: c => 80
Kwarg: d => {'name': <class 'str'>}
'''
