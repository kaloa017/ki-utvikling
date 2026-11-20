import math


def finn_primtall(t):
    if t <= 0:
        raise ValueError("T må være et positivt heltall.")
    grense = 15 if t < 6 else int(t * (math.log(t) + math.log(math.log(t)))) + 10
    while True:
        prim = bytearray(b"\x01") * (grense + 1)
        prim[:2] = b"\x00\x00"
        for i in range(2, math.isqrt(grense) + 1):
            if prim[i]:
                prim[i * i:grense + 1:i] = b"\x00" * (((grense - i * i) // i) + 1)
        tall = [i for i, er_prim in enumerate(prim) if er_prim]
        if len(tall) >= t:
            return tall[t - 1]
        grense *= 2


def main():
    while True:
        try:
            t = int(input("Skriv inn T: "))
            print(f"Det {t}-te primtallet er {finn_primtall(t)}.")
        except ValueError as feil:
            print(f"Ugyldig input: {feil}")
        if input("Vil du prøve igjen? (ja/nei): ").lower() not in ("ja", "j"):
            break


if __name__ == "__main__":
    main()
