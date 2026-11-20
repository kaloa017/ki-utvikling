import math


def finn_t_te_primtall(t):
    if t <= 0:
        raise ValueError("T må være et positivt heltall.")

    grense = 15 if t < 6 else int(t * (math.log(t) + math.log(math.log(t)))) + 10
    while True:
        prim = bytearray(b"\x01") * (grense + 1)
        prim[:2] = b"\x00\x00"
        for tall in range(2, math.isqrt(grense) + 1):
            if prim[tall]:
                prim[tall * tall:grense + 1:tall] = b"\x00" * (((grense - tall * tall) // tall) + 1)
        funnet = [i for i, er_prim in enumerate(prim) if er_prim]
        if len(funnet) >= t:
            return funnet[t - 1]
        grense *= 2


def main():
    try:
        t = int(input("Hvilket primtall vil du finne? T = "))
        print(f"Det {t}. primtallet er {finn_t_te_primtall(t)}.")
    except ValueError as feil:
        print(f"Ugyldig input: {feil}")


if __name__ == "__main__":
    main()
