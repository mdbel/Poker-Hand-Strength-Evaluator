# Poker Hand Strength Evaluator

## The evaluator supports: 
- Texas Hold'em - input is a board of 5 cards, and multiple hands of 2 cards each.
-  Five Card Draw - input is multiple hands of 5 cards each.

### Input

The input is to be read from the standard input, with one test case per line:

```
<game-type> [<5 board cards>] <hand 1> <hand 2> <...> <hand N>
```

...where:

* `game-type` specifies the game type for this test case, one of:
    * `texas-holdem` - for Texas Hold'em
    * `five-card-draw` - for Five Card Draw

* `<5 board cards>` is a 10 character string where each 2 characters encode a card

* `<hand X>` is a 4, 8 or 10 character string (depending on game type) where each 2 characters encode a card
* `<card>` is a 2 character string with the first character representing the rank
  (one of `A`, `K`, `Q`, `J`, `T`, `9`, `8`, `7`, `6`, `5`, `4`, `3`, `2`) and the second character representing
  the suit (one of `h`, `d`, `c`, `s`). Jokers are not used.

### Build and start ###

```
* npm i
* npm run build
* npm run start \ npm run start < input.txt > output.txt
```
