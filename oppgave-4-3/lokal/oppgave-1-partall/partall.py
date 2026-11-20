def hovedprogram():
    while True:
        user_input = input("Skriv inn et heltall: ")
        try:
            tall = int(user_input)
            print(f"Tallet {tall} er et {'PARTALL' if tall % 2 == 0 else 'ODDETALL'}.")
        except ValueError:
            print("Ugyldig input. Skriv inn et heltall.")
        if input("Vil du teste et annet tall? (ja/nei): ").lower() != "ja":
            break


if __name__ == "__main__":
    hovedprogram()
