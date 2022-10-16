import Vorpal from 'vorpal';

export default function (vorpal: Vorpal) {
  vorpal
    .command('clear', 'Clears the screen')
    .alias('cls')
    .action(async function (): Promise<void> {
      console.clear();
    });
}
