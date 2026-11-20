def les_heltall():
    while True:
        try:
            return int(input("Skriv inn et heltall: "))
        except ValueError:
            print("Ugyldig input. Skriv et heltall.")


def main():
    tall = les_heltall()
    resultat = "partall" if tall % 2 == 0 else "oddetall"
    print(f"{tall} er {resultat}.")


if __name__ == "__main__":
    main()
